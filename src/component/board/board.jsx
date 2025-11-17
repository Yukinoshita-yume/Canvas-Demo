// Board.jsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Toolbar from '../toolbar/toolbar';
import { Pencil } from '../pencil/pencil.jsx';
import { Geometric } from '../Geometric/Geometric.jsx';
import { Undo } from '../Undo/Undo.jsx';
import TempBoard from '../tempboard/tempboard.jsx';
import { Eraser } from '../eraser/eraser.jsx';
import { Save } from '../save/save.jsx';
import { Import } from '../import/import.jsx';
import { Gradient } from '../gradient/gradient.jsx'; // 假设路径为 '../gradient/gradient.jsx'

import './board.css';

const Board = () => {
  const canvasRef = useRef(null);
  // ---------------------------------------------
  // 2. 为临时画布创建 Ref
  // ---------------------------------------------
  const tempCanvasRef = useRef(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('pencil'); 
  const [ctx, setCtx] = useState(null);
  // ---------------------------------------------
  // 3. 为临时画布创建 Context 和尺寸状态
  // ---------------------------------------------
  const [tempCtx, setTempCtx] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: 100, height: 100 });
  const [canUndo, setCanUndo] = useState(false);

  const [currentColor, setCurrentColor] = useState('#000000'); 
  const [currentStrokeWidth, setCurrentStrokeWidth] = useState(2);

 
  // 初始化 Canvas Context
  useEffect(() => {
    const canvas = canvasRef.current;
    const tempCanvas = tempCanvasRef.current;

    if (canvas && tempCanvas) {
      // 统一设置主画布和临时画布

      const rect = canvas.getBoundingClientRect();
      const dpi = window.devicePixelRatio;

      // 存储逻辑尺寸
      setCanvasSize({ width: rect.width, height: rect.height });

      // 设置主画布
      canvas.width = rect.width * dpi;
      canvas.height = rect.height * dpi;
      const context = canvas.getContext('2d');
      context.scale(dpi, dpi);
      setCtx(context);

      // 设置临时画布 (使其与主画布完全一致)
      tempCanvas.width = rect.width * dpi;
      tempCanvas.height = rect.height * dpi;
      const tempContext = tempCanvas.getContext('2d');
      tempContext.scale(dpi, dpi);
      setTempCtx(tempContext);

      // 保存初始撤销状态
      setTimeout(() => {
          Undo.saveState(canvas);
          setCanUndo(Undo.canUndo());
      }, 0);
    } 
  }, []); // 依赖项为空，仅运行一次

  
  // 绘图处理函数
  const drawHandler = useCallback((event) => {

    if (!ctx || !tempCtx || !isDrawing) {
        // 【建议】如果未按下鼠标 (isDrawing 为 false)，
        // 并且工具是橡皮擦，也应该允许执行预览
        if (!isDrawing && currentTool === 'eraser' && tempCtx) {
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            Eraser.preview(tempCtx, x, y, canvasSize); // 仅执行预览
        }
        return; // 如果 isDrawing 为 false (且不是橡皮擦预览)，则返回
    }
    

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (currentTool === 'pencil') {
      Pencil.draw(ctx, x, y); // 在主画布上绘制

    }else if (currentTool === 'gradient') {
      Gradient.draw(ctx, x, y); // 在主画布上绘制 
    } else if (currentTool === 'geometric') {
      
      // 清除临时画布 (使用存储的逻辑尺寸)
      tempCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);

      //在临时画布上绘制形状
      Geometric.draw(tempCtx, x, y, currentColor); 
    }else if (currentTool === 'eraser') { 
      if (isDrawing) {
        // 鼠标按下时：
        // 1. 在主画布上擦除 (保持不变)
        Eraser.draw(ctx, x, y);
        
        // 2. 【修改点】同时在临时画布上绘制预览
        Eraser.preview(tempCtx, x, y, canvasSize); 
        
      } else {
        // 鼠标悬停时：
        // (此分支现在由函数顶部的检查处理)
        // Eraser.preview(tempCtx, x, y, canvasSize); 
      }
    }
   
  }, [ctx, tempCtx, isDrawing, currentTool, canvasSize,currentColor]); // 添加依赖项


  const startDrawing = (event) => {
    if (!ctx || !tempCtx) return;
    setIsDrawing(true);

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // ---------------------------------------------
    // 7. 根据工具选择 Ctx
    // ---------------------------------------------
    if (currentTool === 'pencil') {
      Pencil.start(ctx, x, y, currentColor, currentStrokeWidth); // 在主画布上开始
      Pencil.draw(ctx, x, y);  // 铅笔立即绘制第一个点
    } else if (currentTool === 'gradient') { // 【新增】渐变笔刷开始
      // 渐变笔刷使用当前的粗细和颜色设置 (尽管它会覆盖颜色)
      Gradient.start(ctx, x, y, currentColor, currentStrokeWidth); 
      Gradient.draw(ctx, x, y); // 立即绘制第一个点
      
    }else if (currentTool === 'geometric') {
      Geometric.start(tempCtx, x, y, currentColor); // 在临时画布上开始
    }else if (currentTool === 'eraser') { // <--- 新增
      Eraser.start(ctx, x, y); // 在主画布上开始擦除
    }
  };

  const stopDrawing = (event) => {
    if (!ctx || !tempCtx || !isDrawing) return;
    setIsDrawing(false);

    // ---------------------------------------------
    // 8. 几何图形的最终绘制
    // ---------------------------------------------
    if (currentTool === 'geometric') {
      // 8a. 清除临时画布上的预览
      tempCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);

      // 8b. 获取最终坐标
      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // 8c. 在主画布 (ctx) 上绘制最终形状
      Geometric.draw(ctx, x, y, currentColor);
    }else if (currentTool === 'eraser') { // <--- 新增
      Eraser.stop(ctx); // 结束橡皮擦操作，恢复 ctx
    }

    tempCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);

    // ---------------------------------------------
    // 9. 统一保存撤销状态 (对铅笔和几何图形都有效)
    // ---------------------------------------------
    setTimeout(() => {
        Undo.saveState(canvasRef.current);
        setCanUndo(Undo.canUndo()); 
    }, 0);

    ctx.beginPath(); 
  };

  // --- 工具栏功能 ---

  const handleStrokeWidthChange = (newWidth) => {
    // 确保宽度是数字
    const width = typeof newWidth === 'string' ? parseFloat(newWidth) : newWidth;
    if (!isNaN(width)) {
        setCurrentStrokeWidth(width);
    }
  };


  const handleImport = async () => { // <--- 新增
    if (!ctx) return;

    // 1. 选择文件
    const file = await Import.selectFile();
    
    if (file) {
      // 2. 加载图片并绘制
      const success = await Import.loadImageAndDraw(
        file, 
        ctx, 
        canvasSize.width, 
        canvasSize.height
      );

      if (success) {
        // 3. 绘制成功后保存撤销状态
        setTimeout(() => {
            Undo.saveState(canvasRef.current);
            setCanUndo(Undo.canUndo());
        }, 0);
      }
    }
  };

  const handleSave = () => { // <--- 新增
    if (canvasRef.current) {
      // 调用 Save 工具函数，传入主画布元素
      Save.saveAsPNG(canvasRef.current, 'my_drawing.png');
    }
  };


  // 新增颜色处理函数
  const handleColorChange = (newColor) => {
    setCurrentColor(newColor);
  };

  const handleClear = () => {
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.beginPath(); 
      // 清除后也应保存状态
      setTimeout(() => {
          Undo.saveState(canvasRef.current);
          setCanUndo(Undo.canUndo());
      }, 0);
    }
  };

  const handleUndo = () => {
    if (ctx && canvasRef.current) {
        const success = Undo.undo(canvasRef.current, ctx);
        if (success) {
            setCanUndo(Undo.canUndo());
        }
    }
  };

  const handleToolChange = (tool) => {
    setCurrentTool(tool);
    if (tempCtx) {
        tempCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    }
  };

  return (
    <div className="board-container">
      <Toolbar 
        onToolChange={handleToolChange} 
        onClear={handleClear} 
        currentTool={currentTool}
        onUndo={handleUndo}
        currentColor={currentColor}
        onColorChange={handleColorChange} 
        onSave={handleSave} 
        onImport={handleImport}  
        currentStrokeWidth={currentStrokeWidth}
        onStrokeWidthChange={handleStrokeWidthChange}
      />
      {/* --------------------------------------------- */}
      {/* 10. 使用相对定位的 wrapper 包裹两个画布 */}
      {/* --------------------------------------------- */}
      <div className="canvas-box">
        <canvas
          ref={canvasRef}
          className="drawing-board"
          // 鼠标事件已移至 TempBoard
        />
        <TempBoard
          ref={tempCanvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          margin= {0}
          padding= {0}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onMouseMove={drawHandler}
        />
      </div>
    </div>
  );
};

export default Board;