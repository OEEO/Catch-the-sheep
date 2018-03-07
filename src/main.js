/*jshint esversion: 6 */
import '../static/css/reset.css';
import './common/sass/main.scss';
import './common/sass/scene.scss';
import { drawObj } from './common/js/drawObj.js';
import { level } from './common/js/level.js';

let container = document.querySelector('.wrap');
let item = {
    base:50
};
let status = level()[0];
console.log(container, status, item);
drawObj(container, status, item);