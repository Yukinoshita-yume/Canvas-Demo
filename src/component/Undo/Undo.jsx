// undo.jsx

/**
 * 只支持保存状态和撤销到上一个状态。
 */
const historyStack = [];
const MAX_HISTORY = 100;

// 更新历史记录栈
const updateStack = (state) => {
    // 如果历史记录超出最大容量，则移除最旧的记录
    if (historyStack.length >= MAX_HISTORY) {
        historyStack.shift();
    }
    historyStack.push(state);
    console.log(`State saved. Current history size: ${historyStack.length}`);
};

/**
 * 将当前的 Canvas 状态保存到历史记录中。
 * @param {HTMLCanvasElement} canvas - 需要保存状态的 Canvas 元素。
 */
const saveState = (canvas) => {
    if (!canvas) return;
    // 将 Canvas 内容转换为 Data URL
    const state = canvas.toDataURL();
    updateStack(state);
};

/**
 * 撤销上一步操作，将 Canvas 恢复到前一个历史状态。
 * @param {HTMLCanvasElement} canvas - 需要恢复状态的 Canvas 元素。
 * @param {CanvasRenderingContext2D} ctx - Canvas 的 2D 上下文。
 * @returns {boolean} 如果成功执行撤销操作，返回 true；否则返回 false。
 */
const undo = (canvas, ctx) => {
    // 栈中至少需要有两个状态才能撤销：[初始空白, 第一次绘制]
    if (!canvas || !ctx || historyStack.length <= 1) {
        console.log('Cannot undo further (at initial state).');
        return false;
    }

    // 弹出当前状态
    historyStack.pop(); 
    // 获取前一个状态（即新的栈顶）
    const previousState = historyStack[historyStack.length - 1]; 

    if (previousState) {
        const img = new Image();
        img.onload = () => {
            // 确保画布是清除的
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // 绘制历史图像
            ctx.drawImage(img, 0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
        };
        img.src = previousState;
        console.log(`Undo executed. Current history size: ${historyStack.length}`);
        return true;
    }
    return false;
};

/**
 * 检查是否可以执行撤销操作。
 * 至少有两个状态才能撤销（初始空白 + 第一次绘制）。
 * @returns {boolean}
 */
const canUndo = () => {
    return historyStack.length > 1;
};

/**
 * 清空历史记录。
 */
const clearHistory = () => {
    historyStack.splice(0, historyStack.length);
    console.log('History cleared.');
};


export const Undo = {
    saveState,
    undo,
    canUndo,
    clearHistory
};