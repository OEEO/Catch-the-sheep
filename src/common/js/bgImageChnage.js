/*jshint esversion: 6 */
export function bgImageChange(selector, url) {
    let domList = document.querySelectorAll(selector);
    [...domList].forEach(function (dom) {
        dom.backgroundImage = `url(${url})`;
    });
}