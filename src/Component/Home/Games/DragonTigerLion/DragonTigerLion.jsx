import "./DragonTigerLion.css";

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
  const [dragonCards, setDragonCards] = useState("");
  const [tigerCards, setTigerCards] = useState("");
  const [lionCards, setLionCards] = useState("");
  // const [gameCards, setGamesCards] = useState("");
  const [winnerStatus, setWinnerStatus] = useState("Wait!!");
  const [buttonClick, setButtonClick] = useState(false);
  const [selectedCoins, setSelectedCoins] = useState(null);
  const [gameHistory, setGameHistory] = useState(null);

  // console.log("availableBal", availableBal);
  // console.log("selectCoins", selectCoins);

  useEffect(() => {
    const handleGameCards = (data) => {
      //  console.log("CardsData:-", data);
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
      // console.log("Received balance update:", data);
      setAvailableBal(data.balance);
    };

    const handleGetUserBalance = () => {
      socket.emit("getBalance");
    };

    const handleWinHistory = (data) => {
      console.log("Received win history:", data);
      if (data && data.winStatuses) {
        setGameHistory(data.winStatuses);
      } else {
        console.error("Invalid or missing win history data.");
      }
    };

    const handleBet = (data) => {
      setSelectBet(data.choice);
      setAvailableBal(data.userBalance);
      setDragonCards(data.DragenNumber);
      setTigerCards(data.TigerNumber);
      setLionCards(data.LionNumber);
      // setGameHistory(data?.gameHistory)
      console.log(data);
      // setButtonStatus1(true);
      // setButtonStatus2(true);
      // setButtonStatus3(true);

      console.log("new bet:-", data);
      // console.log("new bet Choice:-", data.choice);
      // console.log("new bet balance:-", data.userBalance);
      // console.log("DragenNumber:-", data.DragenNumber);
      // console.log("TigerNumber:-", data.TigerNumber);
      // console.log("LionNumber:-", data.LionNumber);
    };

    const handleNewRound = () => {
      setSelectBet(null);
      setDragonCards([]);
      setTigerCards([]);
      setLionCards([]);
      // setGamesCards([]);
      setWinnerStatus(null);
      // setButtonStatus1(true);
      // setButtonStatus2(true);
      // setButtonStatus3(true);
    };
    handleGetUserBalance();

    socket.on("countdown", handleTimer);
    socket.on("balanceUpdate", handlePlayerBalance);
    socket.on("getuser", handlePlayerId);
    socket.on("newBet", handleBet);
    socket.on("newRound", handleNewRound);
    socket.on("dealCards", handleGameCards);
    socket.on("WinHistory", handleWinHistory);
    return () => {
      socket.off("countdown", handleTimer);
      socket.off("balanceUpdate", handlePlayerBalance);
      socket.off("getuser", handlePlayerId);
      socket.off("newBet", handleBet);
      socket.off("newRound", handleNewRound);
      socket.off("dealCards", handleGameCards);
      socket.off("WinHistory", handleWinHistory);
    };
  }, []);
  if (timer === 40) {
    socket.emit("getUpdatedUserDetails");
  }

  // const handleBetting = (selectBet) => {
  //   if (availableBal <= 0) {
  //     alert("Insufficient Funds");
  //     return;
  //   }
  //   const coins = parseInt(selectCoins, 10);
  //   socket.emit("placeBet", { selectBet, coins });
  // };

  const handleBetting = (baitType) => {
    if (timer - 25 < 0) {
      setButtonClick(true);
    }

    if (availableBal <= 0) {
      alert("Insufficient Funds");
      return;
    }

    // console.log("bettype", baitType);

    const coins = parseInt(selectCoins);
    // console.log("coins", coins);

    const betData = {
      selectedChoice: baitType,
      coins,
      // cardId: playerId._id,
    };

    socket.emit("placeBet", betData);
  };

  return (
    <>
      <ChakraProvider>
       <Box  
       width={'100vw'}
       height={"100vh"}
    
       bg={' #000080'}>
        <Box
       
          marginBottom={["9rem", "0rem"]}
          id="first"
          //  p={4}
          //  width = {{ base: "134%",sm:"140%", md: "100%", lg:"55%", xl:"40%" }}
          // marginTop = {{ base: "1rem",sm:"",md: "1rem", lg:"",xl:"" }}
          //  marginLeft = {{ base: "-0.7rem",sm:"",md: "0.1rem",lg:"" }}

          //  marginBottom = {{ base: "27rem", md: "2rem" }}
        >
          <Flex justify="space-between" align="center" mb="2">
            <Text
              fontSize="24px"
              fontWeight="bold"
              borderRadius="10px"
              position="relative"
            >
              Dragon Tiger Lion
            </Text>
            {/* <Text>{selectBet}</Text> */}
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
                border="5px solid white"
                padding="20px"
                borderRadius="50%"
                position="absolute"
                top="5"
                right="10"
                color="white"
                fontWeight="bold"
                id="round2"
              >
                {timer - 25 < 0 ? "0" : timer - 25}
              </Text>
              {timer - 25 < -17 && (
                <Text
                  border="10px solid white"
                  padding="40px"
                  borderRadius="50%"
                  position="absolute"
                  top="5"
                  left="10"
                  color="white"
                  fontWeight="bold"
                  id="round1"
                >
                  <span>Winner:</span> {winnerStatus}
                </Text>
              )}

              {/* {timer - 20 <= 0 && ( */}
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
                {timer - 25 <= -5 && (
                  <Box>
                    <Image
                      // src={`/cards/${gameCards.Dragen}`}
                      src={`/cards/${dragonCards}`}
                      // alt={`dragen${gameCards.Dragen}`}

                      alt=""
                      position="absolute"
                      top="38%"
                      left="20.8%"
                      width="6%"
                      height="21%"
                    />
                  </Box>
                )}

                {timer - 25 <= -10 && (
                  <Box>
                    <Image
                      // src={`/cards/${gameCards.Tiger}`}
                      src={`/cards/${tigerCards}`}
                      // alt={`lion${gameCards.Tiger}`}
                      alt=""
                      position="absolute"
                      top="38%"
                      width="6%"
                      height="21%"
                      left="47%"
                    />
                  </Box>
                )}

                {timer - 25 <= -15 && (
                  <Box>
                    <Image
                      // src={`/cards/${gameCards.Lion}`}
                      src={`/cards/${lionCards}`}
                      // alt={`tiger${gameCards.Lion}`}
                      alt=""
                      position="absolute"
                      top="38%"
                      right="19.5%"
                      width="6%"
                      height="21%"
                    />
                  </Box>
                )}
              </Box>
              {/* )} */}
            </Box>
          </AspectRatio>
        </Box>

        {/* 10 Mini Boxes */}
        <Box
          bg={"gray"}
          mt={["-25rem", "2rem"]}
          mb={["10rem", "0rem"]}
          width={{ base: "100%", sm: "110%", md: "65%" }}
          // marginY={{ base: "0rem", md: "1rem" }}
          marginLeft={{ base: "2rem", md: "0" }}
          height={["50px", "60px"]}
          // marginBottom={{ base: "2rem" }}
          // width="65%"
          // height="15%"
          // border="2px solid darkgreen"
          display="flex"
          // position="relative"
        >
          {/* {[...Array(1())].map((_, index) => ( */}
          {gameHistory?.map((item, index) => (
            <Text
              mb={{ base: "1rem", md: -1 }}
              border="2px solid grey"
              key={index}
              fontSize="20px"
              color={index % 2 === 0 ? "#333" : "#2b329b"}
              width="100%"
              height="50%"
              align="center"
              justifyContent="space-around"
              fontWeight="bold"
              id="array"
            >
              {item}
              {/* {console.log(item , "item")} */}
              {/* {gameHistory} */}
            </Text>
          ))}
        </Box>

        <Box
          position="absolute"
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          id="third"
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
                ${Math.round(availableBal * 100) / 100}
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
          <Text align="center" fontWeight="bold" id="spacing">
            Place Your Bet!
          </Text>
          <Box
            border="5px solid #4790b5"
            width="100%"
            height="14%"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            borderRadius="5rem"
            backgroundColor="black"
            // marginTop="2rem"
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
                width="90%"
                height="90%"
                _hover={{
                  width: selectedCoins === index ? "120%" : "",
                  height: selectedCoins === index ? "120%" : "",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectCoins(value);
                  setSelectedCoins(index);
                }}
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
            marginTop={["2rem", ""]}
            marginBottom={["rem", ""]}
            border="2px solid red"
            width="100%"
            flexDirection="row"
            height="30%"
            display="flex"
            // marginTop="3rem"
          >
            <Button
              width="100%"
              height="100%"
              variant="unstyled"
              onClick={() => handleBetting("Dragen")}
              isDisabled={timer - 25 <= 0 && buttonClick}
              _hover={{
                backgroundColor: "darkred",
              }}
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
              isDisabled={timer - 25 <= 0 && buttonClick}
              _hover={{
                backgroundColor: "darkgreen",
              }}
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
              isDisabled={timer - 25 <= 0 && buttonClick}
              _hover={{
                backgroundColor: "darkblue",
              }}
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
        </Box>
        </ChakraProvider>
    </>
  );
}
