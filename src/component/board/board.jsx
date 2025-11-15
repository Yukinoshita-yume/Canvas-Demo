// Board.jsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Toolbar from '../toolbar/toolbar';
import { Pencil } from '../pencil/pencil.jsx';
import { Geometric } from '../Geometric/Geometric.jsx';
import './board.css';

const Board = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('pencil'); // 默认工具
  const [ctx, setCtx] = useState(null);

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