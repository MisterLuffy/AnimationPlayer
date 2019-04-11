/**
 * @file canvas动画类
 */
import Shape from './shapes/Shape';
import Arc from './shapes/Arc';
import Bitmap from './shapes/Bitmap';

import number from './util/number';
import object from './util/object';
import contain from "./util/contain";
import eventHandler from './eventHandler';

const requestAnimationFrame = window.requestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame;

export default class {
    /**
     * @param {HTMLDocument} canvas 画布元素
     * @param {[string]} mouseEvents 支持的鼠标事件类型
     */
    constructor (canvas, mouseEvents) {
        const me = this;

        me.canvas = canvas;
        me.width = canvas.width;
        me.height = canvas.height;
        me.ctx = canvas.getContext('2d');
        me.mouseEvents = (mouseEvents instanceof Array) ? mouseEvents : [];

        // 存储图形所用的命名空间
        me.shapeNamespace = '' + number.randomInt(10e4, 10e5 - 1, 1);

        eventHandler(me);
    }

    /**
     * 向画布中添加一个图形
     *
     * @param {string} shape 图形名
     * @param {Object} options 添加的图形的配置
     */
    addShape (shape, options) {
        const me = this;
        options.canvas = me.canvas;
        options.namespace = me.shapeNamespace;
        Shape.factory(shape, options);
    }

    /**
     * 由坐标位置获得图形实例
     * @param x
     * @param y
     * @returns {*}
     */
    getShapeByCoordinate (x, y) {
        const shapes = Shape.instances[this.shapeNamespace];
        let result = null;

        object.each(shapes, shape => {
            if (shape instanceof Shape.shapes.bitmap
                && contain.isInRect(x, y, shape)
            ) {
                result = shape;
                return false;
            }
        });

        return result;
    }

    /**
     * 刷新当前帧
     */
    refresh () {
        const me = this;
        const shapes = Shape.instances[me.shapeNamespace];

        me.ctx.clearRect(0, 0, me.width, me.height);
        object.each(shapes, shape => {
            shape.update();
            shape.draw();
        });
        me.raf = requestAnimationFrame(
            me.refresh.bind(me)
        );
    }

    /**
     * 动画开始
     */
    start () {
        const me = this;

        me.raf = requestAnimationFrame(
            me.refresh.bind(me)
        );
    }

    /**
     * 动画结束
     */
    stop () {
        const me = this;

        if (me.raf) {
            cancelAnimationFrame(me.raf);
        }
    }

    dispose () {
        const me = this;

        me.stop();
        me.ctx.clearRect(0, 0, me.width, me.height);
        delete Shape.instances[me.shapeNamespace];
    }
};

Shape.shapes.arc = Arc;
Shape.shapes.bitmap = Bitmap;
