// Board.jsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Toolbar from '../toolbar/toolbar';
import { Pencil } from '../pencil/pencil.jsx';
import { Geometric } from '../Geometric/Geometric.jsx';
import { Undo } from '../Undo/Undo.jsx';
import './board.css';

const Board = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('pencil'); // 默认工具
  const [ctx, setCtx] = useState(null);
  const [canUndo, setCanUndo] = useState(false);

  // 初始化 Canvas Context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // 设置屏幕适配
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      const context = canvas.getContext('2d');
      context.scale(window.devicePixelRatio, window.devicePixelRatio);
      setCtx(context);

      // 使用 setTimeout 确保浏览器渲染周期完成后再获取 Data URL，防止保存失败
      setTimeout(() => {
          Undo.saveState(canvas);
          setCanUndo(Undo.canUndo());
      }, 0);
    } 
  }, []);

  
  

  // 绘图处理函数
  const drawHandler = useCallback((event) => {
    if (!ctx || !isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (currentTool === 'pencil') {
      Pencil.draw(ctx, x, y);
    }else if (currentTool === 'geometric') {
      
      Geometric.draw(ctx, x, y, canvas);
    }
   
  }, [ctx, isDrawing, currentTool]);


  const startDrawing = (event) => {
    if (!ctx) return;
    setIsDrawing(true);

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // 调用工具的准备函数
    if (currentTool === 'pencil') {
      Pencil.start(ctx, x, y);
    }else if (currentTool === 'geometric') {
    Geometric.start(ctx, x, y);
  }
    // 立即绘制第一个点
    drawHandler(event); 
  };

  const stopDrawing = () => {
    if (!ctx) return;
    setIsDrawing(false);

    // 使用 setTimeout 确保 canvas 上的所有绘制操作都已完成
    setTimeout(() => {
        Undo.saveState(canvasRef.current);
        // 更新撤销按钮状态
        setCanUndo(Undo.canUndo()); 
    }, 0);

    // 重置路径，确保下次是新路径
    ctx.beginPath(); 
  };

  // --- 工具栏功能 ---

  // 一键清除
  const handleClear = () => {
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.beginPath(); 
    }
  };

  // 撤销功能
  const handleUndo = () => {
    if (ctx && canvasRef.current) {
        // 调用撤销管理器执行撤销
        const success = Undo.undo(canvasRef.current, ctx);
        // 如果成功撤销，更新按钮状态
        if (success) {
            setCanUndo(Undo.canUndo());
        }
    }
  };

  // 工具选择
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
      <canvas
        ref={canvasRef}
        className="drawing-board"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onMouseMove={drawHandler}
      />
    </div>
  );
};

export default Board;