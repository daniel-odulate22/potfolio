import { useState, useEffect, useCallback, useRef } from 'react';
import './SnakeGame.css';

const GRID = 15;
const SPEED = 120; // ms per tick

const TrophyIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="8 5 3 5 3 13 8 13"/><polyline points="16 5 21 5 21 13 16 13"/>
    <path d="M8 5a4 4 0 0 0 8 0"/><line x1="12" y1="13" x2="12" y2="21"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const ReplayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/>
  </svg>
);

export function SnakeGame() {
  const [snake, setSnake]           = useState([{ x: 7, y: 7 }]);
  const [food, setFood]             = useState({ x: 10, y: 10 });
  const [isPlaying, setIsPlaying]   = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore]           = useState(0);
  const [highScore, setHighScore]   = useState(0);

  const dirRef   = useRef({ x: 1, y: 0 });
  const boardRef = useRef(null);

  // 1. Move the check to a separate helper outside the loop logic
const isOccupied = (coord, snake) => {
  return snake.some(s => s.x === coord.x && s.y === coord.y);
};

  const genFood = useCallback((currentSnake) => {
    let f;
  // 2. The loop now calls a pre-defined function instead of creating a new one
    do {
      f = { 
        x: Math.floor(Math.random() * GRID), 
        y: Math.floor(Math.random() * GRID) 
     };
    } while (isOccupied(f, currentSnake));
  
    return f;
    }, []);

  const reset = () => {
    setSnake([{ x: 7, y: 7 }]);
    dirRef.current = { x: 1, y: 0 };
    setFood({ x: 10, y: 10 });
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
    boardRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (!isPlaying || isGameOver) return;
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();
      const { x, y } = dirRef.current;
      if (e.key === 'ArrowUp'    && y === 0)  dirRef.current = { x: 0, y: -1 };
      if (e.key === 'ArrowDown'  && y === 0)  dirRef.current = { x: 0, y:  1 };
      if (e.key === 'ArrowLeft'  && x === 0)  dirRef.current = { x: -1, y: 0 };
      if (e.key === 'ArrowRight' && x === 0)  dirRef.current = { x:  1, y: 0 };
    };
    window.addEventListener('keydown', onKey, { passive: false });
    return () => window.removeEventListener('keydown', onKey);
  }, [isPlaying, isGameOver]);

  useEffect(() => {
    if (!isPlaying || isGameOver) return;
    const id = setInterval(() => {
      setSnake(prev => {
        const head = prev[0];
        const next = { x: head.x + dirRef.current.x, y: head.y + dirRef.current.y };
        if (next.x < 0 || next.x >= GRID || next.y < 0 || next.y >= GRID) {
          setIsGameOver(true); return prev;
        }
        if (prev.some(s => s.x === next.x && s.y === next.y)) {
          setIsGameOver(true); return prev;
        }
        const newSnake = [next, ...prev];
        if (next.x === food.x && next.y === food.y) {
          setScore(s => {
            const n = s + 10;
            if (n > highScore) setHighScore(n);
            return n;
          });
          setFood(genFood(newSnake));
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, SPEED);
    return () => clearInterval(id);
  }, [isPlaying, isGameOver, food, genFood, highScore]);

  const cells = Array.from({ length: GRID * GRID }, (_, i) => {
    const x = i % GRID, y = Math.floor(i / GRID);
    const isHead  = snake[0].x === x && snake[0].y === y;
    const isBody  = !isHead && snake.some(s => s.x === x && s.y === y);
    const isFood  = food.x === x && food.y === y;
    return { x, y, isHead, isBody, isFood };
  });

  return (
    <div className="snake-wrap">
      <div className="snake-score-bar">
        <span className="snake-score">SCORE: {score}</span>
        <span className="snake-hi"><TrophyIcon /> {highScore}</span>
      </div>

      <div
        ref={boardRef}
        tabIndex={0}
        className="snake-board"
        style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)`, gridTemplateRows: `repeat(${GRID}, 1fr)` }}
      >
        {!isPlaying && !isGameOver && (
          <div className="snake-overlay">
            <TrophyIcon />
            <h4>Snake</h4>
            <p>Use arrow keys to move</p>
            <button className="game-btn game-btn--primary" onClick={() => setIsPlaying(true)}>
              <PlayIcon /> Play Now
            </button>
          </div>
        )}
        {isGameOver && (
          <div className="snake-overlay">
            <h4 className="snake-gameover">Game Over</h4>
            <p className="snake-final">Score: {score}</p>
            <button className="game-btn game-btn--dark" onClick={reset}>
              <ReplayIcon /> Play Again
            </button>
          </div>
        )}
        {cells.map((cell, i) => (
          <div key={i} className={
            'snake-cell' +
            (cell.isHead ? ' snake-cell--head' : '') +
            (cell.isBody ? ' snake-cell--body' : '') +
            (cell.isFood ? ' snake-cell--food' : '')
          } />
        ))}
      </div>
    </div>
  );
}