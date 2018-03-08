/*jshint esversion: 6 */
import { level } from './level.js';
import { bgImageChange } from './bgImageChange.js';
import { bindEvent, keydownEvent, keyupEvent, clickEvent } from './bindEvent.js';
import { render } from './render.js';

Scene.prototype._proxy = function (item) {
    for(let i in item){
        this[`_${i}`] = item[i];
    }
};
/**
 * 场景构造函数
 * @param {dom} container 场景容器
 * @param {obj} item      场景中的元素
 */
export function Scene(container, item) {
    this.container = container;
    this.item = item || {};
    this.curStatus = null;
    this.item.base = item.base || 50;

    this.init = async function(curLevel) {
        if (this.timeCount) {
            clearInterval(this.timeCount);
        }
        this.sheepBeCatchObj ={
            len:0,
            sheepSet:new Set()
        };
        this.check = {};
        this.steps = 0;
        this.taskFinish = false;
        this.curLevel = curLevel || 0;
        this.container.innerHTML = '';
        this.status = level()[this.curLevel];
        this.curStatus = await render(this.container, this.status, this.item, this.sheepBeCatchObj);
        bgImageChange('.wolf', this.item.wolfImage);
        bgImageChange('.sheep', this.item.sheepImage);
        this.move = false;
        this.timer = 0;
        this.gameStartDate = Date.now();
        this.timeCount = setInterval( () => {
            let time = ((Date.now() - this.gameStartDate) / 1000).toFixed(1);
            document.querySelector('#time').innerHTML = time;
        },100);
        this._proxy(this.item);
        this.keydownEvent = keydownEvent.bind(this);
        this.keyupEvent = keyupEvent.bind(this);
        this.clickEvent = clickEvent.bind(this);
        bindEvent('body', 'keydown', this.keydownEvent);
        bindEvent('body', 'keyup', this.keyupEvent);
        bindEvent('body', 'click', this.clickEvent);
    };
    this.init();
}