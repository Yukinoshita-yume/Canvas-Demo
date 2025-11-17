// watercolor.jsx

/**
 * 水彩笔刷逻辑 (简化版)
 * 特点：半透明度、柔和的边缘
 */
export const Watercolor = {
  
  // 设置样式并移动到起始点
  start: (ctx, x, y, color, width) => {
    // 降低透明度以模拟水彩的半透明效果
    ctx.globalAlpha = 0.5; 
    ctx.strokeStyle = color || '#000000';
    // 相对较粗的笔触，模拟水彩的晕染感
    ctx.lineWidth = (width || 5) * 2; 
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round'; // 使连接处更平滑
    ctx.beginPath();
    ctx.moveTo(x, y);
  },

  // 实际绘制过程
  draw: (ctx, x, y) => {
    // 使用 `quadraticCurveTo` 或 `lineTo` 绘制
    ctx.lineTo(x, y);
    ctx.stroke();
  },
  
  // 结束绘制后，恢复全局透明度
  stop: (ctx) => {
    ctx.globalAlpha = 1.0; // 恢复默认透明度
  }
};