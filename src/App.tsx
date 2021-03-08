import React, { useCallback, useState, useRef } from "react";
import "./App.css";
import produce from "immer";

const numRows = 20;
const numCols = 20;

type directionType = {
  [key: string]: Array<number>;
};
const directions: directionType = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
};

const generateGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const App: React.FC = () => {
  const [grid, setGrid] = useState(generateGrid);

  const [gameStarted, setGameStarted] = useState(false);
  const gameStartedRef = useRef(gameStarted);
  gameStartedRef.current = gameStarted;

  const [direction, setDirection] = useState("R");
  const directionRef = useRef(direction);
  directionRef.current = direction;

  const [snakePositions, setSnakePositions] = useState([[0, 0]]);
  const snakePositionsRef = useRef(snakePositions);
  snakePositionsRef.current = snakePositions;

  const generateFoodPosition = () => {
    let newFoodPositionX = Math.floor(Math.random() * numRows);
    let newFoodPositionY = Math.floor(Math.random() * numCols);
    return [newFoodPositionX, newFoodPositionY];
  };

  const [foodPosition, setFoodPosition] = useState(generateFoodPosition);
  const foodPositionRef = useRef(foodPosition);
  foodPositionRef.current = foodPosition;

  const [isFoodPresent, setIsFoodPresent] = useState(false);
  const isFoodPresentRef = useRef(isFoodPresent);
  isFoodPresentRef.current = isFoodPresent;

  const resetGame = () => {
    setGrid(generateGrid);
    setGameStarted(false);
    setDirection("R");
    setSnakePositions([[0, 0]]);
  };

  const setCellColor = (cellValue: number) => {
    if (cellValue === 1) return "red";
    if (cellValue === 2) return "blue";
    return undefined;
  };

  const gameOver = () => {
    alert("Game Over!!!");
    resetGame();
    return;
  };

  const runGame = useCallback(() => {
    if (!gameStartedRef.current) return;
    const newHeadX: number =
      snakePositionsRef.current[0][0] + directions[directionRef.current][0];
    const newHeadY: number =
      snakePositionsRef.current[0][1] + directions[directionRef.current][1];

    //check for bounds
    if (
      newHeadX < 0 ||
      newHeadX >= numRows ||
      newHeadY < 0 ||
      newHeadY >= numCols
    )
      gameOver();

    //check if snake cuts itself
    //if ()

    let newPos = `${newHeadX},${newHeadY}`,
      foodPos = `${foodPositionRef.current[0]},${foodPositionRef.current[1]}`;
    console.log(`New position: ${newPos}`);
    console.log(`Food position: ${foodPos}`);
    let oldSnakePositions = snakePositionsRef.current;
    if (newPos === foodPos) {
      let newFoodPosition = generateFoodPosition();
      setFoodPosition(newFoodPosition);
      foodPositionRef.current = newFoodPosition;
      console.log(
        `Ate food! Now new Food position: ${newFoodPosition[0]},${newFoodPosition[1]}`
      );
    } else if (newPos !== foodPos) {
      oldSnakePositions.pop();
    }
    oldSnakePositions.unshift([newHeadX, newHeadY]);
    snakePositionsRef.current = oldSnakePositions;
    // console.log(
    //   `New snake positions: ${JSON.stringify(snakePositionsRef.current)}`
    // );
    setGrid((originalGrid) => {
      return produce(originalGrid, (copiedGrid) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) copiedGrid[i][j] = 0;
        }
        snakePositionsRef.current.forEach(([x, y]) => {
          copiedGrid[x][y] = 1;
        });
        copiedGrid[foodPositionRef.current[0]][foodPositionRef.current[1]] = 2;
        return copiedGrid;
      });
    });

    setTimeout(runGame, 300);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setGameStarted(!gameStarted);
          if (!gameStarted) {
            gameStartedRef.current = true;
            runGame();
          }
        }}
      >
        Start Game
      </button>
      <button onClick={() => {}}>Add to snake</button>
      <button
        onClick={() => {
          resetGame();
        }}
      >
        Stop
      </button>
      <div className="controls-container">
        <div>
          <button
            onClick={() => setDirection("U")}
            disabled={gameStarted && direction === "U"}
          >
            Up
          </button>
        </div>
        <div>
          <button
            onClick={() => setDirection("L")}
            disabled={gameStarted && direction === "L"}
          >
            Left
          </button>
          <button
            onClick={() => setDirection("R")}
            disabled={gameStarted && direction === "R"}
          >
            Right
          </button>
        </div>
        <div>
          <button
            onClick={() => setDirection("D")}
            disabled={gameStarted && direction === "D"}
          >
            Down
          </button>
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
                border: "0.01px solid green",
                margin: "2px",
                backgroundColor: setCellColor(grid[i][j]),
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default App;
