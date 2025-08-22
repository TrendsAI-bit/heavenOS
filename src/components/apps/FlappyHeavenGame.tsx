'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSound } from '@/hooks/useSound';

interface Bird {
  y: number;
  velocity: number;
}

interface Pipe {
  x: number;
  gapY: number;
  passed: boolean;
}

export default function FlappyHeavenGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | undefined>(undefined);
  const { playSound } = useSound();

  // Game state
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [bird, setBird] = useState<Bird>({ y: 200, velocity: 0 });
  const [pipes, setPipes] = useState<Pipe[]>([]);

  // Game constants
  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 300;
  const BIRD_SIZE = 20;
  const PIPE_WIDTH = 50;
  const PIPE_GAP = 100;
  const GRAVITY = 0.5;
  const JUMP_STRENGTH = -8;
  const PIPE_SPEED = 2;

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('flappy-heaven-high-score');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Save high score to localStorage
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('flappy-heaven-high-score', score.toString());
    }
  }, [score, highScore]);

  // Draw functions
  const drawBird = useCallback((ctx: CanvasRenderingContext2D, bird: Bird) => {
    ctx.fillStyle = '#f5c84b'; // Halo gold
    ctx.fillRect(50, bird.y, BIRD_SIZE, BIRD_SIZE);
    
    // Draw simple wing
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(55, bird.y + 5, 10, 8);
    
    // Draw eye
    ctx.fillStyle = '#000000';
    ctx.fillRect(60, bird.y + 5, 3, 3);
    
    // Draw halo
    ctx.strokeStyle = '#f5c84b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(60, bird.y - 5, 12, 0, Math.PI * 2);
    ctx.stroke();
  }, []);

  const drawPipe = useCallback((ctx: CanvasRenderingContext2D, pipe: Pipe) => {
    ctx.fillStyle = '#666666';
    
    // Top pipe
    ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.gapY);
    
    // Bottom pipe
    ctx.fillRect(pipe.x, pipe.gapY + PIPE_GAP, PIPE_WIDTH, CANVAS_HEIGHT - pipe.gapY - PIPE_GAP);
    
    // Pipe caps
    ctx.fillStyle = '#888888';
    ctx.fillRect(pipe.x - 5, pipe.gapY - 20, PIPE_WIDTH + 10, 20);
    ctx.fillRect(pipe.x - 5, pipe.gapY + PIPE_GAP, PIPE_WIDTH + 10, 20);
  }, []);

  const drawBackground = useCallback((ctx: CanvasRenderingContext2D) => {
    // Sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Clouds
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 5; i++) {
      const x = (i * 100) + 20;
      const y = 30 + (i * 20) % 60;
      ctx.fillRect(x, y, 40, 20);
      ctx.fillRect(x + 10, y - 10, 20, 20);
      ctx.fillRect(x + 20, y - 15, 15, 25);
    }
  }, []);

  const checkCollision = useCallback((bird: Bird, pipes: Pipe[]): boolean => {
    // Ground collision
    if (bird.y + BIRD_SIZE >= CANVAS_HEIGHT || bird.y <= 0) {
      return true;
    }

    // Pipe collision
    for (const pipe of pipes) {
      if (50 + BIRD_SIZE > pipe.x && 50 < pipe.x + PIPE_WIDTH) {
        if (bird.y < pipe.gapY || bird.y + BIRD_SIZE > pipe.gapY + PIPE_GAP) {
          return true;
        }
      }
    }

    return false;
  }, []);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || gameState !== 'playing') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setBird(prevBird => {
      const newBird = {
        ...prevBird,
        velocity: prevBird.velocity + GRAVITY,
        y: prevBird.y + prevBird.velocity + GRAVITY
      };

      setPipes(prevPipes => {
        let newPipes = prevPipes.map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED }));
        
        // Remove pipes that are off screen
        newPipes = newPipes.filter(pipe => pipe.x + PIPE_WIDTH > 0);
        
        // Add new pipes
        if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < CANVAS_WIDTH - 200) {
          newPipes.push({
            x: CANVAS_WIDTH,
            gapY: 50 + Math.random() * 100,
            passed: false
          });
        }

        // Check for score
        newPipes.forEach(pipe => {
          if (!pipe.passed && pipe.x + PIPE_WIDTH < 50) {
            pipe.passed = true;
            setScore(prev => {
              const newScore = prev + 1;
              playSound('success');
              return newScore;
            });
          }
        });

        // Check collision
        if (checkCollision(newBird, newPipes)) {
          setGameState('gameOver');
          playSound('error');
          return prevPipes;
        }

        return newPipes;
      });

      return newBird;
    });
  }, [gameState, checkCollision, playSound]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw background
    drawBackground(ctx);

    if (gameState === 'playing') {
      // Draw pipes
      pipes.forEach(pipe => drawPipe(ctx, pipe));
      
      // Draw bird
      drawBird(ctx, bird);
      
      // Draw score
      ctx.fillStyle = '#000000';
      ctx.font = '20px monospace';
      ctx.fillText(`Score: ${score}`, 10, 30);
    } else if (gameState === 'menu') {
      // Draw title
      ctx.fillStyle = '#000000';
      ctx.font = '24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('FLAPPY HEAVEN', CANVAS_WIDTH / 2, 100);
      
      ctx.font = '16px monospace';
      ctx.fillText('Click or Space to Start', CANVAS_WIDTH / 2, 140);
      ctx.fillText(`High Score: ${highScore}`, CANVAS_WIDTH / 2, 180);
      
      // Draw sample bird
      drawBird(ctx, { y: 200, velocity: 0 });
      
      ctx.textAlign = 'left';
    } else if (gameState === 'gameOver') {
      // Draw game over screen
      ctx.fillStyle = '#000000';
      ctx.font = '24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, 120);
      
      ctx.font = '16px monospace';
      ctx.fillText(`Score: ${score}`, CANVAS_WIDTH / 2, 150);
      ctx.fillText(`High Score: ${highScore}`, CANVAS_WIDTH / 2, 170);
      ctx.fillText('Click or Space to Restart', CANVAS_WIDTH / 2, 200);
      
      ctx.textAlign = 'left';
    }
  }, [gameState, bird, pipes, score, highScore, drawBackground, drawBird, drawPipe]);

  // Game loop effect
  useEffect(() => {
    const loop = () => {
      gameLoop();
      draw();
      gameLoopRef.current = requestAnimationFrame(loop);
    };

    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(loop);
    } else {
      draw();
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop, draw]);

  const jump = useCallback(() => {
    if (gameState === 'playing') {
      setBird(prev => ({ ...prev, velocity: JUMP_STRENGTH }));
      playSound('click');
    } else if (gameState === 'menu') {
      setGameState('playing');
      setBird({ y: 200, velocity: 0 });
      setPipes([]);
      setScore(0);
      playSound('click');
    } else if (gameState === 'gameOver') {
      setGameState('menu');
      playSound('click');
    }
  }, [gameState, playSound, JUMP_STRENGTH]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      jump();
    }
  }, [jump]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const resetGame = () => {
    setGameState('menu');
    setBird({ y: 200, velocity: 0 });
    setPipes([]);
    setScore(0);
    playSound('click');
  };

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Game Header */}
      <div className="border-b-2 border-black p-3 bg-white">
        <div className="flex items-center justify-between">
          <h3 className="font-pixel text-sm">🌤️ Flappy Heaven</h3>
          <div className="flex space-x-2">
            <button
              onClick={resetGame}
              className="pixel-button text-xs px-3 py-1 bg-yellow-200 hover:bg-yellow-300"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="pixel-border bg-white p-2">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onClick={jump}
            className="cursor-pointer pixel-border"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="border-t-2 border-black p-3 bg-white">
        <div className="text-center">
          <div className="text-xs font-mono text-gray-600 mb-2">
            {gameState === 'menu' && 'Click canvas or press Space to start flying!'}
            {gameState === 'playing' && 'Click or Space to flap • Avoid the pipes!'}
            {gameState === 'gameOver' && 'Game Over! Click or Space to restart'}
          </div>
          <div className="text-xs font-mono text-gray-500">
            Current: {score} • Best: {highScore} • Navigate through the clouds! ☁️
          </div>
        </div>
      </div>
    </div>
  );
}
