/*jshint esversion: 6 */

export function move(target, base, dir) {
    let top = Number.parseInt(target.style.top);
    let left = Number.parseInt(target.style.left);
    switch(dir) {
        case 'left':
            target.style.left = left - base + 'px';
            break;
        case 'right':
            target.style.left = left + base + 'px';
            break;
        case 'up':
            target.style.top = top - base + 'px';
            break;
        case 'down':
            target.style.top = top + base + 'px';
            break;
        default:
            break;
    }
    return target;
}

export function moveMap(status, map, obj, curX, curY) {
    if (status[obj.x][obj.y] === 4) {
        map[obj.x][obj.y] = 4;
    } else {
        map[obj.x][obj.y] = 2;
    }
    obj.x = curX;
    obj.y = curY;
    map[curX][curY] = obj;
}