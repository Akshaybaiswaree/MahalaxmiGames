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
  useEffect(() => {
    return () => {};
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
              High Card
            </Text>
            <Button variant="outline" colorScheme="blue" ml="2">
              Rules
            </Button>
          </Flex>
          <AspectRatio controls>
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
                Timer
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
                <span>Winner:</span>
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
              >
                <Box
                  // border="1px solid pink"
                  width="5.5%"
                  height="61%"
                  display="flex"
                  justifyContent="space-between"
                  flexDirection="column"
                  position="absolute"
                  left="38.8%"
                  top="23%"
                >
                  <Image
                    src="/cards/spades_10.png"
                    alt="123"
                    width="100%"
                    height="28.5%"
                  />
                  <Image
                    src="/cards/spades_10.png"
                    alt="123"
                    width="100%"
                    height="28.5%"
                  />
                  <Image
                    src="/cards/spades_10.png"
                    alt="123"
                    width="100%"
                    height="28.5%"
                  />
                </Box>
                <Box
                  // border="1px solid pink"
                  width="5.5%"
                  height="61%"
                  display="flex"
                  justifyContent="space-between"
                  flexDirection="column"
                  position="absolute"
                  right="40%"
                  top="23.3%"
                >
                  <Image
                    src="/cards/spades_10.png"
                    alt="123"
                    width="100%"
                    height="28.5%"
                  />
                  <Image
                    src="/cards/spades_10.png"
                    alt="123"
                    width="100%"
                    height="28.5%"
                  />
                  <Image
                    src="/cards/spades_10.png"
                    alt="123"
                    width="100%"
                    height="28.5%"
                  />
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
          justifyContent="space-around"
        >
          {[...Array(10)].map((_, index) => (
            <Text
              border="1px solid black"
              backgroundColor="grey"
              key={index}
              fontSize="20px"
              color={index % 2 === 0 ? "black" : "#553325"}
              width="5%"
              height="40%"
              align="center"
              fontWeight="bold"
            >
              <Text
                fontSize="18px"
                color={index % 2 === 0 ? "#black" : "#553325"}
              >
                {index % 2 === 0 ? "1" : "2"}
              </Text>
            </Text>
          ))}

          <Text>Match Id: 12345678123456789</Text>

          <Button width="20%" colorScheme="blue">
            Player History
          </Button>
        </Box>
        {/* Betting Area */}

        <Box
          width="50%"
          position="absolute"
          // border="4px solid #333"
          height="50%"
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
            width="50%"
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
                width="80%"
                height="80%"
                // _hover={{
                //   width: selectedCoins === index ? "110%" : "80%",
                //   height: selectedCoins === index ? "110%" : "80%",
                //   cursor: "pointer",
                // }}
                onClick={() => {}}
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
              >
                P6 <span>5.88</span>
              </Button>
            </Box>
          </Box>
        </Box>
        {/* side part */}
        <Box
          // border="5px dotted blue"
          width="28%"
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
                $10000
              </Text>
            </Box>

            <Box backgroundColor="#e0e0e0" padding="0.5rem" borderRadius="1rem">
              <Text fontSize="18px" fontWeight="bold">
                Player ID
              </Text>
              <Text fontSize="18px" margin="0 0 0.5rem" fontWeight="bold">
                12345678
              </Text>
            </Box>
          </Box>
        </Box>
      </ChakraProvider>
    </>
  );
}
