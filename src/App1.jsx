import { useEffect, useState } from "react";

import { io } from "socket.io-client";

const userId = Math.floor(Math.random() * Date.now());
console.log("userId on the client side:", userId);

const socket = io("https://dragenliontiger.onrender.com/", {
  query: {
    userId,
  },
  transports: ["websocket"],
});

const Socket1 = () => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState("10"); // Default value, you can change it based on your needs
  const [playerHands, setPlayerHands] = useState(null);
  const [winner, setWinner] = useState(null);
  const [userId, setuserId] = useState(null);

  // console.log("userId", userId);
  // console.log("userBalance", userBalance);
  console.log("userBalance", userBalance);


  useEffect(() => {
    const handleDealCards = (data) => {
      const winner = data.winner;
      console.log("Received dealt cards:", data);
      if (data.playerHands) {
        setPlayerHands(data.playerHands);
        setWinner(winner);
      } else {
        console.log("Player hands not found in data:", data);
      }
    };

    const handleCountdown = (data) => {
      console.log("Received countdown:", data.countdown);
      setCountdown(data.countdown);
    };

    const handleNewBet = (bet) => {
      console.log("Received new bet:", bet);
      setSelectedChoice(bet.choice);
      setUserBalance(bet.userBalance);
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
      // const userId = "659f512690a104c5ddc07269"; // Provide the user ID
      socket.emit("getBalance");
    };
    const handleuser = (data) => {
      socket.emit("getuser");
      console.log("User : - ", data.user);
      setuserId(data.user.userId);
    };
    handleGetBalance();

    socket.on("dealCards", handleDealCards);
    socket.on("countdown", handleCountdown);
    socket.on("newBet", handleNewBet);
    socket.on("newRound", handleNewRound);
    socket.on("balanceUpdate", handleBalanceUpdate);
    socket.on("getuser", handleuser);
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
    // const userId = "659f512690a104c5ddc07269";
    const coins = parseInt(selectedCoin, 10); 
    socket.emit("placeBet", { selectedChoice, coins });
  };

  return (
    <div>
      <h2>Winner : {winner}</h2>
      <p>User Id: {userId}</p>
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
