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

// import BettingAmountButton from "./BettingButtons/BettingAmountButton";
// import BettingButtons from "./BettingButtons/BettingButtons";
// import CardSection from "./GameArea/CardSection";
// import CounterBox from "./GameArea/CounterBox";
// import GameArea from "./GameArea/GameArea";
// import MainCardSection from "./GameArea/MainCardSection";
// import UserInfo from "./UserInfo/UserInfo";
// import WinStatusBanner from "./GameArea/WinStatusBanner";
// import { io } from "socket.io-client";

// const socket = io("https://andarbaharbacked.onrender.com", {
//   query: {
//     userId: Math.floor(Math.random() * Date.now()),
//   },
//   transports: ["websocket"],
// });
// const AndarBahar = () => {
//   const [gameState, setGameState] = useState({ value: "waiting" });
//   const [user, setUser] = useState(null);
//   const [coins, setCoins] = useState(50);
//   const [mainCard, setMainCard] = useState([]);
//   const [andarCards, setAndarCards] = useState([]);
//   const [baharCards, setBaharCards] = useState([]);
//   const [buttonClick1, setButtonClick1] = useState(false);
//   const [buttonClick2, setButtonClick2] = useState(false);

//   console.log("user", user);
//   console.log("mainCard", mainCard);

//   useEffect(() => {
//     const handleGameUpdate = (updatedGameState) => {
//       setGameState(updatedGameState.gamestate);
//       // setMainCard(updatedGameState.mainCard);

//       // if(updatedGameState.gamestate.value === 0){
//       //   setButtonClick1(true);
//       //   setButtonClick2(true);
//       //   return 0;
//       // }

//       if (updatedGameState.gamestate.value === 10) {
//         socket.emit("gameCards", updatedGameState.mainCard._id);
//       }
//     };

//     const handleUserDetails = (data) => {
//       setUser(data.user);
//     };

//     const handleBait = (data) => {
//       setUser(data);
//     };

//     const handleMainCard = (data) => {
//       setMainCard(data.mainCard);
//     };
//     socket.on("gameUpdate", handleGameUpdate);
//     socket.on("userDetails", handleUserDetails);
//     socket.on("Main_Card", handleMainCard);
//     socket.on("bait", handleBait);

//     return () => {
//       socket.off("gameUpdate", handleGameUpdate);
//       socket.off("userDetails", handleUserDetails);
//       socket.off("bait", handleBait);
//     };
//   }, []);

//   if (gameState?.value === 3) {
//     socket.emit("getUpdatedUserDetails");
//   }

//   useEffect(() => {
//     if (gameState?.value === 19) {
//       animateCards();
//     } else if (gameState?.value === 45) {
//       setAndarCards([]);
//       setBaharCards([]);
//     }
//   }, [gameState?.value]);

//   function animateCards() {
//     const baharCardsArr = mainCard?.baharcards || [];
//     const andarCardsArr = mainCard?.andarcards || [];

//     let combinedCardsArr = [];

//     for (
//       let i = 0;
//       i < Math.max(baharCardsArr.length, andarCardsArr.length);
//       i++
//     ) {
//       if (i < baharCardsArr.length) {
//         combinedCardsArr.push({ type: "bahar", card: baharCardsArr[i] });
//       }
//       if (i < andarCardsArr.length) {
//         combinedCardsArr.push({ type: "andar", card: andarCardsArr[i] });
//       }
//     }

//     combinedCardsArr.forEach((card, index) => {
//       setTimeout(() => {
//         if (card.type === "bahar") {
//           setBaharCards((prev) => [...prev, card.card]);
//         } else {
//           setAndarCards((prev) => [...prev, card.card]);
//         }
//       }, 1000 * (index + 1));
//     });
//   }

//   const handleBait = (baitType) => {
//     if (gameState?.value > 0) {
//       setButtonClick1(true);
//       setButtonClick2(true);
//     }
//     if (user?.coins <= 0) {
//       alert("Insufficient Funds");
//       return;
//     }
//     const bait = {
//       baitType,
//       coins,
//       cardId: mainCard._id,
//     };
//     socket.emit("bait", bait);
//   };

//   return (
//     <ChakraProvider>
//       <>
//         <Box width="65%">
//           <Flex justify="space-between" align="center" mb="2">
//             <Text
//               fontSize="24px"
//               fontWeight="bold"
//               borderRadius="10px"
//               position="relative"
//             >
//               Andar Bahar
//             </Text>
//             <Button variant="outline" colorScheme="blue" ml="2">
//               Rules
//             </Button>
//           </Flex>
//           <Box
//             width="100%"
//             height="90vh"
//             // border="10px solid #333"
//             backgroundImage="url('/Andar&BaharImage/Andar&BaharAvatar.webp')"
//             backgroundSize="cover"
//             backgroundPosition={`center 100%`}
//             backgroundRepeat="no-repeat"
//             display="flex"
//             position="relative"
//             id="andarbaharImg"
//           >
//             <WinStatusBanner
//               winStatus={mainCard.winstatus}
//               gameState={gameState}
//             />
//             <CounterBox
//               value={gameState.value - 25 < 0 ? "0" : gameState.value - 25}
//               width="13%"
//               height="18%"
//               position="absolute"
//               top="5"
//               right="6"
//               color="white"
//             />

//             <CounterBox
//               value={gameState.value - 25 < 0 ? "Freeze" : "Place Bet"}
//               width="20%"
//               height="22%"
//               position="absolute"
//               top="3"
//               left="3"
//               color="white"
//               alignItems="center"
//             />

//             <Box
//               width="7%"
//               height="8%"
//               position="absolute"
//               bottom="30%"
//               right="7%"
//               id="maincardsection"
//               // border="5px solid black"
//             >
//               <Text textColor="white" id="maincardsectiontext">
//                 Joker
//               </Text>
//               <img src={`./cards/${mainCard.main_card}`} alt={`Card main`} />
//             </Box>
//             {gameState?.value <= 20 && (
//               <Box width="100%">
//                 <Box
//                   width="6%"
//                   height="13%"
//                   position="absolute"
//                   bottom="25%"
//                   middle="15%"
//                   right="20%"
//                   transform="translateX(-50%)"
//                   id="andarhiddencards"
//                   display="flex"
//                   flexDirection="row-reverse"
//                 >
// {andarCards
//   .slice()
//   .reverse()
//   .map((card, index) => (
//     <img
//       key={index}
//       src={`./cards/${card}`}
//       alt={`Andar Card ${index}`}
//     />
//   ))}
//                 </Box>

//                 <Box
//                   width="6%"
//                   height="13%"
//                   position="absolute"
//                   bottom="10%"
//                   middle="15%"
//                   right="20%"
//                   transform="translateX(-50%)"
//                   id="baharhiddencards"
//                   display="flex"
//                   flexDirection="row-reverse"
//                 >
//                   {baharCards
//                     .slice()
//                     .reverse()
//                     .map((card, index) => (
//                       <img
//                         key={index}
//                         src={`./cards/${card}`}
//                         alt={`Bahar Card ${index}`}
//                       />
//                     ))}
//                 </Box>
//               </Box>
//             )}
//           </Box>
//         </Box>

//         {/* 10 Mini Boxes */}
//         <Box
//           width="65%"
//           height="15%"
//           // border="2px solid darkgreen"
//           display="flex"
//           position="relative"
//           id="andarbaharidhistory"
//         >
//           {[...Array(10)].map((_, index) => (
//             <Text
//               border="2px solid grey"
//               key={index}
//               fontSize="20px"
//               color={index % 2 === 0 ? "#333" : "#2b329b"}
//               width="100%"
//               height="45%"
//               align="center"
//               justifyContent="space-around"
//               fontWeight="bold"
//             >
//               {/* {index % 3 === 0 ? "D" : index % 3 === 1 ? "T" : "L"} */}

//               {/* {index % 2 === 0 ? "#333" : "#2b329b"} */}

//               {index % 2 === 0 ? "A" : "B"}
//             </Text>
//           ))}

//           <Text
//             position="absolute"
//             bottom="0"
//             // left="10%"
//             fontWeight="bold"
//             border="2px solid darkblue"
//             padding="0.3rem"
//             id="andarbaharmatchID"
//           >
//             Match Id: {user?._id}
//           </Text>
//           <Button
//             width="20%"
//             variant="outline"
//             colorScheme="blue"
//             position="absolute"
//             bottom="0"
//             right="10%"
//             id="andarbaharplayerhistory"
//           >
//             Player History
//           </Button>
//         </Box>
//         <Box
//           // border="5px dotted blue"
//           width="30%"
//           height="80%"
//           position="absolute"
//           right="0"
//           top="35%"
//           display="flex"
//           justifyContent="space-between"
//           flexDirection="column"
//           id="andarbaharscoreboard"
//         >
//           <Box
//             border="20px solid #333"
//             width="100%"
//             justifyContent="center"
//             align="center"
//             borderRadius="10%"
//           >
//             <Box backgroundColor="#2d6431" padding="0.5rem">
//               <Text fontSize="18px" fontWeight="bold">
//                 Available Credit
//               </Text>
//               {/* <Text fontSize="18px" margin="0 0 0.5rem">
//                 ${user?._id}
//               </Text> */}
//               {user?.coins > 0 ? (
//                 <Text fontSize="24px">${user?.coins}</Text>
//               ) : (
//                 <Text fontSize="24px">$0</Text>
//               )}
//             </Box>

//             <Box backgroundColor="#e0e0e0" padding="0.5rem">
//               <Text fontSize="18px" fontWeight="bold">
//                 Player ID
//               </Text>
//               <Text fontSize="18px" margin="0 0 0.5rem">
//                 {user?.userId}
//               </Text>
//             </Box>
//           </Box>

//           {/* New Box */}
//           <Text align="center" fontWeight="bold">
//             Place Your Bet!
//           </Text>
//           <Box
//             border="5px solid #4790b5"
//             width="100%"
//             height="16%"
//             display="flex"
//             justifyContent="space-around"
//             alignItems="center"
//             borderRadius="5rem"
//             backgroundColor="black"
//           >
//             {[
//               { value: 10, imageSrc: "/Coins/10's coin.webp" },
//               { value: 50, imageSrc: "/Coins/50's coin.webp" },
//               { value: 100, imageSrc: "/Coins/100's coin.webp" },
//               { value: 500, imageSrc: "/Coins/500's coin.webp" },
//               { value: 1000, imageSrc: "/Coins/1000's coin.webp" },
//               { value: 5000, imageSrc: "/Coins/5000's coin.webp" },
//             ].map(({ value, imageSrc }, index) => (
//               <BettingAmountButton
//                 key={index}
//                 value={value}
//                 imageSrc={imageSrc}
//                 setCoins={setCoins}
//               />
//             ))}
//           </Box>

//           {/* Player Button */}
//           {/* {gameState?.value - 20 > 0 && ( */}
//           <Box
//             border="2px solid red"
//             width="100%"
//             flexDirection="row"
//             height="30%"
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             backgroundColor="lightgray"
//           >
//             <Button
//               width="47%"
//               height="80%"
//               display="flex"
//               justifyContent="space-around"
//               variant="unstyled"
//               fontSize="1.5rem"
//               textColor="white"
//               backgroundColor="#640e18"
//               borderRadius="1rem"
//               onClick={() => handleBait(0)}
//               isDisabled={gameState?.value - 25 < 0 && buttonClick1}
//             >
//               Andar <span>1.98</span>
//             </Button>

//             <Button
//               width="47%"
//               height="80%"
//               display="flex"
//               justifyContent="space-around"
//               variant="unstyled"
//               fontSize="1.5rem"
//               textColor="white"
//               backgroundColor="#1c3e6b"
//               borderRadius="1rem"
//               onClick={() => handleBait(1)}
//               isDisabled={gameState?.value - 25 < 0 && buttonClick2}
//             >
//               Bahar <span>1.98</span>
//             </Button>
//           </Box>
//           {/* )} */}
//         </Box>
//       </>
//     </ChakraProvider>
//   );
// };

// export default AndarBahar;

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

const socket = io("https://andarbaharbacked.onrender.com", {
  query: {
    userID: "65c4a6874c68b332fd697164",
  },
  transports: ["websocket"],
});

export default function AndarBahar() {
  const [gameState, setGameState] = useState({ value: "waiting" });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [mainCard, setMainCard] = useState({});
  const [andarCards, setAndarCards] = useState([]);
  const [baharCards, setBaharCards] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [bettingAmount, setBettingAmount] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState();

  // console.log("user", user);
  // console.log("mainCard", mainCard);

  useEffect(() => {
    const handleGameUpdate = (updatedGameState) => {
      setGameState(updatedGameState.gamestate);
      updatedGameState.gamestate.value - 25 === 20 ? setBettingAmount(0) : "";
      const isDisabled = updatedGameState.gamestate.value - 25 <= 0;
      setButtonDisabled(isDisabled);
    };

    const handleUserDetails = (data) => {
      // console.log("handleUserDetails", data);
      setUser(data.user);
    };

    const handlebet = (data) => {
      console.log("newbet", data);
      setUser(data);
    };

    const handleMainCard = (data) => {
      // console.log("mainCard123", data.mainCard);
      setMainCard(data.mainCard);
      setGameHistory(data.gameHistory);
    };
    socket.on("gameUpdate", handleGameUpdate);
    socket.on("userDetails", handleUserDetails);
    socket.on("Main_Card", handleMainCard);
    socket.on("bet", handlebet);

    return () => {
      socket.off("gameUpdate", handleGameUpdate);
      socket.off("userDetails", handleUserDetails);
      socket.off("Main_Card", handleMainCard);
      socket.off("bet", handlebet);
    };
  }, []);

  if (gameState?.value === 3) {
    socket.emit("getUpdatedUserDetails");
  }

  useEffect(() => {
    if (gameState?.value === 19) {
      animateCards();
    } else if (gameState?.value === 45) {
      setAndarCards([]);
      setBaharCards([]);
    }
  }, [gameState?.value]);

  function animateCards() {
    const baharCardsArr = mainCard?.baharcards || [];
    const andarCardsArr = mainCard?.andarcards || [];

    let combinedCardsArr = [];

    for (
      let i = 0;
      i < Math.max(baharCardsArr.length, andarCardsArr.length);
      i++
    ) {
      if (i < baharCardsArr.length) {
        combinedCardsArr.push({ type: "bahar", card: baharCardsArr[i] });
      }
      if (i < andarCardsArr.length) {
        combinedCardsArr.push({ type: "andar", card: andarCardsArr[i] });
      }
    }

    combinedCardsArr.forEach((card, index) => {
      setTimeout(() => {
        if (card.type === "bahar") {
          setBaharCards((prev) => [...prev, card.card]);
        } else {
          setAndarCards((prev) => [...prev, card.card]);
        }
      }, 1000 * (index + 1));
    });
  }

  const handleBetting = (betType) => {
    if (user?.coins <= 10) {
      alert("Insufficient Funds");
      return;
    }

    const bet = {
      betType,
      coins,
      cardId: mainCard._id,
    };
    setBettingAmount((prev) => prev + Number(coins));
    socket.emit("bet", bet);
    console.log("betting", bet);
  };

  return (
    <>
      <ChakraProvider>
        <Box width={["19rem", "100%"]}>
          <Box bg={"#07588a"} maxW={["100vw", "100vw"]} id="main-div">
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
                    Andar Bahar
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
                    backgroundImage="url('/public/Andar&BaharImage/Andar Bahar Table.webp')"
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
                      background="radial-gradient(919px at 1.7% 6.1%, rgb(41, 58, 76) 0%, rgb(40, 171, 226) 100.2%)"
                    >
                      {/* {countdown <= 25 ? "Freeze" : "Place  Bet"}
                      {countdown <= 8 ? "Winner : " + winner : "Loading"} */}
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
                      background="radial-gradient(919px at 1.7% 6.1%, rgb(41, 58, 76) 0%, rgb(40, 171, 226) 100.2%)"
                      marginRight={"1rem"}
                      color="white"
                    >
                      {gameState?.value - 25 <= 0 ? "0" : gameState?.value - 25}
                    </Box>

                    <Flex
                      display={"flex"}
                      gap="0.5rem"
                      flexDirection="column"
                      position={"relative"}
                      top={{
                        base: "25%",
                        sm: "25%",
                        md: "25%",
                        lg: "25%",
                        xl: "25%",
                        "2xl": "25%",
                      }}
                      left={{
                        base: "28%",
                        sm: "28%",
                        md: "28%",
                        lg: "28%",
                        xl: "28%",
                        "2xl": "28%",
                      }}
                    >
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
                            xl: "3.5rem",
                            "2xl": "4rem",
                          }}
                          height={{
                            base: "2.3rem",
                            sm: "2rem",
                            md: "1rem",
                            lg: "2.6rem",
                            xl: "3.5rem",
                            "2xl": "4rem",
                          }}
                          // height={{base:"rem" , md:"3.5rem"}}
                          src={`/cards/${mainCard?.main_card}`}
                          alt={mainCard?.main_card}
                        />
                      </Box>
                    </Flex>
                    <Flex
                      gap="0.5rem"
                      direction="column"
                      position={"relative"}
                      top={{
                        base: "25%",
                        sm: "25%",
                        md: "25%",
                        lg: "25%",
                        xl: "25%",
                        "2xl": "25%",
                      }}
                      left={{
                        base: "28%",
                        sm: "28%",
                        md: "28%",
                        lg: "28%",
                        xl: "28%",
                        "2xl": "28%",
                      }}
                    >
                      <Box>
                        {gameState?.value <= 18 && (
                          <Box key={0}>
                            {andarCards
                              .slice()
                              .reverse()
                              .map((card, index) => (
                                <Image
                                  key={index}
                                  src={`./cards/${card}`}
                                  alt={`Andar Card ${index}`}
                                  style={{
                                    width: {
                                      base: "1.8rem",
                                      sm: "2rem",
                                      md: "2.4rem",
                                      lg: "",
                                      xl: "3.5rem",
                                      "2xl": "4rem",
                                    },
                                    height: {
                                      base: "2.3rem",
                                      sm: "2rem",
                                      md: "1rem",
                                      lg: "2.6rem",
                                      xl: "3.5rem",
                                      "2xl": "4rem",
                                    },
                                  }}
                                />
                              ))}
                          </Box>
                        )}
                      </Box>
                    </Flex>
                  </Box>
                </AspectRatio>

                <Flex flexDirection={["column", "column"]} alignItems="center">
                  {/* Box Items */}

                  <Box
                    bg={"black"}
                    fontWeight={"700"}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #A52A2A, #FF8C00)",
                      WebkitBackgroundClip: "text",
                      color: "#222831",
                    }}
                  >
                    <>
                      Player Id :-
                      <Text color={"black"} align={"center"}>
                        {user?.mobileNumber ? user?.mobileNumber : "Loading..."}
                      </Text>
                    </>
                  </Box>
                  <Button
                    bg={"black"}
                    fontWeight={"700"}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #A52A2A, #FF8C00)",
                      WebkitBackgroundClip: "text",
                      color: "#222831",
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
                      >
                        <Text
                          fontSize="14px"
                          color={index % 2 === 0 ? "white" : "black"}
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
                      color: "#222831",
                    }}
                  >
                    <>
                      Last Bet Amount :
                      <Text color={"black"} align={"center"}>
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
                  border="6px solid #333"
                  borderRadius="10px"
                >
                  <Box
                    flex="1"
                    width="48%"
                    background="radial-gradient(263px at 100.2% 3%, rgb(12, 85, 141) 31.1%, rgb(205, 181, 93) 36.4%, rgb(244, 102, 90) 50.9%, rgb(199, 206, 187) 60.7%, rgb(249, 140, 69) 72.5%, rgb(12, 73, 116) 72.6%)"
                    textAlign="center"
                    borderRadius="10px"
                    border={"5px solid grey"}
                  >
                    <Text
                      fontSize={["18px", "18px"]}
                      fontWeight="bold"
                      color={"white"}
                    >
                      Available Credit
                    </Text>
                    <Text fontSize={["20px", "24px"]} color={"white"}>
                      💰
                      {Math.round(user?.coins * 100) / 100
                        ? Math.round(user?.coins * 100) / 100
                        : "Loading... "}
                    </Text>
                  </Box>

                  <Box
                    flex="1"
                    width="48%"
                    // backgroundColor="orange"
                    background="radial-gradient(263px at 100.2% 3%, rgb(12, 85, 141) 31.1%, rgb(205, 181, 93) 36.4%, rgb(244, 102, 90) 50.9%, rgb(199, 206, 187) 60.7%, rgb(249, 140, 69) 72.5%, rgb(12, 73, 116) 72.6%)"
                    textAlign="center"
                    borderRadius="10px"
                    border={"5px solid grey"}
                  >
                    <Text fontSize="18px" fontWeight="bold" color={"white"}>
                      Match Id:
                    </Text>
                    <Text fontSize={["20px", "24px"]} color={"white"}>
                      {mainCard?._id ? mainCard._id : "Loading..."}
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
                          // bgGradient="linear(to-r, #0000FF, #FFA500)"
                          background="linear-gradient(114.9deg, rgb(34, 34, 34) 8.3%, rgb(0, 40, 60) 41.6%, rgb(0, 143, 213) 93.4%)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting("0")}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          Andar <span>1.98</span>
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
                          background="linear-gradient(114.9deg, rgb(34, 34, 34) 8.3%, rgb(0, 40, 60) 41.6%, rgb(0, 143, 213) 93.4%)"
                          _hover={
                            !isButtonDisabled && {
                              background:
                                "linear-gradient(109.6deg, rgb(41, 125, 182) 3.6%, rgb(77, 58, 151) 51%, rgb(103, 55, 115) 92.9%)",
                              boxShadow: "dark-lg",
                              color: "black",
                            }
                          }
                          onClick={() => handleBetting("1")}
                          display={"flex"}
                          justifyContent={"space-around"}
                        >
                          {isButtonDisabled && (
                            <FaLock
                              size={35}
                              style={{ color: "white", marginRight: "0.5rem" }}
                            />
                          )}
                          Bahar <span>1.98</span>
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
