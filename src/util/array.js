/**
 * @file 数组操作
 */

function each(array, callback, reversed) {
    const {length} = array;
    let i = length;

    while (i > 0) {
        i--;
        let target = reversed ? i : length - 1 - i;
        if (callback(array[target], target) === false) {
            break;
        }
    }
}

function remove(array, item, all) {
    let index = array.indexOf(item);

    if (index > -1) {
        array.splice(index, 1);

        if (all) {
            remove(array, item, all);
        }
    }
}

function last(array) {
    return array[array.length - 1];
}

function has(array, item) {
    return array.indexOf(item) > -1;
}

export default {
    each,
    remove,
    last,
    has
};