/*jshint esversion: 6 */
export function bgImageChange(selector, url) {
    let domList = document.querySelectorAll(selector);
    [...domList].forEach((dom) => {
        dom.style.backgroundImage = `url(${url})`;
    });
}