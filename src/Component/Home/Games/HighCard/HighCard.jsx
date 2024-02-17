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
import "./HighCard.css";
import { FaLock } from "react-icons/fa";
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
  const [winStatus, setWinStatus] = useState("");
  const [gameHistory, setGameHistory] = useState([]);
  const [coins, setCoins] = useState("");
  const [selectedCoins, setSelectedCoins] = useState("");
  const [docID, setDocId] = useState("");
  // const [buttonClick, setButtonClick] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState();
  const [bettingAmount, setBettingAmount] = useState("");

  useEffect(() => {
    const handelTimer = (data) => {
      // console.log("timer", data.timer);
      const isDisabled = data?.timer <= 25;
      setTimer(data.timer);
      data.timer >= 44 ? setBettingAmount(0) : "";
      setButtonDisabled(isDisabled);
    };

    const handelUserDetails = (data) => {
      console.log("userDetails", data.userData);
      setAvailableCoins(data.userData.coins);
      setUserId(data.userData.userId);
    };

    const handelGameCreate = (data) => {
      console.log("gameCreate", data);
      setMatchId(data.gameCard.gameid);
      setCards(data.gameCard.Cards);
      setWinStatus(data.gameCard.winstatus);
      setDocId(data.gameCard._id);
      setGameHistory(data.gameHistory);
    };

    // const handelGameHistory = (data) => {
    //   console.log("gameHistory", data);
    //   setGameHistory(data);
    // };

    const handelGameResult = (data) => {
      console.log("gameResult", data);
      setCards(data.gameCard.Cards);
      setWinStatus(data.gameCard.winstatus);
    };

    const handelGameUserCoin = () => {
      // console.log("gameUserCoin", data);
    };

    const handelUserBalanceUpdate = (data) => {
      console.log("gameUserBalanceUpdate", data);
      setAvailableCoins(data.User.coins);
      setUserId(data.User.userId);
    };

    socket.on("timer", handelTimer);
    socket.on("userDetails", handelUserDetails);
    socket.on("game:create", handelGameCreate);
    // socket.on("game:history", handelGameHistory);
    socket.on("game:result", handelGameResult);
    socket.on("game:user-coin", handelGameUserCoin);
    socket.on("UserBalanceUpdate", handelUserBalanceUpdate);

    return () => {
      socket.off("timer", handelTimer);
      socket.off("userDetails", handelUserDetails);
      socket.off("game:create", handelGameCreate);
      // socket.off("game:history", handelGameHistory);
      socket.off("game:result", handelGameResult);
      socket.off("game:user-coin", handelGameUserCoin);
      socket.off("UserBalanceUpdate", handelUserBalanceUpdate);
    };
  }, []);

  if (timer === 10) {
    socket.emit("getUserBalanceUpdate", userId);
  }

  const handleBetting = (baitType) => {
    if (availableCoins < 0) {
      alert("Insufficient amount");
      return;
    }

    const data = {
      baitType,
      coins,
      gameId: docID,
    };
    // console.log("betting", baitType, coins, docID);
    setBettingAmount((prev) => prev + Number(coins));
    socket.emit("bait", data);
    console.log("bet", data);
  };

  return (
    <>
      <ChakraProvider>
        <Box width={["19rem", "100%"]}>
          <Box bg={"#1f2e2e"} maxW={["100vw", "100vw"]} id="main-div">
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
                    High Cards
                  </Text>
                  <Button
                    variant="outline"
                    bg={"white"}
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
                    backgroundImage="url('/HighCard/HighCard.webp')"
                    backgroundSize="cover"
                    backgroundPosition={`center 100%`}
                    backgroundRepeat="no-repeat"
                    display="flex"
                    flexDirection="row"
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
                      color="black"
                      // background="linear-gradient(to bottom right, violet, blue)"
                      // background="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                      background="linear-gradient(to bottom right, #BDB76B, #FFFFFF)"

                    >
                      {/* {countdown <= 25 ? "Freeze" : "Place  Bet"}
                      {countdown <= 8 ? "Winner : " + winner : "Loading"} */}
                      {timer <= 8
                        ? "Winner: " + winStatus
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
                      color="black"
                      // background="linear-gradient(to bottom right, violet, blue)"
                      // background="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                      background="linear-gradient(to bottom right, #BDB76B, #FFFFFF)"
                      marginRight={"1rem"}
                   
                    >
                      {/* {Math.max(0, countdown) !== null && (
                        <p>{Math.max(0, countdown - 25)}</p>
                      )} */}
                      {timer - 25 <= 0 ? "0" : timer - 25}
                    </Box>

                    <Flex
                      // justifyContent={"space-between"}
                      // gap={{
                      //   base: "0.2rem",
                      //   sm: "0.1rem",
                      //   md: "0.1rem",
                      //   lg: "0.1rem",
                      //   xl: "0.3rem",
                      //   "2xl": "0.4rem",
                      // }}
                      direction="column"
                      // position={"absolute"}
                      // top={["60%", "63%"]}
                      // left={["44%", "45%"]}
                      // top={{
                      //   base: "60.5%",
                      //   sm: "62%",
                      //   md: "60%",
                      //   lg: "60%",
                      //   xl: "61%",
                      //   "2xl": "63%",
                      // }}
                      // left={{
                      //   base: "39%",
                      //   sm: "40%",
                      //   md: "39%",
                      //   lg: "38%",
                      //   xl: "38%",
                      //   "2xl": "43%",
                      // }}
                      id="playerCard"
                    >
                      <Box
                      className="card1"
                      >
                        {timer <= 14 && (
                          <Box
                            key={1}
                            // height={["20.5 rem", "0.5rem"]}
                          >
                            <Image
                            //  className=" card1"
                              // width={{
                              //   base: "1.5rem",
                              //   sm: "1.5rem",
                              //   md: "1.5rem",
                              //   lg: "1.6rem",
                              //   xl: "2.5rem",
                              //   "2xl": "4rem",
                              // }}
                              // height={{
                              //   base: "2rem",
                              //   sm: "1.5rem",
                              //   md: "1.5rem",
                              //   lg: "1.6rem",
                              //   xl: "2.6rem",
                              //   "2xl": "4rem",
                              // }}
                              // height={{base:"rem" , md:"3.5rem"}}
                              src={`/cards/${cards[0]}`}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box
                      className="card2"
                      >
                        {timer <= 13 && (
                          <Box
                            key={1}
                            // height={["2.5 rem", "0.5rem"]}
                          >
                            <Image
                            //  className=" card2"
                              // width={{
                              //   base: "1.4rem",
                              //   sm: "1.5rem",
                              //   md: "1.5rem",
                              //   lg: "1.6rem",
                              //   xl: "2.5rem",
                              //   "2xl": "4rem",
                              // }}
                              // height={{
                              //   base: "2rem",
                              //   sm: "1.5rem",
                              //   md: "1.5rem",
                              //   lg: "1.6rem",
                              //   xl: "2.6rem",
                              //   "2xl": "4rem",
                              // }}
                              // height={{ base: "rem", md: "3.5rem" }}
                              src={`/cards/${cards[1]}`}
                              // boxSize={["1.8rem", "2.7rem"]}

                              // top={"80r em"}
                              // alt={`${card}`}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box
                      className="card3"
                      >
                        {timer <= 12 && (
                          <Box
                            key={1}
                            // height={["2.5 rem", "0.5rem"]}
                          >
                            <Image
                            //  className="card4"
                              // width={{
                              //   base: "1.4rem",
                              //   sm: "1.5rem",
                              //   md: "1.5rem",
                              //   lg: "1.6rem",
                              //   xl: "2.5rem",
                              //   "2xl": "4rem",
                              // }}
                              // height={{
                              //   base: "2rem",
                              //   sm: "2rem",
                              //   md: "2rem",
                              //   lg: "1.6rem",
                              //   xl: "2.7rem",
                              //   "2xl": "4rem",
                              // }}
                              // height={{ base: "rem", md: "3.5rem" }}
                              src={`/cards/${cards[2]}`}
                              // boxSize={["1.8rem", "2.7rem"]}

                              // top={"80r em"}
                              // alt={`${card}`}
                            />
                          </Box>
                        )}
                      </Box>
                    </Flex>
                    <Flex
                      // gap={{
                      //   base: "0.2rem",
                      //   sm: "0.1rem",
                      //   md: "0.3rem",
                      //   lg: "0.2rem",
                      //   xl: "0.3rem",
                      //   "2xl": "0.4rem",
                      // }}
                      direction="column"
                      // position={"absolute"}
                      // top={["77%", "78%"]}
                      // left={["44%", "45%"]}
                      // top={{
                      //   base: "60.5%",
                      //   sm: "62%",
                      //   md: "65%",
                      //   lg: "60.5%",
                      //   xl: "61%",
                      //   "2xl": "79%",
                      // }}
                      // left={{
                      //   base: "54.3%",
                      //   sm: "55.5%",
                      //   md: "53%",
                      //   lg: "53.5%",
                      //   xl: "53.5%",
                      //   "2xl": "43%",
                      // }}
                      className="cardbox2"
                    >
                      <Box
                      className="card4"
                      >
                        {timer <= 11 && (
                          <Box
                            key={0}
                            // height={["2.5 rem", "0.5rem"]}

                            //  style={{marginTop: '0.9rem', marginLeft: '0.1rem' }}
                          >
                            <Image
                             className="highcardheight"
                              // width={{
                              //   base: "1.5rem",
                              //   sm: "2rem",
                              //   md: "2rem",
                              //   lg: "1.6rem",
                              //   xl: "2.5rem",
                              //   "2xl": "4rem",
                              // }}
                              // height={{
                              //   base: "2rem",
                              //   sm: "2rem",
                              //   md: "2rem",
                              //   lg: "1.5rem",
                              //   xl: "2.7rem",
                              //   "2xl": "4rem",
                              // }}
                              src={`/cards/${cards[3]}`}
                              // boxSize={["1.8rem", "2.9rem"]}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box
                      className="card5"
                      >
                        {timer <= 10 && (
                          <Box
                            key={1}
                            // height={["2.5 rem", "0.5rem"]}
                          >
                            <Image
                             className="highcardheight"
                              // width={{
                              //   base: "1.5rem",
                              //   sm: "2rem",
                              //   md: "2rem",
                              //   lg: "1.6rem",
                              //   xl: "2.5rem",
                              //   "2xl": "4rem",
                              // }}
                              // height={{
                              //   base: "2rem",
                              //   sm: "2rem",
                              //   md: "2rem",
                              //   lg: "1.5rem",
                              //   xl: "2.7rem",
                              //   "2xl": "4rem",
                              // }}
                              src={`/cards/${cards[4]}`}

                              // alt={`${card}`}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box
                      className="card6"
                      >
                        {timer <= 9 && (
                          <Box
                            key={1}
                            // height={["2.5 rem", "0.5rem"]}
                          >
                            <Image
                            className="highcardheight"
                              // width={{
                              //   base: "1.5rem",
                              //   sm: "2rem",
                              //   md: "2rem",
                              //   lg: "1.6rem",
                              //   xl: "2.6rem",
                              //   "2xl": "4rem",
                              // }}
                              // height={{
                              //   base: "2rem",
                              //   sm: "2rem",
                              //   md: "2rem",
                              //   lg: "1.55rem",
                              //   xl: "2.6rem",
                              //   "2xl": "4rem",
                              // }}
                              src={`/cards/${cards[5]}`}

                              // alt={`${card}`}
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
                      "linear-gradient(to right, #BDB76B, #FFFFFF)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    <>
                      Player Id :{" "}
                      <Text color={"white"} align={"center"}>
                        {userId ? userId : "Loading..."}
                      </Text>
                    </>
                  </Button>
                  <Button
                    bg={"black"}
                    fontWeight={"700"}
                    style={{
                      backgroundImage:
                      "linear-gradient(to right, #BDB76B, #FFFFFF)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Last Wins:
                  </Button>

                  <Flex
                    width={["100%", "67%"]}
                    p={1}
                    flexWrap="wrap"
                    align={"center"}
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
                          color={index % 2 === 0 ? "white" : "orange"}
                          align={"center"}
                        >
                          {item}
                        </Text>
                      </Box>
                    ))}
                  </Flex>
                  <Box
                      //  bgGradient= "linear(to-r,#006400,)"
                    fontWeight={"700"}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #BDB76B, #FFFFFF)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    <>
                      Last Bet Amount :
                      <Text color={"white"} align={"center"}>
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
                  width={["95%", "110%"]}
                  flexDirection="row"
                  border="3px solid #333"
                  borderRadius="10px"
                >
                  <Box
                    flex="1"
                    width="48%"
                    backgroundColor="#739966"
                    border={"3px solid black"}
                    textAlign="center"
                    borderRadius="10px"
                  >
                    <Text fontSize={["18px", "18px"]} fontWeight="bold">
                      Available Credit
                    </Text>
                    <Text fontSize={["20px", "24px"]}>
                      {availableCoins ? availableCoins : "0"}
                   
                    </Text>
                  </Box>

                  <Box
                    flex="1"
                    width="48%"
                    border={"3px solid black"}
                    backgroundColor="#739966"
                    textAlign="center"
                    borderRightRadius="10px"
                  >
                    <Text fontSize="18px" fontWeight="bold">
                      Match Id:
                    </Text>
                    <Text fontSize={["20px", "24px"]}>
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
                      marginLeft={["0.5rem"]}
                      mt={"1rem"}
                      color={"white"}
                   
                      style={{
                        backgroundImage:
                        "linear-gradient(to right, #BDB76B, #FFFFFF)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
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
                            setCoins(item.value);
                            //                   // console.log("coins", value)
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
                          isDisabled={isButtonDisabled}
                          width="90%"
                          height={["50%", "80%"]}
                          marginLeft="1rem"
                          color="white"
                          fontWeight="800"
                          borderRadius="20%"
                          // bgGradient="linear(to-r, #0000FF, #FFA500)"
                          bgGradient= "linear(to-r,#006400, #FFFFFF)"
                        //  bgGradient: linear(to-r);

                          _hover={
                            !isButtonDisabled && {
                              bg: "#006400",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(0, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "black", marginRight: "0.5rem" }}
                            />
                          )}
                       <Text color="black">  P1 <span>5.88</span></Text>  */}
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
                            <Text color="black">  P1 <span>5.88</span></Text>
                          </Text>
                        </Button>

                        <Button
                          isDisabled={isButtonDisabled}
                          // {<FaLock isDisabled={isButtonDisabled} />}
                          width="90%"
                          height={["50%", "80%"]}
                          marginLeft="1rem"
                          color="white"
                          fontWeight="800"
                          borderRadius="20%"
                          bgGradient= "linear(to-r,#006400, #FFFFFF)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#006400",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(1, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "black", marginRight: "0.5rem" }}
                            />
                          )}
                    <Text color="black">  P2 <span>5.88</span></Text>  */}
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
                            <Text color="black">  P2 <span>5.88</span></Text>
                          </Text>
                        </Button>
                        <Button
                          isDisabled={isButtonDisabled}
                          // {<FaLock isDisabled={isButtonDisabled} />}
                          width="90%"
                          height={["50%", "80%"]}
                          marginLeft="1rem"
                          color="white"
                          fontWeight="800"
                          borderRadius="20%"
                          bgGradient= "linear(to-r,#006400, #FFFFFF)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#006400",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(2, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "black", marginRight: "0.5rem" }}
                            />
                          )}
                           <Text color="black">  P3 <span>5.88</span></Text>  */}
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
                            <Text color="black">  P3 <span>5.88</span></Text> 
                          </Text>
                        </Button>
                      </Box>
                    </Box>
                  </Flex>
                  <Flex
         
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    padding="0rem"
                    width="111%"
                  >
                    <Box
                
                    marginTop={{base:"-3rem" , md:"1em"}}
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
                          isDisabled={isButtonDisabled}
                          width="90%"
                          height={["50%", "80%"]}
                          marginLeft="1rem"
                          color="white"
                          fontWeight="800"
                          borderRadius="20%"
                          bgGradient= "linear(to-r,#006400, #FFFFFF)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#006400",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(3, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "black", marginRight: "0.5rem" }}
                            />
                          )}
                         <Text color="black">  P4 <span>5.88</span></Text>  */}
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
                            <Text color="black">  P4 <span>5.88</span></Text>
                          </Text>
                        </Button>

                        <Button
                          isDisabled={isButtonDisabled}
                          // {<FaLock isDisabled={isButtonDisabled} />}
                          width="90%"
                          height={["50%", "80%"]}
                          marginLeft="1rem"
                          color="white"
                          fontWeight="800"
                          borderRadius="20%"
                          bgGradient= "linear(to-r,#006400, #FFFFFF)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#006400",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(4, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "black", marginRight: "0.5rem" }}
                            />
                          )}
                         <Text color="black">  P5 <span>5.88</span></Text>  */}
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
                            <Text color="black">  P5 <span>5.88</span></Text>
                          </Text>
                        </Button>
                        <Button
                          isDisabled={isButtonDisabled}
                          // {<FaLock isDisabled={isButtonDisabled} />}
                          width="90%"
                          height={["50%", "80%"]}
                          marginLeft="1rem"
                          color="black"
                          fontWeight="800"
                          borderRadius="20%"
                          bgGradient= "linear(to-r,#006400, #FFFFFF)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#006400",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(5, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "black", marginRight: "0.5rem" }}
                            />
                          )}
                        <Text color="black">  P6 <span>5.88</span></Text>  */}
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
                          <Text >  P6 <span>5.88</span></Text>  
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
