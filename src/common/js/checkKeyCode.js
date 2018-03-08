/*jshint esversion: 6 */
import { update } from './update.js';
import { rerender } from './rerender.js';

export function checkKeyCode(ctx, backward=false) {
    let dir = '';
    const kCode = {
        LEFT:37,
        UP:38,
        RIGHT:39,
        DOWN:40,
        SPACE:32,
        ENTER:13
    };
    if (ctx.check[kCode.SPACE]) {
        rerender(ctx, ctx.curLevel);
        return;
    }
    if (ctx.check[kCode.ENTER]) {
        rerender(ctx, ctx.curLevel + 1);
        return;
    }

    if (!backward) {
        switch(true) {
            case ctx.check[kCode.LEFT]:
                dir = 'left';
                break;
            case ctx.check[kCode.RIGHT]:
                dir = 'right';
                break;
            case ctx.check[kCode.UP]:
                dir = 'up';
                break;
            case ctx.check[kCode.DOWN]:
                dir = 'down';
                break;
        }
    } else {
        switch(true) {
            case ctx.check[kCode.LEFT]:
                dir = 'right';
                break;
            case ctx.check[kCode.RIGHT]:
                dir = 'left';
                break;
            case ctx.check[kCode.UP]:
                dir = 'down';
                break;
            case ctx.check[kCode.DOWN]:
                dir = 'up';
                break;
        }
    }
    update(ctx, dir);
}