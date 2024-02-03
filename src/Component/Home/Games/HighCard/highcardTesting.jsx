import React, { useEffect, useState } from "react";
 // Import your CSS file for styling

// const Card = ({ value }) => (
//   <div className="card">
//     <span>{value}</span>
//   </div>
// );

// const Player = ({ name, cards }) => (
//   <div className="player">
//     <h2>{name}</h2>
//     <div className="cards-container">
//       {cards.map((card, index) => (
//         <Card key={index} value={card} />
//       ))}
//     </div>
//   </div>
// );

import io from "socket.io-client";


const socket = io("https://high-card-game-be.vercel.app/");

const HighCardTesting = () => {
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState(null);

  

  const [timer, setTimer] = useState(0);
  const [currentGame, setGame] = useState();
  const [gameHistory, setHistory] = useState();
  console.log(currentGame,"currentGame")

  
  // Listen for the 'userJoined' event to get the ID of the newly joined user
  socket.on("userDetails", (data) => {
    console.log("User joined:", data);
  });

  useEffect(() => {
    // Set up socket event listeners


    socket.on('me', (id) => {
      console.log(id,"id")
          });

    socket.on("gameUpdate", (data) => {
      setTimer(data.timer)
      console.log(data, "timer");
    });


    socket.on("game", (result) => {
      console.log(result, `game${timer}` );
      setGame(result.gameCard)
      setHistory(result.gameHistory)
    });

    return () => {
      // Clean up event listeners
      socket.off("me");
      socket.off("gameUpdate");
      socket.off("game");
    };
  }, [socket]);

  const placeBet = (betType,coins,gameId) => {
    // Send user bet to the server
    let data = {baitType:betType,coins:coins,gameId:gameId}
    console.log(betType,coins,gameId,"beting")
    socket.emit("bait", data);
  };

  return (
    <div className="app">
      {/* <h1>Teen Patti Two</h1>
      <div className="controls">
        <label>Number of Players: </label>
        <input type="number" min="2" max="4" onChange={(e) => startGame(e.target.value)} />
      </div>
      <div className="game-container">
        {players.map((player, index) => (
          <Player key={index} name={player.name} cards={player.cards} />
        ))}
      </div>
      {winner && <p className="winner">
      <span>Winner: {winner.playerName}</span>
      <br/>
      <span>Hand: {winner.cards}</span>
      <br/>
      <span>HandRank: {winner.handRank}</span>
      </p>} */}

      <p>Timer: {timer}s</p>
      <button disabled={ timer<=22 || !currentGame } onClick={() => placeBet(0,50,currentGame._id)}>1</button>
      <button disabled={ timer<=22 || !currentGame } onClick={() => placeBet(1,70,currentGame._id)}>2</button>
      <button disabled={ timer<=22 || !currentGame } onClick={() => placeBet(2,1000,currentGame._id)}>3</button>
      <button disabled={ timer<=22 || !currentGame } onClick={() => placeBet(3,1520,currentGame._id)}>4</button>
      <button disabled={ timer<=22 || !currentGame } onClick={() => placeBet(4,500,currentGame._id)}>5</button>
      <button disabled={ timer<=22 || !currentGame } onClick={() => placeBet(5,810,currentGame._id)}>6</button>

    </div>
  );
};

export default HighCardTesting;
