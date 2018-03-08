/*jshint esversion: 6 */
import { Scene } from './scene.js';
import { bindEvent } from './bindEvent.js';

export function init() {
    let container = document.querySelector('.wrap');
    new Scene(container, {
        wallImage: './static/img/wall.png',
        floorImage: './static/img/floor.png',
        targetImage: './static/img/target.png',
        sheepImage: './static/img/sheep.png',
        wolfImage: './static/img/wolf.png',
        sheepBeCatchImage: './static/img/sheep-be-catch.png'
    });
}