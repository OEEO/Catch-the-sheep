/*jshint esversion: 6 */
/**
 * 物体碰撞检测
 * @param  {array} status 当前地图数组
 * @param  {下一步} x      [description]
 * @param  {[type]} y      [description]
 * @param  {[type]} dir    [description]
 * @return {[type]}        [description]
 */
export function detectCollision(status, x, y, dir) {
    x = +x;
    y = +y;
    let nextBlock = {
        type:-1,
        x:null,
        y:null
    };
    switch(dir) {
        case 'left':
            nextBlock.type = status[x][y - 1];
            nextBlock.x = x;
            nextBlock.y = y - 1;
            break;
        case 'right':
            nextBlock.type = status[x][y + 1];
            nextBlock.x = x;
            nextBlock.y = y + 1;
            break;
        case 'up':
            nextBlock.type = status[x - 1][y];
            nextBlock.x = x - 1;
            nextBlock.y = y;
            break;
        case 'down':
            nextBlock.type = status[x + 1][y];
            nextBlock.x = x + 1;
            nextBlock.y = y;
            break;
        default:
            nextBlock.type = -1;
    }
    return nextBlock;
}