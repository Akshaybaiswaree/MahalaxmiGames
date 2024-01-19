import {
  AspectRatio,
  Box,
  Button,
  ChakraProvider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
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
export default function DragonTigerLion() {
  const [timer, setTimer] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [availableBal, setAvailableBal] = useState("");
  const [matchId, setMatchId] = useState("");
  const [selectBet, setSelectBet] = useState("");
  const [selectCoins, setSelectCoins] = useState("10");
  const [dragonCards, setDragonCards] = useState("null");
  const [tigerCards, setTigerCards] = useState("null");
  const [lionCards, setLionCards] = useState("null");
  // const [gameCards, setGamesCards] = useState("");
  const [winnerStatus, setWinnerStatus] = useState("Wait!!");
  // console.log("availableBal", availableBal);
  console.log("selectCoins", selectCoins);

  useEffect(() => {
    const handleGameCards = (data) => {
      if (data.playerHands) {
        setDragonCards(data.playerHands.Dragen);
        setTigerCards(data.playerHands.Tiger);
        setLionCards(data.playerHands.Lion);
        // setGamesCards(data.playerHands);
        setWinnerStatus(data.winner);
      } else {
        console.log("Cards is not here", data);
      }
    };

    const handleTimer = (data) => {
      setTimer(data.countdown);
    };

    const handlePlayerId = (data) => {
      socket.emit("getuser");
      setPlayerId(data.user.userId);
      setMatchId(data.user._id);
    };

    const handlePlayerBalance = (data) => {
      console.log("Received balance update:", data);
      setAvailableBal(data.balance);
    };

    const handleGetUserBalance = () => {
      socket.emit("getBalance");
    };


    const handleBet = (bet) => {
      console.log("new bet", bet);
      setSelectBet(bet.choice);
      setAvailableBal(bet.userBalance);
    };

    const handleNewRound = () => {
      setSelectBet(null);
      setDragonCards([]);
      setTigerCards([]);
      setLionCards([]);
      // setGamesCards([]);
      setWinnerStatus(null);
    };
    handleGetUserBalance();
    
    socket.on("countdown", handleTimer);
    socket.on("balanceUpdate", handlePlayerBalance);
    socket.on("getuser", handlePlayerId);
    socket.on("newBet", handleBet);
    socket.on("newRound", handleNewRound);
    socket.on("dealCards", handleGameCards);
    return () => {
      socket.off("countdown", handleTimer);
      socket.off("balanceUpdate", handlePlayerBalance);
      socket.off("getuser", handlePlayerId);
      socket.off("newBet", handleBet);
      socket.off("newRound", handleNewRound);
      socket.off("dealCards", handleGameCards);
    };
  }, []);

  const handleBetting = (selectBet) => {
    if (availableBal <= 0) {
      alert("Insufficient Funds");
      return;
    }
    const coins = parseInt(selectCoins, 10);
    socket.emit("placeBet", { selectBet, coins });
  };

  return (
    <>
      <ChakraProvider>
        <Box width="65%">
          <Flex justify="space-between" align="center" mb="2">
            <Text
              fontSize="24px"
              fontWeight="bold"
              borderRadius="10px"
              position="relative"
            >
              Dragon Tiger Lion
            </Text>
            <Button variant="outline" colorScheme="blue" ml="2">
              Rules
            </Button>
          </Flex>
          <AspectRatio minHeight="50%" controls>
            <Box
              // border="4px solid #333"
              backgroundImage="url('/DragonTigerLion/DragonTigerLion.webp')"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="top"
              backgroundSize="cover"
              backgroundPosition={`center 100%`}
              backgroundRepeat="no-repeat"
              position="relative"
            >
              <Text
                border="1px solid white"
                padding="20px"
                width="15%"
                height="20%"
                borderRadius="50%"
                position="absolute"
                top="5"
                right="10"
                color="white"
                fontWeight="bold"
              >
                {timer}
              </Text>
              {timer <= 10 && (
                <Text
                  border="1px solid white"
                  padding="30px"
                  // width="15%"
                  // height="20%"
                  borderRadius="50%"
                  position="absolute"
                  top="5"
                  left="10"
                  color="white"
                  fontWeight="bold"
                  // alignItems="center"
                >
                  <span>Winner:</span> {winnerStatus}
                </Text>
              )}

              {timer <= 20 && (
                <Box
                  // border="2px solid yellow"
                  width="100%"
                  height="50%"
                  display="flex"
                  justifyContent="center"
                  position="absolute"
                  bottom="0"
                  alignItems="center"
                >
                  <Image
                    // src={`/cards/${gameCards.Dragen}`}
                    src={`/cards/${dragonCards}`}
                    // alt={`dragen${gameCards.Dragen}`}
                    alt={`dragen${dragonCards}`}
                    position="absolute"
                    top="38%"
                    left="20.8%"
                    width="6%"
                    height="21%"
                  />
                  <Image
                    // src={`/cards/${gameCards.Lion}`}
                    src={`/cards/${lionCards}`}
                    // alt={`tiger${gameCards.Lion}`}
                    alt={`lion${lionCards}`}
                    position="absolute"
                    top="38%"
                    right="19.5%"
                    width="6%"
                    height="21%"
                  />
                  <Image
                    // src={`/cards/${gameCards.Tiger}`}
                    src={`/cards/${tigerCards}`}
                    // alt={`lion${gameCards.Tiger}`}
                    alt={`tiger${tigerCards}`}
                    position="absolute"
                    top="38%"
                    width="6%"
                    height="21%"
                  />
                </Box>
              )}
            </Box>
          </AspectRatio>
        </Box>

        {/* 10 Mini Boxes */}
        <Box
          width="65%"
          height="15%"
          // border="2px solid darkgreen"
          display="flex"
          position="relative"
        >
          {[...Array(10)].map((_, index) => (
            <Text
              border="2px solid grey"
              key={index}
              fontSize="20px"
              color={index % 2 === 0 ? "#333" : "#2b329b"}
              width="100%"
              height="50%"
              align="center"
              justifyContent="space-around"
              fontWeight="bold"
            >
              {index % 3 === 0 ? "D" : index % 3 === 1 ? "T" : "L"}
            </Text>
          ))}

          <Text
            position="absolute"
            bottom="0"
            left="10%"
            fontWeight="bold"
            border="2px solid darkblue"
            padding="0.3rem"
          >
            Match Id: {matchId}
          </Text>
          <Button
            width="20%"
            variant="outline"
            colorScheme="blue"
            position="absolute"
            bottom="0"
            right="10%"
          >
            Player History
          </Button>
        </Box>
        <Box
          // border="5px dotted blue"
          width="30%"
          height="80%"
          position="absolute"
          right="0"
          top="35%"
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
        >
          <Box
            border="20px solid #333"
            width="100%"
            justifyContent="center"
            align="center"
            borderRadius="10%"
          >
            <Box backgroundColor="#2d6431" padding="0.5rem">
              <Text fontSize="18px" fontWeight="bold" color="white">
                Available Credit
              </Text>
              <Text
                fontSize="18px"
                margin="0 0 0.5rem"
                fontWeight="bold"
                color="white"
              >
                ${availableBal}
              </Text>
            </Box>

            <Box backgroundColor="#e0e0e0" padding="0.5rem">
              <Text fontSize="18px" fontWeight="bold">
                Player ID
              </Text>
              <Text fontSize="18px" margin="0 0 0.5rem" fontWeight="bold">
                {playerId}
              </Text>
            </Box>
          </Box>

          {/* New Box */}
          <Text align="center" fontWeight="bold">
            Place Your Bet!
          </Text>
          <Box
            border="5px solid #4790b5"
            width="100%"
            height="16%"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            borderRadius="5rem"
            backgroundColor="black"
          >
            {[
              { value: 10, imageName: "10's coin.webp" },
              { value: 50, imageName: "50's coin.webp" },
              { value: 100, imageName: "100's coin.webp" },
              { value: 500, imageName: "500's coin.webp" },
              { value: 1000, imageName: "1000's coin.webp" },
              { value: 5000, imageName: "5000's coin.webp" },
            ].map(({ value, imageName }, index) => (
              <Button
                // border="2px solid grey"
                key={index}
                variant="unstyled"
                width="100%"
                height="100%"
                onClick={() => setSelectCoins(value)}
                // value={value}
                // onClick={() => console.log(value)}
              >
                <img
                  src={`/Coins/${imageName}`}
                  alt={`Image for ${imageName}`}
                  style={{ width: "80%", height: "80%" }}
                />
              </Button>
            ))}
          </Box>

          {/* Player Button */}
          <Box
            border="2px solid red"
            width="100%"
            flexDirection="row"
            height="30%"
            display="flex"
          >
            <Button
              width="100%"
              height="100%"
              variant="unstyled"
              onClick={() => handleBetting("Dragen")}
            >
              <Image
                src="/DragonTigerLion/DRAGON TIGER LION/DRAGON.webp"
                alt="Dragon Image"
                width="100%"
                height="100%"
              />
            </Button>
            <Button
              width="100%"
              height="100%"
              variant="unstyled"
              onClick={() => handleBetting("Tiger")}
            >
              <Image
                src="/DragonTigerLion/DRAGON TIGER LION/TIGER.webp"
                alt="Tiger Image"
                width="100%"
                height="100%"
              />
            </Button>
            <Button
              width="100%"
              height="100%"
              variant="unstyled"
              onClick={() => handleBetting("Lion")}
            >
              <Image
                src="/DragonTigerLion/DRAGON TIGER LION/LION.webp"
                alt="Lion Image"
                width="100%"
                height="100%"
              />
            </Button>
          </Box>
        </Box>
      </ChakraProvider>
    </>
  );
}
