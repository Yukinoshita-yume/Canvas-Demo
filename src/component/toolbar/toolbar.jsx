// Toolbar.jsx
import React, { useState } from 'react';
import './toolbar.css';
// 引入新的 DropdownButton 组件
import DropdownButton from './DropdownButton.jsx'; 
import { Geometric } from '../Geometric/Geometric.jsx';
import { Undo } from '../Undo/Undo.jsx';
import GetColorTool from '../getColorTool/getColorTool.jsx';

// 假设的笔刷类型和粗细值
const brushTypes = ['pencil', 'gradient'];
const strokeWidths = [1, 5, 10]; 

const shapeMap = {
    'rectangle': 'rectangle',
    'circle': 'circle',
    'square': 'square',
    'line': 'line',
    'triangle': 'triangle',
    'trapezoid': 'trapezoid',
    'parallelogram': 'parallelogram',
    'heart': 'heart',
    'arrow': 'arrow'
};

// 假设外部组件支持 onBrushChange, onStrokeWidthChange
const Toolbar = ({ onToolChange, onClear, currentTool, onUndo, currentColor, onColorChange, 
    onBrushChange, currentBrush, onStrokeWidthChange, currentStrokeWidth,
  onSave, onImport }) => {
  
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
    if (brushType === 'gradient') { // 【新增】如果是渐变笔刷
        onToolChange('gradient'); // 切换工具为 'gradient'
    } else {
        // 否则切换到铅笔工具
        onToolChange('pencil'); 
    }
    // 调用外部传入的笔刷切换方法
    if (onBrushChange) onBrushChange(brushType); 
  };
  
  // 笔刷粗细切换逻辑
  const handleStrokeWidthChange = (width) => {
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
        buttonText={currentTool === 'gradient' ? 'gradient' : 'pencil'} 
        isActive={isActive('pencil') || isActive('gradient')}
        onClick={() => {
             // 【修改点 2: 仅在非笔刷工具时，才切换到铅笔】
             if (!isActive('pencil') && !isActive('gradient')) {
                 onToolChange('pencil');
             }
        }}
        currentItemText={currentTool === 'gradient' ? 'gradient' : currentBrush} 
      >
        <div className="menu-section-title">Brush type</div>
        {brushTypes.map(brush => (
          <div 
            key={brush}
            // 笔刷类型激活状态判断不变
            className={`dropdown-item ${(currentTool === 'gradient' && brush === 'gradient') || (currentTool === 'pencil' && currentBrush === brush) ? 'active-item' : ''}`}
            onClick={() => handleBrushTypeChange(brush)}
          >
            {brush === 'gradient' ? 'gradient' : brush}
          </div>
        ))}
        <div className="menu-section-title">Stroke width</div>
        
        {strokeWidths.map(width => (
          <div 
            key={width}
            // 【修改点 3: 统一粗细激活状态显示】
            // 只要当前工具是笔刷（pencil 或 gradient），就根据 currentStrokeWidth 来判断是否激活。
            className={`dropdown-item ${(isActive('pencil') || isActive('gradient')) && currentStrokeWidth === width ? 'active-item' : ''}`}
            onClick={() => handleStrokeWidthChange(width)}
          >
            {width} px
          </div>
        ))}
      </DropdownButton>

      {/* 几何图形工具 - 使用 DropdownButton */}
      <DropdownButton
        buttonText="Geometric"
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
        Eraser
      </button>

      {/* 撤销（保持不变） */}
      <button 
        className="tool-button" 
        onClick={onUndo} 
      >
        Undo
      </button>
      
      <button 
        className="tool-button" 
        onClick={onSave} // <--- 调用传入的 onSave 函数
      >
        Save
      </button>
      
      <button 
        className="tool-button" 
        onClick={onImport} // <--- 调用传入的 onImport 函数
      >
        Import
      </button>

      {/* 一键清除（保持不变） */}
      <button 
        className="tool-button clear-button" 
        onClick={onClear}
      >
        Clear All
      </button>
    </div>
  );
};

// 确保将 DropdownButton 导出，以便在 Toolbar 中使用
export default Toolbar;