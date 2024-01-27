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
import Logo from "../../../images/32cardsA_v.jpeg";
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
  useEffect(() => {
    const handleDealCards = (data) => {
      // console.log(data, "playerHands123");
      handleGetBalance();
      const winner = data.winner;
      // console.log("Received dealt cards:", data);
      // console.log(data , "data")
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
      console.log("data123", data);
    };
    handleGetBalance();
    socket.on("countdown", handleCountdown);
    socket.on("dealCards", handleDealCards);
    socket.on("getuser", handleuser);
    socket.on("newBet", handleNewBet);
    socket.on("newRound", handleNewRound);
    socket.on("balanceUpdate", handleBalanceUpdate);
    // socket.on("dealCards", handleDealCards);

    return () => {
      socket.off("dealCards", handleDealCards);
      socket.off("countdown", handleCountdown);
      socket.off("newBet", handleNewBet);
      socket.off("newRound", handleNewRound);
      socket.off("balanceUpdate", handleBalanceUpdate);
      socket.off("getuser", handleuser);
    };
  }, []);

  console.log(playerHands, "playerHands");
  const handlePlaceBet = (selectedChoice) => {
    const coins = parseInt(selectedCoin, 10); // Parse the selectedCoin to an integer
    socket.emit("placeBet", { selectedChoice, coins });
  };

  return (
    <>
      <ChakraProvider>
        <Flex align="left-top" justify="left-top" minH="50%" overflow="hidden">
          <Box width="55%" marginTop="0px" marginLeft="0px" marginBottom="1rem">
            <Flex justify="space-between" align="center" mb="2">
              <Text
                fontSize="24px"
                fontWeight="bold"
                borderRadius="10px"
                position="relative"
              >
                2 Cards Teen Patti
              </Text>
              <Button variant="outline" colorScheme="blue" ml="2" mt="2">
                Rules
              </Button>
            </Flex>
            <AspectRatio borderRadius="10px" controls>
              <Box
                border="4px solid #333"
                height="40%"
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
                  fontSize="lg"
                  color="white"
                  // background="linear-gradient(to bottom right, violet, blue)"
                  background="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                >
                  {countdown <= 25 ? "Freeze" : "Place  Bet"}
                </Box>

                {countdown <= 5 && (
                  <Box mt={"rem"}>
                    <Button w={"9rem"} color="gray">
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
           {countdown !== null && <p>{Math.max(countdown - 25, 0)}</p>}

                </Box>
                {countdown <= 10 && (
                  <>
                    <Box mt={"15rem"}>
                      <Text>Player A</Text>
                      <Text>Player B</Text>
                    </Box>
                  </>
                )}
 
                <Flex direction="column">
                  {countdown <= 10 && (
                    <Flex direction="row">
                      {playerHands?.PlayerA &&
                        Object.entries(playerHands?.PlayerA).map(
                          ([player, card], index) => (
                            <Box key={index}>
                              {card && (
                                <Image
                                  src={`/cards/${card}`}
                                  boxSize="3rem"
                                  margin="0.5rem"
                                  alt={`${card}`}
                                />
                              )}
                            </Box>
                          )
                        )}
                    </Flex>
                  )}

                  {countdown <= 9 && (
                    <Flex direction="row">
                      {playerHands?.PlayerB &&
                        Object.entries(playerHands?.PlayerB).map(
                          ([player, card], index) => (
                            <Box key={index}>
                              {card && (
                                <Image
                                  src={`/cards/${card}`}
                                  boxSize="3rem"
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
            <Flex flexDirection="row" alignItems="center">
              {[...Array(10)].map((_, index) => (
                <Box
                  key={index}
                  width="35px"
                  height="35px"
                  marginRight="10px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontWeight="bold"
                  border="5px solid #333"
                >
                  <Text
                    fontSize="14px"
                    color={index % 2 === 0 ? "#333" : "#2b329b"}
                  >
                    {index % 2 === 0 ? "A" : "B"}
                  </Text>
                </Box>
              ))}
              {/* Text and Button */}

              <Flex flexDirection="row" alignItems="center">
                <Text> </Text>
                <Button
                  flexDirection="row"
                  alignItems="center"
                  marginLeft="3rem"
                  variant="outline"
                  colorScheme="blue"
                  width="100%"
                >
                  Player History
                </Button>
              </Flex>
            </Flex>
            {/* New Box */}
          </Box>

          <Box marginLeft="1rem" marginTop="4rem" width="70%">
            <Flex
              width="90%"
              flexDirection="row"
              border="10px solid #333"
              borderRadius="10px"
            >
              <Box
                flex="1"
                width="48%"
                backgroundColor="white"
                textAlign="center"
              >
                <Text fontSize="18px" fontWeight="bold">
                  Available Credit
                </Text>
                <Text fontSize="24px"> {userBalance}</Text>
              </Box>

              <Box
                flex="1"
                width="48%"
                backgroundColor="#86A7FC"
                textAlign="center"
              >
                <Text fontSize="18px" fontWeight="bold">
                  Match Id:
                </Text>
                <Text fontSize="24px">{User}</Text>
              </Box>
            </Flex>
            {/* New Box  */}
            <Box width="90%">
              <Flex flexDirection="row" alignItems="center">
                <Text fontSize="15px" fontWeight="bold" marginLeft="0.5rem">
                  Place Your Bet
                </Text>

                <Flex
                  width={["0%", "60%"]}
                  flexWrap={["nowrap", "nowrap"]}
                  justifyContent={["center", "flex-start"]}
                  marginTop={["4rem", "0"]}
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
                      ml={["0.8rem", "0rem"]}
                      key={index}
                      height="45px"
                      margin={["rem", "1rem"]}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      fontWeight="bold"
                      variant="unstyled"
                      // onInput={(e) => setSelectedCoin(e.target.value)}
                      // value={selectedCoin}
                      onClick={() => {
                        setSelectedCoin(item.value);
                        // console.log(item.value);
                      }}
                    >
                      {console.log(selectedCoin, "selectedCoin")}
                      <img
                        height={"10rem"}
                        src={item.imageSrc}
                        alt={`${item.value}'s coin`}
                        style={{ maxHeight: "55px" }}
                      />
                    </Button>
                  ))}
                </Flex>
              </Flex>
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                padding="1rem"
              >
                <Box
                  width="100%"
                  position="relative"
                  border="2px solid #333"
                  height="22rem"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    width="90%"
                    height="50%"
                    position="relative"
                    // border="2px solid #333"
                    marginTop="1rem"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    margin="1rem"
                  >
                    {/* Player Button 1 */}
                    <Button
                      width="90%"
                      height="70%"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      fontWeight="bold"
                      variant="unstyled"
                      fontSize="3rem"
                      backgroundColor="#640e18"
                      borderRadius="1rem"
                      _hover={{
                        backgroundColor: "#640e18",
                      }}
                      onClick={() => handlePlaceBet("PlayerA")}
                    >
                      Player A
                    </Button>

                    {/* Player Button 2 */}

                    <Button
                      width="90%"
                      height="70%"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      fontWeight="bold"
                      variant="unstyled"
                      fontSize="3rem"
                      backgroundColor="#1c3e6b"
                      borderRadius="1rem"
                      marginTop="1rem"
                      marginBottom="1rem"
                      marginLeft="1rem"
                      marginRight="1rem"
                      _hover={{
                        backgroundColor: "#1c3e6b",
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
      </ChakraProvider>
    </>
  );
}
