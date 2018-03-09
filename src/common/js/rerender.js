/*jshint esversion: 6 */
import { level } from './level.js';
import { removeEvent } from './bindEvent.js';

export function rerender(ctx, curLevel) {
    removeEvent('body', 'keydown', ctx.keydownEvent);
    removeEvent('body', 'keyup', ctx.keyupEvent);
    removeEvent('body', 'click', ctx.clickEvent);
    let reLevel = curLevel % level().length;
    let chineseNum = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    ctx.init(reLevel);
    document.querySelector('.tips').style.top = '-100%';
    document.querySelector('#foot').innerHTML = 0;
    document.querySelector('#level').innerHTML = chineseNum[reLevel];
}