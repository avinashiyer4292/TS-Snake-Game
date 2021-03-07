import React, { useCallback, useState } from "react";
import "./App.css";

const numRows = 50;
const numCols = 50;

const App: React.FC = () => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    console.log(rows);
    return rows;
  });

  const [gameStarted, setGameStarted] = useState(false);

  const runGame = useCallback(() => {
    if (!gameStarted) return;
    setTimeout(runGame, 1000);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setGameStarted(!gameStarted);
        }}
      >
        Start Game
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((cols, j) => (
            <div
              key={`${i}${j}`}
              style={{
                width: 20,
                height: 20,
                border: "0.1px solid green",
                margin: "2px",
                backgroundColor: grid[i][j] ? "red" : undefined,
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default App;
