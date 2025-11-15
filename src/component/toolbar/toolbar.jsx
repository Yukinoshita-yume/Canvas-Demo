// Toolbar.jsx
import React from 'react';
import './toolbar.css';

const Toolbar = ({ onToolChange, onClear, currentTool }) => {
  
  // 判断工具是否激活
  const isActive = (toolName) => currentTool === toolName ? 'active' : '';

  return (
    <div className="toolbar">
      {/* 铅笔 */}
      <button 
        className={`tool-button ${isActive('pencil')}`} 
        onClick={() => onToolChange('pencil')}
      >
        铅笔
      </button>

      {/* 几何图形 */}
      <button 
        className={`tool-button ${isActive('shape')}`} 
        onClick={() => onToolChange('shape')}
      >
        几何图形
      </button>

      {/* 撤销  */}
      <button 
        className="tool-button" 
        onClick={() => console.log('Undo feature placeholder')}
        disabled
      >
        撤销
      </button>
      
      {/* 一键清除 */}
      <button 
        className="tool-button clear-button" 
        onClick={onClear}
      >
        一键清除
      </button>
    </div>
  );
};

export default Toolbar;