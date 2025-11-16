// Pencil.jsx

/**
 * 铅笔逻辑
 */
export const Pencil = {
  
  //设置样式并移动到起始点
  start: (ctx, x, y, color) => {
    ctx.strokeStyle = color || '#000000'; // 使用传入的颜色，默认黑色
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
  },

  // 实际绘制过程
  draw: (ctx, x, y) => {
    ctx.lineTo(x, y);
    ctx.stroke();
  },
};