// import {
//   AspectRatio,
//   Box,
//   Button,
//   ChakraProvider,
//   Flex,
//   Image,
//   Text,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";

// import { io } from "socket.io-client";

// const socket = io("https://three2-cards-be.onrender.com", {
//   query: {
//     userId: Math.floor(Math.random() * Date.now()),
//   },
//   transports: ["websocket"],
// });

// export default function ThirtyTwoCards() {
// const [timer, setTimer] = useState("");
// const [availableBalance, setAvailableBalance] = useState("");
// const [userId, setUserId] = useState("");
// const [matchId, setMatchId] = useState("");
// const [gameCard, setGameCard] = useState([]);
// const [gameCardValue, setGameCardValue] = useState([]);
// const [gameHistory, setGameHistory] = useState([]);
// const [winStatus, setWinStatus] = useState("");
// const [coins, setCoins] = useState("");
// const [selectedCoins, setSelectedCoins] = useState("");
// const [docID, setDocId] = useState("");
// const [buttonClick, setButtonClick] = useState(false);
// const [bettingAmount, setBettingAmount] = useState("");

// useEffect(() => {
//   const handelTimer = (data) => {
//     // console.log("timer", data);
//     setTimer(data.timer);
//     data.timer >= 44 ? setBettingAmount(0) : "";
//   };

//   const handelUserDetails = (data) => {
//     console.log("userDetails", data);
//     setAvailableBalance(data.userData.coins);
//     setUserId(data.userData.userId);
//   };

//   const handelGameCreate = (data) => {
//     console.log("gameCreate", data);
//     setMatchId(data.gameCard.gameid);
//     setGameCard(data.gameCard.Cards);
//     setGameCardValue(data.gameCard.Cards);
//     setGameHistory(data.gameHistory);
//     setWinStatus(data.gameCard.winstatus);
//     setDocId(data.gameCard._id);
//   };

//   const handelGameResult = (data) => {
//     console.log("gameResult", data);
//     setGameCard(data.gameCard.Cards);
//     setWinStatus(data.gameCard.winstatus);
//   };

//   const handelGameUserCoin = (data) => {
//     console.log("gameUserCoin", data);
//   };

//   const handelUserBalanceUpdate = (data) => {
//     console.log("gameUserBalanceUpdate", data);
//     setAvailableBalance(data.userData.coins);
//     setUserId(data.userData.userId);
//   };

//   socket.on("timer", handelTimer);
//   socket.on("userDetails", handelUserDetails);
//   socket.on("game:create", handelGameCreate);
//   socket.on("game:result", handelGameResult);
//   socket.on("game:user-coin", handelGameUserCoin);
//   socket.on("UserBalanceUpdate", handelUserBalanceUpdate);

//   return () => {
//     socket.off("timer", handelTimer);
//     socket.off("userDetails", handelUserDetails);
//     socket.off("game:create", handelGameCreate);
//     socket.off("game:result", handelGameResult);
//     socket.off("game:user-coin", handelGameUserCoin);
//     socket.off("UserBalanceUpdate", handelUserBalanceUpdate);
//   };
// }, []);
// if (timer === 10) {
//   socket.emit("getUserBalanceUpdate", userId);
// }

// const handelBet = (baitType) => {
//   if (availableBalance < 0) {
//     alert("Insufficient amount");
//     return;
//   }

//   if (timer <= 22) {
//     setButtonClick(true);
//   }

//   const data = {
//     baitType,
//     coins,
//     gameId: docID,
//   };
//   console.log("betting", baitType, coins, docID);
//   setBettingAmount((prev) => prev + Number(coins));

//   socket.emit("bait", data);
//   console.log("bet", data);
// };

//   return (
//     <>
//       <ChakraProvider>
//         <Box width="65%" border="2px solid coralpink">
//           <Flex justify="space-between" align="center" mb="2">
//             <Text
//               fontSize="24px"
//               fontWeight="bold"
//               borderRadius="10px"
//               position="relative"
//             >
//               32 Cards
//             </Text>
//             <Button variant="outline" colorScheme="blue" ml="2">
//               Rules
//             </Button>
//           </Flex>
//           <AspectRatio height="50%" controls>
//             <Box
//               // border="4px solid #333"
//               backgroundImage="url('/32Cards/32-Cards.webp')"
//               display="flex"
//               flexDirection="column"
//               justifyContent="flex-start"
//               alignItems="top"
//               backgroundSize="cover"
//               backgroundPosition={`center 100%`}
//               backgroundRepeat="no-repeat"
//               position="relative"
//             >
//               <Text
//                 border="5px solid white"
//                 padding="20px"
//                 borderRadius="50%"
//                 position="absolute"
//                 top="5"
//                 right="10"
//                 color="white"
//                 fontWeight="bold"
//               >
//                 {/* {timer - 25 < 0 ? "0" : timer - 25} */}
//                 {timer}
//               </Text>
//               <Text
//                 border="5px solid white"
//                 padding="24px"
//                 borderRadius="50%"
//                 position="absolute"
//                 top="0"
//                 left="0"
//                 color="white"
//                 fontWeight="bold"
//               >
//                 <span>Winner : {winStatus ? winStatus : "waiting"}</span>
//               </Text>

//               <Box
//                 // border="2px solid yellow"
//                 width="100%"
//                 height="50%"
//                 display="flex"
//                 flexDirection="row"
//                 position="absolute"
//                 bottom="0"
//                 alignItems="center"
//                 // justifyContent="center"
//               >
//                 <Box
//                   //   border="1px solid black"
//                   width="5.4%"
//                   height="50%"
//                   position="absolute"
//                   left="27.3%"
//                   top="35.2%"
//                   display="flex"
//                   flexDirection="row"
//                   justifyContent="space-between"
//                 >
//                   {gameCard[0] && (
//                     <Image
//                       src={`/cards/${gameCard[0]?.cardName}`}
//                       alt="0"
//                       width="100%"
//                       height="35%"
//                     />
//                   )}
//                   <Text
//                     // border="1px solid black"
//                     width="100%"
//                     fontWeight="bold"
//                     color="white"
//                     fontSize="22px"
//                     position="absolute"
//                     left="0"
//                     top="62%"
//                     align="center"
//                   >
//                     {gameCardValue[0]?.value ? gameCardValue[0]?.value : "0"}
//                   </Text>
//                 </Box>
//                 <Box
//                   // border="1px solid black"
//                   width="5.4%"
//                   height="50%"
//                   position="absolute"
//                   left="40%"
//                   top="35.2%"
//                   display="flex"
//                   flexDirection="row"
//                   justifyContent="space-between"
//                 >
//                   {gameCard[1] && (
//                     <Image
//                       src={`/cards/${gameCard[1]?.cardName}`}
//                       alt="0"
//                       width="100%"
//                       height="35%"
//                     />
//                   )}
//                   <Text
//                     // border="1px solid black"
//                     width="100%"
//                     fontWeight="bold"
//                     color="white"
//                     fontSize="22px"
//                     position="absolute"
//                     left="0"
//                     top="62%"
//                     align="center"
//                   >
//                     {gameCardValue[1]?.value ? gameCardValue[1]?.value : "0"}
//                   </Text>
//                 </Box>
//                 <Box
//                   // border="1px solid black"
//                   width="5.4%"
//                   height="50%"
//                   position="absolute"
//                   right="41.8%"
//                   top="35.2%"
//                   display="flex"
//                   flexDirection="row"
//                   justifyContent="space-between"
//                 >
//                   {gameCard[2] && (
//                     <Image
//                       src={`/cards/${gameCard[2]?.cardName}`}
//                       alt="0"
//                       width="100%"
//                       height="35%"
//                     />
//                   )}
//                   <Text
//                     // border="1px solid black"
//                     width="100%"
//                     fontWeight="bold"
//                     color="white"
//                     fontSize="22px"
//                     position="absolute"
//                     left="0"
//                     top="62%"
//                     align="center"
//                   >
//                     {gameCardValue[2]?.value ? gameCardValue[2]?.value : "0"}
//                   </Text>
//                 </Box>
//                 <Box
//                   // border="1px solid black"
//                   width="5.4%"
//                   height="50%"
//                   position="absolute"
//                   right="29%"
//                   top="35.2%"
//                   display="flex"
//                   flexDirection="row"
//                   justifyContent="space-between"
//                 >
//                   {gameCard[3] && (
//                     <Image
//                       src={`/cards/${gameCard[3]?.cardName}`}
//                       alt="0"
//                       width="100%"
//                       height="35%"
//                     />
//                   )}
//                   <Text
//                     // border="1px solid black"
//                     width="100%"
//                     fontWeight="bold"
//                     color="white"
//                     fontSize="22px"
//                     position="absolute"
//                     left="0"
//                     top="62%"
//                     align="center"
//                   >
//                     {gameCardValue[3]?.value ? gameCardValue[3]?.value : "0"}
//                   </Text>
//                 </Box>
//               </Box>
//             </Box>
//           </AspectRatio>
//         </Box>
//         {/* Player History */}
//         <Text fontWeight="bold">Last Wins :</Text>
//         <Box
//           width="65%"
//           // border="2px solid darkgreen"
//           display="flex"
//           justifyContent="space-between"
//         >
//           {gameHistory.map((e, index) => (
//             <Box
//               border="1px solid black"
//               backgroundColor="grey"
//               key={index}
//               fontSize="20px"
//               color="#c32625"
//               width="5%"
//               height="40%"
//               align="center"
//               fontWeight="bold"
//             >
//               <Text fontSize="18px" color="#234c75">
//                 {e}
//               </Text>
//             </Box>
//           ))}

//           <Text>Match Id: {matchId} </Text>

//           <Button width="20%" colorScheme="blue">
//             Player History
//           </Button>
//         </Box>
//         {/* Betting Area */}

//         <Box
//           width="50%"
//           position="absolute"
//           // border="4px solid #333"
//           height="40%"
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           justifyContent="space-around"
//           backgroundColor="#2c2721"
//           marginTop="1%"
//         >
//           <Text color="white" textAlign="left">
//             Place Your Bet!
//           </Text>
//           <Box
//             border="2px solid white"
//             width="40%"
//             height="20%"
//             display="flex"
//             borderRadius="5rem"
//             backgroundColor="transparent"
//             alignItems="center"
//           >
//             {[
//               { value: 10, imageName: "10's coin.webp" },
//               { value: 50, imageName: "50's coin.webp" },
//               { value: 100, imageName: "100's coin.webp" },
//               { value: 500, imageName: "500's coin.webp" },
//               { value: 1000, imageName: "1000's coin.webp" },
//               { value: 5000, imageName: "5000's coin.webp" },
//             ].map(({ value, imageName }, index) => (
//               <Button
//                 // border="2px solid grey"
//                 key={index}
//                 variant="unstyled"
//                 width="90%"
//                 height="90%"
//                 _hover={{
//                   width: selectedCoins === index ? "110%" : "80%",
//                   height: selectedCoins === index ? "110%" : "80%",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => {
//                   setCoins(value);
//                   console.log("coins", value);
//                   setSelectedCoins(index);
//                 }}
//               >
//                 <img
//                   src={`/Coins/${imageName}`}
//                   alt={`Image for ${imageName}`}
//                   style={{ width: "90%", height: "90%" }}
//                 />
//               </Button>
//             ))}
//           </Box>
//           <Box
//             width="90%"
//             height="45%"
//             border="2px solid #333"
//             display="flex"
//             alignItems="center"
//             backgroundColor="black"
//             borderRadius="1rem"
//             flexDirection="column"
//           >
//             <Box
//               width="90%"
//               height="50%"
//               alignItems="center"
//               display="flex"
//               justifyContent="space-around"
//             >
//               <Button
//                 width="31%"
//                 display="flex"
//                 justifyContent="space-around"
//                 backgroundColor="#971b23"
//                 color="white"
//                 variant="unstyled"
//                 onClick={() => handelBet(8, coins, docID)}
//                 isDisabled={timer - 25 <= 0 && buttonClick}
//               >
//                 Player8<span>11.2</span>
//               </Button>
//               <Button
//                 width="31%"
//                 display="flex"
//                 justifyContent="space-around"
//                 backgroundColor="#570c8a"
//                 color="white"
//                 variant="unstyled"
//                 onClick={() => handelBet(9, coins, docID)}
//                 isDisabled={timer - 25 <= 0 && buttonClick}
//               >
//                 Player9<span>4.95</span>
//               </Button>
//             </Box>
//             <Box
//               width="90%"
//               height="50%"
//               alignItems="center"
//               display="flex"
//               justifyContent="space-around"
//             >
//               <Button
//                 width="31%"
//                 display="flex"
//                 justifyContent="space-around"
//                 backgroundColor="#489686"
//                 color="white"
//                 variant="unstyled"
//                 onClick={() => handelBet(10, coins, docID)}
//                 isDisabled={timer - 25 <= 0 && buttonClick}
//               >
//                 Player10<span>2.2</span>
//               </Button>
//               <Button
//                 width="31%"
//                 display="flex"
//                 justifyContent="space-around"
//                 backgroundColor="#75380e"
//                 color="white"
//                 variant="unstyled"
//                 onClick={() => handelBet(11, coins, docID)}
//                 isDisabled={timer - 25 <= 0 && buttonClick}
//               >
//                 Player11<span>1.08</span>
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//         {/* side part */}
//         <Box
//           // border="5px dotted blue"
//           width="23%"
//           height="30%"
//           position="absolute"
//           right="5"
//           top="35%"
//           display="flex"
//           flexDirection="column"
//         >
//           <Box
//             border="2px solid #333"
//             width="100%"
//             justifyContent="center"
//             align="center"
//             borderRadius="1rem"
//           >
//             <Box backgroundColor="#234c75" padding="0.5rem" borderRadius="1rem">
//               <Text fontSize="18px" fontWeight="bold" color="white">
//                 Available Credit
//               </Text>
//               <Text
//                 fontSize="18px"
//                 margin="0 0 0.5rem"
//                 fontWeight="bold"
//                 color="white"
//               >
//                 ${Math.round(availableBalance * 100) / 100}
//               </Text>
//             </Box>

//             <Box backgroundColor="#e0e0e0" padding="0.5rem" borderRadius="1rem">
//               <Text fontSize="18px" fontWeight="bold">
//                 Player ID
//               </Text>
//               <Text fontSize="18px" margin="0 0 0.5rem" fontWeight="bold">
//                 {userId}
//               </Text>
//             </Box>
//             <Box backgroundColor="blue" padding="0.5rem" borderRadius="1rem">
//               <Text fontSize="18px" fontWeight="bold">
//                 Betting Amount
//               </Text>
//               <Text fontSize="18px" margin="0 0 0.5rem" fontWeight="bold">
//                 {bettingAmount ? bettingAmount : "0"}
//               </Text>
//             </Box>
//           </Box>
//         </Box>
//       </ChakraProvider>
//     </>
//   );
// }

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

const socket = io("https://highcardsbackend.onrender.com", {
  query: {
    userId: Math.floor(Math.random() * Date.now()),
  },
  transports: ["websocket"],
});

export default function ThirtyTwoCards() {
  const [timer, setTimer] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");
  const [userId, setUserId] = useState("");
  const [matchId, setMatchId] = useState("");
  const [gameCard, setGameCard] = useState([]);
  const [gameCardValue, setGameCardValue] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [winStatus, setWinStatus] = useState("");
  const [coins, setCoins] = useState("");
  const [selectedCoins, setSelectedCoins] = useState("");
  const [docID, setDocId] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const [bettingAmount, setBettingAmount] = useState("");

  useEffect(() => {
    const handelTimer = (data) => {
      // console.log("timer", data);
      setTimer(data.timer);
      data.timer >= 44 ? setBettingAmount(0) : "";
    };

    const handelUserDetails = (data) => {
      console.log("userDetails", data);
      setAvailableBalance(data.userData.coins);
      setUserId(data.userData.userId);
    };

    const handelGameCreate = (data) => {
      console.log("gameCreate", data);
      setMatchId(data.gameCard.gameid);
      setGameCard(data.gameCard.Cards);
      setGameCardValue(data.gameCard.Cards);
      setGameHistory(data.gameHistory);
      setWinStatus(data.gameCard.winstatus);
      setDocId(data.gameCard._id);
    };

    const handelGameResult = (data) => {
      console.log("gameResult", data);
      setGameCard(data.gameCard.Cards);
      setWinStatus(data.gameCard.winstatus);
    };

    const handelGameUserCoin = (data) => {
      console.log("gameUserCoin", data);
    };

    const handelUserBalanceUpdate = (data) => {
      console.log("gameUserBalanceUpdate", data);
      setAvailableBalance(data.userData.coins);
      setUserId(data.userData.userId);
    };

    socket.on("timer", handelTimer);
    socket.on("userDetails", handelUserDetails);
    socket.on("game:create", handelGameCreate);
    socket.on("game:result", handelGameResult);
    socket.on("game:user-coin", handelGameUserCoin);
    socket.on("UserBalanceUpdate", handelUserBalanceUpdate);

    return () => {
      socket.off("timer", handelTimer);
      socket.off("userDetails", handelUserDetails);
      socket.off("game:create", handelGameCreate);
      socket.off("game:result", handelGameResult);
      socket.off("game:user-coin", handelGameUserCoin);
      socket.off("UserBalanceUpdate", handelUserBalanceUpdate);
    };
  }, []);
  if (timer === 10) {
    socket.emit("getUserBalanceUpdate", userId);
  }

  const handelBet = (baitType) => {
    if (availableBalance < 0) {
      alert("Insufficient amount");
      return;
    }

    if (timer <= 22) {
      setButtonClick(true);
    }

    const data = {
      baitType,
      coins,
      gameId: docID,
    };
    console.log("betting", baitType, coins, docID);
    setBettingAmount((prev) => prev + Number(coins));

    socket.emit("bait", data);
    console.log("bet", data);
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
                    32 Cards
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
                    backgroundImage="url('/HighCard/HighCard.webp')"
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
                      background=" linear-gradient(to bottom right, #640E18, #CC1D31,#DAA520)"
                      marginRight={"1rem"}
                      color="white"
                    >
                      {/* {Math.max(0, countdown) !== null && (
                        <p>{Math.max(0, countdown - 25)}</p>
                      )} */}
                      {timer - 25 <= 0 ? "0" : timer - 25}
                    </Box>

                    <Flex
                      justifyContent={"space-between"}
                      gap={{
                        base: "0.2rem",
                        sm: "0.1rem",
                        md: "0.3rem",
                        lg: "0.2rem",
                        xl: "0.5rem",
                        "2xl": "0.4rem",
                      }}
                      direction="row"
                      position={"absolute"}
                      // top={["60%", "63%"]}
                      // left={["44%", "45%"]}
                      top={{
                        base: "63%",
                        sm: "62%",
                        md: "68%",
                        lg: "63%",
                        xl: "63.5%",
                        "2xl": "63%",
                      }}
                      left={{
                        base: "45.5%",
                        sm: "44%",
                        md: "50%",
                        lg: "44.5%",
                        xl: "44%",
                        "2xl": "43%",
                      }}
                      // id="playerCard"
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
                                md: "2.4rem",
                                lg: "",
                                xl: "3.3rem",
                                "2xl": "4rem",
                              }}
                              height={{
                                base: "2.3rem",
                                sm: "2rem",
                                md: "1rem",
                                lg: "2.4rem",
                                xl: "3.2rem",
                                "2xl": "4rem",
                              }}
                              // height={{base:"rem" , md:"3.5rem"}}
                              src={`/cards/${cards[0]}`}
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
                                base: "2rem",
                                sm: "2rem",
                                md: "2.4rem",
                                lg: "",
                                xl: "3.3rem",
                                "2xl": "4rem",
                              }}
                              height={{
                                base: "2.3rem",
                                sm: "2rem",
                                md: "1rem",
                                lg: "2.4rem",
                                xl: "3.2rem",
                                "2xl": "4rem",
                              }}
                              // height={{ base: "rem", md: "3.5rem" }}
                              src={`/cards/${cards[1]}`}
                              // boxSize={["1.8rem", "2.7rem"]}

                              // top={"80r em"}
                              // alt={`${card}`}
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
                                base: "2rem",
                                sm: "2rem",
                                md: "2.4rem",
                                lg: "",
                                xl: "3.3rem",
                                "2xl": "4rem",
                              }}
                              height={{
                                base: "2.3rem",
                                sm: "2rem",
                                md: "1rem",
                                lg: "2.4rem",
                                xl: "3.2rem",
                                "2xl": "4rem",
                              }}
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
                      gap={{
                        base: "0.2rem",
                        sm: "0.1rem",
                        md: "0.3rem",
                        lg: "0.2rem",
                        xl: "0.5rem",
                        "2xl": "0.4rem",
                      }}
                      direction="row"
                      position={"absolute"}
                      // top={["77%", "78%"]}
                      // left={["44%", "45%"]}
                      top={{
                        base: "80%",
                        sm: "75 %",
                        md: "70%",
                        lg: "79%",
                        xl: "80%",
                        "2xl": "79%",
                      }}
                      left={{
                        base: "45.3%",
                        sm: "45.5%",
                        md: "50%",
                        lg: "44.5%",
                        xl: "44%",
                        "2xl": "43%",
                      }}
                    >
                      <Box>
                        {timer <= 13 && (
                          <Box
                            key={0}
                            // height={["2.5 rem", "0.5rem"]}

                            //  style={{marginTop: '0.9rem', marginLeft: '0.1rem' }}
                          >
                            <Image
                              width={{
                                base: "1.8rem",
                                sm: "2rem",
                                md: "2.4rem",
                                lg: "",
                                xl: "3.3rem",
                                "2xl": "4rem",
                              }}
                              height={{
                                base: "2.3rem",
                                sm: "2rem",
                                md: "1rem",
                                lg: "2.4rem",
                                xl: "3.2rem",
                                "2xl": "4rem",
                              }}
                              src={`/cards/${cards[3]}`}
                              // boxSize={["1.8rem", "2.9rem"]}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box>
                        {timer <= 11 && (
                          <Box
                            key={1}
                            // height={["2.5 rem", "0.5rem"]}
                          >
                            <Image
                              width={{
                                base: "2rem",
                                sm: "2rem",
                                md: "2.4rem",
                                lg: "",
                                xl: "3.3rem",
                                "2xl": "4rem",
                              }}
                              height={{
                                base: "2.3rem",
                                sm: "2rem",
                                md: "1rem",
                                lg: "2.4rem",
                                xl: "3.2rem",
                                "2xl": "4rem",
                              }}
                              src={`/cards/${cards[4]}`}

                              // alt={`${card}`}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box>
                        {timer <= 11 && (
                          <Box
                            key={1}
                            // height={["2.5 rem", "0.5rem"]}
                          >
                            <Image
                              width={{
                                base: "2rem",
                                sm: "2rem",
                                md: "2.4rem",
                                lg: "",
                                xl: "3.3rem",
                                "2xl": "4rem",
                              }}
                              height={{
                                base: "2.3rem",
                                sm: "2rem",
                                md: "1rem",
                                lg: "2.4rem",
                                xl: "3.2rem",
                                "2xl": "4rem",
                              }}
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
                        "linear-gradient(to right, #A52A2A, #FF8C00)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    <>
                      Player Id :
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
                        "linear-gradient(to right, #A52A2A, #FF8C00)",
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
                          color={index % 2 === 0 ? "white" : "red"}
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
                    backgroundColor="white"
                    textAlign="center"
                    borderRadius="10px"
                  >
                    <Text fontSize={["18px", "18px"]} fontWeight="bold">
                      Available Credit
                    </Text>
                    <Text fontSize={["20px", "24px"]}>
                      {availableCoins ? availableCoins : "0"}
                      {/* {`${Math.round(availableCoins * 100) / 100} ? 
                      ${Math.round(availableCoins * 100) / 100} : "Loading" `} */}
                    </Text>
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
                          bgGradient="linear(to-r, #0000FF, #FFA500)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#FAEBD7",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(0, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          P1 <span>5.88</span>
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
                          bgGradient="linear(to-r, #0000FF, #FFA500)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#FAEBD7",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(1, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          P2 <span>5.88</span>
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
                          bgGradient="linear(to-r, #0000FF, #FFA500)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#FAEBD7",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(2, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          P3 <span>5.88</span>
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
                          bgGradient="linear(to-r, #0000FF, #FFA500)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#FAEBD7",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(3, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          P4 <span>5.88</span>
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
                          bgGradient="linear(to-r, #0000FF, #FFA500)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#FAEBD7",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(4, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          P5 <span>5.88</span>
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
                          bgGradient="linear(to-r, #0000FF, #FFA500)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#FAEBD7",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting(5, coins, docID)}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          P6 <span>5.88</span>
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
