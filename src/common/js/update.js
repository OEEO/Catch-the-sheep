/*jshint esversion: 6 */
import { detectCollision } from './detectCollision.js';
import { move, moveMap } from './move.js';

/**
 * 更新地图状态
 */

export function update(ctx, dir) {
    let savedWolf = ctx.curStatus.wolf;
    let detectCollisionWith = detectCollision.bind(ctx, ctx.curStatus.map);
    let firstDetect = detectCollisionWith(savedWolf.x, savedWolf.y, dir);
    if (firstDetect.type === 2 || firstDetect.type === 4) {//下一步检测到地板或终点时
        move(savedWolf.object, ctx.item.base, dir);
        moveMap(ctx.status, ctx.curStatus.map, savedWolf, firstDetect.x, firstDetect.y);
    } else if (typeof firstDetect.type === 'object' && firstDetect.type.name === 'sheep') {//下一步检测到羊时
        let secondDetect = detectCollisionWith(firstDetect.x, firstDetect.y, dir);//检测羊是否可以往该方向前进
        let sheep = ctx.curStatus.map[firstDetect.x][firstDetect.y];
        if (secondDetect.type === 2 || secondDetect.type === 4) {//羊的前方是地板或终点时
            move(sheep.object, ctx.item.base, dir);
            moveMap(ctx.status, ctx.curStatus.map, sheep, secondDetect.x, secondDetect.y);
            move(savedWolf.object, ctx.item.base, dir);
            moveMap(ctx.status, ctx.curStatus.map, savedWolf, firstDetect.x, firstDetect.y);
            if (secondDetect.type === 4) {//当羊到达终点时，改变羊的图片
                ctx.sheepBeCatchObj.sheepSet.add(`${secondDetect.x}-${secondDetect.y}`);//把成功的座标添加到Set
                sheep.object.style.backgroundImage = `url(${ctx._sheepBeCatchImage})`;
            } else {
                sheep.object.style.backgroundImage = `url(${ctx._sheepImage})`;
            }
            removeSheepBeCatch(ctx.sheepBeCatchObj, savedWolf.x, savedWolf.y);//当羊被狼从一个终点移动另一个终点时
            if (isTaskFinish(ctx.sheepBeCatchObj)) {
                ctx.taskFinish = true;
                clearInterval(ctx.timeCount);
                setTimeout(() => {
                    document.querySelector('.tips').style.top = '175px';
                },300);
            } else {

            }
        } else {
            //狼推羊的前方是墙
            return;
        }
    } else {
        //狼的前方是墙
        return;
    }
    ctx.steps++;
    document.querySelector('#foot').innerHTML = ctx.steps;
}

function isTaskFinish(sheepBeCatchObj) {
    return sheepBeCatchObj.sheepSet.size === sheepBeCatchObj.len;
}

function removeSheepBeCatch(sheepBeCatchObj, x, y) {
    sheepBeCatchObj.sheepSet.delete(`${x}-${y}`);
}