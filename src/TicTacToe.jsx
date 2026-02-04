import React, { useState } from 'react';
import "./App.css";

function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (const [a, b, c] of winningLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] }
    }
  }
  return null;
}

function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const result = calculateWinner(squares);
  const winner = result?.winner;
  const isDraw = squares.every(Boolean) && !result;


  const handleClick = (idx) => {
    if (squares[idx] || winner) return;

    const newSquares = [...squares];
    newSquares[idx] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);

    setXIsNext(!xIsNext)
  }

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const status = winner ? `Winner: ${winner}` : isDraw ? "It's a Draw!" : `Next Player: ${xIsNext ? 'X' : 'O'}`

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="status" id="status">{status}</div>
      <div className="board">
        {squares.map((square, index) => (
          <button
            id={`cell-${index}`}
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>
      <button className="restart-button" onClick={restartGame}>Restart Game</button>
    </div>
  );
}

export default TicTacToe;
