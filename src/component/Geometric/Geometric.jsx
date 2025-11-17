// geometric.jsx

/**
 * 几何图形逻辑
 */
let startX = 0;
let startY = 0;
let currentShape = 'rectangle'; // 默认是矩形


const drawHeart = (ctx, x, y, w, h) => {
    // 调整心形高度和宽度以适应边界
    const scale = Math.min(w, h);
    const radius = scale / 4;
    const topCenter = { x: x + w / 2, y: y + h / 4 }; // 心形顶部中心点
    
    ctx.beginPath();
    // 底部尖角
    ctx.moveTo(topCenter.x, y + h); 
    
    // 左半边贝塞尔曲线
    ctx.bezierCurveTo(
        x - w * 0.1, y + h / 2,         // 控制点 1: 左侧
        x + w / 8, y - h / 4,           // 控制点 2: 左上圆弧
        topCenter.x, topCenter.y        // 终点: 顶部中心点
    );
    
    // 右半边贝塞尔曲线
    ctx.bezierCurveTo(
        x + w - w / 8, y - h / 4,       // 控制点 1: 右上圆弧
        x + w * 1.1, y + h / 2,         // 控制点 2: 右侧
        topCenter.x, y + h              // 终点: 底部尖角
    );
    ctx.closePath();
}

export const Geometric = {
  setShape: (shape) => {
    currentShape = shape;
    console.log(`Geometric tool set to: ${currentShape}`);
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
  draw: (ctx, currentX, currentY, color) => {
    const width = currentX - startX;
    const height = currentY - startY;
   
    // 绘制形状
    ctx.strokeStyle = color || '#0000ff'; 
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
    }else if (currentShape === 'square') {
      // 正方形: 取较小的维度作为边长 (Math.abs(width) 或 Math.abs(height))
      const side = Math.min(Math.abs(width), Math.abs(height));
      const finalWidth = width > 0 ? side : -side;
      const finalHeight = height > 0 ? side : -side;
      ctx.rect(startX, startY, finalWidth, finalHeight);

    } else if (currentShape === 'line') {
      // 直线
      ctx.moveTo(startX, startY);
      ctx.lineTo(currentX, currentY);

    } else if (currentShape === 'triangle') {
      // 三角形: 默认绘制一个等腰三角形
      const midX = startX + width / 2;
      ctx.moveTo(midX, startY);      // 顶部中点
      ctx.lineTo(currentX, currentY); // 右下角
      ctx.lineTo(startX, currentY);   // 左下角
      ctx.closePath();

    } else if (currentShape === 'trapezoid') {
      // 梯形: 假设顶部线段在中心，宽度为总宽度的 1/2
      const topWidth = width / 2;
      const midX = startX + width / 2;
      
      ctx.moveTo(midX - topWidth / 2, startY); // 左上角
      ctx.lineTo(midX + topWidth / 2, startY); // 右上角
      ctx.lineTo(currentX, currentY);          // 右下角 (全宽)
      ctx.lineTo(startX, currentY);            // 左下角 (全宽)
      ctx.closePath();

    } else if (currentShape === 'parallelogram') {
      // 平行四边形: 顶部和底边有 X 轴偏移
      const skewX = width / 4; // 偏移量
      ctx.moveTo(startX + skewX, startY);      // 左上角 (偏移)
      ctx.lineTo(currentX, startY);            // 右上角
      ctx.lineTo(currentX - skewX, currentY);  // 右下角 (偏移)
      ctx.lineTo(startX, currentY);            // 左下角
      ctx.closePath();

    } else if (currentShape === 'heart') {
      // 爱心形
      const absWidth = Math.abs(width);
      const absHeight = Math.abs(height);
      const heartX = width > 0 ? startX : currentX;
      const heartY = height > 0 ? startY : currentY;
      drawHeart(ctx, heartX, heartY, absWidth, absHeight);
      
    } else if (currentShape === 'arrow') {
      // 箭头: 绘制一个简单箭头 (一个三角形+一个矩形)
      const headSize = Math.min(Math.abs(width), Math.abs(height)) / 5; // 箭头头部的尺寸
      const angle = Math.atan2(height, width); // 箭头的角度
      
      // 移动到起始点
      ctx.moveTo(startX, startY);
      
      // 绘制直线部分 (简化处理，只画一条线)
      ctx.lineTo(currentX, currentY);
      
      // 绘制箭头头部 (三角形)
      const arrowPointX = currentX;
      const arrowPointY = currentY;

      // 计算头部两个点的坐标 (垂直于主线)
      const headAngle1 = angle + Math.PI * 0.75;
      const headAngle2 = angle - Math.PI * 0.75;

      ctx.lineTo(arrowPointX + headSize * Math.cos(headAngle1), arrowPointY + headSize * Math.sin(headAngle1));
      ctx.moveTo(arrowPointX, arrowPointY); // 回到箭头尖端
      ctx.lineTo(arrowPointX + headSize * Math.cos(headAngle2), arrowPointY + headSize * Math.sin(headAngle2));
      
      // *注意*: 箭头只是一个复杂的示例，你可以根据需要调整绘制方式。
      // 上述代码只绘制了描边的线条和头部 V 形。
    }

    ctx.stroke(); // 描边预览
  },
};