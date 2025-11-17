// spray.jsx

/**
 * 喷枪笔刷逻辑 (简化版)
 * 特点：在指定区域内随机生成点
 */
export const Spray = {
  
  density: 20, // 喷射点的数量
  radius: 15,  // 喷射范围的半径
  
  // 设置样式 (仅设置颜色和基础属性)
  start: (ctx, x, y, color, width) => {
    ctx.fillStyle = color || '#000000';
    // 喷枪的 “粗细” 影响每个点的大小
    Spray.pointRadius = (width || 2) / 2; 
  },

  // 实际绘制过程
  draw: (ctx, x, y) => {
    const pointRadius = Spray.pointRadius;
    const sprayRadius = Spray.radius;
    
    // 随机生成多个点
    for (let i = 0; i < Spray.density; i++) {
      // 随机角度
      const angle = Math.random() * 2 * Math.PI; 
      // 随机距离 (确保越靠近中心点越密集)
      const distance = Math.random() * sprayRadius; 
      
      // 计算随机点的坐标
      const offsetX = distance * Math.cos(angle);
      const offsetY = distance * Math.sin(angle);
      
      const px = x + offsetX;
      const py = y + offsetY;
      
      // 绘制小圆点
      ctx.beginPath();
      ctx.arc(px, py, pointRadius, 0, 2 * Math.PI);
      ctx.fill();
    }
  },
};