/*jshint esversion: 6 */
import { Scene } from './scene.js';
import { bindEvent } from './bindEvent.js';
import { bgImageChange } from './bgImageChange.js';


export function init() {
    bindEvent('#btn-gameStart','click', () => {
        let container = document.querySelector('.wrap');
        new Scene(container, {
            wallImage: './static/img/wall.png',
            floorImage: './static/img/floor.png',
            targetImage: './static/img/target.png',
            sheepImage: './static/img/sheep.png',
            wolfImage: './static/img/wolf.png',
            wolfLeftImage:'./static/img/wolf-left.png',
            wolfRightImage:'./static/img/wolf-right.png',
            wolfUpImage:'./static/img/wolf-up.png',
            sheepBeCatchImage: './static/img/sheep-be-catch.png'
        });
        let gameStartPage = document.querySelector('.gameStartPage');
        gameStartPage.style.top = '-100%';
        setTimeout(() => {
            gameStartPage.style.display = 'none';
        },250);
    });
    window.onload = function () {
        document.querySelector('#btn-gameStart').style.display = 'block';
    };
}