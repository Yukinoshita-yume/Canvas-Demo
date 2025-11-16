// getColorTool.jsx
import React from 'react';
import './getColorTool.css';

/**
 * 取色器组件
 * @param {object} props
 * @param {string} currentColor - 当前的颜色值 (e.g., '#000000')
 * @param {function} onColorChange - 颜色变化时的回调函数 (e.g., (newColor) => {...})
 */
const GetColorTool = ({ currentColor, onColorChange }) => {
  
  // 当 <input type="color"> 的值变化时调用
  const handleChange = (e) => {
    onColorChange(e.target.value);
  };

  return (
    <div className="color-tool-wrapper" title="选择颜色">
      {/* 我们使用原生的 HTML5 color input。
        它天生就能显示当前颜色，并在点击时弹出系统取色器。
        我们通过 value 属性控制其显示的颜色，
        并通过 onChange 事件监听用户的选择。
      */}
      <input
        type="color"
        id="color-picker"
        className="color-picker-native-input"
        value={currentColor}
        onChange={handleChange}
      />
    </div>
  );
};

export default GetColorTool;