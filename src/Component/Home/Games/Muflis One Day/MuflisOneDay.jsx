// import {
//   AspectRatio,
//   Box,
//   Button,
//   ChakraProvider,
//   Flex,
//   Image,
//   Table,
//   Tbody,
//   Td,
//   Text,
//   Th,
//   Thead,
//   Tr,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";

// import { io } from "socket.io-client";

// const socket = io("https://muflish-one-days.onrender.com/", {
//   query: {
//     userId: Math.floor(Math.random() * Date.now()),
//   },
//   transports: ["websocket"],
// });

// export default function MuflisOneDay() {
//   const [timer, setTimer] = useState("");
//   const [availableBalance, setAvailableBalance] = useState("");
//   const [userId, setUserId] = useState("");
//   const [playerACards, setPlayerACards] = useState([]);
//   const [playerBCards, setPlayerBCards] = useState([]);
//   const [winnerStatus, setWinnerStatus] = useState("");
//   const [winHistory, setWinHistory] = useState([]);
//   const [selectedCoin, setSelectedCoin] = useState([]);
//   const [selectedCoins, setSelectedCoins] = useState([]);
//   const [gameId, setGameId] = useState("");
//   const [bettingAmount, setBettingAmount] = useState("");

//   useEffect(() => {
//     const handleDealCards = (data) => {
//       console.log("Deal Cards", data);
//       setPlayerACards(data.singlecard.playerA);
//       setPlayerBCards(data.singlecard.playerB);
//       setWinnerStatus(data.winner);
//       // setWinHistory(data.winHistory);
//     };

//     const handleCountdown = (data) => {
//       console.log("timer", data);
//       setTimer(data.countdown);
//       data.countdown >= 120 ? setBettingAmount(0) : "";
//     };

//     const handleNewBet = (data) => {
//       console.log("Betting", data);
//       //   setSelectedChoice(data.choice);
//     };

//     const handleNewRound = () => {
//       //   console.log("New Round", data);
//       setPlayerACards([]);
//       setPlayerBCards([]);
//       setWinnerStatus("");
//     };

//     const handleBalanceUpdate = (data) => {
//       //   console.log("New Balance", data);
//       setAvailableBalance(data.balance);
//     };

//     const handleUser = (data) => {
//       //   console.log("User Details", data);
//       setAvailableBalance(data.user.balance);
//       setUserId(data.user.userId);
//     };

//     const handleWinHistory = (data) => {
//       console.log("Game History", data);
//       setWinHistory(data.winStatuses);
//     };

//     const handleMatchId = (data) => {
//       //   console.log("Match Id", data);
//       setGameId(data.gameId);
//     };

//     socket.on("dealSingleCard", handleDealCards);
//     socket.on("countdown", handleCountdown);
//     socket.on("newBet", handleNewBet);
//     socket.on("newRound", handleNewRound);
//     socket.on("balanceUpdate", handleBalanceUpdate);
//     socket.on("getuser", handleUser);
//     socket.on("WinHistory", handleWinHistory);
//     socket.on("gameId", handleMatchId);

//     return () => {
//       socket.off("dealSingleCard", handleDealCards);
//       socket.off("countdown", handleCountdown);
//       socket.off("newBet", handleNewBet);
//       socket.off("newRound", handleNewRound);
//       socket.off("balanceUpdate", handleBalanceUpdate);
//       socket.off("getuser", handleUser);
//       socket.off("WinHistory", handleWinHistory);
//       socket.off("gameId", handleMatchId);
//     };
//   }, []);

//   const handelPlaceBet = (baitType) => {
//     const coins = parseInt(selectedCoin);
//     const betData = {
//       selectedChoice: baitType,
//       coins,
//     };
//     setBettingAmount((prev) => prev + Number(coins));
//     socket.emit("placeBet", betData);
//     console.log("selectedChoice", betData);
//     console.log("selectedCoins", coins);
//   };

//   return (
//     <>
//       <ChakraProvider>
//         <Box width="100%" id="first">
//           <Flex justify="space-between" align="center" mb="2">
//             <Text
//               fontSize="24px"
//               fontWeight="bold"
//               borderRadius="10px"
//               position="relative"
//             >
//               Muflis One Day
//             </Text>
//             {/* <Text>{selectBet}</Text> */}
//             <Button variant="outline" colorScheme="blue" ml="2">
//               Rules
//             </Button>
//           </Flex>
//           <AspectRatio minHeight="50%" borderRadius="10px" controls>
//             <Box
//               //   border="4px solid #333"
//               backgroundImage="url('/MuflisOneDay/Muflis one day table.webp')"
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
//                 id="round2"
//               >
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
//                 id="round1"
//               >
//                 <span>Winner:{winnerStatus}</span>
//               </Text>

//               <Box
//                 // border="2px solid yellow"
//                 width="100%"
//                 height="50%"
//                 display="flex"
//                 flexDirection="row"
//                 justifyContent="center"
//                 position="absolute"
//                 bottom="0"
//                 alignItems="center"
//               >
//                 <Box
//                   // border="2px solid black"
//                   position="absolute"
//                   width="21.5%"
//                   height="21%"
//                   display="flex"
//                   left="23.7%"
//                   top="35%"
//                   //   justifyContent="space-between"
//                 >
//                   {playerACards.map((image, index) => (
//                     <Image
//                       key={index}
//                       src={`/cards/${image}`}
//                       alt={playerACards}
//                     />
//                   ))}
//                 </Box>
//                 <Box
//                   // border="2px solid black"
//                   position="absolute"
//                   width="21.5%"
//                   height="21%"
//                   display="flex"
//                   right="24%"
//                   top="35%"
//                   //   justifyContent="space-between"
//                 >
//                   {playerBCards.map((image, index) => (
//                     <Image
//                       key={index}
//                       src={`/cards/${image}`}
//                       alt={playerBCards}
//                     />
//                   ))}
//                 </Box>
//               </Box>
//             </Box>
//           </AspectRatio>
//         </Box>
//         {/* Player History */}
//         <Text fontWeight="bold">Last Wins :</Text>
//         <Box
//           width="65%"
//           // height="15%"
//           // border="2px solid darkgreen"
//           display="flex"
//           position="relative"
//           justifyContent="space-between"
//         >
//           {winHistory &&
//             winHistory.map((e, index) => (
//               <Box
//                 border="1px solid black"
//                 backgroundColor="grey"
//                 key={index}
//                 fontSize="20px"
//                 color={index % 2 === 0 ? "black" : "#553325"}
//                 width="5%"
//                 height="40%"
//                 align="center"
//                 fontWeight="bold"
//               >
//                 <Text
//                   fontSize="18px"
//                   color={index % 2 === 0 ? "#black" : "#553325"}
//                 >
//                   {/* {winHistory[index] && winHistory[index]} */}
//                   {e}
//                 </Text>
//               </Box>
//             ))}

//           <Text>Match Id:{gameId}</Text>

//           <Button width="20%" colorScheme="blue">
//             Player History
//           </Button>
//         </Box>
//         {/* Betting Area */}

//         <Box
//           width="50%"
//           position="absolute"
//           // border="4px solid #333"
//           height="45%"
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           justifyContent="space-between"
//           backgroundColor="#2c2721"
//           marginTop="1%"
//         >
//           <Text color="white" textAlign="left">
//             Place Your Bet!
//           </Text>
//           <Box
//             border="2px solid white"
//             width="40%"
//             height="60%"
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
//                 width="80%"
//                 height="80%"
//                 _hover={{
//                   width: selectedCoins === index ? "110%" : "80%",
//                   height: selectedCoins === index ? "110%" : "80%",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => {
//                   setSelectedCoin(value);
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
//             width="80%"
//             height="100%"
//             border="2px solid #333"
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             backgroundColor="black"
//             borderRadius="1rem"
//           >
//             <Button
//               width="45%"
//               height="80%"
//               // variant="unstyled"
//               backgroundColor="#640e18"
//               borderRadius="1rem"
//               alignItems="center"
//               flexDirection="row"
//               display="flex"
//               justifyContent="space-around"
//               onClick={() => handelPlaceBet("PlayerA")}
//               _hover={{
//                 backgroundColor: "#e77526",
//                 "&:hover": {
//                   "> :first-child": {
//                     color: "black",
//                     fontWeight: "bold",
//                   },
//                   "> :last-child": {
//                     color: "black",
//                     fontWeight: "bold",
//                   },
//                 },
//               }}
//             >
//               <Text textColor="white">Player A</Text>
//               <Text textColor="white">1.98</Text>
//             </Button>

//             <Button
//               width="45%"
//               height="80%"
//               // variant="unstyled"
//               backgroundColor="#1c3e6b"
//               borderRadius="1rem"
//               display="flex"
//               justifyContent="space-around"
//               flexDirection="row"
//               onClick={() => handelPlaceBet("PlayerB")}
//               _hover={{
//                 backgroundColor: "#f3cb07",
//                 "&:hover": {
//                   "> :first-child": {
//                     color: "black",
//                     fontWeight: "bold",
//                   },
//                   "> :last-child": {
//                     color: "black",
//                     fontWeight: "bold",
//                   },
//                 },
//               }}
//             >
//               <Text textColor="white">Player B</Text>
//               <Text textColor="white">1.98</Text>
//             </Button>
//           </Box>
//         </Box>
//         {/* side part */}
//         <Box
//           // border="5px dotted blue"
//           width="28%"
//           height="100%"
//           position="absolute"
//           right="0"
//           top="33%"
//           display="flex"
//           justifyContent="space-around"
//           flexDirection="column"
//         >
//           <Box
//             border="2px solid #333"
//             width="100%"
//             justifyContent="center"
//             align="center"
//             borderRadius="1rem"
//           >
//             <Box backgroundColor="#ee9d1e" padding="0.5rem" borderRadius="1rem">
//               <Text fontSize="18px" fontWeight="bold" color="white">
//                 Available Credit
//               </Text>
//               <Text
//                 fontSize="18px"
//                 margin="0 0 0.5rem"
//                 fontWeight="bold"
//                 color="white"
//               >
//                 {`${Math.round(availableBalance * 100) / 100} ? ${
//                   Math.round(availableBalance * 100) / 100
//                 } : "Loading..."`}
//               </Text>
//             </Box>

//             <Box backgroundColor="#e0e0e0" padding="0.5rem" borderRadius="1rem">
//               <Text fontSize="18px" fontWeight="bold">
//                 Player ID
//               </Text>
//               <Text fontSize="18px" margin="0 0 0.5rem" fontWeight="bold">
//                 {userId ? userId : "wait"}
//               </Text>
//             </Box>
//             <Box backgroundColor="gold" padding="0.5rem" borderRadius="1rem">
//               <Text fontSize="18px" fontWeight="bold">
//                 Betting Amount
//               </Text>
//               <Text fontSize="18px" margin="0 0 0.5rem" fontWeight="bold">
//                 {bettingAmount ? bettingAmount : "0"}
//               </Text>
//             </Box>
//           </Box>

//           <Box border="2px solid black" borderRadius="1rem">
//             <Table variant="simple" width="100%">
//               <Thead>
//                 <Tr>
//                   <Th>High Cards Market Payouts</Th>
//                 </Tr>
//                 <Tr>
//                   <Th>Hands</Th>
//                   <Th>Payout</Th>
//                 </Tr>
//               </Thead>
//               <Tbody>
//                 {/* Add your table rows here */}
//                 <Tr>
//                   <Td>With Highest Card Of 9</Td>
//                   <Td>1 to 2</Td>
//                 </Tr>
//                 <Tr>
//                   <Td>With Highest Card Of 8</Td>
//                   <Td>1 to 3</Td>
//                 </Tr>
//                 <Tr>
//                   <Td>With Highest Card Of 7</Td>
//                   <Td>1 to 4</Td>
//                 </Tr>
//                 <Tr>
//                   <Td>With Highest Card Of 6</Td>
//                   <Td>1 to 7</Td>
//                 </Tr>
//                 <Tr>
//                   <Td>With Highest Card Of 5</Td>
//                   <Td>1 to 29</Td>
//                 </Tr>
//                 {/* Add more rows as needed */}
//               </Tbody>
//             </Table>
//           </Box>
//         </Box>
//       </ChakraProvider>
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

const socket = io("https://twocardtp.onrender.com/", {
  query: {
    userId: Math.floor(Math.random() * Date.now()),
  },
  transports: ["websocket"],
});

export default function TwoCardsTeenPatti() {
  const [countdown, setCountdown] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState("10");
  const [playerHands, setPlayerHands] = useState([]);
  const [winner, setWinner] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [playerId, setPlayerId] = useState("");
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [isButtonDisabled, setButtonDisabled] = useState();
  const [currentBet, setCurrentBet] = useState(0);

  useEffect(() => {
    const handleDealCards = (data) => {
      // console.log(data, "playerHands123");
      // handleGetBalance();
      setTimeout(() => {
        handleGetBalance();
      }, 10000);

      // setgameHistory(data.winHistory);
      const winner = data.winner;

      // console.log("Received dealt cards:", data);
      // console.log(data , "data")
      if (data.playerHands) {
        setPlayerHands(data.playerHands);
        setWinner(winner);

        // Extracting Player A and Player B cards separately
        const { PlayerA, PlayerB } = data.playerHands;
        setPlayer1Cards(PlayerA || []);
        setPlayer2Cards(PlayerB || []);
      } else {
        console.log("Player hands not found in data:", data);
      }
    };

    const handleNewBet = (bet) => {
      console.log("Received new bet:", bet);
      setSelectedChoice(bet.choice);
      // setPlayerid(bet._id);
      console.lod(bet._id, "bet._id");

      console.log(bet?.Total);
    };

    const handleNewRound = () => {
      //   console.log("Starting a new round");
      setSelectedChoice(null);
      setPlayerHands([]);
    };

    const handleWinHistory = (data) => {
      // console.log("Received win history:", data);
      if (data && data.winStatuses) {
        setGameHistory(data.winStatuses);
      } else {
        console.error("Invalid or missing win history data.");
      }
    };

    const handleCountdown = (data) => {
      const isDisabled = data?.countdown <= 25;
      data.countdown >= 44 ? setCurrentBet(0) : "";
      setButtonDisabled(isDisabled);
      // console.log("data:", data.countdown);
      setCountdown(data.countdown);
    };
    const handleBalanceUpdate = (data) => {
      //   console.log("Received balance update:", data);
      setUserBalance(data.balance);
    };

    const handleGetBalance = () => {
      socket.emit("getBalance");
      console.log();
    };
    const handleuser = (data) => {
      setPlayerId(data.user.userId);
      setUserBalance(data.user.balance);
      // console.log("data123", data);
    };
    const handleGameId = (data) => {
      // console.log("Received GameId:", data.gameId);
      setGameId(data.gameId);
    };
    handleGetBalance();
    socket.on("countdown", handleCountdown);
    socket.on("dealCards", handleDealCards);
    socket.on("getuser", handleuser);
    socket.on("newBet", handleNewBet);
    socket.on("newRound", handleNewRound);
    socket.on("balanceUpdate", handleBalanceUpdate);
    socket.on("WinHistory", handleWinHistory);
    socket.on("gameId", handleGameId);
    // socket.on("dealCards", handleDealCards);

    return () => {
      socket.off("dealCards", handleDealCards);
      socket.off("countdown", handleCountdown);
      socket.off("newBet", handleNewBet);
      socket.off("newRound", handleNewRound);
      socket.off("balanceUpdate", handleBalanceUpdate);
      socket.off("getuser", handleuser);
      socket.off("WinHistory", handleWinHistory);
      socket.off("gameId", handleGameId);
    };
  }, []);

  const handlePlaceBet = (selectedChoice) => {
    const coins = parseInt(selectedCoin, 10); // Parse the selectedCoin to an integer
    setCurrentBet((prev) => prev + coins);

    socket.emit("placeBet", { selectedChoice, coins });
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
                      {countdown <= 8
                        ? "Winner: " + winner
                        : countdown <= 25
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
                      {countdown - 25 <= 0 ? "0" : countdown - 25}
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
                        {countdown <= 14 && (
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
                              src={`/cards/${player1Cards[0]}`}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box>
                        {countdown <= 12 && (
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
                              src={`/cards/${player1Cards[1]}`}
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
                      {`${Math.round(userBalance * 100) / 100} ? ${
                        Math.round(userBalance * 100) / 100
                      } : "Loading..."`}
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
                      {gameId ? gameId : "Loading..."}
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
                            setSelectedCoin(item.value);
                            // console.log(item.value);
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
                          onClick={() => handlePlaceBet("PlayerB")}
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          Player A
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
                          onClick={() => handlePlaceBet("PlayerB")}
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
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
