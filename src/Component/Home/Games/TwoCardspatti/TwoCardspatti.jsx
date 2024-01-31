import {
  AspectRatio,
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  useDisclosure,
  Modal,
  Text,
  Image,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
//import PopUp from "./PopUp";
// import Logo from "../../../images/32cardsA_v.jpeg";
// import backGroundImage from "./images/background_plus_cards.jpeg"

import { io } from "socket.io-client";

const socket = io("https://twocardtp.onrender.com/", {
  query: {
    userId: Math.floor(Math.random() * Date.now()),
  },
  transports: ["websocket"],
});

export default function TwoCardsTeenPatti() {
  const [countdown, setCountdown] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [User, setUser] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState("10");
  const [playerHands, setPlayerHands] = useState(null);
  const [winner, setWinner] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [winHistory, setWinHistory] = useState(null);
  useEffect(() => {
    const handleDealCards = (data) => {
      // console.log(data, "playerHands123");
      // handleGetBalance();
      setTimeout(() => {
      setWinHistory(data.winHistory.reverse());
    } ,13000);
      setTimeout(() => {
        handleGetBalance();
      }, 10000);
      const winner = data.winner;
      // console.log("Received dealt cards:", data);
      console.log(data, "data");
      if (data.playerHands) {
        setPlayerHands(data.playerHands);

        setWinner(winner);
      } else {
        console.log("Player hands not found in data:", data);
      }
    };

    const handleNewBet = (bet) => {
      // console.log("Received new bet:", bet);
      setSelectedChoice(bet.choice);
    };

    const handleNewRound = () => {
      //   console.log("Starting a new round");
      setSelectedChoice(null);
      setPlayerHands([]);
    };

    const handleCountdown = (data) => {
      // console.log("data:", data);
      setCountdown(data.countdown);
    };
    const handleBalanceUpdate = (data) => {
      //   console.log("Received balance update:", data);
      setUserBalance(data.balance);
    };

    const handleGetBalance = () => {
      socket.emit("getBalance");
    };
    const handleuser = (data) => {
      setUser(data.user.userId);
      setUserBalance(data.user.balance);
    };
    handleGetBalance();
    socket.on("countdown", handleCountdown);
    socket.on("dealCards", handleDealCards);
    socket.on("getuser", handleuser);
    socket.on("newBet", handleNewBet);
    socket.on("newRound", handleNewRound);
    socket.on("balanceUpdate", handleBalanceUpdate);
    // socket.on("WinHistory", handleWinHistory);
    // socket.on("dealCards", handleDealCards);

    return () => {
      socket.off("dealCards", handleDealCards);
      socket.off("countdown", handleCountdown);
      socket.off("newBet", handleNewBet);
      socket.off("newRound", handleNewRound);
      socket.off("balanceUpdate", handleBalanceUpdate);
      socket.off("getuser", handleuser);
      // socket.off("WinHistory", handleWinHistory);
    };
  }, []);

  const handlePlaceBet = (selectedChoice) => {
    const coins = parseInt(selectedCoin, 10); // Parse the selectedCoin to an integer
    socket.emit("placeBet", { selectedChoice, coins });
  };

  return (
    <>
      <ChakraProvider>
        <Box m={"0.6rem"} width={["25rem", "100%"]}>
          <Box maxW={["100vw", "100vw"]} id="main-div">
            <Flex
              align="left-top"
              justify="left-top"
              minH="50%"
              overflow="hidden"
              flexDirection={["column", "row"]}
            >
              <Box
                width={["100%", "70%"]}
                marginTop="0px"
                marginRight="-4rem"
                marginBottom="1rem"
              >
                <Flex justify="space-between" align="center" mb="2">
                  <Text
                    fontSize={["20px", "24px"]}
                    fontWeight="bold"
                    borderRadius="10px"
                    position="relative"
                    marginLeft={["5px", "0px"]}
                  >
                    2 Cards Teen Patti
                  </Text>
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    mr="2"
                    paddingX={"3rem"}
                    mt="2"
                  >
                    Rules
                  </Button>
                </Flex>
                <AspectRatio borderRadius="10px" controls>
                  <Box
                    border="4px solid #333"
                    height="50%"
                    backgroundImage="url('/Andar&BaharImage/Andar&BaharAvatar.webp')"
                    backgroundSize="cover"
                    backgroundPosition={`center 100%`}
                    backgroundRepeat="no-repeat"
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="top"
                    color="white"
                  >
                    <Box
                      fontWeight={"900"}
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
                      fontSize={["10px", "sm"]}
                      color="white"
                      // background="linear-gradient(to bottom right, violet, blue)"
                      background="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                    >
                      {countdown <= 25 ? "Freeze" : "Place  Bet"}
                    </Box>

                    {countdown <= 8 && (
                      <Box mt={["7.5rem", "12rem"]} id="winner">
                        <Button
                          w={["8rem", "12rem"]}
                          fontSize={["15px", "lg"]}
                          color="#A52A2A"
                        >
                          Winner : {winner}
                        </Button>
                      </Box>
                    )}

                    <Box
                      fontWeight={"900"}
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
                      //  background="linear-gradient(to bottom right, golden, yellow)"
                      background=" linear-gradient(to bottom right, #640E18, #CC1D31,#DAA520)"
                      marginRight={"1rem"}
                      color="white"
                    >
                      {Math.max(0, countdown) !== null && (
                        <p>{Math.max(0, countdown - 25)}</p>
                      )}
                    </Box>
                    {countdown <= 15 && (
                      <>
                        <Box
                          position={"absolute"}
                          top={["11.5rem", "18.5rem"]}
                          left={["2rem", "3rem"]}
                          id="player"
                        >
                          <Text mb={["1rem", "2rem"]}>Player A</Text>
                          <Text>Player B</Text>
                        </Box>
                      </>
                    )}

                    <Flex
                      direction="column"
                      position={"absolute"}
                      top={["11rem", "18rem"]}
                      right={["1.5rem", "3rem"]}
                    >
                      {countdown <= 12 && (
                        <Flex direction="row">
                          {playerHands?.PlayerA &&
                            Object.entries(playerHands?.PlayerA).map(
                              ([player, card], index) => (
                                <Box key={index}>
                                  {card && (
                                    <Image
                                      bg={"red"}
                                      src={`/cards/${card}`}
                                      boxSize={["1.8rem", "2rem"]}
                                      margin="0.5rem"
                                      alt={`${card}`}
                                    />
                                  )}
                                </Box>
                              )
                            )}
                        </Flex>
                      )}

                      {countdown <= 12 && (
                        <Flex direction="row">
                          {playerHands?.PlayerB &&
                            Object.entries(playerHands?.PlayerB).map(
                              ([player, card], index) => (
                                <Box key={index}>
                                  {card && (
                                    <Image
                                      src={`/cards/${card}`}
                                      boxSize={["1.8rem", "2rem"]}
                                      margin="0.5rem"
                                      alt={`${card}`}
                                    />
                                  )}
                                </Box>
                              )
                            )}
                        </Flex>
                      )}
                    </Flex>
                  </Box>
                </AspectRatio>

                {/* 10 Mini Boxes */}
                <Flex flexDirection={["column", "row"]} alignItems="center">
                  {/* <Flex width={["100%", "67%"]} p={1}>
                    {[...Array(10)].map((_, index) => (
                      <Box
                        key={index}
                        width="35px"
                        height="35px"
                        marginRight={["5px"]}
                        display="flex"
                        marginTop={"1rem"}
                        justifyContent="center"
                        alignItems="center"
                        fontWeight="bold"
                        border="2px solid #333"
                      >
                        <Text
                          fontSize="14px"
                          color={index % 2 === 0 ? "#333" : "#2b329b"}
                        >
                          {index % 2 === 0 ? "A" : "B"}
                        </Text>
                      </Box>
                    ))}
                  </Flex> */}
                  {/* {winHistory?.map((element, index) => (
                    <Box key={index}>{element}</Box>
                  ))} */}

                  <Box
                    mt={["rem", "1.5rem"]}
                    ml={["2rem", "5rem"]}
                    display="flex"
                  >
                    {winHistory?.map((item, index) => (
                      <Box
                        color={"blue"}
                        p={"2px"}
                        key={index}
                        marginRight={["10px", "10px"]}
                        width={["25px", "30px"]}
                        height="30px"
                        border="2px solid black"
                        borderRadius="5px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {item}
                      </Box>
                    ))}
                  </Box>
                </Flex>
                {/* New Box */}
              </Box>

              <Box
                marginX={["0rem", "5rem"]}
                marginTop={["2rem", "4rem"]}
                width={["100%", "50%"]}
              >
                <Flex
                  width={["95%", "110%"]}
                  flexDirection="row"
                  border="3px solid #333"
                  borderRadius="10px"
                >
                  <Box
                    flex="1"
                    width="48%"
                    backgroundColor="white"
                    textAlign="center"
                    borderRadius="10px"
                  >
                    <Text fontSize={["18px", "18px"]} fontWeight="bold">
                      Available Credit
                    </Text>
                    <Text fontSize={["20px", "24px"]}> {userBalance}</Text>
                  </Box>

                  <Box
                    flex="1"
                    width="48%"
                    backgroundColor="#86A7FC"
                    textAlign="center"
                    borderRightRadius="10px"
                  >
                    <Text fontSize="18px" fontWeight="bold">
                      Match Id:
                    </Text>
                    <Text fontSize={["20px", "24px"]}>{User}</Text>
                  </Box>
                </Flex>
                {/* New Box  */}
                <Box width="90%">
                  <Flex flexDirection="column" alignItems="center">
                    <Text
                      fontSize="20px"
                      fontWeight="bold"
                      marginLeft="0.5rem"
                      mt={"1rem"}
                    >
                      Place Your Bet
                    </Text>

                    <Flex
                      width={["100%", "60%"]}
                      flexWrap={["nowrap", "nowrap"]}
                      justifyContent={["center", "flex-start"]}
                      marginTop={["2rem", "0"]}
                      marginLeft={["1rem", "-9rem"]}
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
                          ml={["0.8rem", "0rem"]}
                          key={index}
                          // height="45px"
                          margin={["rem", "0.9rem"]}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontWeight="bold"
                          borderRadius={"50%"}
                          // borderColor={'red'}
                          variant="unstyled"
                          _hover={{
                            boxShadow: "0 8px 12px rgba(0, 0, 255, 0.8)",

                            p: "px",
                            rounded: "full",
                            cursor: "pointer",
                          }}
                          // onInput={(e) => setSelectedCoin(e.target.value)}
                          // value={selectedCoin}
                          onClick={() => {
                            setSelectedCoin(item.value);
                            // console.log(item.value);
                          }}
                        >
                          <img
                            src={item.imageSrc}
                            alt={`${item.value}'s coin`}
                            style={{ maxHeight: "100px" }}
                          />
                        </Button>
                      ))}
                    </Flex>
                  </Flex>
                  <Flex
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    padding="0rem"
                    width="111%"
                  >
                    <Box
                      width="100%"
                      position="relative"
                      // border="2px solid #333"
                      height="8rem"
                      // bgColor={'red'}

                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box
                        width="90%"
                        height="100%"
                        position="relative"
                        // border="2px solid #333"
                        // marginTop="1rem"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {/* Player Button 1 */}
                        <Button
                          width="90%"
                          height={["50%", "80%"]}
                          p={4}
                          color="white"
                          fontWeight="800"
                          borderRadius="md"
                          bgGradient="linear(to-r, #0000FF, #FFA500)"
                          _hover={{
                            bg: "#FAEBD7",
                            boxShadow: "dark-lg",
                            color: "black",
                          }}
                          onClick={() => handlePlaceBet("PlayerA")}
                        >
                          Player A
                        </Button>

                        <Button
                          width="90%"
                          height={["50%", "80%"]}
                          marginLeft="1rem"
                          color="white"
                          fontWeight="800"
                          borderRadius="md"
                          bgGradient="linear(to-r, #0000FF, #FFA500)"
                          _hover={{
                            bg: "#FAEBD7",
                            boxShadow: "dark-lg",
                            color: "black",
                          }}
                          onClick={() => handlePlaceBet("PlayerB")}
                        >
                          Player B
                        </Button>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </ChakraProvider>
    </>
  );
}
