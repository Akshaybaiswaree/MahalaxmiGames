// // import "./TeenPattiMuflis.css";

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

// // import "../Andar&Bahar/AndarBahar.css"

// const socket = io("https://muflisteenpattibackend.onrender.com", {
//   query: {
// userId: "65ba39b7a2129497c4aa563a",
//   },
//   transports: ["websocket"],
// });

// export default function TeenPattiMuflis() {
// const [timer, setTimer] = useState("");
// const [coins, setCoins] = useState("");
// const [user, setUser] = useState("");
// const [mainCard, setMainCard] = useState([]);
// const [selectedCoins, setSelectedCoins] = useState(null);
// const [player1Cards, setPlayer1Cards] = useState([]);
// const [player2Cards, setPlayer2Cards] = useState([]);
// const [buttonClick, setButtonClick] = useState(false);
// const [gameHistory, setGameHistory] = useState([]);

// useEffect(() => {
//   const handelTimer = (data) => {
//     setTimer(data.gamestate);
//     // console.log("Timer", data.gamestate);
//   };
//   const handelUserDetails = (data) => {
//     setUser(data.user);
//     console.log("UserDetails", data);
//   };

//   const handelCards = (data) => {
//     setMainCard(data.gameCard);
//     setPlayer1Cards(data.gameCard.player1Cards);
//     setPlayer2Cards(data.gameCard.player2Cards);
//     setGameHistory(data.gameHistory);
//     console.log("Cards", data);
//   };

//   socket.on("gameUpdate", handelTimer);
//   socket.on("userDetails", handelUserDetails);
//   socket.on("Main_Card", handelCards);
//   return () => {
//     socket.off("gameState", handelTimer);
//     socket.off("userDetails", handelUserDetails);
//     socket.off("Main_Card", handelCards);
//   };
// }, []);

// if (timer?.value === 3) {
//   socket.emit("getUpdatedUserDetails");
// }

// const handelBet = (betType) => {
//   if (timer?.value <= 21) {
//     setButtonClick(true);
//   }

//   if (user?.coins < 0) {
//     alert("Insufficient Fund");
//     return;
//   }
//   const bet = {
//     betType,
//     coins,
//     cardId: mainCard._id,
//   };
//   socket.emit("bet", bet);
//   console.log("bet", bet);
//   // console.log("betType", bet.betType);
//   // console.log("coins", bet.coins);
// };

//   return (
//     <>
//       <ChakraProvider>
//         <Box bg={"red"} width={["100%"]} id="first">
//           <Flex justify="space-between" align="center" mb="2">
//             <Text
//               fontSize={["20px", "24px"]}
//               fontWeight="bold"
//               borderRadius="10px"
//               position="relative"
//             >
//               Muflis TeenPatti
//             </Text>
//             {/* <Text>{selectBet}</Text> */}
//             <Button variant="outline" colorScheme="blue" ml="2">
//               Rules
//             </Button>
//           </Flex>
//           <Flex>
//           <AspectRatio
//           // width={{ base: "97%", md: "100%", lg: "100%" }}
//           // minHeight="50%"
//           // borderRadius="10px"
//           // controls
//           >
//             <Box
//               border="4px solid #333"
// backgroundImage="url('/MuflisTeenPatti/MuflisTeenPatti.webp')"
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
//                 {timer?.value - 25 < 0 ? "0" : timer?.value - 25}
//               </Text>
//               {timer?.value - 25 <= -20 && (
//                 <Text
//                   border="5px solid white"
//                   padding={["24px"]}
//                   borderRadius="50%"
//                   position="absolute"
//                   top="0"
//                   left="0"
//                   color="white"
//                   fontWeight="bold"
//                   id="round1"
//                 >
//                   <span>Winner:{mainCard?.winstatus}</span>
//                 </Text>
//               )}

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
//                 id="forme"
//               >
//                 {timer?.value - 25 <= -10 && (
//                   <Box
//                     // border="2px solid black"
//                     position="absolute"
//                     width="21.5%"
//                     height="21%"
//                     display="flex"
//                     left="23.7%"
//                     top="35%"
//                     justifyContent="left"
//                   >
//                     {/* {player1Cards.map((image, index) => (
//                         <Image
//                         key={index}
//                         src={`/cards/${image}`}
//                          alt="123" />
//                       ))} */}

//                     {timer.value - 25 <= -11 && (
//                       <Image
//                         key={0}
//                         src={`/cards/${player1Cards[0]}`}
//                         alt="1"
//                       />
//                     )}

//                     {timer.value - 25 <= -17 && (
//                       <Image
//                         key={1}
//                         src={`/cards/${player1Cards[1]}`}
//                         alt="2"
//                         className="cardShow"
//                       />
//                     )}

//                     {timer.value - 25 <= -19 && (
//                       <Image
//                         key={2}
//                         src={`/cards/${player1Cards[2]}`}
//                         alt="3"
//                         className="cardShow"
//                       />
//                     )}
//                   </Box>
//                 )}
//                 {timer?.value - 25 <= -15 && (
//                   <Box
//                     // border="2px solid black"
//                     position="absolute"
//                     width="21.5%"
//                     height="21%"
//                     display="flex"
//                     right="24%"
//                     top="35%"
//                     justifyContent="start"
//                   >
//                     {/* {player2Cards.map((image, index) => (
//                         <Image
//                          key={index}
//                           src={`/cards/${image}`}
//                           alt="123"
//                           />
//                       ))} */}

//                     {timer.value - 25 <= -15 && (
//                       <Image
//                         key={0}
//                         src={`/cards/${player2Cards[0]}`}
//                         alt="1"
//                       />
//                     )}

//                     {timer.value - 25 <= -18 && (
//                       <Image
//                         key={1}
//                         src={`/cards/${player2Cards[1]}`}
//                         alt="2"
//                         className="cardShow"
//                       />
//                     )}
//                     {timer.value - 25 <= -20 && (
//                       <Image
//                         key={2}
//                         src={`/cards/${player2Cards[2]}`}
//                         alt="3"
//                         className="cardShow"
//                       />
//                     )}
//                   </Box>
//                 )}
//               </Box>
//             </Box>
//           </AspectRatio>
//           <Box
//           bg={"pink"}
//           // border="5px dotted blue"
//           width={["100%", "28%"]}
//           height={["90%", "80%"]}
//           position="absolute"
//           right={["0", "1.5rem"]}
//           top={{ base: "78%", md: "21%" }}
//           display="flex"
//           justifyContent="space-around"
//           flexDirection="column"
//           id="two"
//         >
//           <Box
//             border="2px solid #333"
//             width="100%"
//             justifyContent="center"
//             align="center"
//             borderRadius="1rem"
//           >
//             <Box
//               backgroundColor="#ee9d1e"
//               padding="0.5rem"
//               mb="0.5rem"
//               borderRadius="1rem"
//               className="availavleCredit"
//             >
//               <Text fontSize="18px" fontWeight="bold" color="white">
//                 Available Credit
//               </Text>
//               <Text
//                 fontSize="18px"
//                 margin="0 0 0.5rem"
//                 fontWeight="bold"
//                 color="white"
//               >
//                 ${Math.round(user?.coins * 100) / 100}
//               </Text>
//             </Box>

//             <Box backgroundColor="#e0e0e0" padding="0.5rem" borderRadius="1rem">
//               <Text fontSize="18px" fontWeight="bold">
//                 Player ID
//               </Text>
//               <Text fontSize="18px" margin="0 0 0.5rem" fontWeight="bold">
//                 {user?.mobileNumber}
//               </Text>
//             </Box>
//           </Box>

//           <Box border="2px solid black" borderRadius="1rem" id="tableBox">
//             <Table variant="simple" width="100% " id="tavle">
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
//           </Flex>
//         </Box>
//         {/* Player History */}
//         <Box
//         // mt={{base:"-30rem" , md:"5rem"}}
//           bg={"blue"}
//           // width={["120.8%", "75%"]}
//         >
//           {[...Array(10)].map((_, index) => (
//             <Box
//               border="1px solid black"
//               backgroundColor="grey"
//               key={index}
//               fontSize={["10px", "15px"]}
//               color={index % 2 === 0 ? "black" : "#553325"}
//               width="8%"
//               height="100%"
//               marginLeft={["0.3rem", "0.7rem"]}
//               mt={["0.3rem", "-1rem"]}
//               borderRadius="0.2rem"
//               align="center"
//               fontWeight="bold"
//               textColor="white"
//             >
//               <Text
//                 // fontSize="18px"
//                 color={index % 2 === 0 ? "#black" : "#553325"}
//                 flexDirection="row"
//                 textColor="white"
//                 fontSize={["10px", "20px"]}
//               >
//                 {gameHistory[index]}
//               </Text>
//             </Box>
//           ))}
//           <Box
//             display="flex"
//             mr={["-3rem"]}
//             marginTop="-1.5%"
//             // top={["-12.5rem", "-12rem"]}
//             position="absolute"
//             justifyContent="space-around"
//             id="match-id-btn"
//           >
//             <Text
//               marginRight="1rem"
//               fontWeight="700"
//               backgroundColor="grey"
//               borderRadius="0.4rem"
//               paddingX="1rem"
//               // width="50%"
//             >
//               Match Id: {mainCard?.gameid}
//             </Text>

//             <Button
//               width="40%"
//               height="3rem"
//               colorScheme="blue"
//               paddingX="1rem"
//               fontWeight="700"
//             >
//               Player History
//             </Button>
//           </Box>
//         </Box>
//         {/* Betting Area */}

//         <Box bg={"black"}>
//           <Text
//             color="white"
//             fontWeight="500"
//             fontSize={["1.5rem", "2rem"]}
//             mt="1rem"
//             textAlign="left"
//           >
//             Place Your Bet!
//           </Text>
//           <Box
//             display="flex"
//             ml={["0rem", "9rem"]}
//             mb={["1rem"]}
//             mt={["1rem"]}
//             width={["100%", "80%"]}
//             id="money"
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
//                 ml={["0.8rem", "0rem"]}
//                 key={index}
//                 height={["3rem", "4rem"]}
//                 margin={["rem", "0.5rem"]}
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//                 fontWeight="bold"
//                 variant="unstyled"
//                 _hover={{ height: "2.5rem" }}
//                 onClick={() => {
//                   setCoins(value);
//                   // console.log("coins", value);
//                   setSelectedCoins(index);
//                 }}
//                 id="money-Hover"
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
//             height="30%"
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
//               borderRadius="0.4rem"
//               ml={["0rem", "1rem"]}
//               alignItems="center"
//               flexDirection="row"
//               display="flex"
//               justifyContent="space-around"
//               onClick={() => handelBet("Player1")}
//               isDisabled={timer?.value - 25 <= 0 && buttonClick}
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
//               borderRadius="0.4rem"
//               mr={["0rem", "1rem"]}
//               display="flex"
//               justifyContent="space-around"
//               flexDirection="row"
//               onClick={() => handelBet("Player2")}
//               isDisabled={timer?.value - 25 <= 0 && buttonClick}
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
//           <Text color="white">Pair Plus</Text>
//           <Box
//             width="90%"
//             height="15%"
//             border="2px solid #333"
//             display="flex"
//             mb={["0rem", "3rem"]}
//             justifyContent="space-between"
//             alignItems="center"
//             backgroundColor="black"
//             borderRadius="1rem"
//           >
//             <Button
//               width="45%"
//               height="80%"
//               // variant="unstyled"
//               ml={["0rem", "1rem"]}
//               backgroundColor="#640e18"
//               borderRadius="0.3rem"
//               alignItems="center"
//               flexDirection="row"
//               display="flex"
//               justifyContent="space-around"
//               onClick={() => handelBet("PairPlus1")}
//               isDisabled={timer?.value - 25 <= 0 && buttonClick}
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
//               <Text textColor="white">3</Text>
//             </Button>

//             <Button
//               width="45%"
//               height="80%"
//               // variant="unstyled"
//               backgroundColor="#1c3e6b"
//               mr={["0rem", "1rem"]}
//               borderRadius="0.3rem"
//               display="flex"
//               justifyContent="space-around"
//               flexDirection="row"
//               onClick={() => handelBet("PairPlus2")}
//               isDisabled={timer?.value - 25 <= 0 && buttonClick}
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
//               <Text textColor="white">3</Text>
//             </Button>
//           </Box>
//         </Box>
//         {/* side part */}
//         {/* <Box
//           bg={"pink"}
//           // border="5px dotted blue"
//           width={["100%", "28%"]}
//           height={["90%", "80%"]}
//           position="absolute"
//           right={["0", "1.5rem"]}
//           top={{ base: "78%", md: "21%" }}
//           display="flex"
//           justifyContent="space-around"
//           flexDirection="column"
//           id="two"
//         >
//           <Box
//             border="2px solid #333"
//             width="100%"
//             justifyContent="center"
//             align="center"
//             borderRadius="1rem"
//           >
//             <Box
//               backgroundColor="#ee9d1e"
//               padding="0.5rem"
//               mb="0.5rem"
//               borderRadius="1rem"
//               className="availavleCredit"
//             >
//               <Text fontSize="18px" fontWeight="bold" color="white">
//                 Available Credit
//               </Text>
//               <Text
//                 fontSize="18px"
//                 margin="0 0 0.5rem"
//                 fontWeight="bold"
//                 color="white"
//               >
//                 ${Math.round(user?.coins * 100) / 100}
//               </Text>
//             </Box>

//             <Box backgroundColor="#e0e0e0" padding="0.5rem" borderRadius="1rem">
//               <Text fontSize="18px" fontWeight="bold">
//                 Player ID
//               </Text>
//               <Text fontSize="18px" margin="0 0 0.5rem" fontWeight="bold">
//                 {user?.mobileNumber}
//               </Text>
//             </Box>
//           </Box>

//           <Box border="2px solid black" borderRadius="1rem" id="tableBox">
//             <Table variant="simple" width="100% " id="tavle">
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

//               </Tbody>
//             </Table>
//           </Box>
//         </Box> */}
//       </ChakraProvider>
//     </>
//   );
// }

import "./TeenPattiMuflis.css";

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

const socket = io("https://muflisteenpattibackend.onrender.com", {
  query: {
    userID: "65cc504c0039634a604b4de9",
  },
  transports: ["websocket"],
});

export default function TeenPattiMuflis() {
  const [timer, setTimer] = useState("");
  const [coins, setCoins] = useState("");
  const [user, setUser] = useState("");
  const [mainCard, setMainCard] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState(null);
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [isButtonDisabled, setButtonDisabled] = useState();
  const [bettingAmount, setBettingAmount] = useState("");

  useEffect(() => {
    const handelTimer = (data) => {
      setTimer(data.gamestate);
      // console.log("Timer", data.gamestate);
      data.gamestate.value - 25 === 20 ? setBettingAmount(0) : "";
      const isDisabled = data.gamestate.value - 25 <= 0;
      setButtonDisabled(isDisabled);
    };
    const handelUserDetails = (data) => {
      console.log("UserDetails", data);
      setUser(data.user);
    };

    const handelCards = (data) => {
      setMainCard(data.gameCard);
      setPlayer1Cards(data.gameCard.player1Cards);
      setPlayer2Cards(data.gameCard.player2Cards);
      setGameHistory(data.gameHistory);
      // setUser(data.gameCard)
      console.log("Cards", data);
    };

    socket.on("gameUpdate", handelTimer);
    socket.on("userDetails", handelUserDetails);
    socket.on("Main_Card", handelCards);
    return () => {
      socket.off("gameState", handelTimer);
      socket.off("userDetails", handelUserDetails);
      socket.off("Main_Card", handelCards);
    };
  }, []);

  if (timer?.value === 3) {
    socket.emit("getUpdatedUserDetails");
  }

  const handelBet = (betType) => {
    if (user?.coins < 0) {
      alert("Insufficient Fund");
      return;
    }
    const bet = {
      betType,
      coins,
      cardId: mainCard._id,
    };
    socket.emit("bet", bet);
    console.log("bet", bet);
    // console.log("betType", bet.betType);
    // console.log("coins", bet.coins);
  };

  return (
    <>
      <ChakraProvider>
        <Box width={["100%", "100%"]}>
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
                    Muflis Teen Patti
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
                    backgroundImage="url('/MuflisTeenPatti/MuflisTeenPatti.webp')"
                    backgroundSize="cover"
                    backgroundPosition={`center 100%`}
                    backgroundRepeat="no-repeat"
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="top"
                    color="white"
                    className="firstBox"
                    position={"absolute"}
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
                      {timer?.value <= 8
                        ? "Winner: " + mainCard?.winstatus
                        : timer?.value <= 25
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
                      {timer?.value - 25 <= 0 ? "0" : timer?.value - 25}
                    </Box>

                    <Flex
                      // justifyContent={"space-between"}
                      gap="0.5rem"
                      direction="row"
                      position={"relative"}
                      // top={"5.2rem"}
                      top={{ base: "5.3rem", lg: "5.8rem", xl: "9rem" }}
                      left={{ base: "-3.5rem", lg: "-3.6rem", xl: "-5.8rem" }}
                    >
                      <Box className="playercardbox1">
                        {timer?.value <= 19 && (
                          <Box
                            key={1}
                            // height={["20.5 rem", "0.5rem"]}
                          >
                            <Image
                              // width={{
                              //   base: "1.8rem",
                              //   sm: "2rem",
                              //   md: "2.4rem",
                              //   lg: "",
                              //   xl: "3.5rem",
                              //   "2xl": "4rem",
                              // }}
                              // height={{
                              //   base: "2.3rem",
                              //   sm: "2rem",
                              //   md: "1rem",
                              //   lg: "2.6rem",
                              //   xl: "3.5rem",
                              //   "2xl": "4rem",
                              // }}
                              // height={{base:"rem" , md:"3.5rem"}}
                              className="playercard1"
                              src={`/cards/${player1Cards[0]}`}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box className="playercardbox2">
                        {timer?.value <= 17 && (
                          <Box
                            key={1}
                            // height={["2.5 rem", "0.5rem"]}
                          >
                            <Image
                              // width={{
                              //   base: "2rem",
                              //   sm: "2rem",
                              //   md: "2.4rem",
                              //   lg: "",
                              //   xl: "3.5rem",
                              //   "2xl": "4rem",
                              // }}
                              // height={{
                              //   base: "2.3rem",
                              //   sm: "2rem",
                              //   md: "1rem",
                              //   lg: "2.6rem",
                              //   xl: "3.5rem",
                              //   "2xl": "4rem",
                              // }}
                              // height={{ base: "rem", md: "3.5rem" }}
                              className="playercard2"
                              src={`/cards/${player1Cards[1]}`}
                              // boxSize={["1.8rem", "2.7rem"]}

                              // top={"80r em"}
                              // alt={`${card}`}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box className="playercardbox2">
                        {timer?.value <= 17 && (
                          <Box
                            key={1}
                            // height={["2.5 rem", "0.5rem"]}
                          >
                            <Image
                              // width={{
                              //   base: "2rem",
                              //   sm: "2rem",
                              //   md: "2.4rem",
                              //   lg: "",
                              //   xl: "3.5rem",
                              //   "2xl": "4rem",
                              // }}
                              // height={{
                              //   base: "2.3rem",
                              //   sm: "2rem",
                              //   md: "1rem",
                              //   lg: "2.6rem",
                              //   xl: "3.5rem",
                              //   "2xl": "4rem",
                              // }}
                              // height={{ base: "rem", md: "3.5rem" }}
                              className="playercard2"
                              src={`/cards/${player1Cards[2]}`}
                              // boxSize={["1.8rem", "2.7rem"]}

                              // top={"80r em"}
                              // alt={`${card}`}
                            />
                          </Box>
                        )}
                      </Box>
                    </Flex>
                    <Flex
                      gap="0.5rem"
                      direction="row"
                      position={"relative"}
                      top={{ base: "2.9rem", lg: "3.3rem", xl: "5.4rem" }}
                      // left={"3.4rem"}
                      left={{ base: "3.4rem", lg: "3.6rem", xl: "5.4rem" }}
                    >
                      <Box className="playercardbox3">
                        {timer?.value <= 18 && (
                          <Box
                            key={0}
                            // height={["2.5 rem", "0.5rem"]}

                            //  style={{marginTop: '0.9rem', marginLeft: '0.1rem' }}
                          >
                            <Image
                              // width={{
                              //   base: "1.8rem",
                              //   sm: "2rem",
                              //   md: "2.4rem",
                              //   lg: "",
                              //   xl: "3.5rem",
                              //   "2xl": "4rem",
                              // }}
                              // height={{
                              //   base: "2.3rem",
                              //   sm: "2rem",
                              //   md: "1rem",
                              //   lg: "2.6rem",
                              //   xl: "3.5rem",
                              //   "2xl": "4rem",
                              // }}
                              className="playercard3"
                              src={`/cards/${player2Cards[0]}`}
                              // boxSize={["1.8rem", "2.9rem"]}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box className="playercardbox4">
                        {timer?.value <= 16 && (
                          <Box
                            key={1}
                            // height={["2.5 rem", "0.5rem"]}
                          >
                            <Image
                              // width={{
                              //   base: "2rem",
                              //   sm: "2rem",
                              //   md: "2.4rem",
                              //   lg: "",
                              //   xl: "3.5rem",
                              //   "2xl": "4rem",
                              // }}
                              // height={{
                              //   base: "2.3rem",
                              //   sm: "2rem",
                              //   md: "1rem",
                              //   lg: "2.6rem",
                              //   xl: "3.5rem",
                              //   "2xl": "4rem",
                              // }}
                              className="playercard4"
                              src={`/cards/${player2Cards[1]}`}

                              // alt={`${card}`}
                            />
                          </Box>
                        )}
                      </Box>
                      <Box className="playercardbox4">
                        {timer?.value <= 16 && (
                          <Box
                            key={1}
                            // height={["2.5 rem", "0.5rem"]}
                          >
                            <Image
                              // width={{
                              //   base: "2rem",
                              //   sm: "2rem",
                              //   md: "2.4rem",
                              //   lg: "",
                              //   xl: "3.5rem",
                              //   "2xl": "4rem",
                              // }}
                              // height={{
                              //   base: "2.3rem",
                              //   sm: "2rem",
                              //   md: "1rem",
                              //   lg: "2.6rem",
                              //   xl: "3.5rem",
                              //   "2xl": "4rem",
                              // }}
                              className="playercard4"
                              src={`/cards/${player2Cards[2]}`}

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
                    justifyContent={"center"}
                    alignItems={"center"}
                    textAlign={"center"}
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
                      {Math.round(user?.coins * 100) / 100
                        ? Math.round(user?.coins * 100) / 100
                        : "Loading... "}
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
                      {/* {user?.gameid ? user?.gameid  : "Loading..."} */}
                      {mainCard?._id ? mainCard?._id : "Loading..."}
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
                      ml={{ base: "3rem", md: "0rem" }}
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
                          onClick={() => handelBet("Player1")}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          Player A */}
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
                            <span>player A</span> <span>1.98</span>
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
                          bgGradient="linear(to-r, #0000FF, #FFA500)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#FAEBD7",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handelBet("Player2")}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          Player B */}
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
                            <span>player B</span>
                            <span>1.98</span>
                          </Text>
                        </Button>
                      </Box>
                    </Box>
                  </Flex>
                  <Text align={"center"} color={"white"}>
                    Pair Plus
                  </Text>
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
                          onClick={() => handelBet("PairPlus1")}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          Player A */}
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
                            <span>player A</span> <span>3</span>
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
                          bgGradient="linear(to-r, #0000FF, #FFA500)"
                          _hover={
                            !isButtonDisabled && {
                              bg: "#FAEBD7",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handelBet("PairPlus2")}
                        >
                          {/* {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          Player B */}
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
                            <span>player B</span>
                            <span>3</span>
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
