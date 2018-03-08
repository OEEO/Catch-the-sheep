/*jshint esversion: 6 */
import { drawObject } from './drawObject.js';
/**
 * 对象深拷贝
 * @param  {object} obj 原始对象
 * @return {object}     克隆的对象
 */
function cloneObj(obj) {
    if (typeof obj !== 'object') {
        return;
    }
    let str = '';
    let newObj = obj.constructor === Array ? [] : {};
    if (window.JSON) {
        str = JSON.stringify(obj);
        newObj = JSON.parse(str);
    } else {
        for(let i in obj){
            newObj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
        }
    }
    return newObj;
}

function createImgPromise(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = url;
        img.onload = () => {
            resolve(img);
        };
    });
}

export async function render(container, status, item, sheepBeCatchObj) {
    let canvas = document.createElement('canvas');
    canvas.width = 550;
    canvas.height = 550;
    container.appendChild(canvas);
    let ctx = canvas.getContext('2d');
    let wall, floor, target;

    let wallImage = createImgPromise(item.wallImage);
    let floorImage = createImgPromise(item.floorImage);
    let targetImage = createImgPromise(item.targetImage);
    let sheepImage = createImgPromise(item.sheepImage);
    let wolfImage = createImgPromise(item.wolfImage);
    let sheepBeCatchImage = createImgPromise(item.sheepBeCatchImage);

    function drawImage(image, x, y) {
        ctx.drawImage(image, item.base * x, item.base * y, item.base, item.base);
    }
    return Promise.all([wallImage, floorImage, targetImage]).then((data) => {//这里好好想一下
        wall = data[0];
        floor = data[1];
        target = data[2];

        let map = cloneObj(status);
        let wolf = null;

        status.forEach( (rowArr, i) => {
            rowArr.forEach( (num, j) => {
                switch(num) {
                    case 0:
                        //透明点位
                        ctx.fillStyle = 'transparent';
                        ctx.fillRect(item.base * j, item.base * i, item.base, item.base);
                        break;
                    case 1:
                        //墙
                        drawImage(wall, j, i);
                        break;
                    case 2:
                        //地板
                        drawImage(floor, j, i);
                        break;
                    case 3:
                        //羊
                        drawImage(floor, j, i);
                        map[i][j] = {
                            name: 'sheep',
                            x: i,
                            y: j,
                            object: drawObject(j, i, 'sheep', item.base, container)
                        };
                        break;
                    case 4:
                        //终点
                        drawImage(floor, j, i);
                        drawImage(target, j, i);
                        sheepBeCatchObj.len++;
                        break;
                    case 5:
                        //狼
                        drawImage(floor, j, i);
                        map[i][j] = {
                            name: 'wolf',
                            x: i,
                            y: j,
                            object: drawObject(j, i, 'wolf', item.base, container)
                        };
                        wolf = {
                            x: i,
                            y: j,
                            object: map[i][j].object
                        };
                        break;
                    default:
                        drawImage(floor, j, i);
                        break;
                }
            });
        });
        return { map, wolf };
    });
}