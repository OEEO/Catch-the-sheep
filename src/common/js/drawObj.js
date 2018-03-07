/*jshint esversion: 6 */
export function drawImage(x, y, className, base, container) {
    let object = document.createElement('div');
    object.className = className;
    object.style.left = x * base + 'px';
    object.style.top = y * base + 'px';
    container.appendChild(object);
    return object;
}