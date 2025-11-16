// DropdownButton.jsx - 关键修改
import React, { useState, useRef, useCallback } from 'react';
import './toolbar.css'; 

// 定义延迟时间（单位：毫秒）
const SHOW_DELAY = 300; // 鼠标移入后，延迟 300ms 显示菜单
const HIDE_DELAY = 300; // 鼠标移出后，延迟 300ms 隐藏菜单

const DropdownButton = ({ buttonText, children, className, isActive, onClick, currentItemText }) => {
  const [isOpen, setIsOpen] = useState(false);
  // 使用 useRef 来保存定时器 ID，以便我们可以在需要时清除它
  const timerRef = useRef(null); 

  // 清除所有悬挂的定时器
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 鼠标移入事件处理
  const handleMouseEnter = () => {
    clearTimer(); // 立即清除任何正在运行的隐藏定时器
    // 设置一个新的定时器，延迟后显示菜单
    timerRef.current = setTimeout(() => {
      setIsOpen(true);
    }, SHOW_DELAY);
  };

  // 鼠标移出事件处理
  const handleMouseLeave = () => {
    clearTimer(); // 立即清除任何正在运行的显示定时器
    // 设置一个新的定时器，延迟后隐藏菜单
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, HIDE_DELAY);
  };

  // 在组件卸载时清理定时器，防止内存泄漏
  React.useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return (
    // 在容器上添加鼠标事件监听器
    <div 
      className={`dropdown-container ${className}`} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`tool-button ${isActive ? 'active' : ''}`}
        onClick={onClick}
      >
        {buttonText} {currentItemText ? ` (${currentItemText})` : ''}
      </button>
      
      {/* 根据 isOpen 状态控制菜单显示，并添加 CSS transition 类 */}
      <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default DropdownButton;