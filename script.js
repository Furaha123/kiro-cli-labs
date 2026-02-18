const puzzle = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
];

let timer = 0;
let timerInterval = null;
let mistakes = 0;
let selectedCell = null;

function createGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.dataset.row = i;
            input.dataset.col = j;
            if (puzzle[i][j] !== 0) {
                input.value = puzzle[i][j];
                input.readOnly = true;
            }
            input.addEventListener('input', handleInput);
            input.addEventListener('focus', handleFocus);
            input.addEventListener('keydown', handleKeyboard);
            grid.appendChild(input);
        }
    }
    updateProgress();
}

function handleInput(e) {
    const val = e.target.value.replace(/[^1-9]/g, '');
    e.target.value = val;
    if (val) {
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        const num = parseInt(val);
        
        if (!isValidMove(row, col, num)) {
            e.target.classList.add('invalid');
            mistakes++;
            document.getElementById('mistakes').textContent = mistakes;
            setTimeout(() => e.target.classList.remove('invalid'), 500);
        } else {
            e.target.classList.add('valid');
            setTimeout(() => e.target.classList.remove('valid'), 300);
        }
    }
    updateProgress();
    highlightSameNumbers(e.target.value);
}

function handleFocus(e) {
    selectedCell = e.target;
    document.querySelectorAll('input').forEach(inp => inp.classList.remove('selected'));
    e.target.classList.add('selected');
    highlightSameNumbers(e.target.value);
}

function handleKeyboard(e) {
    if (!selectedCell) return;
    const row = parseInt(selectedCell.dataset.row);
    const col = parseInt(selectedCell.dataset.col);
    const inputs = document.querySelectorAll('input');
    let newIndex;

    switch(e.key) {
        case 'ArrowUp':
            e.preventDefault();
            newIndex = Math.max(0, row - 1) * 9 + col;
            inputs[newIndex].focus();
            break;
        case 'ArrowDown':
            e.preventDefault();
            newIndex = Math.min(8, row + 1) * 9 + col;
            inputs[newIndex].focus();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            newIndex = row * 9 + Math.max(0, col - 1);
            inputs[newIndex].focus();
            break;
        case 'ArrowRight':
            e.preventDefault();
            newIndex = row * 9 + Math.min(8, col + 1);
            inputs[newIndex].focus();
            break;
    }
}

function highlightSameNumbers(value) {
    document.querySelectorAll('input').forEach(inp => {
        inp.classList.remove('same-number');
        if (value && inp.value === value && inp !== selectedCell) {
            inp.classList.add('same-number');
        }
    });
}

function isValidMove(row, col, num) {
    const inputs = document.querySelectorAll('input');
    for (let i = 0; i < 9; i++) {
        const rowInput = inputs[row * 9 + i];
        const colInput = inputs[i * 9 + col];
        if ((i !== col && parseInt(rowInput.value) === num) ||
            (i !== row && parseInt(colInput.value) === num)) {
            return false;
        }
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const r = boxRow + i;
            const c = boxCol + j;
            if (r !== row || c !== col) {
                const input = inputs[r * 9 + c];
                if (parseInt(input.value) === num) return false;
            }
        }
    }
    return true;
}

function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[boxRow + i][boxCol + j] === num) return false;
        }
    }
    return true;
}

function updateProgress() {
    const inputs = document.querySelectorAll('input:not([readonly])');
    const filled = Array.from(inputs).filter(inp => inp.value).length;
    const percent = Math.round((filled / inputs.length) * 100);
    document.getElementById('progress').textContent = percent + '%';
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timer = 0;
    timerInterval = setInterval(() => {
        timer++;
        const mins = Math.floor(timer / 60).toString().padStart(2, '0');
        const secs = (timer % 60).toString().padStart(2, '0');
        document.getElementById('timer').textContent = `${mins}:${secs}`;
    }, 1000);
}

function checkSolution() {
    const msg = document.getElementById('message');
    const board = Array(9).fill().map(() => Array(9).fill(0));
    document.querySelectorAll('input').forEach(input => {
        const val = parseInt(input.value) || 0;
        board[input.dataset.row][input.dataset.col] = val;
    });
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                msg.textContent = 'Incomplete puzzle!';
                msg.style.color = '#f59e0b';
                return;
            }
            const num = board[i][j];
            board[i][j] = 0;
            if (!isValid(board, i, j, num)) {
                msg.textContent = 'Incorrect solution!';
                msg.style.color = '#ef4444';
                return;
            }
            board[i][j] = num;
        }
    }
    
    clearInterval(timerInterval);
    showConfetti();
    
    const difficulty = document.getElementById('difficulty').textContent;
    let nextLevel = '';
    if (difficulty === 'Easy') nextLevel = 'Medium';
    else if (difficulty === 'Medium') nextLevel = 'Hard';
    
    msg.innerHTML = nextLevel 
        ? `🎉 Congratulations! Ready for ${nextLevel}?`
        : '🎉 Congratulations! You completed the hardest level!';
    msg.style.color = '#10b981';
}

function showConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 20);
    }
}

function newGame() {
    document.getElementById('message').textContent = '';
    mistakes = 0;
    document.getElementById('mistakes').textContent = '0';
    createGrid();
    startTimer();
}

createGrid();
startTimer();
