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

const socket = io("https://three2-cards-be.onrender.com", {
  query: {
    userId: Math.floor(Math.random() * Date.now()),
  },
  transports: ["websocket"],
});

export default function ThirtyTwoCards() {
  const [timer, setTimer] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [userId, setUserId] = useState("");
  const [matchId, setMatchId] = useState("");
  const [gameCard, setGameCard] = useState([]);
  const [gameCardValue, setGameCardValue] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [winStatus, setWinStatus] = useState("");
  const [coins, setCoins] = useState("");
  const [selectedCoins, setSelectedCoins] = useState("");
  const [docID, setDocId] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const [bettingAmount, setBettingAmount] = useState("");

  useEffect(() => {
    const handelTimer = (data) => {
      // console.log("timer", data);
      setTimer(data.timer);
      data.timer >= 44 ? setBettingAmount(0) : "";
    };

    const handelUserDetails = (data) => {
      console.log("userDetails", data);
      setAvailableBalance(data.userData.coins);
      setUserId(data.userData.userId);
    };

    const handelGameCreate = (data) => {
      console.log("gameCreate", data);
      setMatchId(data.gameCard.gameid);
      setGameCard(data.gameCard.Cards);
      setGameCardValue(data.gameCard.Cards);
      setGameHistory(data.gameHistory);
      setWinStatus(data.gameCard.winstatus);
      setDocId(data.gameCard._id);
    };

    const handelGameResult = (data) => {
      console.log("gameResult", data);
      setGameCard(data.gameCard.Cards);
      setWinStatus(data.gameCard.winstatus);
    };

    const handelGameUserCoin = (data) => {
      console.log("gameUserCoin", data);
    };

    const handelUserBalanceUpdate = (data) => {
      console.log("gameUserBalanceUpdate", data);
      setAvailableBalance(data.userData.coins);
      setUserId(data.userData.userId);
    };

    socket.on("timer", handelTimer);
    socket.on("userDetails", handelUserDetails);
    socket.on("game:create", handelGameCreate);
    socket.on("game:result", handelGameResult);
    socket.on("game:user-coin", handelGameUserCoin);
    socket.on("UserBalanceUpdate", handelUserBalanceUpdate);

    return () => {
      socket.off("timer", handelTimer);
      socket.off("userDetails", handelUserDetails);
      socket.off("game:create", handelGameCreate);
      socket.off("game:result", handelGameResult);
      socket.off("game:user-coin", handelGameUserCoin);
      socket.off("UserBalanceUpdate", handelUserBalanceUpdate);
    };
  }, []);
  if (timer === 10) {
    socket.emit("getUserBalanceUpdate", userId);
  }

  const handelBet = (baitType) => {
    if (availableBalance < 0) {
      alert("Insufficient amount");
      return;
    }

    if (timer <= 22) {
      setButtonClick(true);
    }

    const data = {
      baitType,
      coins,
      gameId: docID,
    };
    console.log("betting", baitType, coins, docID);
    setBettingAmount((prev) => prev + Number(coins));

    socket.emit("bait", data);
    console.log("bet", data);
  };

  return (
    <>
      <ChakraProvider>
        <Box width="65%" border="2px solid coralpink">
          <Flex justify="space-between" align="center" mb="2">
            <Text
              fontSize="24px"
              fontWeight="bold"
              borderRadius="10px"
              position="relative"
            >
              32 Cards
            </Text>
            <Button variant="outline" colorScheme="blue" ml="2">
              Rules
            </Button>
          </Flex>
          <AspectRatio height="50%" controls>
            <Box
              // border="4px solid #333"
              backgroundImage="url('/32Cards/32-Cards.webp')"
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
              >
                {/* {timer - 25 < 0 ? "0" : timer - 25} */}
                {timer}
              </Text>
              <Text
                border="5px solid white"
                padding="24px"
                borderRadius="50%"
                position="absolute"
                top="0"
                left="0"
                color="white"
                fontWeight="bold"
              >
                <span>Winner : {winStatus ? winStatus : "waiting"}</span>
              </Text>

              <Box
                // border="2px solid yellow"
                width="100%"
                height="50%"
                display="flex"
                flexDirection="row"
                position="absolute"
                bottom="0"
                alignItems="center"
                // justifyContent="center"
              >
                <Box
                  //   border="1px solid black"
                  width="5.4%"
                  height="50%"
                  position="absolute"
                  left="27.3%"
                  top="35.2%"
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  {gameCard[0] && (
                    <Image
                      src={`/cards/${gameCard[0]?.cardName}`}
                      alt="0"
                      width="100%"
                      height="35%"
                    />
                  )}
                  <Text
                    // border="1px solid black"
                    width="100%"
                    fontWeight="bold"
                    color="white"
                    fontSize="22px"
                    position="absolute"
                    left="0"
                    top="62%"
                    align="center"
                  >
                    {gameCardValue[0]?.value ? gameCardValue[0]?.value : "0"}
                  </Text>
                </Box>
                <Box
                  // border="1px solid black"
                  width="5.4%"
                  height="50%"
                  position="absolute"
                  left="40%"
                  top="35.2%"
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  {gameCard[1] && (
                    <Image
                      src={`/cards/${gameCard[1]?.cardName}`}
                      alt="0"
                      width="100%"
                      height="35%"
                    />
                  )}
                  <Text
                    // border="1px solid black"
                    width="100%"
                    fontWeight="bold"
                    color="white"
                    fontSize="22px"
                    position="absolute"
                    left="0"
                    top="62%"
                    align="center"
                  >
                    {gameCardValue[1]?.value ? gameCardValue[1]?.value : "0"}
                  </Text>
                </Box>
                <Box
                  // border="1px solid black"
                  width="5.4%"
                  height="50%"
                  position="absolute"
                  right="41.8%"
                  top="35.2%"
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  {gameCard[2] && (
                    <Image
                      src={`/cards/${gameCard[2]?.cardName}`}
                      alt="0"
                      width="100%"
                      height="35%"
                    />
                  )}
                  <Text
                    // border="1px solid black"
                    width="100%"
                    fontWeight="bold"
                    color="white"
                    fontSize="22px"
                    position="absolute"
                    left="0"
                    top="62%"
                    align="center"
                  >
                    {gameCardValue[2]?.value ? gameCardValue[2]?.value : "0"}
                  </Text>
                </Box>
                <Box
                  // border="1px solid black"
                  width="5.4%"
                  height="50%"
                  position="absolute"
                  right="29%"
                  top="35.2%"
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  {gameCard[3] && (
                    <Image
                      src={`/cards/${gameCard[3]?.cardName}`}
                      alt="0"
                      width="100%"
                      height="35%"
                    />
                  )}
                  <Text
                    // border="1px solid black"
                    width="100%"
                    fontWeight="bold"
                    color="white"
                    fontSize="22px"
                    position="absolute"
                    left="0"
                    top="62%"
                    align="center"
                  >
                    {gameCardValue[3]?.value ? gameCardValue[3]?.value : "0"}
                  </Text>
                </Box>
              </Box>
            </Box>
          </AspectRatio>
        </Box>
        {/* Player History */}
        <Text fontWeight="bold">Last Wins :</Text>
        <Box
          width="65%"
          // border="2px solid darkgreen"
          display="flex"
          justifyContent="space-between"
        >
          {gameHistory.map((e, index) => (
            <Box
              border="1px solid black"
              backgroundColor="grey"
              key={index}
              fontSize="20px"
              color="#c32625"
              width="5%"
              height="40%"
              align="center"
              fontWeight="bold"
            >
              <Text fontSize="18px" color="#234c75">
                {e}
              </Text>
            </Box>
          ))}

          <Text>Match Id: {matchId} </Text>

          <Button width="20%" colorScheme="blue">
            Player History
          </Button>
        </Box>
        {/* Betting Area */}

        <Box
          width="50%"
          position="absolute"
          // border="4px solid #333"
          height="40%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-around"
          backgroundColor="#2c2721"
          marginTop="1%"
        >
          <Text color="white" textAlign="left">
            Place Your Bet!
          </Text>
          <Box
            border="2px solid white"
            width="40%"
            height="20%"
            display="flex"
            borderRadius="5rem"
            backgroundColor="transparent"
            alignItems="center"
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
                  width: selectedCoins === index ? "110%" : "80%",
                  height: selectedCoins === index ? "110%" : "80%",
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
                  style={{ width: "90%", height: "90%" }}
                />
              </Button>
            ))}
          </Box>
          <Box
            width="90%"
            height="45%"
            border="2px solid #333"
            display="flex"
            alignItems="center"
            backgroundColor="black"
            borderRadius="1rem"
            flexDirection="column"
          >
            <Box
              width="90%"
              height="50%"
              alignItems="center"
              display="flex"
              justifyContent="space-around"
            >
              <Button
                width="31%"
                display="flex"
                justifyContent="space-around"
                backgroundColor="#971b23"
                color="white"
                variant="unstyled"
                onClick={() => handelBet(8, coins, docID)}
                isDisabled={timer - 25 <= 0 && buttonClick}
              >
                Player8<span>11.2</span>
              </Button>
              <Button
                width="31%"
                display="flex"
                justifyContent="space-around"
                backgroundColor="#570c8a"
                color="white"
                variant="unstyled"
                onClick={() => handelBet(9, coins, docID)}
                isDisabled={timer - 25 <= 0 && buttonClick}
              >
                Player9<span>4.95</span>
              </Button>
            </Box>
            <Box
              width="90%"
              height="50%"
              alignItems="center"
              display="flex"
              justifyContent="space-around"
            >
              <Button
                width="31%"
                display="flex"
                justifyContent="space-around"
                backgroundColor="#489686"
                color="white"
                variant="unstyled"
                onClick={() => handelBet(10, coins, docID)}
                isDisabled={timer - 25 <= 0 && buttonClick}
              >
                Player10<span>2.2</span>
              </Button>
              <Button
                width="31%"
                display="flex"
                justifyContent="space-around"
                backgroundColor="#75380e"
                color="white"
                variant="unstyled"
                onClick={() => handelBet(11, coins, docID)}
                isDisabled={timer - 25 <= 0 && buttonClick}
              >
                Player11<span>1.08</span>
              </Button>
            </Box>
          </Box>
        </Box>
        {/* side part */}
        <Box
          // border="5px dotted blue"
          width="23%"
          height="30%"
          position="absolute"
          right="5"
          top="35%"
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
            <Box backgroundColor="#234c75" padding="0.5rem" borderRadius="1rem">
              <Text fontSize="18px" fontWeight="bold" color="white">
                Available Credit
              </Text>
              <Text
                fontSize="18px"
                margin="0 0 0.5rem"
                fontWeight="bold"
                color="white"
              >
                ${Math.round(availableBalance * 100) / 100}
              </Text>
            </Box>

            <Box backgroundColor="#e0e0e0" padding="0.5rem" borderRadius="1rem">
              <Text fontSize="18px" fontWeight="bold">
                Player ID
              </Text>
              <Text fontSize="18px" margin="0 0 0.5rem" fontWeight="bold">
                {userId}
              </Text>
            </Box>
            <Box backgroundColor="blue" padding="0.5rem" borderRadius="1rem">
              <Text fontSize="18px" fontWeight="bold">
                Betting Amount
              </Text>
              <Text fontSize="18px" margin="0 0 0.5rem" fontWeight="bold">
                {bettingAmount ? bettingAmount : "0"}
              </Text>
            </Box>
          </Box>
        </Box>
      </ChakraProvider>
    </>
  );
}
