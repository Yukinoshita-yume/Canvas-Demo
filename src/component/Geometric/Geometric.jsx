// geometric.jsx

/**
 * 几何图形逻辑
 */
let startX = 0;
let startY = 0;
let currentShape = 'rectangle'; // 默认是矩形

export const Geometric = {
  setShape: (shape) => {
    currentShape = shape;
    console.log(`Geometric tool set to: ${currentShape}`);
  },

  //切换几何图形
  chooseShape: () => {
    if (currentShape === 'rectangle') {
      currentShape = 'circle';
    } else if (currentShape === 'circle') {
      currentShape = 'rectangle';
    }
    console.log(`Geometric shape switched to: ${currentShape}`);
    return currentShape;
  },

  getCurrentShape: () => {
      return currentShape;
  },
  
  // 鼠标按下时调用：记录起始点
  start: (ctx, x, y) => {
    startX = x;
    startY = y;
    // 重置画布路径，准备开始新的形状绘制
    ctx.beginPath();
  },
  
  // 鼠标移动时调用：在指定 context 上绘制形状
  // (不再清除画布)
  draw: (ctx, currentX, currentY) => {
    const width = currentX - startX;
    const height = currentY - startY;
   
    // 绘制形状
    ctx.strokeStyle = '#0000ff'; 
    ctx.lineWidth = 2;  
    ctx.beginPath(); //重新开始路径
    // ---------------------------------------------
    // 移除了 ctx.clearRect()
    // ---------------------------------------------

    if (currentShape === 'rectangle') {
      ctx.rect(startX, startY, width, height);
      
    } else if (currentShape === 'circle') {
      // 半径
      const radius = Math.min(Math.abs(width), Math.abs(height)) / 2;
      // 计算圆心 (起始点 + 偏移)
      const centerX = startX + (width > 0 ? radius : -radius);
      const centerY = startY + (height > 0 ? radius : -radius);

      
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); 
    }

    ctx.stroke(); // 描边预览
  },
};