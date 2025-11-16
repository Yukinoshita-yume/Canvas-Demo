// Board.jsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Toolbar from '../toolbar/toolbar';
import { Pencil } from '../pencil/pencil.jsx';
import { Geometric } from '../Geometric/Geometric.jsx';
import { Undo } from '../Undo/Undo.jsx';
// ---------------------------------------------
// 1. 导入 TempBoard
// ---------------------------------------------
import TempBoard from '../tempboard/tempboard.jsx'; // 假设路径正确
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
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [canUndo, setCanUndo] = useState(false);

  // 初始化 Canvas Context
  useEffect(() => {
    const canvas = canvasRef.current;
    const tempCanvas = tempCanvasRef.current;

    if (canvas && tempCanvas) {
      // ---------------------------------------------
      // 4. 统一设置主画布和临时画布
      // ---------------------------------------------
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
    // ---------------------------------------------
    // 5. 确保 tempCtx 也存在
    // ---------------------------------------------
    if (!ctx || !tempCtx || !isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (currentTool === 'pencil') {
      Pencil.draw(ctx, x, y); // 在主画布上绘制

    } else if (currentTool === 'geometric') {
      // ---------------------------------------------
      // 6. 在临时画布上绘制预览
      // ---------------------------------------------
      
      // 6a. 清除临时画布 (使用存储的逻辑尺寸)
      tempCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);

      // 6b. 在临时画布上绘制形状
      Geometric.draw(tempCtx, x, y); 
    }
   
  }, [ctx, tempCtx, isDrawing, currentTool, canvasSize]); // 添加依赖项


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
      Pencil.start(ctx, x, y); // 在主画布上开始
      Pencil.draw(ctx, x, y);  // 铅笔立即绘制第一个点
    } else if (currentTool === 'geometric') {
      Geometric.start(tempCtx, x, y); // 在临时画布上开始
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
      Geometric.draw(ctx, x, y);
    }

    // ---------------------------------------------
    // 9. 统一保存撤销状态 (对铅笔和几何图形都有效)
    // ---------------------------------------------
    setTimeout(() => {
        Undo.saveState(canvasRef.current);
        setCanUndo(Undo.canUndo()); 
    }, 0);

    ctx.beginPath(); 
  };

  // --- 工具栏功能 (不变) ---

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
  };

  return (
    <div className="board-container">
      <Toolbar 
        onToolChange={handleToolChange} 
        onClear={handleClear} 
        currentTool={currentTool}
        onUndo={handleUndo}    
      />
      {/* --------------------------------------------- */}
      {/* 10. 使用相对定位的 wrapper 包裹两个画布 */}
      {/* --------------------------------------------- */}
      <div style={{ position: 'relative', width: `${canvasSize.width}px`, height: `${canvasSize.height}px` }}>
        <canvas
          ref={canvasRef}
          className="drawing-board"
          // 鼠标事件已移至 TempBoard
        />
        <TempBoard
          ref={tempCanvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
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