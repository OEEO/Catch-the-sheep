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
    e.preventDefault();
    if (!this.move && !keyJuge(e.keyCode, this.item.id)) {
        return;
    }
    if (!this.move) {
        this.move = true;
        this.check[e.keyCode] = true;
        this.timer = Date.now();
        this.step.push(e.keyCode);
        checkKeyCode(this);
    } else {
        let curTime = Date.now();
        if (curTime - this.timer < 100) {
            return;
        }
        checkKeyCode(this);
        this.timer = curTime;
    }
}

export function keyupEvent(e) {
    e.preventDefault();
    this.check[e.keyCode] = false;
    if (keyJuge(e.keyCode, this.item.id)) {
        this.move = false;
    }
}

export function clickEvent(e) {
    if (e.target.nodeName === 'BUTTON') {
        switch(e.target.id) {
            case 'btn-backward':
                if (this.step.length > 0) {
                    let kCode = this.step.pop();
                    this.check[kCode] = true;
                    checkKeyCode(this, 'backward');
                    this.check[kCode] = false;
                }
                break;
            case 'btn-reset':
                rerender(this, this.curLevel);
                break;
            case 'btn-next':
                rerender(this, this.curLevel + 1);
                break;
        }
    }
}