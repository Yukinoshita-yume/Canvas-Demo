// Toolbar.jsx
import React, { useState } from 'react';
import './toolbar.css';
import { Geometric } from '../Geometric/Geometric.jsx';
import { Undo } from '../Undo/Undo.jsx';
import GetColorTool from '../getColorTool/getColorTool.jsx';

const shapeMap = {
    'rectangle': '矩形',
    'circle': '圆形',
};

const Toolbar = ({ onToolChange, onClear, currentTool,onUndo,currentColor, 
    onColorChange}) => {
  
// 使用 Geometric.getCurrentShape() 来获取初始值
  const [currentShapeName, setCurrentShapeName] = useState(shapeMap[Geometric.getCurrentShape()]);
  // 判断工具是否激活
  const isActive = (toolName) => currentTool === toolName ? 'active' : '';

  const handleGeometricClick = () => {
      if (currentTool === 'geometric') {
          // 如果当前已选中几何图形工具，则切换内部形状
          Geometric.chooseShape();
          const newShape = Geometric.getCurrentShape();
          setCurrentShapeName(shapeMap[newShape]);
          
          onToolChange('geometric'); 
      } else {
          // 如果未选中几何图形工具，则切换到它
          onToolChange('geometric');
      }
      };
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
        className={`tool-button ${isActive('geometric')}`} 
        onClick={handleGeometricClick} 
      >
        {`几何图形 (${currentShapeName})`}
      </button>

      {/* 取色器 */}
      <GetColorTool 
        currentColor={currentColor}
        onColorChange={onColorChange}
      />


      {/* 撤销  */}
      <button 
        className="tool-button" 
        onClick={onUndo} 
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