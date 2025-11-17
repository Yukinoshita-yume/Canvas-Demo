// gradient.jsx

/**
 * 渐变笔刷逻辑 (无限渐变/彩虹效果)
 * - 逻辑修改：不再是径向渐变，而是沿路径连续改变 HSL 颜色，实现彩虹效果。
 * - 解决了无法选择笔刷粗细的问题。
 */
export const Gradient = {
  
  // 【新增】存储 HSL 色相 (Hue) 的初始值
  hue: 0,
  
  // 设置样式并移动到起始点
  start: (ctx, x, y, color, width) => {
    // 【修改点 1】使用传入的 width 设置粗细
    ctx.lineWidth = width || 5; 
    ctx.lineCap = 'round';
    
    // 【新增】设置初始色相 (如果之前没有初始化)
    Gradient.hue = 0; 

    ctx.beginPath();
    ctx.moveTo(x, y);
  },

  // 实际绘制过程
  draw: (ctx, x, y) => {
    // ----------------------------------------------------
    // 【修改点 2】创建基于 HSL 的连续渐变色
    // HSL: hue(色相), saturation(饱和度), lightness(亮度)
    // 保持饱和度和亮度不变，只改变色相(hue)
    // ----------------------------------------------------
    
    // 1. 设置当前的描边颜色
    // 色相值从 0 到 360 循环，实现彩虹效果
    ctx.strokeStyle = `hsl(${Gradient.hue}, 100%, 50%)`; 

    // 2. 绘制线段
    ctx.lineTo(x, y);
    ctx.stroke();

    // 3. 每次绘制后，更新色相值
    Gradient.hue = (Gradient.hue + 5) % 360; // 每次增加 5 度色相
    
    // 4. 重置路径起点，确保每个小线段使用不同的颜色
    ctx.beginPath();
    ctx.moveTo(x, y);
  },
};