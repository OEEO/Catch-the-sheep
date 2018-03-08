/*jshint esversion: 6 */
import { level } from './level.js';
import { removeEvent } from './bindEvent.js';

export function rerender(ctx, curLevel) {
    removeEvent('body', 'keydown', ctx.keydownEvent);
    removeEvent('body', 'keyup', ctx.keyupEvent);
    removeEvent('body', 'click', ctx.clickEvent);
    ctx.init(curLevel % level().length);
    document.querySelector('.tips').style.top = '-100%';
    document.querySelector('#foot').innerHTML = 0;
}