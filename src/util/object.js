/**
 * @file 对象操作
 */

import array from './array';

function each(object, callback) {
    object = object || {};
    array.each(
        Object.keys(object),
        function (key) {
            return callback(object[key], key);
        }
    );
}

function copy(object, deep) {
    let result = object;

    if (Array.isArray(object)) {
        result = [];
        array.each(
            object,
            function (item, index) {
                result[index] = deep ? copy(item, deep) : item;
            }
        );
    }
    else {
        result = {};
        each(
            object,
            function (value, key) {
                result[key] = deep && !(value instanceof HTMLElement) ? copy(value, deep) : value;
            }
        );
    }

    return result;
}

function extend(target, ...sources) {
    for (let source of sources) {
        each(
            source,
            function (value, key) {
                target[key] = value;
            }
        );
    }

    return target;
}

export default {
    each,
    copy,
    extend
};