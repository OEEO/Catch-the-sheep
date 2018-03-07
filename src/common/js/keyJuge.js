/*jshint esversion: 6 */
export function keyJuge(keyCode) {
    if (keyCode === 13 || keyCode === 32 || keyCode === 37 || keyCode === 38 || keyCode === 39 || 40) {
        return true;
    } else {
        return false;
    }
}