// ゲームの定数
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;
const EMPTY = 0;
const COLORS = ['', '#FF0D72', '#0DC2FF', '#0DFF72', '#F538FF', '#FF8E0D', '#FFE138', '#3877FF'];

// ゲーム変数
let board = [];
let nextPiece = null;
let currentPiece = null;
let score = 0;
let level = 1;
let gameStarted = false;
let gameOver = false;
let dropStart = Date.now();
let gameInterval = null;

// テトロミノの形状
const PIECES = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 0, 0],
        [2, 2, 2],
        [0, 2, 0]
    ],
    [
        [0, 0, 0],
        [3, 3, 3],
        [3, 0, 0]
    ],
    [
        [0, 0, 0],
        [4, 4, 4],
        [0, 0, 4]
    ],
    [
        [0, 0],
        [5, 5],
        [5, 5]
    ],
    [
        [0, 0, 0],
        [6, 6, 0],
        [0, 6, 6]
    ],
    [
        [0, 0, 0],
        [0, 7, 7],
        [7, 7, 0]
    ]
];

// DOM要素
const boardElement = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const startButton = document.getElementById('start-button');
const nextPieceDisplay = document.getElementById('next-piece-display');

// ボードの初期化
function initBoard() {
    for (let r = 0; r < ROWS; r++) {
        board[r] = [];
        for (let c = 0; c < COLS; c++) {
            board[r][c] = EMPTY;
        }
    }
}

// ボードの描画
function drawBoard() {
    boardElement.innerHTML = '';
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const cell = document.createElement('div');
            cell.style.width = `${BLOCK_SIZE}px`;
            cell.style.height = `${BLOCK_SIZE}px`;
            cell.style.position = 'absolute';
            cell.style.top = `${r * BLOCK_SIZE}px`;
            cell.style.left = `${c * BLOCK_SIZE}px`;
            cell.style.backgroundColor = COLORS[board[r][c]];
            
            if (board[r][c] !== EMPTY) {
                cell.style.border = '1px solid rgba(0, 0, 0, 0.2)';
            }
            
            boardElement.appendChild(cell);
        }
    }
}

// テトロミノの描画
function drawPiece(piece, pieceX, pieceY, targetElement) {
    const displayWidth = piece[0].length * BLOCK_SIZE;
    const displayHeight = piece.length * BLOCK_SIZE;
    
    if (targetElement === nextPieceDisplay) {
        targetElement.innerHTML = '';
        targetElement.style.width = `${displayWidth}px`;
        targetElement.style.height = `${displayHeight}px`;
    }
    
    for (let r = 0; r < piece.length; r++) {
        for (let c = 0; c < piece[r].length; c++) {
            if (piece[r][c]) {
                const cell = document.createElement('div');
                cell.style.width = `${BLOCK_SIZE}px`;
                cell.style.height = `${BLOCK_SIZE}px`;
                cell.style.position = 'absolute';
                
                if (targetElement === nextPieceDisplay) {
                    cell.style.top = `${r * BLOCK_SIZE}px`;
                    cell.style.left = `${c * BLOCK_SIZE}px`;
                } else {
                    cell.style.top = `${(pieceY + r) * BLOCK_SIZE}px`;
                    cell.style.left = `${(pieceX + c) * BLOCK_SIZE}px`;
                }
                
                cell.style.backgroundColor = COLORS[piece[r][c]];
                cell.style.border = '1px solid rgba(0, 0, 0, 0.2)';
                targetElement.appendChild(cell);
            }
        }
    }
}

// 新しいピースの生成
function generatePiece() {
    const randomIndex = Math.floor(Math.random() * PIECES.length);
    const piece = PIECES[randomIndex];
    
    // 開始位置を設定
    const x = Math.floor(COLS / 2) - Math.floor(piece[0].length / 2);
    const y = 0;
    
    return {
        shape: piece,
        x: x,
        y: y
    };
}

// 次のピースを表示
function displayNextPiece() {
    nextPieceDisplay.innerHTML = '';
    drawPiece(nextPiece.shape, 0, 0, nextPieceDisplay);
}

// 衝突判定
function collision(piece, x, y) {
    for (let r = 0; r < piece.length; r++) {