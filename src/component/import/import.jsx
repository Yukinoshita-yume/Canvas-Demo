// Import.jsx

/**
 * Import 工具函数
 * 负责处理图片文件导入，并提供将图片加载到 Canvas 的功能。
 */
export const Import = {
  /**
   * 触发文件选择对话框，只接受图片文件。
   * @returns {Promise<File | null>} 返回用户选择的 File 对象，如果取消则返回 null。
   */
  selectFile: () => {
    return new Promise((resolve) => {
      // 创建一个临时的文件输入元素
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*'; // 仅接受图片文件
      
      // 监听文件选择变化
      input.onchange = (event) => {
        const file = event.target.files ? event.target.files[0] : null;
        resolve(file);
      };
      
      // 监听取消选择的情况（例如按 Esc 键）
      window.addEventListener('focus', () => {
        // 延迟检查，以确保文件选择对话框已经关闭
        setTimeout(() => {
          if (!input.files || input.files.length === 0) {
            resolve(null);
          }
        }, 500); 
      }, { once: true });


      // 触发点击以打开文件选择框
      input.click();
    });
  },

  /**
   * 将 File 对象加载为 Image 并绘制到 Canvas 上。
   * @param {File} file - 用户选择的图片文件。
   * @param {CanvasRenderingContext2D} ctx - 要绘制到的主画布 Context。
   * @param {number} canvasWidth - 主画布的逻辑宽度。
   * @param {number} canvasHeight - 主画布的逻辑高度。
   * @returns {Promise<boolean>} 成功绘制返回 true，否则返回 false。
   */
  loadImageAndDraw: (file, ctx, canvasWidth, canvasHeight) => {
    return new Promise((resolve) => {
      if (!file || !ctx) {
        console.error('Import.loadImageAndDraw: File or Context is missing.');
        return resolve(false);
      }
      
      // 1. 使用 FileReader 读取文件内容
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const img = new Image();
        
        // 2. 加载图片
        img.onload = () => {
          // 3. 计算绘制尺寸以适应画布 (例如：保持图片比例缩放以适应画布)
          
          let w = img.width;
          let h = img.height;
          
          // 简单的缩放策略：如果图片尺寸超过画布，则按比例缩小以适应画布
          const scale = Math.min(canvasWidth / w, canvasHeight / h, 1);
          
          w *= scale;
          h *= scale;
          
          // 计算居中位置
          const x = (canvasWidth - w) / 2;
          const y = (canvasHeight - h) / 2;

          // 4. 绘制到 Canvas 上
          ctx.save();
          // 在绘制前重置画布变换，确保图片不会被 DPI 缩放两次
          // 但由于 board.jsx 已经对 ctx.scale(dpi, dpi) 做了处理，我们直接使用逻辑尺寸绘制即可
          
          ctx.drawImage(img, x, y, w, h);
          ctx.restore();
          
          resolve(true);
        };

        img.onerror = () => {
          console.error('Error loading image.');
          resolve(false);
        };
        
        img.src = readerEvent.target.result; // 设置图片的 Data URL
      };
      
      reader.onerror = () => {
        console.error('Error reading file.');
        resolve(false);
      };
      
      reader.readAsDataURL(file); // 开始读取文件
    });
  },
};