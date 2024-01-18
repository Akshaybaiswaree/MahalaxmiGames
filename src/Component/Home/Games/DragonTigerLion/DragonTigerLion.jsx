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

const socket = io("https://dragenliontiger.onrender.com/");
export default function DragonTigerLion() {
  const [timer, setTimer] = useState("");
  const [playerBalance, setPlayerBalance] = useState("");
  const [gameCards, setGameCards] = useState("");
  const [winnerStatus, setWinnerStatus] = useState("");

  const handelTimer = (data) => {
    setTimer(data.countdown);
  };

  const handelPlayerBalance = (data) => {
    setPlayerBalance(data.balanceUpdate);
  };

  const handelGameCards = (data) => {
    setGameCards(data.dealCards);
    setWinnerStatus(data.winnerStatus);
  };
  useEffect(() => {
    socket.on("countdown", handelTimer);
    socket.on("balanceUpdate", handelPlayerBalance);
    socket.on("dealCards", handelGameCards);
    return () => {
      socket.off("countdown", handelTimer);
      socket.off("balanceUpdate", handelPlayerBalance);
    };
  }, []);

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
                border="10px solid white"
                padding="20px"
                borderRadius="50%"
                position="absolute"
                top="5"
                right="10"
                color="white"
                fontWeight="bold"
              >
                {timer}
              </Text>
              <Text
                border="10px solid white"
                padding="40px"
                borderRadius="50%"
                position="absolute"
                top="5"
                left="10"
                color="white"
                fontWeight="bold"
              >
                {winnerStatus}
              </Text>
              {/* <Text
                border="10px solid white"
                padding="30px"
                borderRadius="50%"
                position="absolute"
                top="5"
                middle="10"
                color="white"
                fontWeight="bold"
              >
                {winnerStatus}
              </Text> */}
              {/* {gameCards &&
                Object.entries(gameCards).map(([cardName, card], index) => (
                  <Box key={index}>
                    <Text>{cardName} Cards</Text>
                    <Image src={`/cards/${card}`} />
                  </Box>
                ))} */}
              {timer <= 20 && <Box
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
                  src={`/cards/clubs_7.png`}
                  alt="123"
                  position="absolute"
                  left="20.5%"
                  width="6%"
                  height="24%"
                />
                <Image
                  src="/cards/clubs_5.png"
                  alt="123"
                  position="absolute"
                  right="19.5%"
                  width="6%"
                  height="24%"
                />
                <Image
                  src="/cards/clubs_6.png"
                  alt="123"
                  position="absolute"
                  width="6%"
                  height="24%"
                />
              </Box>}
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
            Match Id: 123456789
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
              <Text fontSize="18px" fontWeight="bold">
                Available Credit
              </Text>
              <Text fontSize="18px" margin="0 0 0.5rem">
                ${playerBalance}
              </Text>
            </Box>

            <Box backgroundColor="#e0e0e0" padding="0.5rem">
              <Text fontSize="18px" fontWeight="bold">
                Player ID
              </Text>
              <Text fontSize="18px" margin="0 0 0.5rem">
                123456
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
          >
            {[
              { value: 10, imageName: "10's coin.webp" },
              { value: 50, imageName: "50's coin.webp" },
              { value: 100, imageName: "100's coin.webp" },
              { value: 500, imageName: "500's coin.webp" },
              { value: 1000, imageName: "1000's coin.webp" },
              { value: 5000, imageName: "5000's coin.webp" },
            ].map((item, index) => (
              <Button
                // border="2px solid grey"
                key={index}
                aria-label={`Coin value: ${item.value}`}
                variant="unstyled"
                width="100%"
                height="100%"
              >
                <img
                  src={`/Coins/${item.imageName}`}
                  alt={`Image for ${item.imageName}`}
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
            // justifyContent="space-between"
            // alignItems="center"
          >
            <Button width="100%" height="100%" variant="unstyled">
              <Image
                src="/DragonTigerLion/DRAGON TIGER LION/DRAGON.webp"
                alt="Dragon Image"
                width="100%"
                height="100%"
              />
            </Button>
            <Button width="100%" height="100%" variant="unstyled">
              <Image
                src="/DragonTigerLion/DRAGON TIGER LION/TIGER.webp"
                alt="Tiger Image"
                width="100%"
                height="100%"
              />
            </Button>
            <Button width="100%" height="100%" variant="unstyled">
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
