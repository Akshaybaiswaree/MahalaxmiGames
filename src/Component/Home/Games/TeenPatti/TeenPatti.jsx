// import {
//   AspectRatio,
//   Box,
//   Button,
//   Center,
//   ChakraProvider,
//   Flex,
//   HStack,
//   Image,
//   Stack,
//   Table,
//   TableCaption,
//   TableContainer,
//   Tbody,
//   Td,
//   Text,
//   Tfoot,
//   Th,
//   Thead,
//   Tr,
// } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import Teenpatti from "../../Games/Images/TeenPatti.svg";
// import "./Teenpatti.css";

// const socket = io("https://teenpattibackend.onrender.com", {
//   query: {
//     userId: Math.floor(Math.random() * Date.now()),
//   },
//   transports: ["websocket"],
// });
// function TeenPatti() {
//   const [gameState, setGameState] = useState({ value: "waiting" });
//   const [user, setUser] = useState(null);
//   const [coins, setCoins] = useState(50);
//   const [mainCard, setMainCard] = useState([]);
//   const [player1Cards, setPlayer1Cards] = useState([]);
//   const [player2Cards, setPlayer2Cards] = useState([]);

//   useEffect(() => {
//     // Listen for game state updates from the server
//     socket.on(
//       "gameUpdate",
//       (updatedGameState) => {
//         setGameState(updatedGameState?.gamestate);

//         // console.log(updatedGameState, "updatedGameState");
//         // setMainCard(updatedGameState.gameCard);
//         //  console.log(updatedGameState.gameCard, "updatedGameState");
//       },
//       [gameState?.value]
//     );

//     socket.on("userDetails", (data) => {
//       // console.log(data.user.coins , "data");
//       setUser(data.user);
//       console.log(data, "data?.user");
//     });
//     socket.on("bait", (data) => {
//       setUser(data);
//       // console.log(data);
//       // setUser(data.user);
//     });

//     socket.on("Main_Card", (data) => {
//       setMainCard(data.gameCard);
//       displayPlayerCards(data.gameCard.player1Cards, setPlayer1Cards);
//       displayPlayerCards(data.gameCard.player2Cards, setPlayer2Cards);
//       console.log(data, "data");
//     });

//     // console.log(mainCard , "maincard");

//     return () => {
//       // Clean up socket connection on component unmount

//       socket.disconnect();
//     };
//   }, []);
//   const displayPlayerCards = (cards, setPlayerCards) => {
//     const displayedCards = cards.slice(0, 3); // Take only the first 3 cards

//     // Update state directly with the first 3 cards
//     setPlayerCards(displayedCards);
//   };

//   const handleBait = (baitType) => {
//     if (user?.coins <= 0) {
//       alert("Insufficient Coins");
//       return; // Stop execution if coins are 0 or less
//     }
//     const bait = {
//       baitType,
//       coins,
//       cardId: mainCard._id,
//     };
//     console.log(bait, "bait");
//     socket.emit("bait", bait);
//   };

//   return (
//     <>
//       <ChakraProvider>
//         <Box m={"0.6rem"}>
//           <Flex justifyContent={"space-between"}>
//             <AspectRatio
//               width={["45%", "70%"]}
//               minHeight="50%"
//               borderRadius="10px"
//               controls
//               ml={["2.5rem", "0rem"]}
//               id="teenpattimainimg"
//             >
//               <Box
//                 height="90%" // Adjust the height as needed
//                 // background="linear-gradient(#c86363, #51a454, #517a9c)"

//                 backgroundImage={Teenpatti}
//                 backgroundSize="cover"
//                 display="flex"
//                 flexDirection="column"
//                 justifyContent="flex-start"
//                 alignItems="top"
//                 position="relative"
//                 width={"80%"}
//               >
//                 <Box
//                   fontWeight={"1000"}
//                   border={"1px solid white"}
//                   borderRadius={"50%"}
//                   padding={"2px"}
//                   mt={"2rem"}
//                   ml={"1rem"}
//                   position={"absolute"}
//                   top="0"
//                   left="0"
//                   width="18%"
//                   height="18%"
//                   display="flex"
//                   justifyContent="center"
//                   alignItems="center"
//                   fontSize="lg"
//                   color="white"
//                   background="linear-gradient(to right,#809fff ,#0000FF)"
//                   id="teenpattifreezeplacebettext"
//                 >
//                   {gameState?.value <= 20 ? "Freeze" : "Place  Bet"}
//                 </Box>
//                 <Box>
//                   {gameState.value < 8 && (
//                     <Button
//                       // background="linear-gradient(to bottom right,#ED9203, #323349, #880000)"
//                       background="linear-gradient(to bottom right, #ED9203, #C7E600)"
//                       height={"4rem"}
//                       width={"9rem"}
//                       marginTop={["5rem", ""]}
//                     >
//                       Winner: {mainCard?.winstatus}
//                     </Button>
//                   )}
//                 </Box>

//                 {gameState.value >= 1 && (
//                   <Flex flexWrap="wrap">
//                     <Box
//                       color={"Yellow"}
//                       fontSize="1rem"
//                       width="120%"
//                       className="players"
//                       id="playerA"
//                       mt={["", "-1rem"]}
//                     >
//                       PLAYER A
//                     </Box>
//                     {gameState.value < 12 && (
//                       <Flex
//                         Flex
//                         width="40%"
//                         marginLeft={["5rem", "20rem"]}
//                         marginTop={"-3rem"}
//                       >
//                         {player1Cards.map((card, index) => (
//                           <Image
//                             key={index}
//                             src={`/cards/${card}`}
//                             boxSize="2rem"
//                             margin="0.5rem"
//                             id="cards-positionA"
//                           />
//                         ))}
//                       </Flex>
//                     )}

//                     <Box
//                       color={"Yellow"}
//                       fontSize={["1.4rem", "5rem"]}
//                       width="100%"
//                       className="players"
//                       id="playerB"

//                       mt={["1rem"]}
//                     >
//                       PLAYER B
//                     </Box>
//                     {gameState.value < 10 && (
//                       <Flex
//                         width="40%"
//                         marginLeft={["5rem", "20rem"]}
//                         marginTop={"-3rem"}
//                       >
//                         {player2Cards.map((card, index) => (
//                           <Image
//                             key={index}
//                             src={`/cards/${card}`}
//                             boxSize="2rem"
//                             margin="0.5rem"
//                             marginTop={"-5rem"}
//                             id="cards-positionB"
//                           />
//                         ))}
//                       </Flex>
//                     )}
//                   </Flex>
//                 )}
//                 <Box
//                   fontWeight={"1000"}
//                   border={"1px solid white"}
//                   borderRadius={"50%"}
//                   padding={"2px"}
//                   mt={"2rem"}
//                   ml={"1rem"}
//                   position={"absolute"}
//                   top="0"
//                   right="0"
//                   width="15%"
//                   height="17%"
//                   display="flex"
//                   justifyContent="center"
//                   alignItems="center"
//                   fontSize="lg"
//                   //   background="linear-gradient(to right, teal.200, blue.500)"
//                   background="linear-gradient(to right, #809fff, #0000FF)"
//                   marginRight={"1rem"}
//                   color="white"
//                 >
//                   {gameState?.value && Math.max(0, gameState.value - 20)}
//                 </Box>
//               </Box>
//             </AspectRatio>

//             <Flex flexDirection={"column"} id="outputbox">
//               <Box
//                 ml={["1.5rem", ""]}
//                 height={"5rem"}
//                 // width="100%"
//                 flexDirection="row"
//                 border="5px solid #668cff"
//                 boxShadow="4px 4px 10px rgba(3, 0, 2, 0.6)"
//                 display="flex"
//                 borderRadius="1rem"
//               >
//                 <Box
//                   flex="1"
//                   //   width={["10%", "44%"]}
//                   backgroundColor="white"
//                   textAlign="center"
//                   borderRight="4px solid #668cff"
//                   className="abc"
//                 >
//                   <Text color={"#668cff"} fontSize="18px" fontWeight="bold">
//                     Available Credit :
//                   </Text>
//                   <Text color="#daa520" fontWeight={"500"} fontSize="24px">
//                     {user?.coins && Math.max(0, user?.coins)}
//                   </Text>
//                 </Box>

//                 <Box flex="1" textAlign="center">
//                   <Text color={"#668cff"} fontSize="18px" fontWeight="bold">
//                     Match Id :
//                   </Text>
//                   <Text color="#daa520" fontWeight={"500"} fontSize="24px">
//                     {user?.userId}
//                   </Text>
//                 </Box>
//               </Box>
//               <TableContainer ml={["1rem", ""]} mt={"1rem"}>
//                 <Table
//                   borderRadius={"1rem"}
//                   border="1px solid 5pxblack"
//                   bg={"black"}
//                   variant="simple"
//                 >
//                   <Thead></Thead>
//                   <Tbody>
//                     <Tr
//                       borderRadius={"2rem"}
//                       boxShadow="0 14px 18px rgba(0,1 0, 20, 0.1)"
//                       color="black"
//                       bg="lightgray"
//                     >
//                       <Td>Hands</Td>
//                       <Td>Payout</Td>
//                       <Td></Td>
//                     </Tr>
//                     <Tr color="white">
//                       <Td>Pair</Td>

//                       <Td isNumeric>1 to 2</Td>
//                     </Tr>
//                     <Tr color="white">
//                       <Td>Flush</Td>
//                       <Td isNumeric>1 to 6</Td>
//                     </Tr>
//                     <Tr color="white">
//                       <Td>Straight</Td>
//                       <Td isNumeric>1 to 8</Td>
//                     </Tr>
//                     <Tr color="white">
//                       <Td>Straight flush</Td>
//                       <Td isNumeric>1 to 24</Td>
//                     </Tr>
//                   </Tbody>
//                   <Tfoot>
//                     <Tr color="white">
//                       <Th color="white">Trio</Th>
//                       <Td isNumeric>1 to 36</Td>
//                     </Tr>
//                   </Tfoot>
//                 </Table>
//               </TableContainer>

//               {/* BUTTONS FOR BET */}
//             </Flex>
//           </Flex>

//           <Text
//             mt={["-10rem", "1rem"]}
//             mb={"1rem"}
//             fontSize={"1.3rem"}
//             fontWeight={"bold"}
//             ml={["", "16rem"]}
//             id="chooseamount"
//           >
//             Choose the Amount
//           </Text>

//           <Box
//             display={"flex"}
//             flexDirection={"row"}
//             id="amountbox"

//             // ml={["0rem", "3rem"]}
//           >
//             {[
//               { value: 10, imageSrc: "/Coins/10's coin.webp" },
//               { value: 50, imageSrc: "/Coins/50's coin.webp" },
//               { value: 100, imageSrc: "/Coins/100's coin.webp" },
//               { value: 500, imageSrc: "/Coins/500's coin.webp" },
//               { value: 1000, imageSrc: "/Coins/1000's coin.webp" },
//               { value: 5000, imageSrc: "/Coins/5000's coin.webp" },
//             ].map((item, index) => (
//               <Button
//                 key={index}
//                 height="45px"
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//                 fontWeight="bold"
//                 variant="unstyled"
//                 _hover={{ height: "2rem" }}
//                 onClick={() => {
//                   setCoins(item.value);
//                   console.log(item.value);
//                 }}
//               >
//                 <img
//                   height={"10rem"}
//                   src={item.imageSrc}
//                   alt={`${item.value}'s coin`}
//                   style={{ maxHeight: "55px" }}
//                 />
//               </Button>
//             ))}
//           </Box>

//           <Box ml={["12rem"]} mt={"1rem"} id="playersbutton">
//             <Button
//               onClick={() => handleBait("0")}
//               disabled={gameState?.value <= 10}
//               width={"10rem"}
//               height={"5rem"}
//               bgGradient="linear(to-r, teal.200, blue.500)"
//               _hover={{
//                 bgGradient: "linear(to-r, red.200, orange.500, yellow.400)", // Change colors on hover
//               }}
//             >
//               Player A
//             </Button>
//             <Button
//               onClick={() => handleBait("1")}
//               disabled={gameState?.value <= 10}
//               width={"10rem"}
//               ml={"1rem"}
//               height={"5rem"}
//               bgGradient="linear(to-r, teal.200, blue.500)"
//               _hover={{
//                 bgGradient: "linear(to-r, red.200, orange.500, yellow.400)", // Change colors on hover
//               }}
//             >
//               Player B
//             </Button>
//           </Box>
//         </Box>
//       </ChakraProvider>
//     </>
//   );
// }

// export default TeenPatti;

import "./Teenpatti.css";

import {
  AspectRatio,
  Box,
  Button,
  Center,
  ChakraProvider,
  Flex,
  HStack,
  Image,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { io } from "socket.io-client";

// import Teenpatti from "/public/MuflisTeenPatti/MuflisTeenPatti";

const socket = io("https://teenpattibackend.onrender.com", {
  query: {
    userId: Math.floor(Math.random() * Date.now()),
  },
  transports: ["websocket"],
});
function TeenPatti() {
  const [gameState, setGameState] = useState({ value: "waiting" });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(50);
  const [mainCard, setMainCard] = useState([]);
  const [swithCard, setSwitchCard] = useState(true);
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);

  useEffect(() => {
    // Listen for game state updates from the server
    socket.on(
      "gameUpdate",
      (updatedGameState) => {
        setGameState(updatedGameState?.gamestate);

        // console.log(updatedGameState, "updatedGameState");
        // setMainCard(updatedGameState.gameCard);
        //  console.log(updatedGameState.gameCard, "updatedGameState");
      },
      [gameState?.value]
    );

    socket.on("userDetails", (data) => {
      // console.log(data.user.coins , "data");
      setUser(data.user);
      setCurrentPlayer((prevPlayer) => (prevPlayer === "A" ? "B" : "A"));
      console.log(data, "data?.user");
    });
    socket.on("bait", (data) => {
      setUser(data);
      // console.log(data);
      // setUser(data.user);
    });

    socket.on("Main_Card", (data) => {
      console.log("Main_Card Data:", data);
      setMainCard(data.gameCard);
      displayPlayerCards(data.gameCard.player1Cards, setPlayer1Cards);
      displayPlayerCards(data.gameCard.player2Cards, setPlayer2Cards);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  // const displayPlayerCards = (cards, setPlayerCards) => {
  //   const displayedCards = cards.slice(0, 3); // Take only the first 3 cards

  const displayPlayerCards = (cards, setPlayerCards) => {
    const displayedCards = [];

    for (let i = 0; i < 3; i++) {
      // Display one card for each player in each iteration
      displayedCards.push(cards[i % 2]);
    }

    setPlayerCards(displayedCards);
  };

  const handleBait = (baitType) => {
    if (user?.coins <= 0) {
      alert("Insufficient Coins");
      return; // Stop execution if coins are 0 or less
    }
    const bait = {
      baitType,
      coins,
      cardId: mainCard._id,
    };
    console.log(bait, "bait");
    socket.emit("bait", bait);
  };

  return (
    <>
      <ChakraProvider>
        <Box maxW={"100vw"}>
          <Box m={"0"}>
            <Flex justifyContent={"space-between"}>
              <AspectRatio
                width={["95vw", "70%"]}
                // backgroundColor='red'
                // minHeight="50%"
                borderRadius="10px"
                controls
                // ml={["2.5rem", "0rem"]}
                //  id='AspectRatio'
              >
                <Box
                  height="auto" // Adjust the height as needed
                  // background="linear-gradient(#c86363, #51a454, #517a9c)"

                  // backgroundImage={Teenpatti}
                  backgroundImage="url('/public/MuflisTeenPatti/MuflisTeenPatti.webp')"
                  backgroundSize="cover"
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="top"
                  position="relative"
                  backgroundPosition={`center 100%`}
                  // width={"100%"}
                  id="teenpattimainimg"
                >
                  <Box
                    fontWeight={"1000"}
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
                    background="linear-gradient(to right,#809fff ,#0000FF)"
                    id="teenpattifreezeplacebettext"
                  >
                    {gameState?.value <= 20 ? "Freeze" : "Place  Bet"}
                  </Box>
                  <Box
                    position="absolute"
                    top="5rem"
                    left="-0.7rem"
                    id="winner-main"
                  >
                    {gameState.value < 8 && (
                      <Button
                        // background="linear-gradient(to bottom right,#ED9203, #323349, #880000)"
                        background="linear-gradient(to bottom right, #ED9203, #C7E600)"
                        height={"2rem"}
                        width={"10rem"}
                        position="absolute"
                        Top={["2rem", ""]}
                        left={["6rem"]}
                        id="winner"
                      >
                        Winner: {mainCard?.winstatus}
                      </Button>
                    )}
                  </Box>

                  {gameState.value >= 1 && (
                    <Flex flexWrap="wrap">
                      <Box
                        color={"Yellow"}
                        fontSize="1rem"
                        width={["20%", "20%"]}
                        // backgroundColor='red'
                        className="players"
                        id="playerA"
                        mt={["0", "-1rem"]}
                      >
                        {/* PLAYER A */}
                      </Box>
                      {gameState.value < 14 && (
                        <Flex
                          position="absolute"
                          width="40%"
                          flexDirection="row"
                          // border='2px'
                          top="8rem"
                          id="playerA-Card"
                          // marginLeft={["11rem", "20rem"]}
                          // marginTop={"9rem"}
                        >
                          {/* {player1Cards.map((card, index) => (
                                <Image
                                  key={index}
                                  src={`/cards/${card}`}
                                  boxSize={["2rem","3rem"]}
                                  margin="0.5rem"
                                  id="cards-positionA"
                                />
                              ))} */}
                          {gameState.value <= 14 && (
                            <Image
                              key={0}
                              src={`/cards/${player1Cards[0]}`}
                              boxSize={["2rem", "3rem"]}
                              margin="0.5rem"
                              id="cards-positionA"
                            />
                          )}
                          {gameState.value <= 11 && (
                            <Image
                              key={1}
                              src={`/cards/${player1Cards[1]}`}
                              boxSize={["2rem", "3rem"]}
                              margin="0.5rem"
                              id="cards-positionA"
                            />
                          )}
                          {gameState.value <= 9 && (
                            <Image
                              key={2}
                              src={`/cards/${player1Cards[2]}`}
                              boxSize={["2rem", "3rem"]}
                              margin="0.5rem"
                              id="cards-positionA"
                            />
                          )}
                        </Flex>
                      )}

                      <Box
                        color={"Yellow"}
                        fontSize={["1.4rem", "5rem"]}
                        width={["20%", "20%"]}
                        // backgroundColor='red'
                        className="players"
                        id="playerB"
                        mt={["1rem"]}
                      >
                        {/* PLAYER B */}
                      </Box>
                      {gameState.value < 14 && ( //update 14 to 10
                        <Flex
                          position="absolute"
                          width="40%"
                          top="16.5rem"
                          id="playerB-Card"
                          flexDirection="row"
                          // marginLeft={["11rem", "20rem"]}
                          // marginTop={"5rem"}
                        >
                          {/* uncomment */}
                          {/* {player2Cards.map((card, index) => (
                                <Image
                                  key={index}
                                  src={`/cards/${card}`}
                                  boxSize={["2rem","3rem"]}
                                  margin="0.5rem"
                                  marginTop={"-5rem"}
                                  id="cards-positionB"
                                />
                              ))} */}
                          {gameState.value <= 12 && (
                            <Image
                              key={0}
                              src={`/cards/${player2Cards[0]}`}
                              boxSize={["2rem", "3rem"]}
                              margin="0.5rem"
                              marginTop={"-5rem"}
                              id="cards-positionB"
                            />
                          )}
                          {gameState.value <= 10 && (
                            <Image
                              key={1}
                              src={`/cards/${player2Cards[1]}`}
                              boxSize={["2rem", "3rem"]}
                              margin="0.5rem"
                              marginTop={"-5rem"}
                              id="cards-positionB"
                            />
                          )}
                          {gameState.value <= 8 && (
                            <Image
                              key={2}
                              src={`/cards/${player2Cards[2]}`}
                              boxSize={["2rem", "3rem"]}
                              margin="0.5rem"
                              marginTop={"-5rem"}
                              id="cards-positionB"
                            />
                          )}
                        </Flex>
                      )}
                    </Flex>
                  )}
                  <Box
                    fontWeight={"1000"}
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
                    //   background="linear-gradient(to right, teal.200, blue.500)"
                    background="linear-gradient(to right, #809fff, #0000FF)"
                    marginRight={"1rem"}
                    color="white"
                  >
                    {gameState?.value && Math.max(0, gameState.value - 20)}
                  </Box>
                </Box>
              </AspectRatio>

              <Flex flexDirection={"column"} id="outputbox">
                <Box
                  // ml={["1.5rem", ""]}
                  height={"5rem"}
                  // width="100%"
                  flexDirection="row"
                  border="5px solid #668cff"
                  boxShadow="4px 4px 10px rgba(3, 0, 2, 0.6)"
                  display="flex"
                  borderRadius="1rem"
                  mt={["5rem", ""]}
                >
                  <Box
                    flex="1"
                    // width={["10%", "44%"]}
                    backgroundColor="white"
                    textAlign="center"
                    borderRight="4px solid #668cff"
                    className="abc"
                  >
                    <Text
                      color={"#668cff"}
                      fontSize={["17px", "18px"]}
                      fontWeight="bold"
                    >
                      Available Credit :
                    </Text>
                    <Text
                      color="#daa520"
                      fontWeight={"500"}
                      fontSize={["20px", "24px"]}
                    >
                      {user?.coins && Math.max(0, user?.coins)}
                    </Text>
                  </Box>

                  <Box flex="1" textAlign="center">
                    <Text color={"#668cff"} fontSize="18px" fontWeight="bold">
                      Match Id :
                    </Text>
                    <Text
                      color="#daa520"
                      fontWeight={"500"}
                      fontSize={["20px", "24px"]}
                    >
                      {user?.userId}
                    </Text>
                  </Box>
                </Box>
                <TableContainer ml={["0.1rem", ""]} mt={"1rem"}>
                  <Table
                    borderRadius={"1rem"}
                    border="1px solid 5pxblack"
                    bg={"black"}
                    variant="simple"
                  >
                    <Thead></Thead>
                    <Tbody>
                      <Tr
                        borderRadius={"2rem"}
                        boxShadow="0 14px 18px rgba(0,1 0, 20, 0.1)"
                        color="black"
                        bg="lightgray"
                      >
                        <Td>Hands</Td>
                        <Td>Payout</Td>
                        <Td></Td>
                      </Tr>
                      <Tr color="white">
                        <Td>Pair</Td>

                        <Td isNumeric>1 to 2</Td>
                      </Tr>
                      <Tr color="white">
                        <Td>Flush</Td>
                        <Td isNumeric>1 to 6</Td>
                      </Tr>
                      <Tr color="white">
                        <Td>Straight</Td>
                        <Td isNumeric>1 to 8</Td>
                      </Tr>
                      <Tr color="white">
                        <Td>Straight flush</Td>
                        <Td isNumeric>1 to 24</Td>
                      </Tr>
                    </Tbody>
                    <Tfoot>
                      <Tr color="white">
                        <Th color="white">Trio</Th>
                        <Td isNumeric>1 to 36</Td>
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>

                {/* BUTTONS FOR BET */}
              </Flex>
            </Flex>

            <Text
              mt={["-7rem", "2rem"]}
              mb={"1rem"}
              fontSize={"1.3rem"}
              fontWeight={"bold"}
              ml={["2rem", "16rem"]}
              id="chooseamount"
            >
              Choose the Amount
            </Text>

            <Box>
              <Box
                mt={["4rem", ""]}
                display={"flex"}
                flexDirection={"row"}
                id="amountbox"

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
                    key={index}
                    height="45px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    fontWeight="bold"
                    variant="unstyled"
                    _hover={{ height: "2rem" }}
                    onClick={() => {
                      setCoins(item.value);
                      console.log(item.value);
                    }}
                  >
                    <img
                      height={"10rem"}
                      src={item.imageSrc}
                      alt={`${item.value}'s coin`}
                      style={{ maxHeight: "55px" }}
                    />
                  </Button>
                ))}
              </Box>

              <Box
                mr={["2.2rem", "0rem"]}
                ml={["1rem", "9rem"]}
                mt={["5rem", "1rem"]}
                id="playersbutton"
              >
                <Button
                  onClick={() => handleBait("0")}
                  disabled={gameState?.value <= 10}
                  width={"10rem"}
                  height={"5rem"}
                  bgGradient="linear(to-r, teal.200, blue.500)"
                  _hover={{
                    bgGradient: "linear(to-r, red.200, orange.500, yellow.400)", // Change colors on hover
                  }}
                >
                  Player A
                </Button>
                <Button
                  onClick={() => handleBait("1")}
                  disabled={gameState?.value <= 10}
                  width={"10rem"}
                  ml={"1rem"}
                  height={"5rem"}
                  bgGradient="linear(to-r, teal.200, blue.500)"
                  _hover={{
                    bgGradient: "linear(to-r, red.200, orange.500, yellow.400)", // Change colors on hover
                  }}
                >
                  Player B
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </ChakraProvider>
    </>
  );
}

export default TeenPatti;
