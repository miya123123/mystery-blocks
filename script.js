// ゲーム設定
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;
const EMPTY_CELL = 0;
const MYSTERY_BLOCK_CHANCE = 0.1; // ミステリーブロックが出現する確率

// ゲーム状態
let gameBoard = [];
let currentPiece = null;
let nextPiece = null;
let score = 0;
let level = 1;
let gameInterval = null;
let gameSpeed = 1000; // 初期速度（ミリ秒）
let isGameOver = false;
let isGamePaused = false;

// テトリスのピース形状定義
const PIECES = [
    { name: 'I', color: 'cyan', shape: [[1, 1, 1, 1]] },
    { name: 'O', color: 'yellow', shape: [[1, 1], [1, 1]] },
    { name: 'T', color: 'purple', shape: [[0, 1, 0], [1, 1, 1]] },
    { name: 'S', color: 'green', shape: [[0, 1, 1], [1, 1, 0]] },
    { name: 'Z', color: 'red', shape: [[1, 1, 0], [0, 1, 1]] },
    { name: 'J', color: 'blue', shape: [[1, 0, 0], [1, 1, 1]] },
    { name: 'L', color: 'orange', shape: [[0, 0, 1], [1, 1, 1]] },
    { name: 'Mystery', color: 'black', shape: [[1]], isMystery: true }
];

// DOM要素
const gameBoard_el = document.getElementById('game-board');
const score_el = document.getElementById('score');
const level_el = document.getElementById('level');
const startButton