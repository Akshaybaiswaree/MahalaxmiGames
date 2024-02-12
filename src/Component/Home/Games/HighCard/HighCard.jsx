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

// const socket = io("https://highcardsbackend.onrender.com", {
//   query: {
//     userId: Math.floor(Math.random() * Date.now()),
//   },
//   transports: ["websocket"],
// });

// export default function HighCard() {
//   const [timer, setTimer] = useState("");
//   const [availableCoins, setAvailableCoins] = useState("");
//   const [userId, setUserId] = useState("");
//   const [matchId, setMatchId] = useState("");
//   const [cards, setCards] = useState([]);
//   const [winstatus, setWinStatus] = useState("");
//   const [gameHistory, setGameHistory] = useState([]);
//   const [coins, setCoins] = useState("");
//   const [selectedCoins, setSelectedCoins] = useState("");
//   const [docID, setDocId] = useState("");
//   const [buttonClick, setButtonClick] = useState(false);
//   const [bettingAmount, setBettingAmount] = useState("");

//   useEffect(() => {
//     const handelTimer = (data) => {
//       // console.log("timer", data.timer);
//       setTimer(data.timer);
//       data.timer >= 44 ? setBettingAmount(0) : "";
//     };

//     const handelUserDetails = (data) => {
//       console.log("userDetails", data.userData);
//       setAvailableCoins(data.userData.coins);
//       setUserId(data.userData.userId);
//     };

//     const handelGameCreate = (data) => {
//       console.log("gameCreate", data);
//       setMatchId(data.gameCard.gameid);
//       setCards(data.gameCard.Cards);
//       setWinStatus(data.gameCard.winstatus);
//       setDocId(data.gameCard._id);
//       setGameHistory(data.gameHistory);
//     };

//     // const handelGameHistory = (data) => {
//     //   console.log("gameHistory", data);
//     //   setGameHistory(data);
//     // };

//     const handelGameResult = (data) => {
//       console.log("gameResult", data);
//       setCards(data.gameCard.Cards);
//       setWinStatus(data.gameCard.winstatus);
//     };

//     const handelGameUserCoin = () => {
//       // console.log("gameUserCoin", data);
//     };

//     const handelUserBalanceUpdate = (data) => {
//       console.log("gameUserBalanceUpdate", data);
//       setAvailableCoins(data.User.coins);
//       setUserId(data.User.userId);
//     };

//     socket.on("timer", handelTimer);
//     socket.on("userDetails", handelUserDetails);
//     socket.on("game:create", handelGameCreate);
//     // socket.on("game:history", handelGameHistory);
//     socket.on("game:result", handelGameResult);
//     socket.on("game:user-coin", handelGameUserCoin);
//     socket.on("UserBalanceUpdate", handelUserBalanceUpdate);

//     return () => {
//       socket.off("timer", handelTimer);
//       socket.off("userDetails", handelUserDetails);
//       socket.off("game:create", handelGameCreate);
//       // socket.off("game:history", handelGameHistory);
//       socket.off("game:result", handelGameResult);
//       socket.off("game:user-coin", handelGameUserCoin);
//       socket.off("UserBalanceUpdate", handelUserBalanceUpdate);
//     };
//   }, []);

//   if (timer === 10) {
//     socket.emit("getUserBalanceUpdate", userId);
//   }

//   const handelBet = (baitType) => {
//     if (availableCoins < 0) {
//       alert("Insufficient amount");
//       return;
//     }

//     if (timer <= 22) {
//       setButtonClick(true);
//     }

//     const data = {
//       baitType,
//       coins,
//       gameId: docID,
//     };
//     // console.log("betting", baitType, coins, docID);
//     setBettingAmount((prev) => prev + Number(coins))
//     socket.emit("bait", data);
//     console.log("bet", data);
//   };

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
//               High Card
//             </Text>
//             <Button variant="outline" colorScheme="blue" ml="2">
//               Rules
//             </Button>
//           </Flex>
//           <AspectRatio height="50%" controls>
//             <Box
//               // border="4px solid #333"
//               backgroundImage="url('/HighCard/HighCard.webp')"
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
//                 {timer - 25 < 0 ? "0" : timer - 25}
//               </Text>
//               {timer - 25 <= -16 && (
//                 <Text
//                   border="5px solid white"
//                   padding="24px"
//                   borderRadius="50%"
//                   position="absolute"
//                   top="0"
//                   left="0"
//                   color="white"
//                   fontWeight="bold"
//                 >
//                   <span>Winner:{winstatus}</span>
//                 </Text>
//               )}

//               <Box
//                 // border="2px solid yellow"
//                 width="100%"
//                 height="50%"
//                 display="flex"
//                 flexDirection="row"
//                 position="absolute"
//                 bottom="0"
//                 alignItems="center"
//               >
//                 <Box
//                   // border="1px solid pink"
//                   width="5.5%"
//                   height="61.5%"
//                   display="flex"
//                   // justifyContent="space-between"
//                   flexDirection="column"
//                   position="absolute"
//                   left="38.8%"
//                   top="22.7%"
//                 >
//                   {timer - 25 <= 0 && (
//                     <Image
//                       src={`/cards/${cards[0]}`}
//                       alt="0"
//                       width="100%"
//                       height="29%"
//                     />
//                   )}
//                   {timer - 25 <= -7 && (
//                     <Image
//                       src={`/cards/${cards[1]}`}
//                       alt="1"
//                       width="100%"
//                       height="29%"
//                       marginTop="10px"
//                     />
//                   )}
//                   {timer - 25 <= -9 && (
//                     <Image
//                       src={`/cards/${cards[2]}`}
//                       alt="2"
//                       width="100%"
//                       height="29%"
//                       marginTop="12px"
//                     />
//                   )}
//                 </Box>
//                 <Box
//                   // border="1px solid pink"
//                   width="5.5%"
//                   height="61.5%"
//                   display="flex"
//                   // justifyContent="space-between"
//                   flexDirection="column"
//                   position="absolute"
//                   right="40%"
//                   top="22.7%"
//                 >
//                   {timer - 25 <= -11 && (
//                     <Image
//                       src={`/cards/${cards[3]}`}
//                       alt="3"
//                       width="100%"
//                       height="29%"
//                     />
//                   )}
//                   {timer - 25 <= -13 && (
//                     <Image
//                       src={`/cards/${cards[4]}`}
//                       alt="4"
//                       width="100%"
//                       height="29%"
//                       marginTop="10px"
//                     />
//                   )}
//                   {timer - 25 <= -15 && (
//                     <Image
//                       src={`/cards/${cards[5]}`}
//                       alt="5"
//                       width="100%"
//                       height="29%"
//                       marginTop="12px"
//                     />
//                   )}
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
//           {[...Array(10)].map((_, index) => (
//             <Text
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
//               <Text fontSize="18px" color="#c32625">
//                 {gameHistory[index] && gameHistory[index].join(", ")}
//               </Text>
//             </Text>
//           ))}

//           <Text>Match Id: {matchId}</Text>

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
//                   // console.log("coins", value)
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
//                 onClick={() => handelBet(0, coins, docID)}
//                 isDisabled={timer - 25 <= 0 && buttonClick}
//               >
//                 P1 <span>5.88</span>
//               </Button>
//               <Button
//                 width="31%"
//                 display="flex"
//                 justifyContent="space-around"
//                 backgroundColor="#570c8a"
//                 color="white"
//                 variant="unstyled"
//                 onClick={() => handelBet(1, coins, docID)}
//                 isDisabled={timer - 25 <= 0 && buttonClick}
//               >
//                 P2 <span>5.88</span>
//               </Button>
//               <Button
//                 width="31%"
//                 display="flex"
//                 justifyContent="space-around"
//                 backgroundColor="#244c82"
//                 color="white"
//                 variant="unstyled"
//                 onClick={() => handelBet(2, coins, docID)}
//                 isDisabled={timer - 25 <= 0 && buttonClick}
//               >
//                 P3 <span>5.88</span>
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
//                 onClick={() => handelBet(3, coins, docID)}
//                 isDisabled={timer - 25 <= 0 && buttonClick}
//               >
//                 P4 <span>5.88</span>
//               </Button>
//               <Button
//                 width="31%"
//                 display="flex"
//                 justifyContent="space-around"
//                 backgroundColor="#75380e"
//                 color="white"
//                 variant="unstyled"
//                 onClick={() => handelBet(4, coins, docID)}
//                 isDisabled={timer - 25 <= 0 && buttonClick}
//               >
//                 P5 <span>5.88</span>
//               </Button>
//               <Button
//                 width="31%"
//                 display="flex"
//                 justifyContent="space-around"
//                 backgroundColor="#8a1752"
//                 color="white"
//                 variant="unstyled"
//                 onClick={() => handelBet(5, coins, docID)}
//                 isDisabled={timer - 25 <= 0 && buttonClick}
//               >
//                 P6 <span>5.88</span>
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
//             <Box backgroundColor="#c12524" padding="0.5rem" borderRadius="1rem">
//               <Text fontSize="18px" fontWeight="bold" color="white">
//                 Available Credit
//               </Text>
//               <Text
//                 fontSize="18px"
//                 margin="0 0 0.5rem"
//                 fontWeight="bold"
//                 color="white"
//               >
//                 ${Math.round(availableCoins * 100) / 100}
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
//             <Box backgroundColor="pink" padding="0.5rem" borderRadius="1rem">
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

// // import "./TwoCardspatti.css";

// import {
//   AspectRatio,
//   Box,
//   Button,
//   ChakraProvider,
//   Flex,
//   Heading,
//   Image,
//   Modal,
//   Text,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";

// import { FaLock } from "react-icons/fa";
// import { io } from "socket.io-client";

// // import TwoCard from "../../Games/Images/2cardpatti.svg";

// //import PopUp from "./PopUp";
// // import Logo from "../../../images/32cardsA_v.jpeg";
// //  import backGroundImage from "./images/background_plus_cards.jpeg"
// const userId = Math.floor(Math.random() * Date.now());
// // console.log("userId on the client side:", userId);

// const socket = io("https://dragenliontiger.onrender.com/", {
//   query: {
//     userId,
//   },
//   transports: ["websocket"],
// });
// export default function TwoCardsTeenPatti() {
// const [timer, setTimer] = useState("");
// const [playerId, setPlayerId] = useState("");
// const [availableBal, setAvailableBal] = useState("");
// const [matchId, setMatchId] = useState("");
// const [selectBet, setSelectBet] = useState("");
// const [selectCoins, setSelectCoins] = useState("10");
// const [dragonCards, setDragonCards] = useState("");
// const [tigerCards, setTigerCards] = useState("");
// const [lionCards, setLionCards] = useState("");
// const [winnerStatus, setWinnerStatus] = useState("Wait!!");
// const [buttonClick, setButtonClick] = useState(false);
// const [selectedCoins, setSelectedCoins] = useState(null);
// const [gameHistory, setGameHistory] = useState([]);

// useEffect(() => {
//   const handleGameCards = (data) => {
//     console.log("CardsData:-", data);
//     if (data.playerHands) {
//       setDragonCards(data.playerHands.Dragen);
//       setTigerCards(data.playerHands.Tiger);
//       setLionCards(data.playerHands.Lion);
//       // setGamesCards(data.playerHands);
//       setWinnerStatus(data.winner);
//     } else {
//       console.log("Cards is not here", data);
//     }
//   };

//   const handleTimer = (data) => {
//     setTimer(data.countdown);
//   };

//   const handlePlayerId = (data) => {
//     socket.emit("getuser", data);
//     // setPlayerId(data.user.userId);
//     // setMatchId(data.user._id);
//   };

//   const handlePlayerBalance = (data) => {
//     // console.log("Received balance update:", data);
//     setAvailableBal(data.balance);
//   };

//   const handleGetUserBalance = () => {
//     socket.emit("getBalance");
//   };

//   const handleWinHistory = (data) => {
//     console.log("Received win history:", data);
//     if (data && data.winStatuses) {
//       setGameHistory(data.winStatuses);
//     } else {
//       console.error("Invalid or missing win history data.");
//     }
//   };

//   const handleBet = (data) => {
//     setSelectBet(data.choice);
//     setAvailableBal(data.userBalance);
//     setDragonCards(data.DragenNumber);
//     setTigerCards(data.TigerNumber);
//     setLionCards(data.LionNumber);
//     // setGameHistory(data?.gameHistory)
//     console.log(data);
//     // setButtonStatus1(true);
//     // setButtonStatus2(true);
//     // setButtonStatus3(true);

//     console.log("new bet:-", data);
//     // console.log("new bet Choice:-", data.choice);
//     // console.log("new bet balance:-", data.userBalance);
//     // console.log("DragenNumber:-", data.DragenNumber);
//     // console.log("TigerNumber:-", data.TigerNumber);
//     // console.log("LionNumber:-", data.LionNumber);
//   };

//   const handleNewRound = () => {
//     setSelectBet(null);
//     setDragonCards([]);
//     setTigerCards([]);
//     setLionCards([]);
//     // setGamesCards([]);
//     setWinnerStatus(null);
//     // setButtonStatus1(true);
//     // setButtonStatus2(true);
//     // setButtonStatus3(true);
//   };

//   // const handleWinHistory = (data) => {
//   //   console.log("WinHistory", data);
//   //   setGameHistory(data.winStatuses);
//   // };

//   const handleGameId = (data) => {
//     console.log("GameId", data);
//     setMatchId(data.gameId);
//   };

//   handleGetUserBalance();

//   socket.on("countdown", handleTimer);
//   socket.on("balanceUpdate", handlePlayerBalance);
//   socket.on("getuser", handlePlayerId);
//   socket.on("newBet", handleBet);
//   socket.on("newRound", handleNewRound);
//   socket.on("dealCards", handleGameCards);
//   socket.on("WinHistory", handleWinHistory);
//   socket.on("gameId", handleGameId);

//   return () => {
//     socket.off("countdown", handleTimer);
//     socket.off("balanceUpdate", handlePlayerBalance);
//     socket.off("getuser", handlePlayerId);
//     socket.off("newBet", handleBet);
//     socket.off("newRound", handleNewRound);
//     socket.off("dealCards", handleGameCards);
//     socket.off("WinHistory", handleWinHistory);
//     socket.off("gameId", handleGameId);
//   };
// }, []);
// if (timer === 40) {
//   socket.emit("getUpdatedUserDetails");
// }

// const handleBetting = (baitType) => {
//   if (timer - 25 < 0) {
//     setButtonClick(true);
//   }

//   if (availableBal <= 0) {
//     alert("Insufficient Funds");
//     return;
//   }

//   // console.log("bettype", baitType);

//   const coins = parseInt(selectCoins);
//   // console.log("coins", coins);

//   const betData = {
//     selectedChoice: baitType,
//     coins,
//     // cardId: playerId._id,
//   };

//   socket.emit("placeBet", betData);
// };

//   return (
//     <>
//       <ChakraProvider>
//         <Box width={["19rem", "100%"]}>
//           <Box bg={"#451212"} maxW={["100vw", "100vw"]} id="main-div">
//             <Flex
//               align="left-top"
//               justify="left-top"
//               minH="50%"
//               overflow="hidden"
//               flexDirection={["column", "row"]}
//             >
//               <Box
//                 width={["100%", "80%"]}
//                 marginTop="0px"
//                 marginRight="-4rem"
//                 marginBottom="1rem"
//               >
//                 <Flex justify="space-between" align="center" mb="2">
//                   <Text
//                     fontSize={["20px", "24px"]}
//                     fontWeight="bold"
//                     borderRadius="10px"
//                     position="relative"
//                     marginLeft={["5px", "0px"]}
//                     color={"white"}
//                   >
//                     Dragon Tiger Lion
//                   </Text>
//                   <Button
//                     variant="outline"
//                     colorScheme="blue"
//                     mr="2"
//                     paddingX={"3rem"}
//                     mt="2"
//                   >
//                     Rules
//                   </Button>
//                 </Flex>
//                 <AspectRatio borderRadius="10px" controls>
//                   <Box
//                     border="4px solid #333"
//                     height="50%"
//                     backgroundImage="url('/public/DragonTigerLion/DragonTigerLion.webp')"
//                     backgroundSize="cover"
//                     backgroundPosition={`center 100%`}
//                     backgroundRepeat="no-repeat"
//                     display="flex"
//                     flexDirection="column"
//                     justifyContent="flex-start"
//                     alignItems="top"
//                     color="white"
//                     className="firstBox"
//                   >
//                     <Box
//                       fontWeight={"900"}
//                       border={"1px solid white"}
//                       borderRadius={"50%"}
//                       padding={"2px"}
//                       mt={"2rem"}
//                       ml={"1rem"}
//                       position={"absolute"}
//                       top="0"
//                       left="0"
//                       width="25%"
//                       height="22%"
//                       display="flex"
//                       justifyContent="center"
//                       alignItems="center"
//                       fontSize={["10px", "sm"]}
//                       color="white"
//                       // background="linear-gradient(to bottom right, violet, blue)"
//                       background="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
//                     >
//                       {/* {countdown <= 25 ? "Freeze" : "Place  Bet"} */}
//                       {timer <= 8
//                         ? "Winner: " + winnerStatus
//                         : timer <= 25
//                         ? "Freeze"
//                         : "Place Bet"}
//                     </Box>

//                     <Box
//                       fontWeight={"900"}
//                       border={"1px solid white"}
//                       borderRadius={"50%"}
//                       padding={"2px"}
//                       mt={"2rem"}
//                       ml={"1rem"}
//                       position={"absolute"}
//                       top="0"
//                       right="0"
//                       width="15%"
//                       height="17%"
//                       display="flex"
//                       justifyContent="center"
//                       alignItems="center"
//                       fontSize="lg"
//                       background=" linear-gradient(to bottom right, #640E18, #CC1D31,#DAA520)"
//                       marginRight={"1rem"}
//                       color="white"
//                     >
//                       {/* {Math.max(0, countdown) !== null && (
//                         <p>{Math.max(0, countdown - 25)}</p>
//                       )} */}
//                       {timer - 25 < 0 ? "0" : timer - 25}
//                     </Box>

//                     <Flex
//                       justifyContent={"space-between"}
//                       gap={"0.7rem"}
//                       direction="row"
//                       position={"absolute"}
//                       top={["60%", "63%"]}
//                       left={["44%", "45%"]}
//                       // id="playerCard"
//                     >
//                       <Box>
//                         {timer <= 14 && (
//                           <Box
//                             key={1}
//                             height={["20.5 rem", "0.5rem"]}
//                             width={["1.9rem", "3.2rem"]}
//                           >
//                             <Image src={`/cards/${dragonCards}`} />
//                           </Box>
//                         )}
//                       </Box>
//                       <Box>
//                         {timer <= 12 && (
//                           <Box
//                             key={1}
//                             height={["2.5 rem", "0.5rem"]}
//                             width={["1.9rem", "3.2rem"]}
//                           >
//                             <Image
//                               src={`/cards/${tigerCards}`}
//                               // boxSize={["1.8rem", "2.7rem"]}

//                               // top={"80rem"}
//                               // alt={`${card}`}
//                             />
//                           </Box>
//                         )}
//                       </Box>
//                     </Flex>
//                     <Flex
//                       justifyContent={"space-between"}
//                       gap={"0.7rem"}
//                       direction="row"
//                       position={"absolute"}
//                       top={["77%", "78%"]}
//                       left={["44%", "45%"]}
//                     >
//                       <Box>
//                         {timer <= 13 && (
//                           <Box
//                             key={0}
//                             height={["2.5 rem", "0.5rem"]}
//                             width={["1.9rem", "3.2rem"]}
//                             //  style={{marginTop: '0.9rem', marginLeft: '0.1rem' }}
//                           >
//                             <Image
//                               src={`/cards/${lionCards}`}
//                               // boxSize={["1.8rem", "2.9rem"]}
//                             />
//                           </Box>
//                         )}
//                       </Box>
//                       {/* <Box>
//                         {countdown <= 11 && (
//                           <Box
//                             key={1}
//                             height={["2.5 rem", "0.5rem"]}
//                             width={["1.9rem", "3.2rem"]}
//                             //  style={{marginTop: '0.9rem', marginLeft: '0.4rem' }}
//                           >
//                             <Image
//                               src={`/cards/${player2Cards[1]}`}

//                               // alt={`${card}`}
//                             />
//                           </Box>
//                         )}
//                       </Box> */}
//                     </Flex>
//                   </Box>
//                 </AspectRatio>

//                 <Flex flexDirection={["column", "row"]} alignItems="center">
//                   {/* Box Items */}
//                   <Box
//                     fontWeight={"700"}
//                     style={{
//                       backgroundImage:
//                         "linear-gradient(to right, #A52A2A, #FF8C00)",
//                       WebkitBackgroundClip: "text",
//                       color: "transparent",
//                     }}
//                   >
//                     Last Wins:
//                   </Box>

//                   <Flex width={["100%", "67%"]} p={1} flexWrap="wrap">
//                     {gameHistory &&
//                       gameHistory?.map((item, index) => (
//                         <Box
//                           key={index}
//                           width={["35px", "35px"]} // Adjusted width for responsiveness
//                           height={["45px", "35px"]} // Adjusted height for responsiveness
//                           marginRight="5px" // Added right margin to each item
//                           marginBottom="5px" // Added bottom margin for spacing
//                           display="flex"
//                           justifyContent="center"
//                           alignItems="center"
//                           fontWeight="bold"
//                           border="2px solid white"
//                         >
//                           <Text
//                             fontSize="14px"
//                             color={index % 2 === 0 ? "white" : "red"}
//                           >
//                             {item}
//                           </Text>
//                         </Box>
//                       ))}
//                   </Flex>
//                   <Box
//                     fontWeight={"700"}
//                     style={{
//                       backgroundImage:
//                         "linear-gradient(to right, #A52A2A, #FF8C00)",
//                       WebkitBackgroundClip: "text",
//                       color: "transparent",
//                     }}
//                   >
//                     <>Last Bet Amount :{0}</>
//                   </Box>
//                 </Flex>
//               </Box>

//               <Box
//                 marginX={["0rem", "-30rem", "5rem"]}
//                 marginTop={["0rem", "38rem", "5rem"]}
//                 width={["100%", "50%"]}
//                 id="playeryourbetdiv"
//               >
//                 <Flex
//                   width={["95%", "110%"]}
//                   flexDirection="row"
//                   border="3px solid #333"
//                   borderRadius="10px"
//                 >
//                   <Box
//                     flex="1"
//                     width="48%"
//                     backgroundColor="white"
//                     textAlign="center"
//                     borderRadius="10px"
//                   >
//                     <Text fontSize={["18px", "18px"]} fontWeight="bold">
//                       Available Credit
//                     </Text>
//                     <Text fontSize={["20px", "24px"]}> {availableBal}</Text>
//                   </Box>

//                   <Box
//                     flex="1"
//                     width="48%"
//                     backgroundColor="orange"
//                     textAlign="center"
//                     borderRightRadius="10px"
//                   >
//                     <Text fontSize="18px" fontWeight="bold">
//                       Match Id:
//                     </Text>
//                     <Text fontSize={["20px", "24px"]}>{matchId}</Text>
//                   </Box>
//                 </Flex>
//                 {/* New Box  */}
//                 <Box width="90%" id="placeyourbet">
//                   <Flex flexDirection="column" alignItems="center">
//                     <Text
//                       fontSize="20px"
//                       fontWeight="bold"
//                       marginLeft={["0.5rem"]}
//                       mt={"1rem"}
//                       color={"white"}
//                     >
//                       Place Your Bet
//                     </Text>

//                     <Flex
//                       width={["100%", "60%"]}
//                       flexWrap={["nowrap", "nowrap"]}
//                       justifyContent={["center", "flex-start"]}
//                       marginTop={["2rem", "0"]}
//                       marginLeft={["1rem", "-9rem"]}
//                     >
//                       {[
//                         { value: 10, imageSrc: "/Coins/10's coin.webp" },
//                         { value: 50, imageSrc: "/Coins/50's coin.webp" },
//                         { value: 100, imageSrc: "/Coins/100's coin.webp" },
//                         { value: 500, imageSrc: "/Coins/500's coin.webp" },
//                         { value: 1000, imageSrc: "/Coins/1000's coin.webp" },
//                         { value: 5000, imageSrc: "/Coins/5000's coin.webp" },
//                       ].map((item, index) => (
//                         <Button
//                           ml={["0.8rem", "0rem"]}
//                           key={index}
//                           // height="45px"
//                           margin={["rem", "0.9rem"]}
//                           display="flex"
//                           justifyContent="center"
//                           alignItems="center"
//                           fontWeight="bold"
//                           borderRadius={"50%"}
//                           // borderColor={'red'}
//                           variant="unstyled"
//                           _hover={{
//                             // boxShadow: "0 8px 12px rgba(0, 0, 255, 0.8)",
//                             boxShadow: "0 8px 12px rgba(255, 255, 255, 0.8)",

//                             p: "px",
//                             rounded: "full",
//                             cursor: "pointer",
//                           }}
//                           // onInput={(e) => setSelectedCoin(e.target.value)}
//                           // value={selectedCoin}
//                           onClick={() => {
//                             // setSelectedCoin(item.value);
//                             // console.log(item.value);
// setSelectCoins(item.value);
// setSelectedCoins(index);
//                           }}
//                         >
//                           {/* {console.log(selectedCoin, "selectedCoin")} */}
//                           <img
//                             src={item.imageSrc}
//                             alt={`${item.value}'s coin`}
//                             style={{ maxHeight: "100px" }}
//                           />
//                         </Button>
//                       ))}
//                     </Flex>
//                   </Flex>
//                   <Flex
//                     flexDirection="row"
//                     alignItems="center"
//                     justifyContent="center"
//                     padding="0rem"
//                     width="111%"
//                   >
//                     <Box
//                       width="100%"
//                       position="relative"
//                       // border="2px solid #333"
//                       height="8rem"
//                       // bgColor={'red'}

//                       display="flex"
//                       flexDirection="column"
//                       justifyContent="center"
//                       alignItems="center"
//                     >
//                       <Box
//                         width="90%"
//                         height="100%"
//                         position="relative"
//                         // border="2px solid #333"
//                         // marginTop="1rem"
//                         display="flex"
//                         justifyContent="center"
//                         alignItems="center"
//                       >
//                         <Button
//                           isDisabled={timer - 25 <= 0 && buttonClick}
//                           width="90%"
//                           height={["50%", "80%"]}
//                           marginLeft="1rem"
//                           color="white"
//                           fontWeight="800"
//                           borderRadius="20%"
//                           bgGradient="linear(to-r, #0000FF, #FFA500)"
//                           _hover={
//                             !buttonClick && {
//                               bg: "#FAEBD7",
//                               boxShadow: "dark-lg",
//                               color: "black",
//                             }
//                           }
//                           onClick={() => handleBetting("Dragen")}
//                         >
//                           {buttonClick && (
//                             <FaLock
//                               size={35}
//                               style={{ color: "white", marginRight: "0.5rem" }}
//                             />
//                           )}
//                           Dragon
//                         </Button>

//                         <Button
//                           isDisabled={timer - 25 <= 0 && buttonClick}
//                           // {<FaLock isDisabled={isButtonDisabled} />}
//                           width="90%"
//                           height={["50%", "80%"]}
//                           marginLeft="1rem"
//                           color="white"
//                           fontWeight="800"
//                           borderRadius="20%"
//                           bgGradient="linear(to-r, #0000FF, #FFA500)"
//                           _hover={
//                             !buttonClick && {
//                               bg: "#FAEBD7",
//                               boxShadow: "dark-lg",
//                               color: "black",
//                             }
//                           }
//                           onClick={() => handleBetting("Tiger")}
//                         >
//                           {buttonClick && (
//                             <FaLock
//                               size={35}
//                               style={{ color: "white", marginRight: "0.5rem" }}
//                             />
//                           )}
//                           Tiger
//                         </Button>

//                         <Button
//                           isDisabled={timer - 25 <= 0 && buttonClick}
//                           // {<FaLock isDisabled={isButtonDisabled} />}
//                           width="90%"
//                           height={["50%", "80%"]}
//                           marginLeft="1rem"
//                           color="white"
//                           fontWeight="800"
//                           borderRadius="20%"
//                           bgGradient="linear(to-r, #0000FF, #FFA500)"
//                           _hover={
//                             !buttonClick && {
//                               bg: "#FAEBD7",
//                               boxShadow: "dark-lg",
//                               color: "black",
//                             }
//                           }
//                           onClick={() => handleBetting("Lion")}
//                         >
//                           {buttonClick && (
//                             <FaLock
//                               size={35}
//                               style={{ color: "white", marginRight: "0.5rem" }}
//                             />
//                           )}
//                           Lion
//                         </Button>
//                       </Box>
//                     </Box>
//                   </Flex>
//                 </Box>
//               </Box>
//             </Flex>
//           </Box>
//         </Box>
//         {/* </Box> */}
//         </ChakraProvider>
//     </>
//   );
// }

// import "./TwoCardspatti.css";

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
import TwoCard from "../../Games/Images/2cardpatti.svg";
import { io } from "socket.io-client";

//import PopUp from "./PopUp";
// import Logo from "../../../images/32cardsA_v.jpeg";
//  import backGroundImage from "./images/background_plus_cards.jpeg"

const userId = Math.floor(Math.random() * Date.now());
// console.log("userId on the client side:", userId);

const socket = io("https://highcardsbackend.onrender.com", {
  query: {
    userId: Math.floor(Math.random() * Date.now()),
  },
  transports: ["websocket"],
});


export default function HighCard() {
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
                    backgroundImage={TwoCard}
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
                              src={`/cards/${tigerCards}`}
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
                              src={`/cards/${lionCards}`}
                              // boxSize={["1.8rem", "2.7rem"]}

                              // top={"80r em"}
                              // alt={`${card}`}
                            />
                          </Box>
                        )}
                      </Box>
                    </Flex>
                    {/* <Flex
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
                        {countdown <= 13 && (
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
                              src={`/cards/${player2Cards[0]}`}
                              // boxSize={["1.8rem", "2.9rem"]}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box>
                        {countdown <= 11 && (
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
                              src={`/cards/${player2Cards[1]}`}

                              // alt={`${card}`}
                            />
                          </Box>
                        )}
                      </Box>
                    </Flex> */}
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
                      Player Id :{" "}
                      <Text color={"white"} align={"center"}>
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
                      {availableBal ? availableBal : "Loading..."}
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
                          onClick={() => handleBetting("Dragen")}
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          Dragon
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
                          onClick={() => handleBetting("Tiger")}
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          Tiger
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
                          onClick={() => handleBetting("Lion")}
                        >
                          {isButtonDisabled && (
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
      </ChakraProvider>
    </>
  );
}
