import { Box, Center, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
// import "./App.css";
// let userId = localStorage.getItem("userId") || "";
// if (userId == "") {
//   userId = Math.floor(Math.random() * Date.now());
//   localStorage.setItem("userId", userId);
// }

const socket = io("https://dragontiger-backend.onrender.com", {
  query: {
    userId: Math.floor(Math.random() * Date.now()),
  },
});
function DragonTesting() {
  const [gameState, setGameState] = useState({ value: "waiting" });
//  console.log(gameState , "gameState")
  const [user, setUser] = useState(null);
//   console.log(user , "user")
  const [coins, setCoins] = useState(50);
  //   console.log(coins , "coins")
  const [mainCard, setMainCard] = useState([]);
console.log(mainCard , "maincard")

  useEffect(() => {
    // Listen for game state updates from the server
    socket.on("gameUpdate", (updatedGameState) => {
      setGameState(updatedGameState.gamestate);

      //console.log(updatedGameState , "updatedGameState");
      setMainCard(updatedGameState.gameCard);
      // console.log(updatedGameState.mainCard);
    });

    socket.on("userDetails", (data) => {
     // console.log(data.user.coins , "data");
      setUser(data.user);
    });

    socket.on("bait", (data) => {
      setUser(data);
      console.log(data);
      // setUser(data.user);
    });

    console.log(mainCard , "maincard");

    return () => {
      // Clean up socket connection on component unmount

      socket.disconnect();
    };
  }, []);
  console.log(socket);

  console.log(gameState);
  const handleBait = (baitType) => {
    const bait = {
      baitType,
      coins,
      cardId: mainCard._id,
    };
    console.log(bait , "bait");
    socket.emit("bait", bait);
  };

  return (
    <>
      <Box
        border={"1rem"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"80vh"}
      >
        <h1>{gameState.value < 5 ? mainCard?.winstatus : ""}</h1>
        <h2 className="count">{gameState?.value}</h2>
        {/* <h2>{mainCard?.main_card}</h2> */}
        <div className="cardsgame">
          <div>
            {/* {mainCard?.andarcards?.map((card) => (
            <h3>{card}</h3>
          ))} */}
            {mainCard?.dragoncard}
          </div>
          <div>
            {/* {mainCard?.baharcards?.map((card) => (
            <h3>{card}</h3>
          ))} */}
            {mainCard?.tigercard}
          </div>
        </div>
        <h3 className="state">
          {gameState?.value <= 10 ? "Freeze" : "Waiting"}
        </h3>

        <button
          onClick={() => handleBait("dragon")}
          disabled={gameState?.value <= 10}
        >
          Dragon
        </button>
        <button
          onClick={() => handleBait("tie")}
          disabled={gameState?.value <= 10}
        >
          Tie
        </button>
        <button
          onClick={() => handleBait("tiger")}
          disabled={gameState?.value <= 10}
        >
          Tiger
        </button>
        {/* <button onClick={handleClick}>click</button> */}
        <h2>user</h2>
        <select
          onChange={(e) => {
            setCoins(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="250">250</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </select>
        <p>coins- {user?.coins}</p>
        <p>id-{user?._id}</p>
        <p>user id-{user?.userId}</p>
      </Box>
    </>
  );
}

export default DragonTesting;
