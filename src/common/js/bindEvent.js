/*jshint esversion: 6 */
import { checkKeyCode } from './checkKeyCode.js';
import { rerender } from './rerender.js';
import { keyJuge } from './keyJuge.js';

export function bindEvent(selector, eventName, func) {
    let element = document.querySelector(selector);
    element.addEventListener(eventName, func);
}
export function removeEvent(selector, eventName, func) {
    let element = document.querySelector(selector);
    element.removeEventListener(eventName, func);
}

export function keydownEvent(e) {
    if (keyJuge(e.keyCode)) {
        e.preventDefault();
        if (this.taskFinish && e.keyCode !== 32 && e.keyCode !== 13) {
            return;
        }
        if (!this.move) {
            this.move = true;
            this.check[e.keyCode] = true;
            this.timer = Date.now();
            checkKeyCode(this);
        } else {
            let curTime = Date.now();
            if (curTime - this.timer < 200) {
                return;
            }
            checkKeyCode(this);
            this.timer = curTime;
        }
    }
}

export function keyupEvent(e) {
    this.check[e.keyCode] = false;
    if (keyJuge(e.keyCode)) {
        this.move = false;
    }
}

export function clickEvent(e) {
    if (e.target.nodeName === 'BUTTON') {
        switch(e.target.id) {
            case 'btn-reset':
                rerender(this, this.curLevel);
                break;
            case 'btn-next':
                rerender(this, this.curLevel + 1);
                break;
        }
    }
}