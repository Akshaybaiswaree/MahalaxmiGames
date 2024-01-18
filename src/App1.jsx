// import "./App.css";

// import React, { useEffect, useState } from "react";

// import { io } from "socket.io-client";

// const socket = io("https://andarbaharbacked.onrender.com", {
//   query: {
//     userId: Math.floor(Math.random() * Date.now()),
//   },
// });

// export default function App() {
//   const [gameState, setGameState] = useState({ value: "waiting" });
//   const [user, setUser] = useState(null);
//   const [coins, setCoins] = useState(50);
//   const [mainCard, setMainCard] = useState([]);
//   const [baharCards, setBaharCards] = useState([]);
//   const [andarCards, setAndarCards] = useState([]);
//   const [flag, setFlag] = useState(true);
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     socket.on("gameUpdate", (updatedGameState) => {
//       setGameState(updatedGameState.gamestate);
//       setMainCard(updatedGameState.mainCard);
//       console.log(mainCard);
//     });

//     socket.on("userDetails", (data) => {
//       setUser(data.user);
//     });

//     socket.on("bait", (data) => {
//       setUser(data);
//     });

//     return () => {
//       // clearInterval(intervalId);
//       socket.disconnect();
//     };
//   }, []); // Added mainCard to the dependency array
//   let intervalId;
//   if (gameState.value == 9) {
//     intervalId = setInterval(() => {
//       if (flag) {
//         setBaharCards([...baharCards, mainCard?.baharcards[index]]);
//         setFlag(!flag);
//       } else {
//         setAndarCards([...andarCards, mainCard?.baharcards[index]]);
//         setIndex((prev) => prev + 1);
//         setFlag(!flag);
//       }
//     }, 800);
//   }
//   if(gameState.value == 0){
//     clearInterval(intervalId)
//   }
//   const handleBait = (baitType) => {
//     const bait = {
//       baitType,
//       coins,
//       cardId: mainCard._id,
//     };
//     socket.emit("bait", bait);
//   };

//   return (
//     <>
//       <h1>{gameState?.value < 5 ? mainCard?.winstatus : ""}</h1>
//       <h2 className="count">{gameState?.value}</h2>
//       <h2>{mainCard?.main_card}</h2>
//       <div className="card-container">
//         <div>
//           {andarCards?.map((card, index) => (
//             <div className="card">{card}</div>
//           ))}
//         </div>
//         <div className="card">
//           {baharCards?.map((card, index) => (
//             <div>{card}</div>
//           ))}
//         </div>
//       </div>
//       <h3 className="state">{gameState?.value <= 10 ? "Freeze" : "Waiting"}</h3>

//       <button
//         onClick={() => handleBait("andar")}
//         disabled={gameState?.value <= 10}
//       >
//         Andar
//       </button>
//       <button
//         onClick={() => handleBait("bahar")}
//         disabled={gameState?.value <= 10}
//       >
//         Bahar
//       </button>

//       <h2>user</h2>
//       <select
//         onChange={(e) => {
//           setCoins(e.target.value);
//         }}
//       >
//         <option value="50">50</option>
//         <option value="100">100</option>
//         <option value="250">250</option>
//         <option value="500">500</option>
//         <option value="1000">1000</option>
//       </select>
//       <p>coins- {user?.coins}</p>
//       <p>id-{user?._id}</p>
//       <p>user id-{user?.userId}</p>
//     </>
//   );
// }

// socketClient.js

// socketClient.js

import { useEffect, useState } from "react";

import io from "socket.io-client";

// import socket from "./socket";

const socket = io("https://dragenliontiger.onrender.com/");

const Socket1 = () => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState("10"); 
  const [playerHands, setPlayerHands] = useState(null);
  const [winner, setWinner] = useState(null);
// console.log("countdown",countdown)
// console.log("userBalance",userBalance)
// console.log("selectedCoin",selectedCoin)
console.log("playerHands",playerHands)
// console.log("winner",winner)


  
  useEffect(() => {
    const   handleDealCards = (data) => {
      const winner = data.winner;
      // console.log("Received dealt cards:", data);
      if (data.playerHands) {
        setPlayerHands(data.playerHands);
        setWinner(winner);
      } else {
        // console.log("Player hands not found in data:", data);
      }
    };

    const handleCountdown = (data) => {
      // console.log("Received countdown:", data.countdown);
      setCountdown(data.countdown);
    };

    const handleNewBet = (bet) => {
      // console.log("Received new bet:", bet);
      setSelectedChoice(bet.choice);
      setUserBalance(bet.userBalance);
    };
    const handleNewRound = () => {
      // console.log("Starting a new round");
      setSelectedChoice(null);
      setPlayerHands([]);
    };
    const handleBalanceUpdate = (data) => {
      // console.log("Received balance update:", data);
      setUserBalance(data.balance);
    };
    const handleGetBalance = () => {
      const userId = "659f512690a104c5ddc07269"; // Provide the user ID
      socket.emit("getBalance", userId);
    };
    handleGetBalance();

    socket.on("dealCards", handleDealCards);
    socket.on("countdown", handleCountdown);
    socket.on("newBet", handleNewBet);
    socket.on("newRound", handleNewRound);
    socket.on("balanceUpdate", handleBalanceUpdate);

    return () => {
      socket.off("dealCards", handleDealCards);
      socket.off("countdown", handleCountdown);
      socket.off("newBet", handleNewBet);
      socket.off("newRound", handleNewRound);
      socket.off("balanceUpdate", handleBalanceUpdate);
    };
  }, []);

  const handlePlaceBet = (selectedChoice) => {
    const userId = "659f512690a104c5ddc07269";
    const coins = parseInt(selectedCoin, 10); // Parse the selectedCoin to an integer
    socket.emit("placeBet", { userId, selectedChoice, coins });
  };

  return (
    <div>
      <h2>Winner : {winner}</h2>
      <h2> Deal Cards:</h2>

      {playerHands &&
        Object.entries(playerHands).map(([player, card], index) => (
          <div key={index}>
            <h3>{player} Card:</h3>
            <h5>{card}</h5>
          </div>
        ))}

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

      <button onClick={() => handlePlaceBet("Dragen")}>Bet on Dragon</button>
      <button onClick={() => handlePlaceBet("Tiger")}>Bet on Tiger</button>
      <button onClick={() => handlePlaceBet("Lion")}>Bet on Lion</button>
    </div>
  );
};
export default Socket1;
