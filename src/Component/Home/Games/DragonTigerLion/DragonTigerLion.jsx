 import "./DragontigerLion.css";

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

import { FaLock } from "react-icons/fa";
import { io } from "socket.io-client";

const userId = Math.floor(Math.random() * Date.now());
// console.log("userId on the client side:", userId);

const socket = io("https://dragenliontiger.onrender.com/", {
  query: {
    userId,
  },
  transports: ["websocket"],
});

export default function DragonTigerLion() {
  const [timer, setTimer] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [availableBal, setAvailableBal] = useState("");
  const [matchId, setMatchId] = useState("");
  const [selectBet, setSelectBet] = useState("");
  const [selectCoins, setSelectCoins] = useState("0");
  const [dragonCards, setDragonCards] = useState("");
  const [tigerCards, setTigerCards] = useState("");
  const [lionCards, setLionCards] = useState("");
  const [winnerStatus, setWinnerStatus] = useState("Wait!!");
  const [isButtonDisabled, setButtonDisabled] = useState();
  const [selectedCoins, setSelectedCoins] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [currentBet, setCurrentBet] = useState(0);

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
      const isDisabled = data?.countdown <= 25;
      data.countdown >= 44 ? setCurrentBet(0) : "";
      setTimer(data.countdown);
      setButtonDisabled(isDisabled);
      // data.countdown >= 44 ? handleBetting({}) : "";
    };

    const handlePlayerId = (data) => {
      socket.emit("getuser", data);
      setPlayerId(data.user.userId);
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

      console.log("new bet:-", data);

      // console.log("LionNumber:-", data.LionNumber);
    };

    const handleNewRound = () => {
      setSelectBet(null);
      setDragonCards([]);
      setTigerCards([]);
      setLionCards([]);
      // setGamesCards([]);
      setWinnerStatus(null);
    };

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
    if (availableBal <= 0) {
      alert("Insufficient Funds");
      return;
    }

    // console.log("bettype", baitType);

    setCurrentBet((prev) => prev + coins);
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
          <Box bg={"#35495e"} maxW={["100vw", "100vw"]} id="main-div">
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
                    backgroundImage="url('/DragonTigerLion/DragonTigerLion.webp')"
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
                      background="linear-gradient(to top, #09203f 0%, #537895 100%)"
                    >
                      {/* {countdown <= 25 ? "Freeze" : "Place  Bet"}
                      {countdown <= 8 ? "Winner : " + winner : "Loading"} */}
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
                      background="linear-gradient(to top, #09203f 0%, #537895 100%)"
                      marginRight={"1rem"}
                      color="white"
                    >
                      {/* {Math.max(0, countdown) !== null && (
                        <p>{Math.max(0, countdown - 25)}</p>
                      )} */}
                      {timer - 25 <= 0 ? "0" : timer - 25}
                    </Box>

                    <Flex
                      // border={"1px solid black"}
                      justifyContent={"space-between"}
                      className="gapdragontigerlion"
                      gap={{
                        base: "5.3rem",
                        sm: "rem",
                        md: "1.5rem",
                        lg: "5rem",
                        xl: "7.3rem",
                        "2xl": "6rem",
                      }}
                      direction="row"
                      position={"absolute"}
                      top={{
                        base: "68.8%",
                        sm: "68.8%",
                        md: "68.8%",
                        lg: "68.8%",
                        xl: "68.8%",
                        "2xl": "68.8%",
                      }}
                      left={{
                        base: "19.6%",
                        sm: "19.6%",
                        md: "19.6%",
                        lg: "20%",
                        xl: "19.6%",
                        "2xl": "19.6%",
                      }}
                    >
                      <Box>
                        {timer <= 14 && (
                          <Box
                            key={1}
                            // height={["20.5 rem", "0.5rem"]}
                          >
                            <Image
                              width={{
                                base: "1.8rem",
                                sm: "2rem",
                                md: "2rem",
                                lg: "",
                                xl: "3.3rem",
                                "2xl": "4rem",
                              }}
                              height={{
                                base: "2.3rem",
                                sm: "2rem",
                                md: "1.6rem", // Adjust the height as needed
                                lg: "2.4rem",
                                xl: "3.2rem",
                                "2xl": "4rem",
                              }}
                              src={`/cards/${dragonCards}`}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box>
                        {timer <= 12 && (
                          <Box
                            key={1}
                            // height={["2.5 rem", "0.5rem"]}
                          >
                            <Image
                              width={{
                                base: "1.8rem",
                                sm: "2rem",
                                md: "2rem",
                                lg: "",
                                xl: "3.3rem",
                                "2xl": "4rem",
                              }}
                              height={{
                                base: "2.3rem",
                                sm: "2rem",
                                md: "1.6rem", // Adjust the height as needed
                                lg: "2.4rem",
                                xl: "3.2rem",
                                "2xl": "4rem",
                              }}
                              src={`/cards/${tigerCards}`}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box>
                        {timer <= 10 && (
                          <Box
                            key={1}
                            // height={["2.5 rem", "0.5rem"]}
                          >
                            <Image
                              width={{
                                base: "1.8rem",
                                sm: "2rem",
                                md: "2rem",
                                lg: "",
                                xl: "3.3rem",
                                "2xl": "4rem",
                              }}
                              height={{
                                base: "2.3rem",
                                sm: "2rem",
                                md: "1.6rem", // Adjust the height as needed
                                lg: "2.4rem",
                                xl: "3.2rem",
                                "2xl": "4rem",
                              }}
                              src={`/cards/${lionCards}`}
                            />
                          </Box>
                        )}
                      </Box>
                    </Flex>
                  </Box>
                </AspectRatio>

                <Flex flexDirection={["column", "column"]} alignItems="center">
                  {/* Box Items */}

                  <Button
                    bg={"black"}
                    fontWeight={"700"}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #A52A2A, #FF8C00)",
                      WebkitBackgroundClip: "text",
                      color: "#1d1716",
                    }}
                  >
                    <>
                      Player Id :
                      <Text color={"#bae8e8"} align={"center"}>
                        {playerId ? playerId : "Loading..."}
                      </Text>
                    </>
                  </Button>
                  <Button
                    bg={"black"}
                    fontWeight={"700"}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #A52A2A, #FF8C00)",
                      WebkitBackgroundClip: "text",
                      color: "#1d1716",
                    }}
                  >
                    Last Wins:
                  </Button>

                  <Flex
                    width={["100%", "67%"]}
                    p={1}
                    flexWrap="wrap"
                    align={"center"}
                    textAlign={'center'}
                    justifyContent={'center'}
                  >
                    {gameHistory?.map((item, index) => (
                      <Box
                        key={index}
                        width={["35px", "35px"]} // Adjusted width for responsiveness
                        height={["45px", "35px"]} // Adjusted height for responsiveness
                        marginRight="5px" // Added right margin to each item
                        marginBottom="5px" // Added bottom margin for spacing
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        textAlign={"center"}
                        fontWeight="bold"
                        border="2px solid white"
                        align={"center"}
                      >
                        <Text
                          fontSize="14px"
                          color={index % 2 === 0 ? "#2a2438" : "#bae8e8"}
                          align={"center"}
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
                      color: "#1d1716",
                    }}
                  >
                    <>
                      Last Bet Amount :
                      <Text color={"#bae8e8"} align={"center"}>
                        {currentBet}
                      </Text>
                    </>
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
                justifyContent={"center"}
                alignItems={'center'}
                textAlign={'center'}
                ml={{base:"0.6rem" , md:"rem" }}
                  width={["95%", "110%"]}
                  flexDirection="row"
                  // border="3px solid #333"
                  borderRadius="10px"
                >
                  <Box
                    flex="1"
                    width="48%"
                    // backgroundColor="white"
                    background=" linear-gradient(179.7deg, rgb(197, 214, 227) 2.9%, rgb(144, 175, 202) 97.1%)"
                    textAlign="center"
                    borderRadius="10px"
                    border={"4px solid black"}
                  >
                    <Text fontSize={["18px", "18px"]} fontWeight="bold">
                      Available Credit
                    </Text>
                    <Text fontSize={["20px", "24px"]}>
                      {availableBal ? availableBal : "0"}
                      {/* {`${Math.round(availableBal * 100) / 100} ? ${
                        Math.round(availableBal * 100) / 100
                      } : "Loading..."`} */}
                    </Text>
                  </Box>

                  <Box
                    border={"4px solid black"}
                    flex="1"
                    width="48%"
                    background="linear-gradient(179.7deg, rgb(197, 214, 227) 2.9%, rgb(144, 175, 202) 97.1%)"
                    textAlign="center"
                    borderRadius="10px"
                  >
                    <Text fontSize="18px" fontWeight="bold" color={"black"}>
                      Match Id:
                    </Text>
                    <Text fontSize={["20px", "24px"]} color={"black"}>
                      {matchId ? matchId : "Loading..."}
                    </Text>
                  </Box>
                </Flex>
                {/* New Box  */}
                <Box width="90%" id="placeyourbet">
                  <Flex flexDirection="column" alignItems="center">
                    <Text
                      fontSize="20px"
                      fontWeight="bold"
                      marginLeft={["2.9rem" , "0.5rem"]}
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
                        width={["110%", "120%"]}
                        height="100%"
                        position="relative"
                        // border="2px solid #333"
                        // marginTop="1rem"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Button
                          isDisabled={isButtonDisabled}
                          width={["80%", "100%"]}
                          height={["50%", "80%"]}
                          marginLeft="2rem"
                          color="black"
                          fontWeight="800"
                          borderRadius="20%"
                          bgGradient="linear(to-r,#a7bcb9, #3e4a61)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(179.7deg, rgb(197, 214, 227) 2.9%, rgb(144, 175, 202) 97.1%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting("Dragen")}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                       <Text>  Dragon<span>2.94</span></Text>  */}
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{
                                color: "white",
                                marginRight: "0.5rem",
                                position: "relative",
                                zIndex: "2",
                              }}
                            />
                          )}
                          <Text style={{ position: "absolute", zIndex: "1" }}>
                            {" "}
                            Dragon<span>2.94</span>
                          </Text>
                        </Button>

                        <Button
                          isDisabled={isButtonDisabled}
                          // {<FaLock isDisabled={isButtonDisabled} />}
                          width={["80%", "100%"]}
                          height={["50%", "80%"]}
                          marginLeft="1rem"
                          color="black"
                          fontWeight="800"
                          borderRadius="20%"
                          bgGradient="linear(to-r,#a7bcb9, #3e4a61)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(179.7deg, rgb(197, 214, 227) 2.9%, rgb(144, 175, 202) 97.1%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting("Tiger")}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                         {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{
                                color: "white",
                                marginRight: "0.5rem",
                                position: "relative",
                                zIndex: "2",
                              }}
                            />
                          )}
                          <Text style={{ position: "absolute", zIndex: "1" }}>
                            {" "}
                            Tiger<span>2.94</span>
                          </Text>
                        </Button>
                        <Button
                          isDisabled={isButtonDisabled}
                          // {<FaLock isDisabled={isButtonDisabled} />}
                          width={["80%", "100%"]}
                          marginRight={["2rem", "0rem"]}
                          height={["50%", "80%"]}
                          marginLeft="1rem"
                          color="black"
                          fontWeight="800"
                          borderRadius="20%"
                          bgGradient="linear(to-r,#a7bcb9, #3e4a61)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(179.7deg, rgb(197, 214, 227) 2.9%, rgb(144, 175, 202) 97.1%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting("Lion")}
                          display={"flex"}
                          justifyContent={"space-evenly"}
                        >
                           {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{
                                color: "white",
                                marginRight: "0.5rem",
                                position: "relative",
                                zIndex: "2",
                              }}
                            />
                          )}
                          <Text style={{ position: "absolute", zIndex: "1" }}>
                            {" "}
                            Lion<span>2.94</span>
                          </Text>
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
