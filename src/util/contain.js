/**
 * @file 判断点是否在区域内
 */

/**
 * 判断坐标是否在矩形内
 *
 * @param {number} x 坐标X
 * @param {number} y 坐标Y
 * @param {Object} rect 矩形区域信息
 * @property {number} rect.x
 * @property {number} rect.y
 * @property {number} rect.width
 * @property {number} rect.height
 *
 * @returns {boolean}
 */
function isInRect(x, y, rect) {
    return x >= rect.x
        && y >= rect.y
        && x <= rect.x + rect.width
        && y <= rect.y + rect.height;
}

export default {
    isInRect
};