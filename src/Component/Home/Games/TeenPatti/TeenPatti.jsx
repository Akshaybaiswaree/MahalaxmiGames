import "./Teenpatti.css";

import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { io } from "socket.io-client";

// import Teenpatti from "/public/MuflisTeenPatti/MuflisTeenPatti";

const socket = io("https://teenpattibackend.onrender.com", {
  query: {
    userID: "65cc504c0039634a604b4de9",
  },
  transports: ["websocket"],
});
function TeenPatti() {
  const [gameState, setGameState] = useState({ value: "waiting" });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(50);
  const [mainCard, setMainCard] = useState([]);
  const [swithCard, setSwitchCard] = useState(true);
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);

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
      console.log("UserDetails", data);
      setUser(data.user);
      // setCurrentPlayer((prevPlayer) => (prevPlayer === "A" ? "B" : "A"));
      // console.log(data, "data?.user");
    });
    socket.on("bait", (data) => {
      setUser(data);
      // console.log(data);
      // setUser(data.user);
    });

    socket.on("Main_Card", (data) => {
      console.log("Main_Card Data:", data);
      setMainCard(data.gameCard);
      displayPlayerCards(data.gameCard.player1Cards, setPlayer1Cards);
      displayPlayerCards(data.gameCard.player2Cards, setPlayer2Cards);
      setGameHistory(data.gameHistory);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  if (gameState?.value === 3) {
    socket.emit("getUpdatedUserDetails");
  }
  // const displayPlayerCards = (cards, setPlayerCards) => {
  //   const displayedCards = cards.slice(0, 3); // Take only the first 3 cards

  const displayPlayerCards = (cards, setPlayerCards) => {
    const displayedCards = [];

    for (let i = 0; i < 3; i++) {
      // Display one card for each player in each iteration
      displayedCards.push(cards[i % 2]);
    }

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
      <Box bg="gray.700" h="141.5vh" w={{ base: "100vw", md: "85vw" }}>
        <Box maxW={"90vw"}>
          <Box m={"0"}>
            <Flex
              justifyContent={{ base: "center", md: "space-between" }}
              direction={{ base: "column", md: "row" }}
              // position="absolute"
            >
              <AspectRatio
                width={["95vw", "70%"]}
                // backgroundColor='red'
                // minHeight="50%"
                borderRadius="10px"
                controls
                ml={["0rem", "0.9rem"]}
                //  id='AspectRatio'
                // position="absolute"
              >
                <Box
                  height="auto" // Adjust the height as needed
                  // background="linear-gradient(#c86363, #51a454, #517a9c)"

                  // backgroundImage={Teenpatti}
                  backgroundImage="url('/public/MuflisTeenPatti/MuflisTeenPatti.webp')"
                  backgroundSize="contain"
                  // display="flex"
                  // flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="top"
                  position="relative"
                  left="20"
                  backgroundPosition={`center 100%`}
                  id="teenpattimainimg"
                  pl="4rem"
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
                    left="2"
                    width="18%"
                    height="18%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    fontSize="lg"
                    color="white"
                    background="linear-gradient(to right,#809fff ,#0000FF)"
                    id="teenpattifreezeplacebettext"
                    textAlign="center"
                  >
                    {gameState?.value <= 20 ? "Freeze" : "Place  Bet"}
                  </Box>
                  <Box
                    position="absolute"
                    top="5rem"
                    left="-0.7rem"
                    id="winner-main"
                  >
                    {gameState.value < 8 && (
                      <Button
                        // background="linear-gradient(to bottom right,#ED9203, #323349, #880000)"
                        background="linear-gradient(to bottom right, #ED9203, #C7E600)"
                        height={"2rem"}
                        width={"10rem"}
                        position="absolute"
                        Top={["2rem", ""]}
                        left={["6rem"]}
                        id="winner"
                      >
                        Winner: {mainCard?.winstatus}
                      </Button>
                    )}
                  </Box>
                  {/* logic to display cards  */}
                  {gameState.value >= 1 && (
                    <Flex
                      direction="row"
                      position="absolute"
                      top="9rem"
                      justifyContent="center"
                    >
                      {gameState.value < 14 && (
                        <Flex
                          position="relative"
                          width="40%"
                          flexDirection="row"
                          // border='2px'
                          top={{ base: "3.7rem", md: "15.2rem" }}
                          left={{ base: "-3.8rem", md: "-7.9rem" }}
                          // justifyContent="space-between"
                          // id="playerA-Card"
                          // marginLeft={["11rem", "20rem"]}
                          // marginTop={"9rem"}
                          // bg="red"
                        >
                          {gameState.value <= 14 && (
                            <Image
                              key={0}
                              src={`/cards/${player1Cards[0]}`}
                              boxSize={["2rem", "3rem"]}
                              ml={{ base: "0.5rem", md: "4.5rem" }}
                              // id="cards-positionA"
                            />
                          )}
                          {gameState.value <= 11 && (
                            <Image
                              key={1}
                              src={`/cards/${player1Cards[1]}`}
                              boxSize={["2rem", "3rem"]}
                              ml={{ base: "0.5rem", md: "1.6rem" }}
                              // id="cards-positionA"
                            />
                          )}
                          {gameState.value <= 9 && (
                            <Image
                              key={2}
                              src={`/cards/${player1Cards[2]}`}
                              boxSize={["2rem", "3rem"]}
                              ml={{ base: "0.5rem", md: "1.6rem" }}
                              // id="cards-positionA"
                            />
                          )}
                        </Flex>
                      )}

                      {gameState.value < 14 && ( //update 14 to 10
                        <Flex
                          position="relative"
                          width="40%"
                          top={{ base: "8.7rem", md: "20.2rem" }}
                          left={{ base: "-1.5rem", md: "0.5rem" }}
                          // id="playerB-Card"
                          flexDirection="row"
                          // marginLeft={["11rem", "20rem"]}
                          // marginTop={"5rem"}
                        >
                          {gameState.value <= 12 && (
                            <Image
                              key={0}
                              src={`/cards/${player2Cards[0]}`}
                              boxSize={["2rem", "3rem"]}
                              ml={{ base: "0.5rem", md: "-0.6rem" }}
                              marginTop={"-5rem"}
                              px={{ base: "0", md: "1.5" }}
                              // id="cards-positionB"
                            />
                          )}
                          {gameState.value <= 10 && (
                            <Image
                              key={1}
                              src={`/cards/${player2Cards[1]}`}
                              boxSize={["2rem", "3rem"]}
                              ml={{ base: "0.5rem", md: "0.7rem" }}
                              marginTop={"-5rem"}
                              px={{ base: "0", md: "1.5" }}
                              // id="cards-positionB"
                            />
                          )}
                          {gameState.value <= 8 && (
                            <Image
                              key={2}
                              src={`/cards/${player2Cards[2]}`}
                              boxSize={["2rem", "3rem"]}
                              ml={{ base: "0.5rem", md: "0.8rem" }}
                              marginTop={"-5rem"}
                              px={{ base: "0", md: "1.5" }}
                              // id="cards-positionB"
                            />
                          )}
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
              <Flex
                direction={{ base: "row", md: "column" }}
                w={{ base: "95%", md: "50%" }}
              >
                {/* credit and output box  */}
                <Flex
                  flexDirection={"column"}
                  justifyContent="center"
                  id="outputbox"
                  mt={{ base: "0rem", md: "5rem" }}
                  borderBottomRadius="15px"
                  w="85rem"
                  gap="1"
                  alignItems="center"
                >
                  <Box
                    height={"5rem"}
                    flexDirection="row"
                    border="5px solid orange"
                    boxShadow="4px 4px 10px rgba(3, 0, 2, 0.6)"
                    display="flex"
                    borderRadius="1rem"
                    mt={["0.2rem", "2rem"]}
                    pt="0.5rem"
                    w={{ base: "400px", md: "500px" }}
                    bg="red"
                  >
                    <Box
                      flex="1"
                      // width={["10%", "44%"]}
                      // backgroundColor="white"
                      textAlign="center"
                      borderRight="4px solid #668cff"
                      className="abc"
                      w="100%"
                    >
                      <Text
                        color="black"
                        fontSize={["17px", "18px"]}
                        fontWeight="bold"
                      >
                        Available Credit :
                      </Text>
                      <Text
                        color="black"
                        fontWeight={"500"}
                        fontSize={["20px", "24px"]}
                      >
                        {user?.coins && Math.max(0, user?.coins)}
                      </Text>
                    </Box>

                    <Box flex="1" textAlign="center">
                      <Text color="black" fontSize="18px" fontWeight="bold">
                        Match Id :
                      </Text>
                      <Text
                        color="#daa520"
                        fontWeight={"500"}
                        fontSize={["20px", "24px"]}
                      >
                        {user?.userId}
                      </Text>
                    </Box>
                  </Box>
                  <Flex justifyContent="center" alignItems="center">
                    <TableContainer
                      ml={["0.1rem", "0"]}
                      mt={"0rem"}
                      w={{ base: "100vw", md: "500px" }}
                    >
                      <Table
                        borderRadius={"2rem"}
                        border="1px solid 5px black"
                        bg={"black"}
                        variant="simple"
                        w={{ base: "450px", md: "100%" }}
                      >
                        <Thead></Thead>
                        <Tbody borderRadius="5rem">
                          <Tr
                            boxShadow="0 14px 18px rgba(0,1 0, 20, 0.1)"
                            color="white"
                            // bg="lightgray"
                          >
                            <Td textAlign="center">Hands</Td>
                            <Td textAlign="center">Payout</Td>
                          </Tr>
                          <Tr color="white">
                            <Td textAlign="center">Pair</Td>
                            <Td textAlign="center">1 to 2</Td>
                          </Tr>
                          <Tr color="white">
                            <Td textAlign="center">Flush</Td>
                            <Td textAlign="center">1 to 6</Td>
                          </Tr>
                          <Tr color="white">
                            <Td textAlign="center">Straight</Td>
                            <Td textAlign="center">1 to 8</Td>
                          </Tr>
                          <Tr color="white">
                            <Td textAlign="center">Straight flush</Td>
                            <Td textAlign="center">1 to 24</Td>
                          </Tr>
                        </Tbody>
                        <Tfoot>
                          <Tr color="white">
                            <Td textAlign="center" color="white">
                              Trio
                            </Td>
                            <Td textAlign="center">1 to 36</Td>
                          </Tr>
                        </Tfoot>
                      </Table>
                    </TableContainer>
                  </Flex>

                  {/* BUTTONS FOR BET */}
                </Flex>

                {/* history section  */}

                <Box
                  display="flex"
                  mt={{ base: "0", md: "2" }}
                  px={{ base: "2", md: "6" }}
                  py={{ base: 1 }}
                  justifyContent="center"
                  alignItems="center"
                  ml={{ md: "5" }}
                >
                  {[...Array(10)].map((_, index) => (
                    <Box
                      key={index}
                      border="1px solid black"
                      fontSize={["15px", "20px"]}
                      color={index % 2 === 0 ? "black" : "red"}
                      width={{ base: "39px", md: "15%" }}
                      height={{ base: "40px", md: "40px" }}
                      px="2"
                      fontWeight="bold"
                      marginRight="5px" // Add some margin between boxes
                      borderRadius="20px"
                      bg="red"
                    >
                      <Text
                        fontSize={{ base: "14px", md: "12px" }}
                        color={index % 2 === 0 ? "black" : "white"}
                        textAlign="center"
                        pt={{ base: "2", md: "2" }}
                        fw="bold"
                      >
                        {gameHistory[index]}
                        {/* Hello */}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </Flex>
            </Flex>

            {/* Bet amount section  */}
            <Box
              bg="black"
              h={{ base: "20rem", md: "50px" }}
              w={{ base: "28.5rem", md: "784.5px" }}
            >
              <Text
                mt={["-7rem", "3rem"]}
                mb={"1rem"}
                fontSize={"1.3rem"}
                fontWeight={"bold"}
                ml={["5rem", "16rem"]}
                id="chooseamount"
                color="white"
                textAlign="center"
              >
                Choose the Amount
              </Text>

              {/* coins  */}
              <Box>
                <Box
                  w={{ base: "500px", md: "300px" }}
                  h="100"
                  mt={["2.5rem", "1.7rem"]}
                  display={"flex"}
                  flexDirection={"row"}
                  id="amountbox"
                  justifyContent="space-around"
                  // alignItems="center"

                  ml={["-0.5rem", "5rem"]}
                  px="1rem"
                  gap="1"
                  // bg="red"
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
                      // bg="blue"ioup8p9p
                      height="75px"
                      w="90px"
                      display="flex"
                      justifyContent="space-around"
                      alignItems="center"
                      fontWeight="bold"
                      variant="unstyled"
                      _hover={{ height: "2rem" }}
                      onClick={() => {
                        setCoins(item.value);
                        console.log(item.value);
                      }}
                    >
                      <img
                        height={"10rem"}
                        src={item.imageSrc}
                        alt={`${item.value}'s coin`}
                        style={{ maxHeight: "65px" }}
                      />
                    </Button>
                  ))}
                </Box>

                {/* Bet buttons  */}

                <Box
                  mr={["2.2rem", "0rem"]}
                  ml={["3rem", "9rem"]}
                  mt={["3.5rem", "-0.5rem"]}
                  id="playersbutton"
                  paddingBottom="1rem"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    onClick={() => handleBait("0")}
                    disabled={gameState?.value <= 10}
                    width={{ base: "13rem", md: "20rem" }}
                    height={"5rem"}
                    bgGradient="linear(to-r, teal.200, blue.500)"
                    _hover={{
                      bgGradient:
                        "linear(to-r, red.200, orange.500, yellow.400)", // Change colors on hover
                    }}
                  >
                    Player A
                  </Button>
                  <Button
                    onClick={() => handleBait("1")}
                    disabled={gameState?.value <= 10}
                    width={{ base: "13rem", md: "20rem" }}
                    ml={"1rem"}
                    height={"5rem"}
                    bgGradient="linear(to-r, teal.200, blue.500)"
                    _hover={{
                      bgGradient:
                        "linear(to-r, red.200, orange.500, yellow.400)", // Change colors on hover
                    }}
                  >
                    Player B
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default TeenPatti;
