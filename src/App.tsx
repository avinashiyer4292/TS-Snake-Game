import React, { useCallback, useState, useRef } from "react";
import "./App.css";
import Game from "./components/Game";

const App: React.FC = () => {
  return (
    <div className="App">
      <p className="game-heading">Welcome to Snake Game!</p>
      <p className="game-instructions">
        Choose difficulty and press Start to play! Use arrow keys to move the
        snake!
      </p>
      <Game />
    </div>
  );
};

export default App;
