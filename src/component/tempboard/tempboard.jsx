// tempboard.jsx
import React, { useRef, useEffect } from 'react';
import './tempboard.css';

/**
 * 临时画布组件，用于绘制实时预览，特别是几何图形
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
  const canvasRef = useRef(null);
  
  // 使用 useImperativeHandle 可以暴露内部方法给父组件，
  // 但对于简单的 canvas 引用，使用 React.forwardRef 配合 useRerf 更直接。
  
  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      // 获取父组件 Board.jsx 设定的尺寸
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // 设置屏幕适配
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      
      const context = canvas.getContext('2d');
      context.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }, [width, height, ref]);

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