// eraser.jsx

/**
 * 橡皮擦逻辑
 * 使用 globalCompositeOperation = 'destination-out' 实现清除效果.
 * 橡皮擦实体 (在主画布上) 是不可见的.
 * 橡皮擦预览 (在临时画布上) 是一个可见的深灰色圆形.
 */
let brushSize = 20; // 橡皮擦半径
let isErasing = false;

export const Eraser = {
  // 鼠标按下时调用：开始橡皮擦操作 (在主画布上进行擦除)
  start: (ctx, x, y, size = 20) => {
    brushSize = size;
    isErasing = true;
    
    // 设置橡皮擦模式：使用 'destination-out' 实现清除效果.
    ctx.globalCompositeOperation = 'destination-out';
    
    // 确保所有可见的样式设置都被禁用，保证橡皮擦实体是不可见的.
    ctx.shadowBlur = 0; 
    ctx.shadowColor = 'transparent'; 
    
    // 设置清除笔触样式
    ctx.lineWidth = brushSize * 2; 
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    // 立即清除第一个点
    Eraser.draw(ctx, x, y);
  },
  
  // 鼠标移动时调用：在指定 context 上清除 (在主画布上进行擦除)
  draw: (ctx, currentX, currentY) => {
    if (!isErasing) return;
    
    // 1. 绘制线段：在 'destination-out' 模式下，这会擦除内容.
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    
    // 2. 绘制圆点：确保快速移动时也能连续擦除.
    ctx.beginPath();
    ctx.arc(currentX, currentY, brushSize, 0, Math.PI * 2, false);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(currentX, currentY);
  },
  
  // 鼠标抬起时调用：结束橡皮擦操作
  stop: (ctx) => {
    isErasing = false;
    
    // 恢复默认绘制模式.
    ctx.globalCompositeOperation = 'source-over'; 
    ctx.shadowBlur = 0; 
    ctx.shadowColor = 'transparent'; 
    
    ctx.beginPath(); // 结束当前路径
  },

  // === 用于在临时画布上绘制预览 (鼠标未按下时) ===
  preview: (tempCtx, currentX, currentY, canvasSize) => {
  // 1. 清除临时画布上的所有旧内容.
  tempCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);

  // 2. 设置预览样式：深灰色，有轻微边缘模糊，确保是正常绘制.
  tempCtx.globalCompositeOperation = 'source-over'; 
  tempCtx.fillStyle = '#666666'; // 深灰色
  // 设置一个与尺寸相关的模糊，模拟软边
  tempCtx.shadowBlur = brushSize * 0.3; 
  tempCtx.shadowColor = '#000000'; 
  
  // 3. 绘制圆形
  tempCtx.beginPath();
  tempCtx.arc(currentX, currentY, brushSize, 0, Math.PI * 2);
  tempCtx.fill();

  // 4. 立即清除阴影，以防污染其他工具的预览.
  tempCtx.shadowBlur = 0;
  tempCtx.shadowColor = 'transparent';
},
  // 用于在 Board.jsx 中设置橡皮擦大小 (可选)
  setSize: (size) => {
      brushSize = size;
  },
};