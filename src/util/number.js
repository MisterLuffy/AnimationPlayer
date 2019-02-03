/**
 * 返回一个指定范围内的数字
 * @param number
 * @param start
 * @param end
 */
function limitRange(number, start, end) {
    return isNaN(number)
        ? number
        : (number < start ? start : (number > end ? end : number));
}

export default {
    limitRange
};