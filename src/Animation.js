/**
 * @file canvas动画类
 */
import Shape from './Shape';

import Arc from './shapes/Arc';
import Bitmap from './shapes/Bitmap';

const requestAnimationFrame = window.requestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame;

export default class {
    constructor (canvas) {
        const me = this;

        me.canvas = canvas;
        me.width = canvas.width;
        me.height = canvas.height;
        me.ctx = canvas.getContext('2d');
        me.shapes = [];
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
        me.shapes.push(
            Shape.factory(shape, options)
        );
    }

    /**
     * 刷新当前帧
     */
    refresh () {
        const me = this;

        me.ctx.clearRect(0, 0, me.width, me.height);
        me.shapes.forEach(
            function (shape) {
                shape.update();
                shape.draw();
            }
        );

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
        me.shapes = [];
        me.ctx.clearRect(0, 0, me.width, me.height);
    }
};

Shape.shapes.arc = Arc;
Shape.shapes.bitmap = Bitmap;
