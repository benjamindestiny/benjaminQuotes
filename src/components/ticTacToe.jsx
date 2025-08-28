import { useRef, useState } from "react";
import circle from "../assets/circle-solid.svg"
import cross from "../assets/cross-sign.svg"


const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [board, setBoard] = useState(Array(9).fill("")); // Use state for board
  let titleRef = useRef(null);

  const toggle = (index) => {
    if (lock || board[index] !== "") return;

    const newBoard = [...board];
    if (count % 2 === 0) {
      newBoard[index] = "x";
    } else {
      newBoard[index] = "o";
    }

    setBoard(newBoard);
    setCount(count + 1);
    checkWin(newBoard);
  };

  const checkWin = (newBoard) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        won(newBoard[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `🎉 Congratulations: <img src=${cross} class="w-6 inline" /> wins`;
    } else {
      titleRef.current.innerHTML = `🎉 Congratulations: <img src=${circle} class="w-6 inline" /> wins`;
    }
  };

  const reset = () => {
    setLock(false);
    setBoard(Array(9).fill(""));
    setCount(0);
    titleRef.current.innerHTML = "Tic Tac Toe 🎮";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 ref={titleRef} className="text-3xl font-bold mb-6 text-yellow-400">
        Tic Tac Toe 🎮
      </h1>

      <div className="grid grid-cols-3 gap-2">
        {board.map((val, index) => (
          <div
            key={index}
            onClick={() => toggle(index)}
            className="w-24 h-24 flex items-center justify-center bg-gray-800 border-2 border-yellow-400 rounded-xl cursor-pointer hover:bg-gray-700 transition"
          >
            {val === "x" && <img src={cross} alt="X" className="w-12" />}
            {val === "o" && <img src={circle} alt="O" className="w-12" />}
          </div>
        ))}
      </div>

      <button
        onClick={reset}
        className="mt-6 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-xl shadow-md text-black font-semibold transition"
      >
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
