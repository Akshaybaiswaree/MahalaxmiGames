import "./DragonTigerLion.css";

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

const userId = localStorage.getItem("userId");
const socket = io("https://dragontigerlionbackend.onrender.com", {
  query: {
    userID: userId,
  },
  transports: ["websocket"],
});

export default function DragonTigerLion() {
  const [gameState, setGameState] = useState({ value: "waiting" });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [mainCard, setMainCard] = useState({});
  const [selectedCoins, setSelectedCoins] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [bettingAmount, setBettingAmount] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState();

  useEffect(() => {
    const userID = localStorage.getItem("userId");
    if (userID) {
      socket.io.opts.query.userID = userID;
      socket.disconnect();
      socket.connect();
    }
  }, [localStorage.getItem("userId")]);

  useEffect(() => {
    const handleGameUpdate = (data) => {
      // console.log("timer", data?.gamestate);
      setGameState(data.gamestate);
      data.gamestate.value - 25 === 20 ? setBettingAmount(0) : "";
      const isDisabled = data.gamestate.value - 25 <= 0;
      setButtonDisabled(isDisabled);
    };

    const handleUserDetails = (data) => {
      console.log("UserDetails", data);
      setUser(data.user);
    };

    const handleMainCard = (data) => {
      console.log("MainCard", data);
      setMainCard(data.mainCard);
      setGameHistory(data.gameHistory);
    };

    const handleBet = (data) => {
      console.log("bet", data);
    };

    socket.on("gameUpdate", handleGameUpdate);
    socket.on("userDetails", handleUserDetails);
    socket.on("Main_Card", handleMainCard);
    socket.on("bet", handleBet);

    return () => {
      socket.off("gameUpdate", handleGameUpdate);
      socket.off("userDetails", handleUserDetails);
      socket.off("Main_Card", handleMainCard);
      socket.off("bet", handleBet);
    };
  }, []);
  if (gameState?.value === 5) {
    socket.emit("getUpdatedUserDetails");
  }

  
  const handleBetting = (betType) => {
    if(user?.coins === 0){
      alert("Insufficient Fund.")
      return;
    }
    if (user?.coins > coins) {
      const bet = {
        betType,
        coins,
        cardId: mainCard._id,
      };
      socket.emit("bet", bet);
      console.log("betting1234", betType, coins, mainCard._id);
      setBettingAmount((prev) => prev + Number(coins));
    }else (
      alert("Betting Amount is greater than Balances.")
    )
  };

  return (
    <>
      <ChakraProvider>
        <Box width={["19rem", "100%"]}>
          <Box bg={"black"} maxW={["100vw", "100vw"]} id="main-div">
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
                      {gameState?.value <= 8
                        ? "Winner: " + mainCard?.winstatus
                        : gameState?.value <= 25
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
                      {gameState?.value - 25 <= 0 ? "0" : gameState?.value - 25}
                    </Box>

                    <Flex className="gdragontigerlion" direction="row">
                      <Box className="cartbox1">
                        {gameState?.value <= 14 && (
                          <Box key={1}>
                            <Image
                              className="dtlcard1"
                              src={`/cards/${mainCard?.dragoncard}`}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box className="cartbox2">
                        {gameState?.value <= 12 && (
                          <Box key={1}>
                            <Image
                              className="dtlcard2"
                              src={`/cards/${mainCard?.tigercard}`}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box className="cartbox3">
                        {gameState?.value <= 10 && (
                          <Box key={1}>
                            <Image
                              className="dtlcard3"
                              src={`/cards/${mainCard?.lioncard}`}
                            />
                          </Box>
                        )}
                      </Box>
                    </Flex>
                  </Box>
                </AspectRatio>

                <Flex flexDirection={["column", "column"]} alignItems="center">
                  <Button
                    bg={"black"}
                    fontWeight={"700"}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #A52A2A, #FF8C00)",
                      WebkitBackgroundClip: "text",
                      color: "yellow",
                    }}
                  >
                    <>
                      Player Id :
                      <Text color={"#bae8e8"} align={"center"}>
                        {user?.mobileNumber ? user?.mobileNumber : "Loading..."}
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
                      color: "yellow  ",
                    }}
                  >
                    Last Wins:
                  </Button>

                  <Flex
                    width={["100%", "67%"]}
                    p={1}
                    flexWrap="wrap"
                    align={"center"}
                    textAlign={"center"}
                    justifyContent={"center"}
                  >
                    {gameHistory?.map((item, index) => (
                      <Box
                        key={index}
                        width={["35px", "35px"]}
                        height={["45px", "35px"]}
                        marginRight="5px"
                        marginBottom="5px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        textAlign={"center"}
                        fontWeight="bold"
                        border="2px solid white"
                        align={"center"}
                        borderRadius={"50%"}
                        bg={'red'}
                      >
                        <Text
                          fontSize="14px"
                          color={index % 2 === 0 ? "white" : "white"}
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
                      color: "yellow",
                    }}
                  >
                    <>
                      Last Bet Amount :
                      <Text color={"#bae8e8"} align={"center"}>
                        {bettingAmount}
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
                  alignItems={"center"}
                  textAlign={"center"}
                  ml={{ base: "0.6rem", md: "rem" }}
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
                      {Math.round(user?.coins * 100) / 100
                        ? Math.round(user?.coins * 100) / 100
                        : "0"}
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
                      {mainCard?.gameid ? mainCard?.gameid : "Loading..."}
                    </Text>
                  </Box>
                </Flex>
                {/* New Box  */}
                <Box width="90%" id="placeyourbet">
                  <Flex flexDirection="column" alignItems="center">
                    <Text
                      fontSize="20px"
                      fontWeight="bold"
                      marginLeft={["2.9rem", "0.5rem"]}
                      mt={"1rem"}
                      color={"yellow"}
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
                            // setSelectCoins(item.value);
                            setCoins(item.value);
                            console.log("coins", item.value);
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
                          color="white"
                          fontWeight="900"
                          borderRadius="20%"
                          bgGradient="linear(to-r,red, #3e4a61)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(179.7deg, rgb(197, 214, 227) 2.9%, rgb(144, 175, 202) 97.1%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={
                            () => handleBetting("dragon")
                            // console.log("dragon")
                          }
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
                            Dragon<span>2.94</span>
                          </Text>
                        </Button>

                        <Button
                          isDisabled={isButtonDisabled}
                          // {<FaLock isDisabled={isButtonDisabled} />}
                          width={["80%", "100%"]}
                          height={["50%", "80%"]}
                          marginLeft="1rem"
                          color="white"
                          fontWeight="900"
                          borderRadius="20%"
                          bgGradient="linear(to-r,red, #3e4a61)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(179.7deg, rgb(197, 214, 227) 2.9%, rgb(144, 175, 202) 97.1%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting("tiger")}
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
                          color="white"
                          fontWeight="900"
                          borderRadius="20%"
                          bgGradient="linear(to-r,red, #3e4a61)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(179.7deg, rgb(197, 214, 227) 2.9%, rgb(144, 175, 202) 97.1%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting("lion")}
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
