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
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import Gamingimage from "../Games/images/GAMING GIRL.svg";
import { io } from "socket.io-client";

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

  useEffect(() => {
    // Listen for game state updates from the server
    socket.on(
      "gameUpdate",
      (updatedGameState) => {
        setGameState(updatedGameState?.gamestate);
        //  console.log(mainCard , "maincard")
        console.log(updatedGameState, "updatedGameState");
        setMainCard(updatedGameState.gameCard);
      },
      [gameState?.value]
    );

    socket.on("userDetails", (data) => {
      // console.log(data.user.coins , "data");
      setUser(data.user);
    });

    socket.on("bait", (data) => {
      setUser(data);
      console.log(data);
      // setUser(data.user);
    });

    // console.log(mainCard , "maincard");

    return () => {
      // Clean up socket connection on component unmount

      socket.disconnect();
    };
  }, []);

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
        <Flex direction={["column", "row "]}>
          <Box>
            <Box
              width={["32%", "65%"]}
              marginTop="0px"
              marginLeft="0px"
              marginBottom="1rem"
            >
              {/* Rules and Regulation */}
              <Flex>
                <Box
                  textAlign={"center"}
                  fontSize={["24px", "28px"]}
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
                <Box>
                  <Button
                    mb={"1rem"}
                    mt={"1rem"}
                    ml={["2rem", "5rem"]}
                    fontWeight={"600"}
                    width={["13rem", "14rem"]}
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
                      To guess whether Dragon or Tiger wins. Player can also bet
                      whether the Dragon and Tiger cards will be of same value,
                      therefore a Tie.
                      <br /> <br />
                      <Button bg={"#CF8D2E"} width={"7rem"}>
                        GAME RULES:
                      </Button>
                      <br />
                      Hands dealt: 2 (Dragon, Tiger)
                      <br /> <br />
                      Bets: Higher card between hands win.
                      <br /> <br /> Tie (Rank only): If the Numbers are same on
                      both Hands.
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
                    width="18%"
                    height="18%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    fontSize="lg"
                    color="white"
                    // background="linear-gradient(to bottom right, violet, blue)"
                    background="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                  >
                    {gameState?.value <= 10 ? "Freeze" : "Place  Bet"}
                  </Box>

                  <Box>
                    {gameState.value < 5 && (
                      <Button
                        // background="linear-gradient(to bottom right,#ED9203, #323349, #880000)"
                        background="linear-gradient(to bottom right, #ED9203, #C7E600)"
                        height={"4rem"}
                        width={"9rem"}
                      >
                        Winner: {mainCard?.winstatus}
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
                    fontSize="lg"
                    background="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                    marginRight={"1rem"}
                    color="white"
                  >
                    {gameState?.value && Math.max(0, gameState.value - 15)}
                  </Box>
                  {gameState.value >= 1 && (
                    <React.Fragment>
                      <Flex marginTop={"15rem"} ml={"2rem"} width={"20rem"}>
                        <Stack direction="column" width={"10rem"}>
                          <Box color={"Yellow"} fontSize="2rem">
                            Dragon
                          </Box>
                          {gameState.value < 11 && (
                            <Box fontStyle={"yellow"} width={"3rem"}>
                              <Image src={`/cards/${mainCard?.dragoncard}`} />
                            </Box>
                          )}
                        </Stack>

                        <Stack ml={"3rem"} width={"10rem"} direction="column">
                          <Box color={"Yellow"} fontSize="2rem">
                            Tiger
                          </Box>
                          {gameState.value < 9 && (
                            <Box width={"3rem"}>
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
          <Box marginLeft={["" , "1rem"]}>
            {/* First Flex - Horizontal View */}
            <Stack
              mt={"1.5rem"}
              display="flex"
              flexDirection={["column", "row"]}
            >
              <Box
                marginLeft={["", "12rem"]}
                marginTop={["1rem", "4rem"]}
                width={["65%", "80%"]}
              >
                <Flex
                  width="87%"
                  flexDirection="row"
                  border="5px solid #668cff"
                  boxShadow="4px 4px 10px rgba(3, 0, 2, 0.6)"
                  display="flex"
                  borderRadius="1rem"
                   ml={"3rem"}
                >
                  <Box
                    flex="1"
                    width={["10%", "44%"]}
                    backgroundColor="white"
                    textAlign="center"
                    borderRight="4px solid #668cff"
                  >
                    <Text color={"#668cff"} fontSize="18px" fontWeight="bold">
                      Available Credit :
                    </Text>
                    <Text fontWeight={"500"} fontSize="24px">
                      {/* {gameState?.value && Math.max(0, gameState.value - 15)} */}
                      {user?.coins && Math.max(0, user?.coins)}
                    </Text>
                  </Box>

                  <Box flex="1" width="46%" textAlign="center">
                    <Text color={"#668cff"} fontSize="18px" fontWeight="bold">
                      Match Id :
                    </Text>
                    <Text fontWeight={"500"} fontSize="24px">
                      {user?.userId}
                    </Text>
                  </Box>
                </Flex>
                <Stack
                  ml={"3rem"}
                  mt={"1rem"}
                  flexDirection="row"
                  alignItems="center"
                >
                  {[...Array(8)].map((_, index) => (
                    <Box
                      key={index}
                      width="35px"
                      height="35px"
                      marginRight="10px"
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
                      </Text>
                    </Box>
                  ))}
                </Stack>
                <Box 
                justifyContent={'center'}
                alignItems={'center'}
                mb={"1rem"} mt={"1rem"} ml={"7rem"}>
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
                <Box width={["30%", "100%"]}>
                  {/* <Flex flexDirection="row" alignItems="center">
                    <Text fontSize="15px" fontWeight="bold" marginLeft="3.5rem">
                      Choose
                    </Text>
                   
                    <Text fontSize="15px" fontWeight="bold" marginLeft="0.5rem">
                      Amount
                    </Text>

                    <Flex
                   
                    // width={["200%", "100%"]}
                    width={'5rem'}
                    >
                      {["10", "50", "100", "200", "500", "1000"].map(
                        (value, index) => (
                          <Button
                          
                         
                            key={index}
                            // width={["15px" , "35px"]}
                            height="35px"
                            marginLeft={["2rem","1rem"]}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            fontWeight="bold"
                            variant="unstyled" // Use "unstyled" instead of "unstyles"
                            border="5px solid #333"
                            onClick={() => {
                              setCoins(value);
                              console.log(value);
                            }}
                          >
                            <Text
                           
                              fontSize="14px"
                              color={index % 2 === 0 ? "#333" : "#2b329b"}
                            >
                              {typeof value === "number"
                                ? value.toLocaleString()
                                : value}
                            </Text>
                          </Button>
                        )
                      )}
                    </Flex>
                  
                  </Flex> */}
                  <Box marginLeft={["10rem", "12rem"]}>
                    <Text mt={"1rem"} mb={'0.6rem'} fontSize="15px" fontWeight="bold">
                      Choose Your Amount
                    </Text>
                    {/* <Text fontSize="15px" fontWeight="bold">
                        Amount
                      </Text> */}
                  </Box>
                  <Flex
                
                  ml={'2rem'}
                    border={"6px solid lightgreen"}
                    borderRadius={"20px"}
                    width={"95%"}
                    flexDirection={["", "row"]}
                  >
                    <Flex
                      width={["0%", "60%"]}
                      flexWrap={["nowrap", "nowrap"]}
                      justifyContent={["center", "flex-start"]}
                      marginTop={["4rem", "0"]}
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
                          margin={["rem", "1rem"]}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontWeight="bold"
                          variant="unstyled"
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
                    ml={["0.6rem", "3.6rem"]}
                    // padding="1rem"
                    // border="2px solid #333"
                    marginTop="1.5rem"
                    width={["400%", "100%"]}
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
                        onClick={() => handleBait("dragon")}
                        disabled={gameState?.value <= 10}
                        width={["60%", "40%"]}
                        height="5rem"
                        borderRadius="10px"
                        variant="unstyled"
                        background="linear-gradient(to bottom right , #668cff , #a64dff)"
                        _hover={{ bg6: "#668cff" }}
                        color={"white"}
                        zIndex="1" // Ensure it's above the middle button
                      >
                        <Text textAlign="center">Dragon</Text>
                        <Text textAlign="center">2.94</Text>
                      </Button>

                      {/* Middle Overlapping Button */}
                      <Button
                        onClick={() => handleBait("tie")}
                        disabled={gameState?.value <= 10}
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
                        onClick={() => handleBait("tiger")}
                        disabled={gameState?.value <= 10}
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
        <Box p="1" display="flex" width="101%">
<Table width="15px" style={{ borderCollapse: 'separate', borderSpacing: '1px', borderRadius: '3px', marginRight: '10px', width:'45%' }}>
<Thead>
  <Tr>
    <Th bg="#edf2f7"></Th>
    <Th  textAlign="center">Red</Th>
    <Th  textAlign='center'>Black</Th>
  </Tr>
</Thead>
<Tbody>
  <Tr>
    <Td bg="#edf2f7">Dragon</Td>
    <Td  textAlign="center">2.1<br />0</Td>
    <Td  textAlign="center">1.8<br />0</Td>
  </Tr>
  <Tr>
    <Td bg="#edf2f7">Triger</Td>
    <Td  textAlign="center">2.1<br />0</Td>
    <Td  textAlign="center">1.8<br />0</Td>
  </Tr>
</Tbody>
</Table>


</Box>  

<Box p="1">
<Table style={{ borderCollapse: 'separate', borderSpacing: '1px', borderRadius: '3px', height:'10px', width:'101%',}}>
  <Thead>
    <Tr>
      <Th bg="#edf2f7"></Th> 
      <Th  textAlign="center"> {'}'} </Th>
      <Th  textAlign="center"> {'{'} </Th>
      <Th  textAlign='center'> ] </Th>
      <Th  textAlign='center'> [ </Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td bg="#edf2f7">Dragon</Td>
      <Td  textAlign="center">3.75<br/>0</Td>
      <Td  textAlign="center">3.75<br/>0</Td>
      <Td textAlign="center">3.75<br/>0</Td>
      <Td textAlign="center">3.75<br/>0</Td>
    </Tr>
    <Tr>
      <Td bg="#edf2f7">Triger</Td>
      <Td textAlign="center">3.75<br/>0</Td>
      <Td textAlign="center">3.75<br/>0</Td>
      <Td textAlign="center">3.75<br/>0</Td>
      <Td textAlign="center">3.75<br/>0</Td>
    </Tr>
  </Tbody>
</Table>
</Box>
      </ChakraProvider>
    </>
  );
}
