/**
 * @file 位图子类
 */
import Shape from "./Shape";
import object from '../util/object';

export default class Bitmap extends Shape {
    /**
     * @param {Object} options
     *
     * @property {HTMLElement} options.canvas
     * @property {Image} options.image 需要被绘制的图片元素
     *
     * @property {?number} options.sx
     * @property {?number} options.sy
     * @property {?number} options.sWidth
     * @property {?number} options.sHeight
     *
     * @property {?number} options.x
     * @property {?number} options.y
     * @property {?number} options.width
     * @property {?number} options.height
     *
     * @property {?boolean} options.cache 是否使用缓存
     * @property {string} options.namespace 存储使用的命名空间
     * @property {?Function} options.onUpdate 自定义图形的更新函数
     * @property {?Function} options.onClick 图形点击回调
     */
    constructor (options) {
        const image = options.image;
        super(
            object.extend(
                {
                    x: 0,
                    y: 0,
                    width: image.width,
                    height: image.height,
                    sx: 0,
                    sy: 0,
                    sWidth: image.width,
                    sHeight: image.height
                },
                options
            )
        );
    }

    /**
     * 创建图形
     * @override
     * @param ctx Canvas2D上下文
     */
    createShape (ctx) {
        const me = this;
        const isCache = ctx === me.cacheCtx;

        ctx.drawImage(
            me.image,
            me.sx,
            me.sy,
            me.sWidth,
            me.sHeight,
            isCache ? 0 : me.x,
            isCache ? 0 : me.y,
            me.width,
            me.height
        );
    }

    /**
     * 更新图形
     */
    update () {
        const me = this;

        me.frame++;

        // 外层自定义的更新可以覆盖默认方式
        if (typeof me.onUpdate !== 'function' || me.onUpdate() !== false) {
            const baseFrame = 10;
            me.frame = me.frame >= baseFrame ? me.frame : baseFrame;

            // 模拟自由落体的变化
            const delta = me.frame * 0.1;
            let x = Math.floor(me.x - delta);
            let y = Math.floor(me.y + delta);

            // 边界检测
            if (x + me.width < 0) {
                x = me.wraperWidth;
            }

            if (y > me.wraperHeight) {
                me.frame = baseFrame;
                x = Math.floor(Math.random() * me.wraperWidth);
                y = -me.height;
            }

            me.x = x;
            me.y = y;
        }
    }
};