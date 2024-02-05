// import "../Andar&Bahar/AndarBahar.css"
// import "./teenPattiMuflis.css";

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

const socket = io("https://highcardsbackend.onrender.com", {
  query: {
    userId: Math.floor(Math.random() * Date.now()),
  },
  transports: ["websocket"],
});

export default function HighCard() {

  const [timer, setTimer] = useState("");
  const [availableCoins, setAvailableCoins] = useState("");
  const [userId, setUserId] = useState("");
  const [matchId, setMatchId] = useState("");
  const [cards, setCards] = useState([]);
  const [winstatus, setWinStatus] = useState("");
  const [gameHistory, setGameHistory] = useState([]);
  const [coins, setCoins] = useState("");
  const [selectedCoins, setSelectedCoins] = useState("");
  const [docID, setDocId] = useState("");
  const [buttonClick, setButtonClick] = useState(false);


  useEffect(() => {

    const handelTimer = (data) => {
      // console.log("timer", data.timer);
      setTimer(data.timer);
    };


    const handelUserDetails = (data) => {
      // console.log("userDetails", data.userData);
      setAvailableCoins(data.userData.coins);
      setUserId(data.userData.userId);
    }

    const handelGameCreate = (data) => {
      // console.log("gameCreate", data);
      setMatchId(data.gameid)
      setCards(data.Cards)
      setWinStatus(data.winstatus)
      setDocId(data._id)
    }

    const handelGameHistory = (data) => {
      console.log("gameHistory", data);
      setGameHistory(data)
    }

    const handelGameResult = (data) => {
      console.log("gameResult", data);
      setCards(data.Cards)
      setWinStatus(data.winstatus)

    }

    const handelGameUserCoin = (data) => {
      console.log("gameUserCoin", data);
    }


    socket.on("timer", handelTimer);
    socket.on("userDetails", handelUserDetails);
    socket.on("game:create", handelGameCreate);
    socket.on("game:history", handelGameHistory);
    socket.on("game:result", handelGameResult);
    socket.on("game:user-coin", handelGameUserCoin);

    return () => {
      socket.off("timer", handelTimer);
      socket.off("userDetails", handelUserDetails);
      socket.off("game:create", handelGameCreate);
      socket.off("game:history", handelGameHistory);
      socket.off("game:result", handelGameResult);
      socket.off("game:user-coin", handelGameUserCoin);

    };
  }, []);





  const handelBet = (baitType) => {

    if (availableCoins < 0) {
      alert("Insufficient amount")
      return
    }

    if (timer <= 22) {
      setButtonClick(true);
    }

    const data = {
      baitType,
      coins,
      gameId: docID
    }
    // console.log("betting", baitType, coins, docID);
    socket.emit("bait", data)
    console.log("bet", data)

  }

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
              High Card
            </Text>
            <Button variant="outline" colorScheme="blue" ml="2">
              Rules
            </Button>
          </Flex>
          <AspectRatio height="50%" controls>
            <Box
              // border="4px solid #333"
              backgroundImage="url('/HighCard/HighCard.webp')"
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
                {timer - 25 < 0 ? "0" : timer - 25}
              </Text>
              {timer - 25 <= -16 && <Text
                border="5px solid white"
                padding="24px"
                borderRadius="50%"
                position="absolute"
                top="0"
                left="0"
                color="white"
                fontWeight="bold"
              >
                <span>Winner:{winstatus}</span>
              </Text>}

              <Box
                // border="2px solid yellow"
                width="100%"
                height="50%"
                display="flex"
                flexDirection="row"
                position="absolute"
                bottom="0"
                alignItems="center"
              >
                <Box
                  // border="1px solid pink"
                  width="5.5%"
                  height="61.5%"
                  display="flex"
                  // justifyContent="space-between"
                  flexDirection="column"
                  position="absolute"
                  left="38.8%"
                  top="22.7%"
                >
                  {timer - 25 <= -5 && <Image
                    src={`/cards/${cards[0]}`}
                    alt="0"
                    width="100%"
                    height="29%"
                  />}
                  {timer - 25 <= -7 && <Image
                    src={`/cards/${cards[1]}`}
                    alt="1"
                    width="100%"
                    height="29%"
                    marginTop="10px"
                  />}
                  {timer - 25 <= -9 && <Image
                    src={`/cards/${cards[2]}`}
                    alt="2"
                    width="100%"
                    height="29%"
                    marginTop="12px"
                  />}
                </Box>
                <Box
                  // border="1px solid pink"
                  width="5.5%"
                  height="61.5%"
                  display="flex"
                  // justifyContent="space-between"
                  flexDirection="column"
                  position="absolute"
                  right="40%"
                  top="22.7%"
                >
                  {timer - 25 <= -11 && <Image
                    src={`/cards/${cards[3]}`}
                    alt="3"
                    width="100%"
                    height="29%"
                  />}
                  {timer - 25 <= -13 && <Image
                    src={`/cards/${cards[4]}`}
                    alt="4"
                    width="100%"
                    height="29%"
                    marginTop="10px"
                  />}
                  {timer - 25 <= -15 && <Image
                    src={`/cards/${cards[5]}`}
                    alt="5"
                    width="100%"
                    height="29%"
                    marginTop="12px"
                  />}
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
          {[...Array(10)].map((_, index) => (
            <Text
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
              <Text
                fontSize="18px"
                color="#c32625"
              >
                {gameHistory[index] && gameHistory[index].join(", ")}
              </Text>
            </Text>
          ))}


          <Text>Match Id: {matchId}</Text>

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
                  setCoins(value)
                  // console.log("coins", value)
                  setSelectedCoins(index)
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
                onClick={() => handelBet(0, coins, docID)}
                isDisabled={timer - 25 <= 0 && buttonClick}
              >
                P1 <span>5.88</span>
              </Button>
              <Button
                width="31%"
                display="flex"
                justifyContent="space-around"
                backgroundColor="#570c8a"
                color="white"
                variant="unstyled"
                onClick={() => handelBet(1, coins, docID)}
                isDisabled={timer - 25 <= 0 && buttonClick}
              >
                P2 <span>5.88</span>
              </Button>
              <Button
                width="31%"
                display="flex"
                justifyContent="space-around"
                backgroundColor="#244c82"
                color="white"
                variant="unstyled"
                onClick={() => handelBet(2, coins, docID)}
                isDisabled={timer - 25 <= 0 && buttonClick}
              >
                P3 <span>5.88</span>
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
                onClick={() => handelBet(3, coins, docID)}
                isDisabled={timer - 25 <= 0 && buttonClick}
              >
                P4 <span>5.88</span>
              </Button>
              <Button
                width="31%"
                display="flex"
                justifyContent="space-around"
                backgroundColor="#75380e"
                color="white"
                variant="unstyled"
                onClick={() => handelBet(4, coins, docID)}
                isDisabled={timer - 25 <= 0 && buttonClick}
              >
                P5 <span>5.88</span>
              </Button>
              <Button
                width="31%"
                display="flex"
                justifyContent="space-around"
                backgroundColor="#8a1752"
                color="white"
                variant="unstyled"
                onClick={() => handelBet(5, coins, docID)}
                isDisabled={timer - 25 <= 0 && buttonClick}
              >
                P6 <span>5.88</span>
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
            <Box backgroundColor="#c12524" padding="0.5rem" borderRadius="1rem">
              <Text fontSize="18px" fontWeight="bold" color="white">
                Available Credit
              </Text>
              <Text
                fontSize="18px"
                margin="0 0 0.5rem"
                fontWeight="bold"
                color="white"
              >
                ${availableCoins}
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
          </Box>
        </Box>
      </ChakraProvider>
    </>
  );
}
