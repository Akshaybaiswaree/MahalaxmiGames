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

import BettingAmountButton from "./BettingButtons/BettingAmountButton";
import BettingButtons from "./BettingButtons/BettingButtons";
import CardSection from "./GameArea/CardSection";
import CounterBox from "./GameArea/CounterBox";
import GameArea from "./GameArea/GameArea";
import MainCardSection from "./GameArea/MainCardSection";
import UserInfo from "./UserInfo/UserInfo";
import WinStatusBanner from "./GameArea/WinStatusBanner";
import { io } from "socket.io-client";

const socket = io("https://andarbaharbacked.onrender.com", {
  query: {
    userId: Math.floor(Math.random() * Date.now()),
  },
  transports: ["websocket"],
});
const AndarBahar = () => {
  const [gameState, setGameState] = useState({ value: "waiting" });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(50);
  const [mainCard, setMainCard] = useState([]);
  const [andarCards, setAndarCards] = useState([]);
  const [baharCards, setBaharCards] = useState([]);
  const [buttonClick1, setButtonClick1] = useState(false);
  const [buttonClick2, setButtonClick2] = useState(false);
  const [selectedCoins, setSelectedCoins] = useState(null);

  console.log("user", user);
  console.log("mainCard", mainCard);

  useEffect(() => {
    const handleGameUpdate = (updatedGameState) => {
      setGameState(updatedGameState.gamestate);
      // setMainCard(updatedGameState.mainCard);

      // if(updatedGameState.gamestate.value === 0){
      //   setButtonClick1(true);
      //   setButtonClick2(true);
      //   return 0;
      // }

      if (updatedGameState.gamestate.value === 10) {
        socket.emit("gameCards", updatedGameState.mainCard._id);
      }
    };

    const handleUserDetails = (data) => {
      setUser(data.user);
    };

    const handlebet = (data) => {
      setUser(data);
    };

    const handleMainCard = (data) => {
      setMainCard(data.mainCard);
    };
    socket.on("gameUpdate", handleGameUpdate);
    socket.on("userDetails", handleUserDetails);
    socket.on("Main_Card", handleMainCard);
    socket.on("bet", handlebet);

    return () => {
      socket.off("gameUpdate", handleGameUpdate);
      socket.off("userDetails", handleUserDetails);
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

  const handlebet = (betType) => {
    if (gameState?.value > 0) {
      setButtonClick1(true);
      setButtonClick2(true);
    }
    if (user?.coins <= 0) {
      alert("Insufficient Funds");
      return;
    }
    const bet = {
      betType,
      coins,
      cardId: mainCard._id,
    };
    socket.emit("bet", bet);
  };

  return (
    <ChakraProvider>
      <>
        <Box width="65%">
          <Flex justify="space-between" align="center" mb="2">
            <Text
              fontSize="24px"
              fontWeight="bold"
              borderRadius="10px"
              position="relative"
            >
              Andar Bahar
            </Text>
            <Button variant="outline" colorScheme="blue" ml="2">
              Rules
            </Button>
          </Flex>
          <Box
            width="100%"
            height="90vh"
            // border="10px solid red"
            backgroundImage="url('/Andar&BaharImage/Andar&BaharAvatar.webp')"
            backgroundSize="cover"
            backgroundPosition={`center 100%`}
            backgroundRepeat="no-repeat"
            display="flex"
            position="relative"
            id="andarbaharImg"
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
            <Box width="15%">
              <Text
                color="white"
                fontWeight="bold"
                position="absolute"
                bottom="38%"
                left="10%"
                id="andarcardstext"
              >
                Andar
              </Text>
              <Text
                color="white"
                fontWeight="bold"
                position="absolute"
                bottom="10%"
                left="10%"
                id="baharcardstext"
              >
                Bahar
              </Text>
            </Box>
            {gameState?.value <= 20 && (
              <Box width="100%">
                <CardSection
                  // title="Andar cards"
                  cards={andarCards}
                  position="absolute"
                  bottom="25%"
                  middle="15%"
                  right="20%"
                  transform="translateX(-50%)"
                  flexDirection="row-reverse"
                />

                <CardSection
                  // title="Bahar cards"
                  cards={baharCards}
                  position="absolute"
                  bottom="10%"
                  middle="15%"
                  right="20%"
                  transform="translateX(-50%)"
                  flexDirection="row-reverse"
                />
              </Box>
            )}
          </Box>
        </Box>

        {/* 10 Mini Boxes */}
        <Box
          width="65%"
          height="15%"
          // border="2px solid darkgreen"
          display="flex"
          position="relative"
          id="andarbaharidhistory"
        >
          {[...Array(10)].map((_, index) => (
            <Text
              border="2px solid grey"
              key={index}
              fontSize="20px"
              color={index % 2 === 0 ? "#333" : "#2b329b"}
              width="100%"
              height="45%"
              align="center"
              justifyContent="space-around"
              fontWeight="bold"
            >
              {/* {index % 3 === 0 ? "D" : index % 3 === 1 ? "T" : "L"} */}

              {/* {index % 2 === 0 ? "#333" : "#2b329b"} */}

              {index % 2 === 0 ? "A" : "B"}
            </Text>
          ))}

          <Text
            position="absolute"
            bottom="0"
            // left="10%"
            fontWeight="bold"
            border="2px solid darkblue"
            padding="0.3rem"
            id="andarbaharmatchID"
          >
            Match Id: {user?._id}
          </Text>
          <Button
            width="20%"
            variant="outline"
            colorScheme="blue"
            position="absolute"
            bottom="0"
            right="10%"
            id="andarbaharplayerhistory"
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
          id="andarbaharscoreboard"
        >
          <Box
            border="20px solid #333"
            width="100%"
            justifyContent="center"
            align="center"
            borderRadius="10%"
          >
            <Box backgroundColor="#2d6431" padding="0.5rem">
              <Text fontSize="18px" fontWeight="bold">
                Available Credit
              </Text>
              {/* <Text fontSize="18px" margin="0 0 0.5rem">
                ${user?._id}
              </Text> */}
              {user?.coins > 0 ? (
                <Text fontSize="24px">
                  ${Math.round(user?.coins * 100) / 100}
                </Text>
              ) : (
                <Text fontSize="24px">$0</Text>
              )}
            </Box>

            <Box backgroundColor="#e0e0e0" padding="0.5rem">
              <Text fontSize="18px" fontWeight="bold">
                Player ID
              </Text>
              <Text fontSize="18px" margin="0 0 0.5rem">
                {user?.userId}
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
              { value: 10, imageSrc: "/Coins/10's coin.webp" },
              { value: 50, imageSrc: "/Coins/50's coin.webp" },
              { value: 100, imageSrc: "/Coins/100's coin.webp" },
              { value: 500, imageSrc: "/Coins/500's coin.webp" },
              { value: 1000, imageSrc: "/Coins/1000's coin.webp" },
              { value: 5000, imageSrc: "/Coins/5000's coin.webp" },
            ].map(({ value, imageSrc }, index) => (
              <BettingAmountButton
                key={index}
                value={value}
                imageSrc={imageSrc}
                setCoins={setCoins}
                selectedCoins={selectedCoins}
                index={index}
                setSelectedCoins={setSelectedCoins}
              />
            ))}
          </Box>

          {/* Player Button */}
          {/* {gameState?.value - 20 > 0 && ( */}
          <Box
            border="2px solid red"
            width="100%"
            flexDirection="row"
            height="30%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            backgroundColor="lightgray"
          >
            <Button
              width="47%"
              height="80%"
              display="flex"
              justifyContent="space-around"
              variant="unstyled"
              fontSize="1.5rem"
              textColor="white"
              backgroundColor="#640e18"
              borderRadius="1rem"
              onClick={() => handlebet(0)}
              isDisabled={gameState?.value - 25 < 0 && buttonClick1}
            >
              Andar <span>1.98</span>
            </Button>

            <Button
              width="47%"
              height="80%"
              display="flex"
              justifyContent="space-around"
              variant="unstyled"
              fontSize="1.5rem"
              textColor="white"
              backgroundColor="#1c3e6b"
              borderRadius="1rem"
              onClick={() => handlebet(1)}
              isDisabled={gameState?.value - 25 < 0 && buttonClick2}
            >
              Bahar <span>1.98</span>
            </Button>
          </Box>
          {/* )} */}
        </Box>
      </>
    </ChakraProvider>
  );
};

export default AndarBahar;
