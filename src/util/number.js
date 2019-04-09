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

/**
 * 返回一组或一个指定范围的随机整数
 * @param start
 * @param end
 * @param count
 * @returns {Array|number}
 */
function randomInt(start, end, count) {
    count = count > 0 ? count : 1;
    const result = [];
    while (count--) {
        result.push(
            Math.round(Math.random() * (end - start)) + start
        );
    }
    return result.length > 1 ? result : result.pop();
}

export default {
    limitRange,
    randomInt
};