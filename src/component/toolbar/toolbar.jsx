// Toolbar.jsx
import React, { useState } from 'react';
import './toolbar.css';
// 引入新的 DropdownButton 组件
import DropdownButton from './DropdownButton.jsx'; 
import { Geometric } from '../Geometric/Geometric.jsx';
import { Undo } from '../Undo/Undo.jsx';
import GetColorTool from '../getColorTool/getColorTool.jsx';

// 假设的笔刷类型和粗细值
const brushTypes = ['default', 'chalk', 'spray'];
const strokeWidths = [1, 5, 10]; 

const shapeMap = {
    'rectangle': '矩形',
    'circle': '圆形',
};

// 假设外部组件支持 onBrushChange, onStrokeWidthChange
const Toolbar = ({ onToolChange, onClear, currentTool, onUndo, currentColor, onColorChange, 
    onBrushChange, currentBrush, onStrokeWidthChange, currentStrokeWidth }) => {
  
  const [currentShapeName, setCurrentShapeName] = useState(shapeMap[Geometric.getCurrentShape()]);
  // 判断工具是否激活
  const isActive = (toolName) => currentTool === toolName;

  // 几何图形切换逻辑
  const handleShapeChange = (newShapeKey) => {
    // 假设 Geometric 有一个设置形状的方法
    Geometric.setShape(newShapeKey); 
    setCurrentShapeName(shapeMap[newShapeKey]);
    onToolChange('geometric');
  };

  // 笔刷类型切换逻辑
  const handleBrushTypeChange = (brushType) => {
    // 切换到铅笔工具
    onToolChange('pencil'); 
    // 调用外部传入的笔刷切换方法
    if (onBrushChange) onBrushChange(brushType); 
  };
  
  // 笔刷粗细切换逻辑
  const handleStrokeWidthChange = (width) => {
    // 切换到铅笔工具
    onToolChange('pencil'); 
    // 调用外部传入的粗细切换方法
    if (onStrokeWidthChange) onStrokeWidthChange(width); 
  };

  // 几何图形按钮点击事件：如果当前不是几何图形，则切换到它；如果是，则不执行任何操作（因为切换形状通过下拉菜单完成）
  const handleGeometricClick = () => {
    if (currentTool !== 'geometric') {
      onToolChange('geometric');
    }
  };


  return (
    <div className="toolbar">
      {/* 铅笔/笔刷工具 - 使用 DropdownButton */}
      <DropdownButton
        buttonText="铅笔"
        isActive={isActive('pencil')}
        onClick={() => onToolChange('pencil')}
        currentItemText={currentBrush} // 显示当前笔刷类型
      >
        <div className="menu-section-title">笔刷类型</div>
        {brushTypes.map(brush => (
          <div 
            key={brush}
            className={`dropdown-item ${currentBrush === brush ? 'active-item' : ''}`}
            onClick={() => handleBrushTypeChange(brush)}
          >
            {brush}
          </div>
        ))}
        <div className="menu-section-title">粗细</div>
        {strokeWidths.map(width => (
          <div 
            key={width}
            className={`dropdown-item ${currentStrokeWidth === width ? 'active-item' : ''}`}
            onClick={() => handleStrokeWidthChange(width)}
          >
            {width} px
          </div>
        ))}
      </DropdownButton>

      {/* 几何图形工具 - 使用 DropdownButton */}
      <DropdownButton
        buttonText="几何图形"
        isActive={isActive('geometric')}
        onClick={handleGeometricClick} // 点击切换工具，但形状通过菜单切换
        currentItemText={currentShapeName}
      >
        {Object.entries(shapeMap).map(([key, value]) => (
          <div 
            key={key}
            className={`dropdown-item ${Geometric.getCurrentShape() === key ? 'active-item' : ''}`}
            // 点击下拉菜单项时，切换形状并激活几何图形工具
            onClick={() => handleShapeChange(key)}
          >
            {value}
          </div>
        ))}
      </DropdownButton>

      {/* 取色器（保持不变） */}
      <GetColorTool 
        currentColor={currentColor}
        onColorChange={onColorChange}
      />
      
      {/* 新增空壳按钮：橡皮擦 */}
      <button 
        className={`tool-button ${isActive('eraser')}`} 
        onClick={() => onToolChange('eraser')}
      >
        橡皮擦
      </button>

      {/* 撤销（保持不变） */}
      <button 
        className="tool-button" 
        onClick={onUndo} 
      >
        撤销
      </button>
      
      {/* 新增空壳按钮：填充 */}
      <button 
        className={`tool-button ${isActive('fill')}`} 
        onClick={() => onToolChange('fill')}
      >
        填充
      </button>
      
      {/* 新增空壳按钮：保存 */}
      <button 
        className="tool-button" 
        onClick={() => console.log('保存功能待实现')}
      >
        保存
      </button>
      
      {/* 新增空壳按钮：导入 */}
      <button 
        className="tool-button" 
        onClick={() => console.log('导入功能待实现')}
      >
        导入
      </button>

      {/* 一键清除（保持不变） */}
      <button 
        className="tool-button clear-button" 
        onClick={onClear}
      >
        一键清除
      </button>
    </div>
  );
};

// 确保将 DropdownButton 导出，以便在 Toolbar 中使用
export default Toolbar;