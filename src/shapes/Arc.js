/**
 * @file 圆弧
 */
import Shape from './Shape';

import number from '../util/number';
import object from '../util/object';

export default class Arc extends Shape {
    /**
     * @param options
     *
     * @property {HTMLElement} options.canvas
     * @property {Image} options.image 需要被绘制的图片元素
     *
     * @property options.x
     * @property options.y
     * @property options.radius
     * @property options.startAngle
     * @property options.endAngle
     * @property options.anticlockwise
     *
     * @property options.strokeColor
     * @property options.fillColor
     * @property options.vx
     * @property options.vy
     *
     * @property {?boolean} options.cache 是否使用缓存
     * @property {string} options.namespace 存储使用的命名空间
     * @property {?Function} options.onUpdate 自定义图形的更新函数
     * @property {?Function} options.onClick 图形点击回调
     */
    constructor (options) {
        let radius = options.radius || 10;

        super(
            object.extend(
                {
                    width: radius * 2 + 2,
                    height: radius * 2 + 2,

                    x: 10,
                    y: 10,
                    radius: radius,
                    startAngle: 0,
                    endAngle: Math.PI * 2,
                    anticlockwise: false
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
    createShape(ctx) {
        const me = this;
        const isCache = ctx === me.cacheCtx;

        ctx.beginPath();
        ctx.arc(
            isCache ? me.radius : me.x,
            isCache ? me.radius : me.y,
            me.radius,
            me.startAngle,
            me.endAngle,
            me.anticlockwise
        );
        ctx.closePath();

        if (me.strokeColor) {
            ctx.strokeStyle = me.strokeColor;
            ctx.stroke();
        }

        if (me.fillColor) {
            ctx.fillStyle = me.fillColor;
            ctx.fill();
        }
    }

    /**
     * 更新图形
     */
    update () {
        const me = this;

        // 外层自定义的更新可以覆盖默认方式
        if (typeof me.onUpdate !== 'function' || me.onUpdate() !== false) {
            if (me.vx) {
                me.x += me.vx;
            }

            if (me.cache && (me.x < 0 || me.x + me.width > me.wraperWidth)
                || !me.cache && (me.x - me.radius < 0 || me.x + me.radius > me.wraperWidth)
            ) {
                me.vx = -me.vx;
                me.x += me.vx;
            }

            if (me.vy) {
                me.y += me.vy;
            }

            if (me.cache && (me.y < 0 || me.y + me.height > me.wraperHeight)
                || !me.cache && (me.y - me.radius < 0 || me.y + me.radius > me.wraperHeight)
            ) {
                me.vy = -me.vy;
                me.y += me.vy;
            }


            me.x = number.limitRange(me.x, me.cache ? 0 : me.radius, me.wraperWidth - (me.cache ? 2 : 1) * me.radius);
            me.y = number.limitRange(me.y, me.cache ? 0 : me.radius, me.wraperHeight - (me.cache ? 2 : 1) * me.radius);
        }
    }
}