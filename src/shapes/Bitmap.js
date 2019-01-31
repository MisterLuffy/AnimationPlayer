/**
 * @file 位图子类
 */
import Shape from "../Shape";
import object from '../util/object';

// 更高效的取整
function floor(num) {
    return (0.5 + num) | 0;
}

export default class Bitmap extends Shape {
    /**
     * @param {Object} options
     * @property {Object} options.canvas
     * @property {Object} options.image 需要被绘制的图片元素
     * @property {?number} options.sx
     * @property {?number} options.sy
     * @property {?number} options.sWidth
     * @property {?number} options.sHeight
     * @property {?number} options.x
     * @property {?number} options.y
     * @property {?number} options.width
     * @property {?number} options.height
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

    createShape (ctx) {
        const me = this;
        ctx.drawImage(
            me.image,
            me.sx,
            me.sy,
            me.sWidth,
            me.sHeight,
            0,
            0,
            me.width,
            me.height
        );
    }

    update () {
        const me = this;
        const baseTime = 20;

        // 保证有一个初始的速度
        me.time = me.time || baseTime;
        const delta = me.time * 0.2;
        // 模拟自由落体的变化
        let x = floor(me.x - delta);
        let y = floor(me.y + delta);

        // 边界检测
        if (x + me.width < 0) {
            x = me.wraperWidth;
        }

        if (y > me.wraperHeight) {
            me.time = baseTime;
            x = floor(Math.random() * me.wraperWidth);
            y = -me.height;
        }

        me.x = x;
        me.y = y;
        me.time++;
    }
};