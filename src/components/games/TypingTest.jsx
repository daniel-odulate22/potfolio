import { useState, useRef } from 'react';
import './TypingTest.css';

const SENTENCES = [
  "const developer = new Robot('Daniel');",
  "function optimize(code) { return fast; }",
  "git commit -m 'Initial commit'",
  "console.log('Hello, World!');",
  "sudo rm -rf node_modules/"
];

const KeyboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="13" rx="2"/>
    <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h.01M16 14h.01M12 14h4"/>
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

export function TypingTest() {
  const [target, setTarget]         = useState('');
  const [input, setInput]           = useState('');
  const [isPlaying, setIsPlaying]   = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime]   = useState(null);
  const [wpm, setWpm]               = useState(0);
  const inputRef = useRef(null);

  const getTypingMessage = (speed) => {
    const messages = {
      slow: [
        "Goddd, you're slow at typing 😣",
        "Take your time... no rush 🐢",
        "Practice makes perfect! 💪",
      ],
      moderate: [
        "Not bad! Keep practicing 👍",
        "You're getting there! 🎯",
        "Solid effort! 💯",
      ],
      fast: [
        "Yayy, you won! Okay Leave. 🚀",
        "YOU WON! 🤩 Have I ever told you that you're the best?",
        "Wow, You Won. Come here, let me give you a hug 🤗",
        "Chaii, a poor human lost to a simple code 😎",
      ],
    };

    if (speed < 30) return messages.slow[Math.floor(Math.random() * messages.slow.length)];
    if (speed < 60) return messages.moderate[Math.floor(Math.random() * messages.moderate.length)];
    return messages.fast[Math.floor(Math.random() * messages.fast.length)];
  };

  const start = () => {
    setTarget(SENTENCES[Math.floor(Math.random() * SENTENCES.length)]);
    setInput('');
    setIsPlaying(true);
    setIsFinished(false);
    setStartTime(Date.now());
    setWpm(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInput = (e) => {
    const val = e.target.value;
    setInput(val);
    if (val === target) {
      setIsFinished(true);
      setIsPlaying(false);
      if (startTime) {
        const mins = (Date.now() - startTime) / 60000;
        setWpm(Math.round((target.length / 5) / mins));
      }
    }
  };

  const handleBlur = () => {
    if (isPlaying) setTimeout(() => inputRef.current?.focus(), 10);
  };

  return (
    <div className="typing-wrap" onClick={() => inputRef.current?.focus()}>
      <div className="typing-header">
        <span className="typing-label"><KeyboardIcon /> TYPING</span>
        {isFinished && <span className="typing-wpm-small">{wpm} WPM</span>}
      </div>

      <div className="typing-body">

        {/* Idle */}
        {!isPlaying && !isFinished && (
          <div className="typing-idle">
            <p>Type the code as fast as you can</p>
            <button className="game-btn game-btn--warm" onClick={start}>
              <PlayIcon /> Start Typing
            </button>
          </div>
        )}

        {/* Result */}
        {isFinished && (
          <div className="typing-result">
            <h4 className="typing-wpm">{wpm}</h4>
            <p className="typing-wpm-label">Words Per Minute</p>
            <p className="typing-message animate-bounce">{getTypingMessage(wpm)}</p>
            <button className="game-btn game-btn--dark" onClick={start}>
              <ReplayIcon /> Try Again
            </button>
          </div>
        )}

        {/* Playing */}
        {isPlaying && (
          <div className="typing-display">
            <input
              ref={inputRef}
              value={input}
              onChange={handleInput}
              onBlur={handleBlur}
              className="typing-input-hidden"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <div className="typing-chars" aria-hidden>
              {target.split('').map((char, i) => {
                let cls = 'char char--pending';
                if (i < input.length) {
                  cls = input[i] === char ? 'char char--correct' : 'char char--wrong';
                }
                if (i === input.length) cls += ' char--cursor';
                return (
                  <span key={i} className={cls}>{char}</span>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}