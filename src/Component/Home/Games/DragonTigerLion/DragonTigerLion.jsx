// import "./TwoCardspatti.css";

import {
  AspectRatio,
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Image,
  Modal,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { FaLock } from "react-icons/fa";
import { io } from "socket.io-client";

// import TwoCard from "../../Games/Images/2cardpatti.svg";

//import PopUp from "./PopUp";
// import Logo from "../../../images/32cardsA_v.jpeg";
//  import backGroundImage from "./images/background_plus_cards.jpeg"
const userId = Math.floor(Math.random() * Date.now());
// console.log("userId on the client side:", userId);

const socket = io("https://dragenliontiger.onrender.com/", {
  query: {
    userId,
  },
  transports: ["websocket"],
});
export default function TwoCardsTeenPatti() {
  const [timer, setTimer] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [availableBal, setAvailableBal] = useState("");
  const [matchId, setMatchId] = useState("");
  const [selectBet, setSelectBet] = useState("");
  const [selectCoins, setSelectCoins] = useState("10");
  const [dragonCards, setDragonCards] = useState("");
  const [tigerCards, setTigerCards] = useState("");
  const [lionCards, setLionCards] = useState("");
  const [winnerStatus, setWinnerStatus] = useState("Wait!!");
  const [buttonClick, setButtonClick] = useState(false);
  const [selectedCoins, setSelectedCoins] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    const handleGameCards = (data) => {
      console.log("CardsData:-", data);
      if (data.playerHands) {
        setDragonCards(data.playerHands.Dragen);
        setTigerCards(data.playerHands.Tiger);
        setLionCards(data.playerHands.Lion);
        // setGamesCards(data.playerHands);
        setWinnerStatus(data.winner);
      } else {
        console.log("Cards is not here", data);
      }
    };

    const handleTimer = (data) => {
      setTimer(data.countdown);
    };

    const handlePlayerId = (data) => {
      socket.emit("getuser", data);
      // setPlayerId(data.user.userId);
      // setMatchId(data.user._id);
    };

    const handlePlayerBalance = (data) => {
      // console.log("Received balance update:", data);
      setAvailableBal(data.balance);
    };

    const handleGetUserBalance = () => {
      socket.emit("getBalance");
    };

    const handleWinHistory = (data) => {
      console.log("Received win history:", data);
      if (data && data.winStatuses) {
        setGameHistory(data.winStatuses);
      } else {
        console.error("Invalid or missing win history data.");
      }
    };

    const handleBet = (data) => {
      setSelectBet(data.choice);
      setAvailableBal(data.userBalance);
      setDragonCards(data.DragenNumber);
      setTigerCards(data.TigerNumber);
      setLionCards(data.LionNumber);
      // setGameHistory(data?.gameHistory)
      console.log(data);
      // setButtonStatus1(true);
      // setButtonStatus2(true);
      // setButtonStatus3(true);

      console.log("new bet:-", data);
      // console.log("new bet Choice:-", data.choice);
      // console.log("new bet balance:-", data.userBalance);
      // console.log("DragenNumber:-", data.DragenNumber);
      // console.log("TigerNumber:-", data.TigerNumber);
      // console.log("LionNumber:-", data.LionNumber);
    };

    const handleNewRound = () => {
      setSelectBet(null);
      setDragonCards([]);
      setTigerCards([]);
      setLionCards([]);
      // setGamesCards([]);
      setWinnerStatus(null);
      // setButtonStatus1(true);
      // setButtonStatus2(true);
      // setButtonStatus3(true);
    };

    // const handleWinHistory = (data) => {
    //   console.log("WinHistory", data);
    //   setGameHistory(data.winStatuses);
    // };

    const handleGameId = (data) => {
      console.log("GameId", data);
      setMatchId(data.gameId);
    };

    handleGetUserBalance();

    socket.on("countdown", handleTimer);
    socket.on("balanceUpdate", handlePlayerBalance);
    socket.on("getuser", handlePlayerId);
    socket.on("newBet", handleBet);
    socket.on("newRound", handleNewRound);
    socket.on("dealCards", handleGameCards);
    socket.on("WinHistory", handleWinHistory);
    socket.on("gameId", handleGameId);

    return () => {
      socket.off("countdown", handleTimer);
      socket.off("balanceUpdate", handlePlayerBalance);
      socket.off("getuser", handlePlayerId);
      socket.off("newBet", handleBet);
      socket.off("newRound", handleNewRound);
      socket.off("dealCards", handleGameCards);
      socket.off("WinHistory", handleWinHistory);
      socket.off("gameId", handleGameId);
    };
  }, []);
  if (timer === 40) {
    socket.emit("getUpdatedUserDetails");
  }

  const handleBetting = (baitType) => {
    if (timer - 25 < 0) {
      setButtonClick(true);
    }

    if (availableBal <= 0) {
      alert("Insufficient Funds");
      return;
    }

    // console.log("bettype", baitType);

    const coins = parseInt(selectCoins);
    // console.log("coins", coins);

    const betData = {
      selectedChoice: baitType,
      coins,
      // cardId: playerId._id,
    };

    socket.emit("placeBet", betData);
  };

  return (
    <>
      <ChakraProvider>
        <Box width={["19rem", "100%"]}>
          <Box bg={"#451212"} maxW={["100vw", "100vw"]} id="main-div">
            <Flex
              align="left-top"
              justify="left-top"
              minH="50%"
              overflow="hidden"
              flexDirection={["column", "row"]}
            >
              <Box
                width={["100%", "80%"]}
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
                    color={"white"}
                  >
                    Dragon Tiger Lion
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
                    backgroundImage="url('/public/DragonTigerLion/DragonTigerLion.webp')"
                    backgroundSize="cover"
                    backgroundPosition={`center 100%`}
                    backgroundRepeat="no-repeat"
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="top"
                    color="white"
                    className="firstBox"
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
                      width="25%"
                      height="22%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      fontSize={["10px", "sm"]}
                      color="white"
                      // background="linear-gradient(to bottom right, violet, blue)"
                      background="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                    >
                      {/* {countdown <= 25 ? "Freeze" : "Place  Bet"} */}
                      {timer <= 8
                        ? "Winner: " + winnerStatus
                        : timer <= 25
                        ? "Freeze"
                        : "Place Bet"}
                    </Box>

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
                      background=" linear-gradient(to bottom right, #640E18, #CC1D31,#DAA520)"
                      marginRight={"1rem"}
                      color="white"
                    >
                      {/* {Math.max(0, countdown) !== null && (
                        <p>{Math.max(0, countdown - 25)}</p>
                      )} */}
                      {timer - 25 < 0 ? "0" : timer - 25}
                    </Box>

                    <Flex
                      justifyContent={"space-between"}
                      gap={"0.7rem"}
                      direction="row"
                      position={"absolute"}
                      top={["60%", "63%"]}
                      left={["44%", "45%"]}
                      // id="playerCard"
                    >
                      <Box>
                        {timer <= 14 && (
                          <Box
                            key={1}
                            height={["20.5 rem", "0.5rem"]}
                            width={["1.9rem", "3.2rem"]}
                          >
                            <Image src={`/cards/${dragonCards}`} />
                          </Box>
                        )}
                      </Box>
                      <Box>
                        {timer <= 12 && (
                          <Box
                            key={1}
                            height={["2.5 rem", "0.5rem"]}
                            width={["1.9rem", "3.2rem"]}
                          >
                            <Image
                              src={`/cards/${tigerCards}`}
                              // boxSize={["1.8rem", "2.7rem"]}

                              // top={"80rem"}
                              // alt={`${card}`}
                            />
                          </Box>
                        )}
                      </Box>
                    </Flex>
                    <Flex
                      justifyContent={"space-between"}
                      gap={"0.7rem"}
                      direction="row"
                      position={"absolute"}
                      top={["77%", "78%"]}
                      left={["44%", "45%"]}
                    >
                      <Box>
                        {timer <= 13 && (
                          <Box
                            key={0}
                            height={["2.5 rem", "0.5rem"]}
                            width={["1.9rem", "3.2rem"]}
                            //  style={{marginTop: '0.9rem', marginLeft: '0.1rem' }}
                          >
                            <Image
                              src={`/cards/${lionCards}`}
                              // boxSize={["1.8rem", "2.9rem"]}
                            />
                          </Box>
                        )}
                      </Box>
                      {/* <Box>
                        {countdown <= 11 && (
                          <Box
                            key={1}
                            height={["2.5 rem", "0.5rem"]}
                            width={["1.9rem", "3.2rem"]}
                            //  style={{marginTop: '0.9rem', marginLeft: '0.4rem' }}
                          >
                            <Image
                              src={`/cards/${player2Cards[1]}`}

                              // alt={`${card}`}
                            />
                          </Box>
                        )}
                      </Box> */}
                    </Flex>
                  </Box>
                </AspectRatio>

                <Flex flexDirection={["column", "row"]} alignItems="center">
                  {/* Box Items */}
                  <Box
                    fontWeight={"700"}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #A52A2A, #FF8C00)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Last Wins:
                  </Box>

                  <Flex width={["100%", "67%"]} p={1} flexWrap="wrap">
                    {gameHistory &&
                      gameHistory?.map((item, index) => (
                        <Box
                          key={index}
                          width={["35px", "35px"]} // Adjusted width for responsiveness
                          height={["45px", "35px"]} // Adjusted height for responsiveness
                          marginRight="5px" // Added right margin to each item
                          marginBottom="5px" // Added bottom margin for spacing
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontWeight="bold"
                          border="2px solid white"
                        >
                          <Text
                            fontSize="14px"
                            color={index % 2 === 0 ? "white" : "red"}
                          >
                            {item}
                          </Text>
                        </Box>
                      ))}
                  </Flex>
                  <Box
                    fontWeight={"700"}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #A52A2A, #FF8C00)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    <>Last Bet Amount :{0}</>
                  </Box>
                </Flex>
              </Box>

              <Box
                marginX={["0rem", "-30rem", "5rem"]}
                marginTop={["0rem", "38rem", "5rem"]}
                width={["100%", "50%"]}
                id="playeryourbetdiv"
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
                    <Text fontSize={["20px", "24px"]}> {availableBal}</Text>
                  </Box>

                  <Box
                    flex="1"
                    width="48%"
                    backgroundColor="orange"
                    textAlign="center"
                    borderRightRadius="10px"
                  >
                    <Text fontSize="18px" fontWeight="bold">
                      Match Id:
                    </Text>
                    <Text fontSize={["20px", "24px"]}>{matchId}</Text>
                  </Box>
                </Flex>
                {/* New Box  */}
                <Box width="90%" id="placeyourbet">
                  <Flex flexDirection="column" alignItems="center">
                    <Text
                      fontSize="20px"
                      fontWeight="bold"
                      marginLeft={["0.5rem"]}
                      mt={"1rem"}
                      color={"white"}
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
                            // boxShadow: "0 8px 12px rgba(0, 0, 255, 0.8)",
                            boxShadow: "0 8px 12px rgba(255, 255, 255, 0.8)",

                            p: "px",
                            rounded: "full",
                            cursor: "pointer",
                          }}
                          // onInput={(e) => setSelectedCoin(e.target.value)}
                          // value={selectedCoin}
                          onClick={() => {
                            // setSelectedCoin(item.value);
                            // console.log(item.value);
                            setSelectCoins(item.value);
                            setSelectedCoins(index);
                          }}
                        >
                          {/* {console.log(selectedCoin, "selectedCoin")} */}
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
                        <Button
                          isDisabled={timer - 25 <= 0 && buttonClick}
                          width="90%"
                          height={["50%", "80%"]}
                          marginLeft="1rem"
                          color="white"
                          fontWeight="800"
                          borderRadius="20%"
                          bgGradient="linear(to-r, #0000FF, #FFA500)"
                          _hover={
                            !buttonClick && {
                              bg: "#FAEBD7",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting("Dragen")}
                        >
                          {buttonClick && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          Dragon
                        </Button>

                        <Button
                          isDisabled={timer - 25 <= 0 && buttonClick}
                          // {<FaLock isDisabled={isButtonDisabled} />}
                          width="90%"
                          height={["50%", "80%"]}
                          marginLeft="1rem"
                          color="white"
                          fontWeight="800"
                          borderRadius="20%"
                          bgGradient="linear(to-r, #0000FF, #FFA500)"
                          _hover={
                            !buttonClick && {
                              bg: "#FAEBD7",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting("Tiger")}
                        >
                          {buttonClick && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          Tiger
                        </Button>

                        <Button
                          isDisabled={timer - 25 <= 0 && buttonClick}
                          // {<FaLock isDisabled={isButtonDisabled} />}
                          width="90%"
                          height={["50%", "80%"]}
                          marginLeft="1rem"
                          color="white"
                          fontWeight="800"
                          borderRadius="20%"
                          bgGradient="linear(to-r, #0000FF, #FFA500)"
                          _hover={
                            !buttonClick && {
                              bg: "#FAEBD7",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting("Lion")}
                        >
                          {buttonClick && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          Lion
                        </Button>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
        {/* </Box> */}
        </ChakraProvider>
    </>
  );
}
