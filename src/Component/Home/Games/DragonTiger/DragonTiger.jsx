import "./DragonTiger.css";

import {
  AspectRatio,
  Box,
  Button,
  ChakraProvider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import Gamingimage from "../../Games/Images/GAMING GIRL 1.svg";
import NoteIcon from "@mui/icons-material/Note";
import flower from "../../Games/Images/Flower.svg";
import heart from "../../Games/Images/Heart.svg";
import heart1 from "../../Games/Images/Heart1.svg";
import { io } from "socket.io-client";
import pann from "../../Games/Images/Pann.svg";
import vector from "../../Games/Images/Vector-1.svg";

//  import Gamingimage from "../Games/images/GAMING GIRL 1.svg";










const socket = io("https://dragontiger-backend.onrender.com", {
  query: {
    userId: Math.floor(Math.random() * Date.now()),
  },
  transports: ["websocket"],
});

export default function DragonTiger() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  // const [seconds, setSeconds] = useState(30);
  const [gameState, setGameState] = useState({ value: "waiting" });
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(50);
  const [mainCard, setMainCard] = useState([]);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [gamehistory, setGamehistory] = useState([]);

  useEffect(() => {
    // Listen for game state updates from the server
    socket.on(
      "gameUpdate",
      (updatedGameState) => {
        setGameState(updatedGameState?.gamestate);

        const isDisabled = updatedGameState?.gamestate?.value <= 20;

        setButtonDisabled(isDisabled);
      },
      [gameState?.value]
    );

    socket.on("Main_Card", (data) => {
      setMainCard(data.mainCard);

      console.log(data, "data");
    });
    socket.on("Main_Card", (data) => {
      setGamehistory(data.gameHistory);

      // console.log(data?.gameHistory, "data");
    });

    socket.on("userDetails", (data) => {
      // console.log(data.user.coins , "data");
      setUser(data.user);
    });

    socket.on("bait", (data) => {
      setUser(data);
      // console.log(data);
      // setUser(data.user);
    });

    // console.log(mainCard , "maincard");

    return () => {
      socket.off("bait", handleBait);
      socket.disconnect();
    };
  }, []);
  if (gameState?.value === 3) {
    socket.emit("getUpdatedUserDetails");
  }

  // const handleBait = (baitType) => {
  //   if (user?.coins <= 0) {
  //     alert("Insufficient Coins");
  //     return; // Stop execution if coins are 0 or less
  //   }
  //   const bait = {
  //     baitType,
  //     coins,
  //     cardId: mainCard._id,
  //   };
  //   console.log(bait, "bait");
  //   socket.emit("bait", bait);
  // };
  const handleBait = ({ baitType, baitOn, suit, color }) => {
    const bait = {
      baitType,
      baitOn,
      coins,
      suit: suit || "",
      color: color || "",
      cardId: mainCard._id,
    };
    console.log(bait);
    socket.emit("bait", bait);
  };

  return (
    <>
      <ChakraProvider>
        <Box m={"0.5rem"} maxW={["90.5 vw", "83.5vw"]}>
          <Flex direction={["column", "row "]}>
            <Box width={["105%", "34%"]}>
              <Box
                width={["42%", "65%"]}
                marginTop="0px"
                marginLeft={["-0.7rem", "0px"]}
                marginBottom="1rem"
              >
                {/* Rules and Regulation */}
                <Flex>
                  <Box
                    textAlign={"center"}
                    fontSize={["24px", "28px"]}
                    ml={["1.2rem", "0rem"]}
                    fontWeight="bold"
                    borderRadius="10px"
                    mt={"1rem"}
                    mb={"1rem"}
                  >
                    Dragon
                  </Box>
                  <Box
                    textAlign={"center"}
                    fontSize={["24px", "28px"]}
                    fontWeight="bold"
                    borderRadius="10px"
                    mt={"1rem"}
                    mb={"1rem"}
                  >
                    Tiger
                  </Box>
                  <Box id="box-btn">
                    <Button
                      mb={"1rem"}
                      mt={"1rem"}
                      ml={["0.2rem", "1rem"]}
                      fontWeight={"600"}
                      width={["10.5rem", "14rem"]}
                      background="linear-gradient(to bottom right , #668cff , #a64dff)"
                      _hover={{ bg: " #d9d9d9" }}
                      color="black"
                      onClick={onOpen}
                    >
                      Rules and Regulation
                    </Button>
                  </Box>
                  <Modal
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                  >
                    <ModalOverlay />
                    <ModalContent
                      // width="86rem"
                      maxW={["90vw", "40vw"]}
                      maxH="60vh" // Set the maximum height to 80% of the viewport height
                      overflowY="auto" // Enable vertical scrollbar when content overflows
                      background="white"
                    >
                      <ModalHeader>
                        Dragon Tiger: Rules and Regulations
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        {/* <Lorem count={2} /> */}
                        <Button bg={"#CF8D2E"} width={"10rem"}>
                          GAME OBJECTIVES
                        </Button>
                        <br />
                        To guess whether Dragon or Tiger wins. Player can also
                        bet whether the Dragon and Tiger cards will be of same
                        value, therefore a Tie.
                        <br /> <br />
                        <Button bg={"#CF8D2E"} width={"7rem"}>
                          GAME RULES:
                        </Button>
                        <br />
                        Hands dealt: 2 (Dragon, Tiger)
                        <br /> <br />
                        Bets: Higher card between hands win.
                        <br /> <br /> Tie (Rank only): If the Numbers are same
                        on both Hands.
                        <br /> <br /> Number Ranking: Lowest to highest: Ace, 2,
                        3, 4, 5, 6, 7,8, 9, 10, Jack, Queen and King (Ace is "1"
                        and King is "13").
                        <br />
                        <br />
                        <Button bg={"#CF8D2E"} width={"5rem"}>
                          PAYOUT
                        </Button>
                        <br />
                        {/* Payout as per the bet placed Dragon 1 to 0.98 Tiger 1 to
                    0.98 Tie (Rank Only) 1 to 10 Even 1 to 1.1 Odd 1 to 0.8 Red
                    1 to 0.98 Black 1 to 0.98 Suit 1 to 2.75 */}
                        <TableContainer>
                          <Table size="sm">
                            <Thead>
                              {/* <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            
                          </Tr> */}
                            </Thead>
                            <Tbody>
                              <Tr>
                                <Td>Dragon</Td>
                                <Td>1 to 0.98</Td>
                              </Tr>
                              <Tr>
                                <Td>Tiger</Td>
                                <Td>1 to 0.98</Td>
                              </Tr>
                              <Tr>
                                <Td>Tie (Rank Only) </Td>
                                <Td>1 to 10</Td>
                              </Tr>

                              <Tr>
                                <Td>Even </Td>
                                <Td>1 to 1.1</Td>
                              </Tr>
                              <Tr>
                                <Td>Odd </Td>
                                <Td>1 to 0.8</Td>
                              </Tr>
                              <Tr>
                                <Td>Red</Td>
                                <Td>1 to 0.98</Td>
                              </Tr>
                              <Tr>
                                <Td>Red</Td>
                                <Td>1 to 0.98</Td>
                              </Tr>
                              <Tr>
                                <Td>Black</Td>
                                <Td>1 to 0.98</Td>
                              </Tr>
                              <Tr>
                                <Td>Suit</Td>
                                <Td>1 to 2.75</Td>
                              </Tr>
                            </Tbody>
                            {/* <Tfoot>
                          <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                          </Tr>
                        </Tfoot> */}
                          </Table>
                        </TableContainer>
                      </ModalBody>

                      <ModalFooter>
                        {/* <Button
                      width={"4rem"}
                      colorScheme="blue"
                      mr={3}
                      onClick={onClose}
                    >
                      Close
                    </Button> */}
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Flex>
                {/* Images hai ye */}
                <AspectRatio
                  width={"230%"}
                  minHeight="50%"
                  borderRadius="10px"
                  controls
                  ml={["1rem", "0rem"]}
                >
                  <Box
                    border="4px solid #333"
                    height="50%" // Adjust the height as needed
                    // background="linear-gradient(#c86363, #51a454, #517a9c)"

                    backgroundImage={Gamingimage}
                    backgroundSize="cover"
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="top"
                    position="relative"
                    width={"60%"}
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
                      width={["25%", "18%"]}
                      height={["20%", "18%"]}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      fontSize={["sm", "lg"]}
                      color="white"
                      // background="linear-gradient(to bottom right, violet, blue)"
                      background="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                    >
                      {gameState?.value < 20 ? "Freeze" : "Place  Bet"}
                    </Box>

                    <Box>
                      {gameState.value < 10 && (
                        <Button
                          // background="linear-gradient(to bottom right,#ED9203, #323349, #880000)"
                          background="linear-gradient(to bottom right, #ED9203, #C7E600)"
                          height={["2rem", "4rem"]}
                          width={["12rem", "14rem"]}
                          mt={["rem", "1rem"]}
                          ml={["2rem", ""]}
                        >
                          Winner: {mainCard?.winstatus} {mainCard?.winCardSuit}
                          {/* Winner: {mainCard?.winCardSuit} */}
                        </Button>
                      )}
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
                      fontSize={["sm", "lg"]}
                      background="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                      marginRight={"1rem"}
                      color="white"
                    >
                      {gameState?.value && Math.max(0, gameState.value - 20)}
                    </Box>
                    {gameState.value >= 1 && (
                      <React.Fragment>
                        <Flex
                          marginTop={["9rem", "13rem"]}
                          ml={["0.5rem", "2rem"]}
                          width={["15rem", "20rem"]}
                        >
                          <Stack direction="column" width={["10rem", "12rem"]}>
                            <Box color={"Yellow"} fontSize={["1.4rem", "2rem"]}>
                              {/* Dragon */}
                            </Box>
                            {gameState.value < 14 && (
                              <Box
                                fontStyle={"yellow"}
                                width={["1.5rem", "3rem"]}
                              >
                                <Image src={`/cards/${mainCard?.dragoncard}`} />
                              </Box>
                            )}
                          </Stack>

                          <Stack
                            ml={"3rem"}
                            width={["6rem", "8rem"]}
                            direction="column"
                          >
                            <Box color={"Yellow"} fontSize={["1.4rem", "2rem"]}>
                              {/* Tiger */}
                            </Box>
                            {gameState.value < 15 && (
                              <Box width={["1.5rem", "3rem"]}>
                                <Image src={`/cards/${mainCard?.tigercard}`} />
                              </Box>
                            )}
                          </Stack>
                        </Flex>
                      </React.Fragment>
                    )}
                  </Box>
                </AspectRatio>
              </Box>
            </Box>
            <Box marginLeft={["", "1rem"]}>
              {/* First Flex - Horizontal View */}
              <Stack
                mt={"1.5rem"}
                display="flex"
                flexDirection={["column", "row"]}
                // backgroundColor={'blue'}
                width={["100%", "45%"]}
                id="secondss"
              >
                <Box
                  marginLeft={["rem", "7rem"]}
                  marginTop={["1rem", "4rem"]}
                  width={["95%", "130%"]}
                  //  backgroundColor={"red"}
                >
                  <Flex
                    width={["100%", "100%"]}
                    flexDirection="row"
                    border="5px solid #668cff"
                    boxShadow="4px 4px 10px rgba(3, 0, 2, 0.6)"
                    display="flex"
                    borderRadius="1rem"
                    ml={["0.5rem", "3rem"]}
                  >
                    <Box
                      flex="1"
                      width={["20%", "100%"]}
                      backgroundColor="white"
                      textAlign="center"
                      borderRight="4px solid #668cff"
                      borderLeftRadius="1rem"
                    >
                      <Text
                        color={"#668cff"}
                        fontSize={["16px", "18px"]}
                        fontWeight="bold"
                      >
                        Available Credit :
                      </Text>
                      <Text fontWeight={"500"} fontSize={["20px", "24px"]}>
                        {/* {gameState?.value && Math.max(0, gameState.value - 15)} */}
                        {user?.coins && Math.max(0, user?.coins)}
                      </Text>
                    </Box>

                    <Box flex="1" width="46%" textAlign="center">
                      <Text
                        color={"#668cff"}
                        fontSize={["16px", "18px"]}
                        fontWeight="bold"
                      >
                        Match Id :
                      </Text>
                      <Text fontWeight={"500"} fontSize={["19px", "24px"]}>
                        {user?.userId}
                      </Text>
                    </Box>
                  </Flex>
                  {/* <Stack
                    ml={["1rem", "6rem"]}
                    mt={"1rem"}
                    flexDirection="row"
                    alignItems="center"
                  >
                    {[...Array(8)].map((_, index) => (
                      <Box
                        key={index}
                        width="35px"
                        height="35px"
                        marginRight={["5px", "10px"]}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fontWeight="bold"
                        border="5px solid #333"
                      >
                        <Text
                          fontSize="14px"
                          color={index % 2 === 0 ? "#333" : "#2b329b"}
                        >
                          {index % 2 === 0 ? "D" : "T"} 
                        {gamehistory}
                        </Text>
                      </Box>
                    ))}
                    
                  </Stack> */}
                  <Box
                    mb={["1rem", ""]}
                    mt={["2rem", "1rem"]}
                    ml={["8rem", "12rem"]}
                  >
                    <Button
                      _hover={{ backgroundColor: "blue.500", color: "white" }}
                      transition="background-color 0.3s, color 0.3s"
                      p={4}
                      borderRadius="md"
                      bg={"orange"}
                      width={["10rem", "10rem"]}
                    >
                      Bet History
                    </Button>
                  </Box>
                  <Box
                    mt={["rem", "1.5rem"]}
                    ml={["2rem", "5rem"]}
                    display="flex"
                  >
                    {gamehistory.map((item, index) => (
                      <Box
                        color={"blue"}
                        p={"2px"}
                        key={index}
                        marginRight={["10px", "10px"]}
                        width={["25px", "30px"]}
                        height="30px"
                        border="2px solid black"
                        borderRadius="5px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {item}
                      </Box>
                    ))}
                  </Box>

                  <Box
                    justifyContent={"center"}
                    alignItems={"center"}
                    mb={"1rem"}
                    mt={"1rem"}
                    ml={["3rem"]}
                    id="playerId"
                  >
                    <Button
                      background="linear-gradient(to bottom right , #989BDE , #656794 )"
                      _hover={{ bg: " #d9d9d9" }}
                      width={["14rem", "16rem"]}
                      mb={["1rem", "1rem"]}
                      marginLeft="2rem"
                    >
                      <Text fontWeight={"700"}> PlayerId : {user?.userId}</Text>
                    </Button>
                    <Button
                      flexDirection="row"
                      alignItems="center"
                      marginLeft="2rem"
                      variant="outline"
                      width={["14rem", "16rem"]}
                      borderRadius={"10px"}
                      background="linear-gradient(to bottom right, #ED9203, #C7E600)"
                      _hover={{ bg: "#ffff00" }}
                      fontWeight={"700"}
                    >
                      Player History
                    </Button>
                  </Box>

                  {/* New Box */}
                  <Box width={["100%", "100%"]}>
                    <Box marginLeft={["1rem", "12rem"]}>
                      <Text
                        mt={"1rem"}
                        mb={"0.6rem"}
                        fontSize="15px"
                        fontWeight="bold"
                      >
                        Choose Your Amount
                      </Text>
                      {/* <Text fontSize="15px" fontWeight="bold">
                        Amount
                      </Text> */}
                    </Box>
                    <Flex
                      ml={["0rem", "3rem"]}
                      border={"6px solid lightgreen"}
                      borderRadius={"20px"}
                      width={["105%", "100%"]}
                      flexDirection={["", "row"]}
                      id="money"
                    >
                      <Flex
                        width={["95%", "100%"]}
                        flexWrap={["nowrap", "wrap"]}
                        justifyContent={["center"]}
                        marginTop={["", "0"]}
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
                            ml={["0.8rem", "0rem"]}
                            key={index}
                            height="45px"
                            margin={["rem", "0.5rem"]}
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
                      </Flex>
                    </Flex>

                    {/* Player Button */}
                    <Flex
                      ml={["0.5rem", "5.5rem"]}
                      // padding="1rem"
                      // border="2px solid #333"
                      marginTop="1.5rem"
                      width={["100%", "100%"]}
                      flexDirection="column"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Flex
                        width={["100%", "100%"]}
                        borderRadius="10px"
                        position="relative"
                      >
                        {/* Left Button */}
                        <Button
                          fontWeight={"700"}
                          // onClick={() => handleBait({baitType:"dragon",baitOn:"normal"})}

                          onClick={() =>
                            handleBait({ baitType: "dragon", baitOn: "normal" })
                          }
                          isDisabled={isButtonDisabled}
                          width={["60%", "40%"]}
                          height="5rem"
                          borderRadius="10px"
                          variant="unstyled"
                          background="linear-gradient(to bottom right , #668cff , #a64dff)"
                          _hover={{ bg: "#668cff" }}
                          color={"white"}
                          zIndex="1" // Ensure it's above the middle button
                        >
                          <Text textAlign="center">Dragon</Text>
                          <Text textAlign="center">2.94</Text>
                        </Button>

                        {/* Middle Overlapping Button */}
                        <Button
                          onClick={() =>
                            handleBait({ baitType: "tie", baitOn: "normal" })
                          }
                          isDisabled={isButtonDisabled}
                          fontWeight={"700"}
                          width={["30%", "25%"]}
                          height="5rem"
                          borderRadius="50%"
                          position="absolute"
                          left={["50%", "40%"]}
                          transform="translateX(-50%)"
                          variant="unstyled"
                          background={"white"}
                          _hover={{ bg: "#e6f7ff" }}
                          bg={"#f2f2f2"}
                          zIndex="2" // Ensure it's above the left and right buttons
                        >
                          <Text textAlign="center">Tie</Text>
                          <Text textAlign="center">2.94</Text>
                        </Button>

                        {/* Right Button */}
                        <Button
                          fontWeight={"700"}
                          onClick={() =>
                            handleBait({
                              baitType: "tiger",
                              baitOn: "suit",
                              suit: "heart",
                            })
                          }
                          isDisabled={isButtonDisabled}
                          width={["60%", "40%"]}
                          height="5rem"
                          borderRadius="10px"
                          variant="unstyled"
                          background="linear-gradient(to bottom right , #668cff , #a64dff)"
                          _hover={{ bg: "#668cff" }}
                          color={"white"}
                          zIndex="1" // Ensure it's above the middle button
                        >
                          <Text textAlign="center">Tiger</Text>
                          <Text textAlign="center">2.94</Text>
                        </Button>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Flex>
          {/*<Box p="1" display="flex">
            <Table
              mt={["1rem", "0rem"]}
              width={["24rem", "30rem"]}
              // width="15px"
              //  width={["60%", "45%"]}
              style={{
                borderCollapse: "separate",
                borderSpacing: "1px",
                borderRadius: "3px",
              }}
            >
              <Thead>
                <Tr>
                  <Th width={["1rem", "8.8rem"]} bg={"#F09403"}>
                    Place The Bet
                  </Th>
                  <Th bg={"#F09403"} textAlign="center">
                    Red
                  </Th>
                  <Th bg={"#F09403"} textAlign="center">
                    Black
                  </Th>
                </Tr>
              </Thead>
              <Tbody bg={"#780200"}>
                <Tr>
                  <Td bg={"#F09403"}>Dragon</Td>
                  <Td
                    onClick={() =>
                      handleBait({
                        baitType: "dragon",
                        baitOn: "color",
                        color: "red",
                      })
                    }
                    _hover={{ bg: "#FFF5EE" }}
                    textAlign="center"
                  >
                    <Image src={`/cards/${"Red 2 cards.svg"}`} />
                    <Td color={"#668CFF"}>1.98</Td>
                  </Td>
                  <Td
                    onClick={() =>
                      handleBait({
                        baitType: "dragon",
                        baitOn: "color",
                        color: "black",
                      })
                    }
                    _hover={{ bg: "#FFF5EE" }}
                    textAlign="center"
                  >
                    <Image src={`/cards/${"black 2 cards.svg"}`} />
                    <Td color={"#668CFF"}>1.98</Td>
                  </Td>
                </Tr>
                <Tr>
                  <Td bg={"#F09403"}>Tiger</Td>
                  <Td
                    onClick={() =>
                      handleBait({
                        baitType: "dragon",
                        baitOn: "color",
                        color: "red",
                      })
                    }
                    _hover={{ bg: "#FFF5EE" }}
                    textAlign="center"
                  >
                    <Image src={`/cards/${"Red 2 cards.svg"}`} />
                    <Td color={"#668CFF"}>1.98</Td>
                  </Td>
                  <Td
                    onClick={() =>
                      handleBait({
                        baitType: "dragon",
                        baitOn: "color",
                        color: "black",
                      })
                    }
                    _hover={{ bg: "#FFF5EE" }}
                    textAlign="center"
                  >
                    <Image src={`/cards/${"black 2 cards.svg"}`} />
                    <Td color={"#668CFF"}>1.98</Td>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
                  </Box> */}

          <Box
            p="1"
            width={["100%", "80%"]}
            // // maxW={["50vw" , "50vw"]}
          >
            <Table
              style={{
                borderCollapse: "separate",
                borderSpacing: "1px",
                borderRadius: "3px",
                height: "50px",
              }}
            >
              <Thead>
                <Tr>
                  {/* <Th bg={"#F09403"}>Place The Bet</Th>
                    <Th bg={"#F09403"}>Heart</Th>
                    <Th bg={"#F09403"}>Club</Th>
                    <Th bg={"#F09403"}>Diamond</Th>
                  <Th bg={"#F09403"}>Spade</Th> */}
                </Tr>
              </Thead>

              {/*    <Tbody bg={"#780200"}>
                <Tr>
                  <Td
                    padding={["1.7rem"]}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    // width={["30rem", "7.8rem"]}
                    bg={"#F09403"}
                  >
                    Dragon
                  </Td>
                  <Td
                    onClick={() =>
                      handleBait({
                        baitType: "dragon",
                        baitOn: "suit",
                        suit: "heart",
                      })
                    }
                    _hover={{ bg: "#FFF5EE" }}
                    textAlign="center"
                  >
                    <Image src={`/cards/${"heart (1) 1.svg"}`} />
                  </Td>
                  <Td
                    onClick={() =>
                      handleBait({
                        baitType: "dragon",
                        baitOn: "suit",
                        suit: "club",
                      })
                    }
                    _hover={{ bg: "#FFF5EE" }}
                    textAlign="center"
                  >
                    <Image src={`/cards/${"club 1.svg"}`} />
                  </Td>
                  <Td
                    onClick={() =>
                      handleBait({
                        baitType: "dragon",
                        baitOn: "suit",
                        suit: "diamond",
                      })
                    }
                    _hover={{ bg: "#FFF5EE" }}
                    textAlign="center"
                  >
                    <Image src={`/cards/${"Clip path group.svg"}`} />
                  </Td>
                  <Td
                    onClick={() =>
                      handleBait({
                        baitType: "dragon",
                        baitOn: "suit",
                        suit: "spade",
                      })
                    }
                    _hover={{ bg: "#FFF5EE" }}
                    textAlign="center"
                  >
                    <Image src={`/cards/${"Group 1000004933.svg"}`} />
                  </Td>
                </Tr>

                <Tr>
                  <Td
                    padding={["1.7rem"]}
                    bg={"#F09403"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    // width={["em", "7.8rem"]}
                  >
                    Tiger
                  </Td>
                  <Td
                    onClick={() =>
                      handleBait({
                        baitType: "tiger",
                        baitOn: "suit",
                        suit: "heart",
                      })
                    }
                    _hover={{ bg: "#FFF5EE" }}
                    textAlign="center"
                  >
                    <Image src={`/cards/${"heart (1) 1.svg"}`} />
                  </Td>
                  <Td
                    onClick={() =>
                      handleBait({
                        baitType: "tiger",
                        baitOn: "suit",
                        suit: "club",
                      })
                    }
                    _hover={{ bg: "#FFF5EE" }}
                    textAlign="center"
                  >
                    <Image src={`/cards/${"club 1.svg"}`} />
                  </Td>
                  <Td
                    onClick={() =>
                      handleBait({
                        baitType: "tiger",
                        baitOn: "suit",
                        suit: "diamond",
                      })
                    }
                    _hover={{ bg: "#FFF5EE" }}
                    textAlign="center"
                  >
                    <Image src={`/cards/${"Clip path group.svg"}`} />
                  </Td>
                  <Td
                    onClick={() =>
                      handleBait({
                        baitType: "tiger",
                        baitOn: "suit",
                        suit: "spade",
                      })
                    }
                    _hover={{ bg: "#FFF5EE" }}
                    textAlign="center"
                  >
                    <Image src={`/cards/${"Group 1000004933.svg"}`} />
                  </Td>
                </Tr>
                  </Tbody>*/}

              <div style={{ display: "flex" }} className="boxes">
                <div className="container">
                  <h6>DRAGON COLOUR</h6>
                  <div className="box1">
                    <div className="white-box">
                      <div className="image">
                        <img src={pann} alt="" />
                        <img src={flower} alt="" />
                      </div>
                      <span>1.98</span>
                    </div>
                    <div className="white-box">
                      <div className="image">
                        <img src={heart1} alt="" />
                        <img src={flower} alt="" />
                      </div>
                      <span>1.98</span>
                    </div>
                  </div>
                </div>

                <div className="container">
                  <h6>TIGER COLOUR</h6>
                  <div className="box1">
                    <div className="white-box">
                      <div className="image">
                        <img src={pann} alt="" />
                        <img src={flower} alt="" />
                      </div>
                      <span>1.98</span>
                    </div>
                    <div className="white-box">
                      <div className="image">
                        <img src={heart1} alt="" />
                        <img src={flower} alt="" />
                      </div>
                      <span>1.98</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cards">
                <h6>
                  DRAGON <br />
                  SUIT 3.75
                </h6>
                <div className="image-1">
                  <img src={pann} alt="" />
                </div>
                <div className="image-1">
                  <img src={flower} alt="" />
                </div>
                <div className="image-1">
                  <img src={heart1} alt="" />
                </div>
                <div className="image-1">
                  <img src={pann} alt="" />
                </div>
              </div>

              <div className="cards">
                <h6>
                  TIGER <br /> SUIT 3.75
                </h6>
                <div className="image-2">
                  <img src={pann} alt="" />
                </div>
                <div className="image-2">
                  <img src={flower} alt="" />
                </div>
                <div className="image-2">
                  <img src={heart1} alt="" />
                </div>
                <div className="image-2">
                  <img src={pann} alt="" />
                </div>
              </div>
            </Table>
          </Box>
        </Box>
      </ChakraProvider>
    </>
  );
}
