import { Box, Button, ChakraProvider, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import CardSection from "./GameArea/CardSection";
import CounterBox from "./GameArea/CounterBox";
import MainCardSection from "./GameArea/MainCardSection";
import WinStatusBanner from "./GameArea/WinStatusBanner";
import { io } from "socket.io-client";

const socket = io("https://andarbaharbacked.onrender.com", {
  query: {
    userID: "65c4a6874c68b332fd697164",
  },
  transports: ["websocket"],
});
const AndarBahar = () => {
  const [gameState, setGameState] = useState({ value: "waiting" });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [mainCard, setMainCard] = useState({});
  const [andarCards, setAndarCards] = useState([]);
  const [baharCards, setBaharCards] = useState([]);
  const [buttonClick1, setButtonClick1] = useState(false);
  const [buttonClick2, setButtonClick2] = useState(false);
  const [selectedCoins, setSelectedCoins] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [bettingAmount, setBettingAmount] = useState("");

  // console.log("user", user);
  // console.log("mainCard", mainCard);

  useEffect(() => {
    const handleGameUpdate = (updatedGameState) => {
      setGameState(updatedGameState.gamestate);
      updatedGameState.gamestate.value - 25 === 20 ? setBettingAmount(0) : "";
    };

    const handleUserDetails = (data) => {
      // console.log("handleUserDetails", data);
      setUser(data.user);
    };

    const handlebet = (data) => {
      console.log("newbet", data);
      setUser(data);
    };

    const handleMainCard = (data) => {
      // console.log("mainCard123", data.mainCard);
      setMainCard(data.mainCard);
      setGameHistory(data.gameHistory);
    };
    socket.on("gameUpdate", handleGameUpdate);
    socket.on("userDetails", handleUserDetails);
    socket.on("Main_Card", handleMainCard);
    socket.on("bet", handlebet);

    return () => {
      socket.off("gameUpdate", handleGameUpdate);
      socket.off("userDetails", handleUserDetails);
      socket.off("Main_Card", handleMainCard);
      socket.off("bet", handlebet);
    };
  }, []);

  if (gameState?.value === 3) {
    socket.emit("getUpdatedUserDetails");
  }

  useEffect(() => {
    if (gameState?.value === 19) {
      animateCards();
    } else if (gameState?.value === 45) {
      setAndarCards([]);
      setBaharCards([]);
    }
  }, [gameState?.value]);

  function animateCards() {
    const baharCardsArr = mainCard?.baharcards || [];
    const andarCardsArr = mainCard?.andarcards || [];

    let combinedCardsArr = [];

    for (
      let i = 0;
      i < Math.max(baharCardsArr.length, andarCardsArr.length);
      i++
    ) {
      if (i < baharCardsArr.length) {
        combinedCardsArr.push({ type: "bahar", card: baharCardsArr[i] });
      }
      if (i < andarCardsArr.length) {
        combinedCardsArr.push({ type: "andar", card: andarCardsArr[i] });
      }
    }

    combinedCardsArr.forEach((card, index) => {
      setTimeout(() => {
        if (card.type === "bahar") {
          setBaharCards((prev) => [...prev, card.card]);
        } else {
          setAndarCards((prev) => [...prev, card.card]);
        }
      }, 1000 * (index + 1));
    });
  }

  const handelBet = (betType) => {
    if (user?.coins <= 10) {
      alert("Insufficient Funds");
      return;
    }
    if (gameState?.value > 0) {
      setButtonClick1(true);
      setButtonClick2(true);
    }

    const bet = {
      betType,
      coins,
      cardId: mainCard._id,
    };
    setBettingAmount((prev) => prev + Number(coins));
    socket.emit("bet", bet);
    console.log("betting", bet);
  };

  return (
    <ChakraProvider>
      <>
        <Box
          // border="1px solid black"
          backgroundColor="black"
          height="120%"
        >
          <Box
            width="60%"
            // backgroundColor="black"
            // border="1px solid red"
            height="100%"
          >
            <Box
              // border="2px solid black"
              backgroundColor="#222222"
              justifyContent="space-between"
              display="flex"
            >
              <Text
                fontSize="24px"
                fontWeight="bold"
                borderRadius="10px"
                position="relative"
                color="white"
              >
                Andar Bahar
              </Text>
              <Button variant="outline" colorScheme="blue" ml="2">
                Rules
              </Button>
            </Box>

            <Box
              width="100%"
              height="60%"
              // border="10px solid red"
              backgroundImage="url('/public/Andar&BaharImage/Andar Bahar Table.webp')"
              backgroundSize="cover"
              backgroundPosition={`center 100%`}
              backgroundRepeat="no-repeat"
              display="flex"
              position="relative"
              // id="andarbaharImg"
            >
              <WinStatusBanner
                winStatus={mainCard.winstatus}
                gameState={gameState}
              />
              <CounterBox
                value={gameState.value - 25 < 0 ? "0" : gameState.value - 25}
                width="13%"
                height="18%"
                position="absolute"
                top="5"
                right="6"
                color="white"
              />

              <CounterBox
                value={gameState.value - 25 < 0 ? "Freeze" : "Place Bet"}
                width="20%"
                height="22%"
                position="absolute"
                top="3"
                left="3"
                color="white"
                alignItems="center"
              />
              <MainCardSection mainCard={mainCard} />
              {gameState?.value <= 20 && (
                <Box width="100%">
                  <CardSection
                    // title="Andar cards"
                    cards={andarCards}
                    position="absolute"
                    bottom="32%"
                    right="27%"
                    transform="translateX(-50%)"
                    flexDirection="row-reverse"
                  />

                  <CardSection
                    border="1px solid black"
                    // title="Bahar cards"
                    cards={baharCards}
                    position="absolute"
                    bottom="12.5%"
                    right="27%"
                    transform="translateX(-50%)"
                    flexDirection="row-reverse"
                  />
                </Box>
              )}
            </Box>

            {/* 10 Mini Boxes */}
            <Box
              // border="2px solid #866637"
              display="flex"
              justifyContent="center"
              // position="absolute"
              width="100%"
              // backgroundColor="#3e3e3e"
              height="5%"
            >
              <Box
                // border="1px solid black"
                display="flex"
                width="60%"
              >
                {gameHistory &&
                  gameHistory.map((e, index) => (
                    <Box
                      border="1px solid #c2c2c2"
                      backgroundColor="grey"
                      key={index}
                      fontSize="20px"
                      color="white"
                      width="100%"
                      height="100%"
                      align="center"
                      display="flex"
                      justifyContent="center"
                    >
                      {e ? e : "Loading..."}
                    </Box>
                  ))}
              </Box>
              <Box align="center">
                <Text display="flex" color="white" align="center">
                  Match Id: {mainCard?._id ? mainCard._id : "Loading..."}
                </Text>
              </Box>
              <Box
                width="20%"
                // height="100%"
                align="center"
                // border="1px solid black"
              >
                <Button
                  backgroundColor="#674716"
                  variant="unstyled"
                  width="100%"
                  // height="100%"
                  color="white"
                  borderRadius="10%"
                  align="center"
                >
                  Player History
                </Button>
              </Box>
            </Box>
            {/* Betting Area */}

            <Box
              width="100%"
              border="4px solid #333"
              height="27%"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-around"
              backgroundColor="#2d2820"
              marginTop="1%"
              borderRadius="1rem"
            >
              <Box
                // border="1px solid black"
                width="90%"
                height="50%"
                display="flex"
                justifyContent="space-around"
                align="center"
              >
                <Box color="#b97f2b" align="center">
                  Last Wins :
                  <Text color="white" fontSize="20px">
                    {gameHistory[9]}
                  </Text>
                </Box>
                <Box width="50%" height="45%" align="center">
                  <Box
                    border="2px solid white"
                    display="flex"
                    borderRadius="5rem"
                    backgroundColor="transparent"
                  >
                    {[
                      { value: 10, imageName: "10's coin.webp" },
                      { value: 50, imageName: "50's coin.webp" },
                      { value: 100, imageName: "100's coin.webp" },
                      { value: 500, imageName: "500's coin.webp" },
                      { value: 1000, imageName: "1000's coin.webp" },
                      { value: 5000, imageName: "5000's coin.webp" },
                    ].map(({ value, imageName }, index) => (
                      <Box
                        key={index}
                        display="flex"
                        justifyContent="space-around"
                        align="center"
                        // width="30%"
                        // height="30%"
                      >
                        <Button
                          // border="2px solid grey"
                          variant="unstyled"
                          _hover={{
                            width: selectedCoins === index ? "90%" : "90%",
                            height: selectedCoins === index ? "90%" : "90%",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setCoins(value);
                            console.log("coins", value);
                            setSelectedCoins(index);
                          }}
                        >
                          <img
                            src={`/Coins/${imageName}`}
                            alt={`Image for ${imageName}`}
                            width="90%"
                            height="90%"
                          />
                        </Button>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box color="#b97f2b" align="center">
                  Betting Amount :
                  <Text color="white">
                    {bettingAmount ? bettingAmount : "0"}
                  </Text>
                </Box>
              </Box>
              <Box
                width="90%"
                height="100%"
                border="2px solid #4c3513"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundColor="black"
                borderRadius="1rem"
                flexDirection="row"
              >
                <Box
                  border="2px solid #4c3513"
                  width="80%"
                  height="90%"
                  display="flex"
                  alignItems="center"
                  // backgroundColor="linear(#fff,black)"
                  bgGradient="linear(to-r,#8d1820, #2b5995)"
                  borderRadius="1rem"
                >
                  <Box
                    width="100%"
                    height="100%"
                    alignItems="center"
                    display="flex"
                    justifyContent="space-around"
                  >
                    <Button
                      width="80%"
                      height="100%"
                      display="flex"
                      justifyContent="space-around"
                      backgroundColor="#8d1820"
                      color="white"
                      variant="unstyled"
                      onClick={() => handelBet("0")}
                      isDisabled={gameState.value - 25 <= 0 && buttonClick1}
                      _hover={{
                        backgroundColor: "orange",
                      }}
                    >
                      Andar<span>1.98</span>
                    </Button>
                  </Box>
                  <Box
                    width="100%"
                    height="100%"
                    alignItems="center"
                    display="flex"
                    justifyContent="space-around"
                  >
                    <Button
                      width="80%"
                      height="100%"
                      display="flex"
                      justifyContent="space-around"
                      backgroundColor="#2b5995"
                      color="white"
                      variant="unstyled"
                      onClick={() => handelBet("1")}
                      isDisabled={gameState.value - 25 <= 0 && buttonClick2}
                      _hover={{
                        backgroundColor: "yellow",
                      }}
                    >
                      Bahar<span>1.98</span>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Side Part */}
            <Box
              // border="5px dotted blue"
              width="30%"
              height="30%"
              position="absolute"
              right="10"
              top="28%"
              display="flex"
              flexDirection="column"
            >
              <Box
                border="2px solid #333"
                width="100%"
                justifyContent="center"
                align="center"
                borderRadius="1rem"
              >
                <Box
                  backgroundColor="#234c75"
                  padding="0.5rem"
                  borderRadius="1rem"
                >
                  <Text fontSize="18px" fontWeight="bold" color="white">
                    Available Credit
                  </Text>
                  <Text
                    fontSize="18px"
                    margin="0 0 0.5rem"
                    fontWeight="bold"
                    color="white"
                  >
                    💰
                    {Math.round(user?.coins * 100) / 100
                      ? Math.round(user?.coins * 100) / 100
                      : "Loading... "}
                  </Text>
                </Box>

                <Box
                  backgroundColor="#e0e0e0"
                  padding="0.5rem"
                  borderRadius="1rem"
                >
                  <Text fontSize="18px" fontWeight="bold">
                    Player ID
                  </Text>
                  <Text fontSize="18px" margin="0 0 0.5rem" fontWeight="bold">
                    {user?.mobileNumber ? user?.mobileNumber : "Loading..."}
                  </Text>
                </Box>
                <Box
                  backgroundColor="blue"
                  padding="0.5rem"
                  borderRadius="1rem"
                >
                  <Text fontSize="18px" fontWeight="bold">
                    Betting Amount
                  </Text>
                  <Text fontSize="18px" margin="0 0 0.5rem" fontWeight="bold">
                    {bettingAmount ? bettingAmount : "0"}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    </ChakraProvider>
  );
};

export default AndarBahar;
