import React, { useState } from "react";
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
  return (
    <div className="grid">
      {grid.map((rows, i) =>
        rows.map((cols, j) => (
          <div
            key={`${i}${j}`}
            style={{
              width: 20,
              height: 20,
              border: "1px solid black",
              backgroundColor: grid[i][j] ? "red" : undefined,
            }}
          />
        ))
      )}
    </div>
  );
};

export default App;
