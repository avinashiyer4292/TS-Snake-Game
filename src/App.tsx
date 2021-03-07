import React, { useCallback, useState, useRef } from "react";
import "./App.css";

const numRows = 50;
const numCols = 50;

type directionType = {
  [key: string]: Array<number>;
};
const directions: directionType = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
};

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
  const gameStartedRef = useRef(gameStarted);
  gameStartedRef.current = gameStarted;

  const [direction, setDirection] = useState("R");
  const directionRef = useRef(direction);
  directionRef.current = direction;

  const [snakePositions, setSnakePositions] = useState([0, 0]);
  const snakePositionsRef = useRef(snakePositions);
  snakePositionsRef.current = snakePositions;

  const runGame = useCallback(() => {
    if (!gameStartedRef.current) return;
    let newHeadX =
      snakePositionsRef.current[0] + directions[directionRef.current][0];
    let newHeadY =
      snakePositionsRef.current[1] + directions[directionRef.current][1];

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
      <div className="controls-container">
        <div>
          <button disabled={gameStarted && direction === "U"}>Up</button>
        </div>
        <div>
          <button disabled={gameStarted && direction === "L"}>Left</button>
          <button disabled={gameStarted && direction === "R"}>Right</button>
        </div>
        <div>
          <button disabled={gameStarted && direction === "D"}>Down</button>
        </div>
      </div>
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
