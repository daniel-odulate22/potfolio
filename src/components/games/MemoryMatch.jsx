import { useState } from 'react';
import './MemoryMatch.css';

const EMOJIS = ['🤖', '💻', '⚡', '🚀', '🧠', '🎮'];

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

export function MemoryMatch() {
  const [cards, setCards]                   = useState([]);
  const [flipped, setFlipped]               = useState([]);
  const [moves, setMoves]                   = useState(0);
  const [isPlaying, setIsPlaying]           = useState(false);
  const [isWon, setIsWon]                   = useState(false);

  const winMessages = [
    "Yayy, you won! Okay Leave. 🎉",
    "YOU WON! 🤩 Have I ever told you that you're the best?",
    "Wow, You Won. Come here, let me give you a hug 🤗",
    "Chaii, a poor human lost to a simple code 😎",
    "Excellent memory! 🧠✨",
    "Look at you go! 🚀",
  ];

  const init = () => {
    const shuffled = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
    setCards(shuffled);
    setFlipped([]);
    setMoves(0);
    setIsWon(false);
    setIsPlaying(true);
  };

  const click = (index) => {
    if (!isPlaying || cards[index].flipped || cards[index].matched || flipped.length === 2) return;
    const next = [...cards];
    next[index].flipped = true;
    setCards(next);
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newFlipped;
      if (cards[a].emoji === cards[b].emoji) {
        setTimeout(() => {
          const m = [...next];
          m[a].matched = true;
          m[b].matched = true;
          setCards(m);
          setFlipped([]);
          if (m.every(c => c.matched)) setIsWon(true);
        }, 500);
      } else {
        setTimeout(() => {
          const r = [...next];
          r[a].flipped = false;
          r[b].flipped = false;
          setCards(r);
          setFlipped([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="memory-wrap">
      <div className="memory-score-bar">
        <span className="memory-moves">MOVES: {moves}</span>
      </div>

      <div className="memory-grid">
        {(!isPlaying && !isWon) && (
          <div className="memory-overlay">
            <h4>Memory</h4>
            <p>Find all matching pairs</p>
            <button className="game-btn game-btn--accent" onClick={init}>
              <PlayIcon /> Start Game
            </button>
          </div>
        )}
        {isWon && (
          <div className="memory-overlay memory-overlay--win">
            <h4 className="memory-win animate-scale-pulse">You Won!</h4>
            <p className="memory-final">In {moves} moves</p>
            <p className="memory-message">{winMessages[Math.floor(Math.random() * winMessages.length)]}</p>
            <button className="game-btn game-btn--dark" onClick={init}>
              <ReplayIcon /> Play Again
            </button>
          </div>
        )}

        {cards.map((card, i) => (
          <div key={card.id} className="memory-card-wrap" onClick={() => click(i)}>
            <div className={`memory-card-inner transform-style-3d ${(card.flipped || card.matched) ? 'rotate-y-180' : ''}`}>
              {/* Front (face-down) */}
              <div className="memory-card-face memory-card--front backface-hidden">
                <span className="memory-card-q">?</span>
              </div>
              {/* Back (face-up) */}
              <div className={`memory-card-face memory-card--back backface-hidden rotate-y-180 ${card.matched ? 'memory-card--matched' : ''}`}>
                {card.emoji}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}