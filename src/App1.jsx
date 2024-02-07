// import { useEffect, useState } from "react";

// import io from "socket.io-client";

// const socket = io("https://highcardsbackend.onrender.com");

// const App = () => {
//   const [timer, setTimer] = useState(0);
//   const [currentGame, setGame] = useState();
//   // const [gameHistory, setHistory] = useState();

//   useEffect(() => {
//     // Set up socket event listeners

//     // when user join
//     // socket.on("me", (id) => {
//     //   console.log(id, "id");
//     // });
//     socket.on("userDetails", (data) => {
//       console.log("User joined:", data);
//     });
//     // for timer
//     socket.on("timer", (data) => {
//       setTimer(data.timer);
//       console.log(data, "timer");
//     });

//     // when game is created 42sec
//     socket.on("game:create", (data) => {
//       console.log(data, "game initiate");
//     });

//     // game history 0sec
//     socket.on("game:history", (data) => {
//       console.log(data, "game history");
//     });

//     // game result in 45sec
//     socket.on("game:result", (result) => {
//       console.log(result, `game${timer}`, "cards");
//       setGame(result.gameCard);
//       // setHistory(result.gameHistory);
//     });

//     return () => {
//       // Clean up event listeners
//       socket.off("me");
//       socket.off("timer");
//       socket.off("game:create");
//       socket.off("game:result");
//       socket.off("game:history");
//     };
//   }, [socket]);

//   const placeBet = (betType, coins, gameId) => {
//     // Send user bet to the server
//     let data = { baitType: betType, coins: coins, gameId: gameId };
//     console.log(betType, coins, gameId, "beting");
//     socket.emit("bait", data);
//   };

//   return (
//     <div className="app">
//       <p>Timer: {timer}s</p>
//       <button
//         disabled={timer <= 22 || !currentGame}
//         onClick={() => placeBet(0, 50, currentGame._id)}
//       >
//         1
//       </button>
//       <button
//         disabled={timer <= 22 || !currentGame}
//         onClick={() => placeBet(1, 70, currentGame._id)}
//       >
//         2
//       </button>
//       <button
//         disabled={timer <= 22 || !currentGame}
//         onClick={() => placeBet(2, 1000, currentGame._id)}
//       >
//         3
//       </button>
//       <button
//         disabled={timer <= 22 || !currentGame}
//         onClick={() => placeBet(3, 1520, currentGame._id)}
//       >
//         4
//       </button>
//       <button
//         disabled={timer <= 22 || !currentGame}
//         onClick={() => placeBet(4, 500, currentGame._id)}
//       >
//         5
//       </button>
//       <button
//         disabled={timer <= 22 || !currentGame}
//         onClick={() => placeBet(5, 810, currentGame._id)}
//       >
//         6
//       </button>
//     </div>
//   );
// };

// export default App;
// socketClient.js

import React, { useEffect, useState } from "react";

import { io } from "socket.io-client";

// import socket from "./socket2";
const socket = io("https://muflish-one-days.onrender.com/", {
  query: {
    userId: Math.floor(Math.random() * Date.now()),
  },
  transports: ["websocket"],
});

const Socket2 = () => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState("10");
  const [playerHands, setPlayerHands] = useState(null);
  const [winner, setWinner] = useState(null);
  const [User, setUser] = useState(null);
  const [winHistory, setWinHistory] = useState(null);

  useEffect(() => {
    const handleDealCards = (data) => {
      handleGetBalance();
      const winner = data.winner;
      console.log("Received dealt cards:", data);
      setWinHistory(data.winHistory);
      setWinner(data.winner);
      // Store cards for the current round
      if (data.singlecard) {
        setPlayerHands(data.singlecard);
      } else {
        console.error("Invalid or missing singlecard data:", data.singlecard);
      }
    };

    const handleCountdown = (data) => {
      console.log("Received countdown:", data.countdown);
      setCountdown(data.countdown);
    };

    const handleNewBet = (bet) => {
      console.log("Received new bet:", bet);
      // setSelectedChoice(bet.choice);
    };
    const handleNewRound = () => {
      console.log("Starting a new round");
      setSelectedChoice(null);
      setPlayerHands([]);
    };
    const handleBalanceUpdate = (data) => {
      console.log("Received balance update:", data);
      setUserBalance(data.balance);
    };
    const handleGetBalance = () => {
      socket.emit("getBalance");
    };
    const handleuser = (data) => {
      setUser(data.user.userId);
      setUserBalance(data.user.balance);
    };
    const handleWinHistory = (data) => {
      console.log("Received win history:", data);
      if (data && data.winStatuses) {
        setWinHistory(data.winStatuses);
      } else {
        console.error("Invalid or missing win history data.");
      }
    };

    handleGetBalance();
    socket.on("dealSingleCard", handleDealCards);
    socket.on("countdown", handleCountdown);
    socket.on("newBet", handleNewBet);
    socket.on("newRound", handleNewRound);
    socket.on("balanceUpdate", handleBalanceUpdate);
    socket.on("getuser", handleuser);
    socket.on("WinHistory", handleWinHistory);

    return () => {
      socket.off("dealSingleCard", handleDealCards);
      socket.off("countdown", handleCountdown);
      socket.off("newBet", handleNewBet);
      socket.off("newRound", handleNewRound);
      socket.off("balanceUpdate", handleBalanceUpdate);
      socket.off("getuser", handleuser);
      socket.off("WinHistory", handleWinHistory);
    };
  }, []);

  const handlePlaceBet = (selectedChoice) => {
    const coins = parseInt(selectedCoin, 10); // Parse the selectedCoin to an integer
    socket.emit("placeBet", { selectedChoice, coins });
  };

  return (
    <div>
      <h2>Winner : {winner}</h2>
      <h2>User ID : {User}</h2>
      <h2>Deal Cards: {JSON.stringify(playerHands)}</h2>
      {countdown !== null && <p>Countdown: {countdown}</p>}
      <p>User Balance: {userBalance}</p>
      <label htmlFor="quantity">Select a Coin:</label>
      <select
        id="quantity"
        name="quantity"
        onChange={(e) => setSelectedCoin(e.target.value)}
        value={selectedCoin}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <br />

      <button onClick={() => handlePlaceBet("PlayerA")}>Bet on Player A</button>
      <button onClick={() => handlePlaceBet("PlayerB")}>Bet on Player B</button>
      <h2>Win History:</h2>
      {winHistory &&
        winHistory
          .slice()
          .reverse()
          .map((winStatus, index) => (
            <div key={index}>
              <p>{winStatus}</p>
            </div>
          ))}
    </div>
  );
};

export default Socket2;
