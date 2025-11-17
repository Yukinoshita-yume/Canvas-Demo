// Save.jsx

/**
 * Save 工具函数
 * 负责将给定的 HTML Canvas 元素内容保存为图片文件。
 */
export const Save = {
  /**
   * 将画布内容保存为 PNG 文件。
   * @param {HTMLCanvasElement} canvas - 要保存内容的 <canvas> 元素。
   * @param {string} [fileName='drawing.png'] - 保存的文件名。
   */
  saveAsPNG: (canvas, fileName = 'drawing.png') => {
    if (!canvas) {
      console.error('Save.saveAsPNG: Canvas element is null.');
      return;
    }

    try {
      // 1. 将画布内容转换为 Data URL (默认为 PNG)
      // canvas.toDataURL() 返回一个包含图像 "data:URL" 表示的字符串。
      const dataURL = canvas.toDataURL('image/png');

      // 2. 创建一个临时的 <a> 元素
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = fileName; // 设置下载的文件名

      // 3. 模拟点击下载
      // document.body.appendChild(link);
      link.click();

      // 4. 清理临时元素 (尽管在某些浏览器中可能不是必需的，但最好清理)
      // document.body.removeChild(link);
      
      console.log(`Canvas content saved as ${fileName}.`);
    } catch (error) {
      console.error('Error saving canvas content:', error);
    }
  },
};

