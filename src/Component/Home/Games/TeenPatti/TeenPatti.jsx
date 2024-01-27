import {
  AspectRatio,
  Box,
  Button,
  Center,
  ChakraProvider,
  Flex,
  HStack,
  Image,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Teenpatti from "../../Games/Images/TeenPatti.svg";
 import "./TeenPatti.css";

const socket = io("https://teenpattibackend.onrender.com", {
  query: {
    userId: Math.floor(Math.random() * Date.now()),
  },
  transports: ["websocket"],
});
function TeenPatti() {
  const [gameState, setGameState] = useState({ value: "waiting" });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(50);
  const [mainCard, setMainCard] = useState([]);
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);

  useEffect(() => {
    // Listen for game state updates from the server
    socket.on(
      "gameUpdate",
      (updatedGameState) => {
        setGameState(updatedGameState?.gamestate);

        // console.log(updatedGameState, "updatedGameState");
        // setMainCard(updatedGameState.gameCard);
        //  console.log(updatedGameState.gameCard, "updatedGameState");
      },
      [gameState?.value]
    );

    socket.on("userDetails", (data) => {
      // console.log(data.user.coins , "data");
      setUser(data.user);
      console.log(data, "data?.user");
    });
    socket.on("bait", (data) => {
      setUser(data);
      // console.log(data);
      // setUser(data.user);
    });

    socket.on("Main_Card", (data) => {
      setMainCard(data.gameCard);
      displayPlayerCards(data.gameCard.player1Cards, setPlayer1Cards);
      displayPlayerCards(data.gameCard.player2Cards, setPlayer2Cards);
      console.log(data, "data");
    });

    // console.log(mainCard , "maincard");

    return () => {
      // Clean up socket connection on component unmount

      socket.disconnect();
    };
  }, []);
  const displayPlayerCards = (cards, setPlayerCards) => {
    const displayedCards = cards.slice(0, 3); // Take only the first 3 cards

    // Update state directly with the first 3 cards
    setPlayerCards(displayedCards);
  };

  const handleBait = (baitType) => {
    if (user?.coins <= 0) {
      alert("Insufficient Coins");
      return; // Stop execution if coins are 0 or less
    }
    const bait = {
      baitType,
      coins,
      cardId: mainCard._id,
    };
    console.log(bait, "bait");
    socket.emit("bait", bait);
  };

  return (
    <>
      <ChakraProvider>
        <Box m={"1rem"}>
          <Flex justifyContent={"space-between"}>
            <AspectRatio
              width={"70%"}
              minHeight="50%"
              borderRadius="10px"
              controls
              ml={["1rem", "0rem"]}
              id="teenpattimainimg"
            >
              <Box
                height="50%" // Adjust the height as needed
                // background="linear-gradient(#c86363, #51a454, #517a9c)"

                backgroundImage={Teenpatti}
                backgroundSize="cover"
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="top"
                position="relative"
                width={"60%"}
              >
                <Box
                  fontWeight={"1000"}
                  border={"1px solid white"}
                  borderRadius={"50%"}
                  padding={"2px"}
                  mt={"2rem"}
                  ml={"1rem"}
                  position={"absolute"}
                  top="0"
                  left="0"
                  width="18%"
                  height="18%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="lg"
                  color="white"
                  background="linear-gradient(to right,#809fff ,#0000FF)"
                  id="teenpattifreezeplacebettext"
                >
                  {gameState?.value <= 20 ? "Freeze" : "Place  Bet"}
                </Box>
                <Box>
                  {gameState.value < 5 && (
                    <Button
                      // background="linear-gradient(to bottom right,#ED9203, #323349, #880000)"
                      background="linear-gradient(to bottom right, #ED9203, #C7E600)"
                      height={"4rem"}
                      width={"9rem"}
                    >
                      Winner: {mainCard?.winstatus}
                    </Button>
                  )}
                </Box>

                {/* {gameState.value >= 1 && (
                  <React.Fragment>
                    <Flex marginTop={"15rem"} ml={"2rem"} width={"20rem"}>
                      <Stack direction="column" width={"10rem"}>
                        <Box color={"Yellow"} fontSize="2rem">
                          PLAYER A
                        </Box>
                        {gameState.value < 11 && (
                          <Box fontStyle={"yellow"} width={"3rem"}>
                            {mainCard?.player1Cards.map((card, index) => (
                              <Image key={index} src={`/cards/${card}`} />
                            ))}
                          </Box>
                        )}
                      </Stack>

                      <Stack ml={"3rem"} width={"10rem"} direction="column">
                        <Box color={"Yellow"} fontSize="2rem">
                          PLAYER B
                        </Box>
                        {gameState.value < 9 && (
                          <Box width={"3rem"}>
                            {mainCard?.player2Cards.map((card, index) => (
                              <Image key={index} src={`/cards/${card}`} />
                            ))}
                          </Box>
                        )}
                      </Stack>
                    </Flex>
                  </React.Fragment>
                )} */}
                {gameState.value >= 1 && (
                  <Flex  flexWrap="wrap">
                    <Box
                      color={"Yellow"}
                      fontSize="1rem"
                      width="100%"
                      className="players"
                      id="playerA"
                    >
                      PLAYER A
                    </Box>
                    {gameState.value < 12 && (
                      <Flex Flex width="60%" marginLeft={"20rem"} marginTop={"-1rem"}  >
                        {player1Cards.map((card, index) => (
                          <Image
                          
                            key={index}
                            src={`/cards/${card}`}
                            boxSize="2rem"
                            margin="0.5rem"
                            id="cards-positionA"
                          />
                        ))}
                      </Flex>
                    )}

                    <Box
                      color={"Yellow"}
                      fontSize="1rem"
                      width="100%"
                      className="players"
                      id="playerB"
                    >
                      PLAYER B
                    </Box>
                    {gameState.value < 10 && (
                      <Flex width="60%" marginLeft={"20rem"} >
                        {player2Cards.map((card, index) => (
                          <Image
                            key={index}
                            src={`/cards/${card}`}
                            boxSize="2rem"
                            margin="0.5rem"
                            marginTop={"-5rem"}
                            id="cards-positionB"
                          />
                        ))}
                      </Flex>
                    )}
                  </Flex>
                )}
                <Box
                  fontWeight={"1000"}
                  border={"1px solid white"}
                  borderRadius={"50%"}
                  padding={"2px"}
                  mt={"2rem"}
                  ml={"1rem"}
                  position={"absolute"}
                  top="0"
                  right="0"
                  width="15%"
                  height="17%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="lg"
                  //   background="linear-gradient(to right, teal.200, blue.500)"
                  background="linear-gradient(to right, #809fff, #0000FF)"
                  marginRight={"1rem"}
                  color="white"
                >
                  {gameState?.value && Math.max(0, gameState.value - 20)}
                </Box>
              </Box>
            </AspectRatio>

            <Flex flexDirection={"column"} id="outputbox">
              <Box
                height={"5rem"}
                // width="100%"
                flexDirection="row"
                border="5px solid #668cff"
                boxShadow="4px 4px 10px rgba(3, 0, 2, 0.6)"
                display="flex"
                borderRadius="1rem"
              >
                <Box
                  flex="1"
                  //   width={["10%", "44%"]}
                  backgroundColor="white"
                  textAlign="center"
                  borderRight="4px solid #668cff"
                  className="abc"
                >
                  <Text color={"#668cff"} fontSize="18px" fontWeight="bold">
                    Available Credit :
                  </Text>
                  <Text color="#daa520" fontWeight={"500"} fontSize="24px">
                    {user?.coins && Math.max(0, user?.coins)}
                  </Text>
                </Box>

                <Box flex="1" textAlign="center">
                  <Text color={"#668cff"} fontSize="18px" fontWeight="bold">
                    Match Id :
                  </Text>
                  <Text color="#daa520" fontWeight={"500"} fontSize="24px">
                    {user?.userId}
                  </Text>
                </Box>
              </Box>
              <TableContainer mt={"1rem"}>
                <Table
                  borderRadius={"1rem"}
                  border="1px solid 5pxblack"
                  bg={"black"}
                  variant="simple"
                >
                  <Thead></Thead>
                  <Tbody>
                    <Tr
                      borderRadius={"2rem"}
                      boxShadow="0 14px 18px rgba(0,1 0, 20, 0.1)"
                      color="black"
                      bg="lightgray"
                    >
                      <Td>Hands</Td>
                      <Td>Payout</Td>
                      <Td></Td>
                    </Tr>
                    <Tr color="white">
                      <Td>Pair</Td>

                      <Td isNumeric>1 to 2</Td>
                    </Tr>
                    <Tr color="white">
                      <Td>Flush</Td>
                      <Td isNumeric>1 to 6</Td>
                    </Tr>
                    <Tr color="white">
                      <Td>Straight</Td>
                      <Td isNumeric>1 to 8</Td>
                    </Tr>
                    <Tr color="white">
                      <Td>Straight flush</Td>
                      <Td isNumeric>1 to 24</Td>
                    </Tr>
                  </Tbody>
                  <Tfoot>
                    <Tr color="white">
                      <Th color="white">Trio</Th>
                      <Td isNumeric>1 to 36</Td>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>

              {/* BUTTONS FOR BET */}
            </Flex>
          </Flex>

          <Text
            mt={["-10rem", "1rem"]}
            mb={"1rem"}
            fontSize={"1.3rem"}
            fontWeight={"bold"}
            ml={["", "16rem"]}
            id="chooseamount"
          >
            Choose the Amount
          </Text>

          <Box
            display={"flex"}
            flexDirection={"row"}
            id="amountbox"

            // ml={["0rem", "3rem"]}
          >
            {[
              { value: 10, imageSrc: "/Coins/10's coin.webp" },
              { value: 50, imageSrc: "/Coins/50's coin.webp" },
              { value: 100, imageSrc: "/Coins/100's coin.webp" },
              { value: 500, imageSrc: "/Coins/500's coin.webp" },
              { value: 1000, imageSrc: "/Coins/1000's coin.webp" },
              { value: 5000, imageSrc: "/Coins/5000's coin.webp" },
            ].map((item, index) => (
              <Button
                key={index}
                height="45px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontWeight="bold"
                variant="unstyled"
                onClick={() => {
                  setCoins(item.value);
                  console.log(item.value);
                }}
              >
                <img
                  height={"10rem"}
                  src={item.imageSrc}
                  alt={`${item.value}'s coin`}
                  style={{ maxHeight: "55px" }}
                />
              </Button>
            ))}
          </Box>

          <Box ml={"12rem"} mt={"1rem"} id="playersbutton">
            <Button
              onClick={() => handleBait("0")}
              disabled={gameState?.value <= 10}
              width={"10rem"}
              height={"5rem"}
              bgGradient="linear(to-r, teal.200, blue.500)"
              _hover={{
                bgGradient: "linear(to-r, red.200, orange.500, yellow.400)", // Change colors on hover
              }}
            >
              Player A
            </Button>
            <Button
              onClick={() => handleBait("1")}
              disabled={gameState?.value <= 10}
              width={"10rem"}
              ml={"1rem"}
              height={"5rem"}
              bgGradient="linear(to-r, teal.200, blue.500)"
              _hover={{
                bgGradient: "linear(to-r, red.200, orange.500, yellow.400)", // Change colors on hover
              }}
            >
              Player B
            </Button>
          </Box>
        </Box>
      </ChakraProvider>
    </>
  );
}

export default TeenPatti;