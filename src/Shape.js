/**
 * @file 图形基类
 *
 * 开启缓存时使用离屏canvas缓存图形内容，当每次绘制较都复杂时建议开启以提高性能
 * 当实例极多时会创建过多离屏canvas，性能反而下降
 * 同时离屏canvas的尺寸canvas要尽可能小，否则亦会影响性能
 */
import object from './util/object';

export default class Shape {
    /**
     * @param {Object} options
     * @property {Object} options.canvas DOM元素
     * @property {?number} options.width 图形的宽，默认为canvas宽
     * @property {?number} options.height 图形的高，默认为canvas高
     * @property {?number} options.x 图形绘制起点，默认0
     * @property {?number} options.y 图形绘制起点，默认0
     */
    constructor (options) {
        if (!options.canvas) {
            throw {
                name: 'error',
                message: '需要传入canvas元素'
            }
        }

        const me = this;

        object.extend(
            me,
            {
                x: 0,
                y: 0,
                time: 0
            },
            options
        );

        me.ctx = me.canvas.getContext('2d');
        me.wraperWidth = me.canvas.width;
        me.wraperHeight = me.canvas.height;

        // 需要使用缓存
        if (me.cache !== false) {
            me.cache = true;
            me.cacheCanvas = document.createElement('canvas');
            me.cacheCtx = me.cacheCanvas.getContext('2d');
            me.cacheCanvas.width = me.width || me.wraperWidth;
            me.cacheCanvas.height = me.height || me.wraperHeight;

            me.cacheCtx.save();
            me.createShape(me.cacheCtx);
            me.cacheCtx.restore();
        }
    }

    /**
     * 初始化图形，依赖子类实现
     */
    createShape () {}

    /**
     * 更新图形，依赖子类实现
     */
    update () {}

    /**
     * 绘图
     */
    draw () {
        const me = this;

        if (me.cache === false) {
            me.ctx.save();
            me.createShape(me.ctx);
            me.ctx.restore();
        }
        else {
            me.ctx.drawImage(me.cacheCanvas, me.x, me.y);
        }
    }
};

/**
 * Shape的扩展
 */
Shape.shapes = {};

/**
 * 静态工厂方法
 * @param {string} shape 需要创建的图形子类的名字
 * @param {options} options 具体参数在子类里描述
 */
Shape.factory = function (shape, options) {
    if (Shape.shapes[shape]) {
        return new Shape.shapes[shape](options);
    }
};

