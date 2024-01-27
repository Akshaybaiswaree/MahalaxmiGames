// socketClient.js
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://twocardtp.onrender.com/", {
  query: {
    userId: Math.floor(Math.random() * Date.now()),
  },
  transports: ["websocket"],
});

const TwoCardsPattiTesting = () => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState("10"); // Default value, you can change it based on your needs
   const [playerHands, setPlayerHands] = useState(null);
   const [winner, setWinner] = useState(null);
   const [User, setUser] = useState(null);
  useEffect(() => {
    const handleDealCards = (data) => {
      handleGetBalance();
      const winner = data.winner;
      console.log("Received dealt cards:", data);
      if (data.playerHands) {
        setPlayerHands(data.playerHands);
        setWinner(winner);
      }  else {
        console.log("Player hands not found in data:", data);
      }

    };

    const handleCountdown = (data) => {
    //   console.log("Received countdown:", data.countdown);
      setCountdown(data.countdown);
    };

    const handleNewBet = (bet) => {
    //   console.log("Received new bet:", bet);
      setSelectedChoice(bet.choice);
    };
    const handleNewRound = () => {
    //   console.log("Starting a new round");
      setSelectedChoice(null);
      setPlayerHands([]);
    };
    const handleBalanceUpdate = (data) => {
    //   console.log("Received balance update:", data);
      setUserBalance(data.balance);
    };
    const handleGetBalance = () => {
      socket.emit("getBalance");
    };
    const handleuser = (data) => {
      setUser(data.user.userId);
      setUserBalance(data.user.balance);
    console.log("data123" , data)
    };
    handleGetBalance();
    socket.on("dealCards", handleDealCards);
    socket.on("countdown", handleCountdown);
    socket.on("newBet", handleNewBet);
    socket.on("newRound", handleNewRound);
    socket.on("balanceUpdate", handleBalanceUpdate);
    socket.on("getuser",handleuser);

    return () => {
      socket.off("dealCards", handleDealCards);
      socket.off("countdown", handleCountdown);
      socket.off("newBet", handleNewBet);
      socket.off("newRound", handleNewRound);
      socket.off("balanceUpdate", handleBalanceUpdate);
       socket.off("getuser", handleuser);
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

      <button onClick={() => handlePlaceBet("PlayerA")}>Bet on Player A</button>
      <button onClick={() => handlePlaceBet("PlayerB")}>Bet on Player B</button>
      </div>
  );
};

export default TwoCardsPattiTesting;
