// tempboard.jsx
import React from 'react';
import './tempboard.css';

/**
 * 临时画布组件，用于绘制实时预览
 * @param {object} props
 * @param {React.MutableRefObject<HTMLCanvasElement>} ref - 外部传入的 ref
 * @param {number} width - 宽度
 * @param {number} height - 高度
 * @param {function} onMouseDown - 鼠标按下事件处理
 * @param {function} onMouseUp - 鼠标抬起事件处理
 * @param {function} onMouseMove - 鼠标移动事件处理
 * @param {function} onMouseLeave - 鼠标移出事件处理
 */
const TempBoard = React.forwardRef(({ width, height, onMouseDown, onMouseUp, onMouseMove, onMouseLeave }, ref) => {
  
  // 内部的 useEffect 已被移除。
  // 父组件 (Board.jsx) 现在负责设置画布的 width, height 和 context scaling。

  return (
    <canvas
      ref={ref}
      className="temp-drawing-board"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      style={{ width: `${width}px`, height: `${height}px` }} // 确保样式尺寸设置
    />
  );
});

export default TempBoard;