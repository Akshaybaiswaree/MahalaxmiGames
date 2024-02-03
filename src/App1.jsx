import { useEffect, useState } from "react";

import io from "socket.io-client";

const socket = io("https://highcardsbackend.onrender.com");

const App = () => {
  const [timer, setTimer] = useState(0);
  const [currentGame, setGame] = useState();
  const [gameHistory, setHistory] = useState();
  socket.on("userDetails", (data) => {
    console.log("User joined:", data);
  });
  useEffect(() => {
    // Set up socket event listeners

    // when user join
    socket.on("me", (id) => {
      console.log(id, "id");
    });

    // for timer
    socket.on("timer", (data) => {
      setTimer(data.timer);
      console.log(data, "timer");
    });

    // when game is created 42sec
    socket.on("game:create", (data) => {
      console.log(data, "game initiate");
    });

    // game history 0sec
    socket.on("game:history", (data) => {
      console.log(data, "game history");
    });

    // game result in 22sec
    socket.on("game:result", (result) => {
      console.log(result, `game${timer}`, "cards");
      setGame(result.gameCard);
      setHistory(result.gameHistory);
    });

    return () => {
      // Clean up event listeners
      socket.off("me");
      socket.off("timer");
      socket.off("game:create");
      socket.off("game:result");
      socket.off("game:history");
    };
  }, [socket]);

  const placeBet = (betType, coins, gameId) => {
    // Send user bet to the server
    let data = { baitType: betType, coins: coins, gameId: gameId };
    console.log(betType, coins, gameId, "beting");
    socket.emit("bait", data);
  };

  return (
    <div className="app">
      <p>Timer: {timer}s</p>
      <button
        disabled={timer <= 22 || !currentGame}
        onClick={() => placeBet(0, 50, currentGame._id)}
      >
        1
      </button>
      <button
        disabled={timer <= 22 || !currentGame}
        onClick={() => placeBet(1, 70, currentGame._id)}
      >
        2
      </button>
      <button
        disabled={timer <= 22 || !currentGame}
        onClick={() => placeBet(2, 1000, currentGame._id)}
      >
        3
      </button>
      <button
        disabled={timer <= 22 || !currentGame}
        onClick={() => placeBet(3, 1520, currentGame._id)}
      >
        4
      </button>
      <button
        disabled={timer <= 22 || !currentGame}
        onClick={() => placeBet(4, 500, currentGame._id)}
      >
        5
      </button>
      <button
        disabled={timer <= 22 || !currentGame}
        onClick={() => placeBet(5, 810, currentGame._id)}
      >
        6
      </button>
    </div>
  );
};

export default App;
