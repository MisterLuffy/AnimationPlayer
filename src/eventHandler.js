/**
 * @file 鼠标事件支持
 */
import array from './util/array';

export default function (animation) {
    const handlerMap = {
        click: function (event) {
            const shape = animation.getShapeByCoordinate(event.offsetX, event.offsetY);
            shape && typeof shape.onClick === 'function' && shape.onClick();
        }
    };

    array.each(
        animation.mouseEvents,
        function (event) {
            let handler = handlerMap[event.split('.')[0]];
            handler && animation.canvas && animation.canvas.addEventListener(event, handler);
        }
    );
}