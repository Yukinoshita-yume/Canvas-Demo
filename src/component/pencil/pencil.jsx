// Pencil.jsx

/**
 * 铅笔逻辑
 */
export const Pencil = {
  
  //设置样式并移动到起始点
 start: (ctx, x, y, color, width) => {
    ctx.strokeStyle = color || '#000000'; // 使用传入的颜色，默认黑色
    // 【修改点】：使用传入的 width 参数，默认值为 2
    ctx.lineWidth = width || 2; 
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
  },

  // 实际绘制过程
  draw: (ctx, x, y) => {
    ctx.lineTo(x, y);
    ctx.stroke();
  },
};