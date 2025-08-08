const sudokuGrid = document.getElementById('sudoku-grid');
const checkBtn = document.getElementById('check-btn');
const hintBtn = document.getElementById('hint-btn');
const newGameBtn = document.getElementById('new-game-btn');
const easyBtn = document.getElementById('easy-btn');
const mediumBtn = document.getElementById('medium-btn');
const hardBtn = document.getElementById('hard-btn');
const timerDisplay = document.getElementById('timer');
const message = document.getElementById('message');

let grid = [];
let initialGrid = [];
let solutionGrid = [];
let difficulty = 'easy';
let timerInterval = null;
let secondsElapsed = 0;

// Difficulty settings: number of pre-filled cells
const difficultySettings = {
    easy: 40, // More pre-filled cells
    medium: 30,
    hard: 20 // Fewer pre-filled cells
};

function startTimer() {
    clearInterval(timerInterval);
    secondsElapsed = 0;
    timerInterval = setInterval(() => {
        secondsElapsed++;
        const minutes = Math.floor(secondsElapsed / 60);
        const seconds = secondsElapsed % 60;
        timerDisplay.textContent = `Time: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function generatePuzzle() {
    // Start with an empty grid
    const fullGrid = Array(9).fill().map(() => Array(9).fill(0));
    // Fill the grid with a valid solution
    fillGrid(fullGrid);
    solutionGrid = fullGrid.map(row => [...row]);
    // Remove cells based on difficulty
    const cellsToFill = difficultySettings[difficulty];
    initialGrid = solutionGrid.map(row => [...row]);
    let cellsRemoved = 81 - cellsToFill;
    while (cellsRemoved > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (initialGrid[row][col] !== 0) {
            initialGrid[row][col] = 0;
            cellsRemoved--;
        }
    }
    grid = initialGrid.map(row => [...row]);
}

function fillGrid(grid) {
    const empty = findEmpty(grid);
    if (!empty) return true;
    const [row, col] = empty;
    const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (let num of numbers) {
        if (isValid(row, col, num, grid)) {
            grid[row][col] = num;
            if (fillGrid(grid)) return true;
            grid[row][col] = 0;
        }
    }
    return false;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createGrid() {
    sudokuGrid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.className = 'sudoku-cell';
            const input = document.createElement('input');
            input.type = 'number';
            input.min = '1';
            input.max = '9';
            input.className = 'appearance-none';
            if (initialGrid[i][j] !== 0) {
                input.value = initialGrid[i][j];
                input.readOnly = true;
            } else if (grid[i][j] !== 0) {
                input.value = grid[i][j];
                input.classList.add('user-input');
            }
            cell.appendChild(input);
            sudokuGrid.appendChild(cell);
        }
    }
    const cells = document.querySelectorAll('.sudoku-cell input');
    cells.forEach((input, index) => {
        if (!input.readOnly) {
            input.addEventListener('input', () => {
                const row = Math.floor(index / 9);
                const col = index % 9;
                const value = input.value ? parseInt(input.value) : 0;

                if (value && (!/^[1-9]$/.test(value) || !isValid(row, col, value, grid))) {
                    input.classList.add('error');
                    message.textContent = 'Invalid number! Check for duplicates.';
                    message.classList.add('text-red-500');
                } else {
                    input.classList.remove('error');
                    message.textContent = '';
                    message.classList.remove('text-red-500', 'text-green-500');
                    grid[row][col] = value;
                    if (value) {
                        input.classList.add('user-input');
                    } else {
                        input.classList.remove('user-input');
                    }
                }
            });
        }
    });
}

function isValid(row, col, num, grid) {
    if (!grid || !grid[row] || !grid[col]) return false;
    for (let x = 0; x < 9; x++) {
        if (x !== col && grid[row][x] === num) return false;
        if (x !== row && grid[x][col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if ((i + startRow !== row || j + startCol !== col) && grid[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }
    return true;
}

function validateGrid() {
    for (let i = 0; i < 9; i++) {
        let rowSet = new Set();
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] !== 0) {
                if (rowSet.has(grid[i][j])) return false;
                rowSet.add(grid[i][j]);
            }
        }
    }
    for (let j = 0; j < 9; j++) {
        let colSet = new Set();
        for (let i = 0; i < 9; i++) {
            if (grid[i][j] !== 0) {
                if (colSet.has(grid[i][j])) return false;
                colSet.add(grid[i][j]);
            }
        }
    }
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            let boxSet = new Set();
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    const value = grid[i + k][j + l];
                    if (value !== 0) {
                        if (boxSet.has(value)) return false;
                        boxSet.add(value);
                    }
                }
            }
        }
    }
    return true;
}

function isComplete() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === 0 || grid[i][j] !== solutionGrid[i][j]) return false;
        }
    }
    return true;
}

function findEmpty(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === 0) return [i, j];
        }
    }
    return null;
}

function getHint() {
    const empty = findEmpty(grid);
    if (!empty) return;
    const [row, col] = empty;
    grid[row][col] = solutionGrid[row][col];
    const index = row * 9 + col;
    const input = document.querySelectorAll('.sudoku-cell input')[index];
    input.value = grid[row][col];
    input.classList.add('user-input');
    input.classList.remove('error');
    message.textContent = 'Hint applied!';
    message.classList.add('text-green-500');
    message.classList.remove('text-red-500');
    if (isComplete()) {
        stopTimer();
        message.textContent = `Congratulations! You solved the Sudoku in ${timerDisplay.textContent}!`;
        message.classList.add('text-green-500');
    }
}

// Initialize game
generatePuzzle();
createGrid();
startTimer();

// Difficulty button handling
easyBtn.addEventListener('click', () => {
    difficulty = 'easy';
    easyBtn.classList.add('active');
    mediumBtn.classList.remove('active');
    hardBtn.classList.remove('active');
    generatePuzzle();
    createGrid();
    startTimer();
    message.textContent = '';
    message.classList.remove('text-red-500', 'text-green-500');
});

mediumBtn.addEventListener('click', () => {
    difficulty = 'medium';
    mediumBtn.classList.add('active');
    easyBtn.classList.remove('active');
    hardBtn.classList.remove('active');
    generatePuzzle();
    createGrid();
    startTimer();
    message.textContent = '';
    message.classList.remove('text-red-500', 'text-green-500');
});

hardBtn.addEventListener('click', () => {
    difficulty = 'hard';
    hardBtn.classList.add('active');
    easyBtn.classList.remove('active');
    mediumBtn.classList.remove('active');
    generatePuzzle();
    createGrid();
    startTimer();
    message.textContent = '';
    message.classList.remove('text-red-500', 'text-green-500');
});

checkBtn.addEventListener('click', () => {
    if (!validateGrid()) {
        message.textContent = 'Invalid grid! Check for duplicates or incorrect numbers.';
        message.classList.remove('text-green-500');
        message.classList.add('text-red-500');
        return;
    }

    if (isComplete()) {
        stopTimer();
        message.textContent = `Congratulations! You solved the Sudoku in ${timerDisplay.textContent}!`;
        message.classList.remove('text-red-500');
        message.classList.add('text-green-500');
    } else {
        message.textContent = 'Grid is valid but not complete. Keep going!';
        message.classList.remove('text-red-500');
        message.classList.add('text-green-500');
    }
});

hintBtn.addEventListener('click', getHint);

newGameBtn.addEventListener('click', () => {
    generatePuzzle();
    createGrid();
    startTimer();
    message.textContent = '';
    message.classList.remove('text-red-500', 'text-green-500');
});
