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
import Gamingimage from "../../Games/Images/GAMING GIRL 1.webp";
import "./DragonTiger.css";
import { FaLock } from "react-icons/fa";
import { io } from "socket.io-client";
import pann from "../../Games/Images/Pann.svg";
import flower from "../../Games/Images/Flower.svg";
import heart from "../../Games/Images/Heart.svg";
import heart1 from "../../Games/Images/Heart1.svg";
import vector from "../../Games/Images/Vector-1.svg";
import NoteIcon from "@mui/icons-material/Note";
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
  const [user, setUse] = useState(null);
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
      <Box
        bg="gray.700"
        w="100%"
        // h="50%"
        m="0"
        p="0"
        mt={{ base: "0", md: "0" }}
      >
        <Flex direction="column">
          <Flex
            w="100%"
            h={{ base: "820px", md: "500px" }}
            display="flex"
            justifyContent="flex-start"
            direction={{ base: "column", md: "row" }}
          >
            <Flex
              w={{ base: "100%", md: "50%" }}
              h={{ base: "25rem", md: "100%" }}
              display="flex"
              justifyContent="space-between"
              direction="column"
            >
              <Box
                w="100%"
                h="15%"
                display="flex"
                direction="row"
                justifyContent="space-between"
                px="2"
                alignItems="center"
                py="2"
              >
                <Text as="h1" fontSize="20" fontWeight="bold" color="white">
                  pink Dragon Tiger
                </Text>
                <Button onClick={onOpen}>Rules</Button>
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
                      <TableContainer>
                        <Table size="sm">
                          <Thead></Thead>
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
                        </Table>
                      </TableContainer>
                    </ModalBody>

                    <ModalFooter></ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
              <Box
                w="100%"
                h="100%"
                // background={Gamingimage}
                // backgroundSize=" 100%"
                // backgroundRepeat="no-repeat"
                mb=""
              >
                <Image
                  src="./dragon-tiger.webp"
                  w="100%"
                  h={{ base: "90%", md: "86%" }}
                  mt={{ base: "0px", md: "0" }}
                  pb={{ base: "3", md: "-0" }}
                  style={{ borderRadius: "10px" }}
                />
                <Flex
                  justifyContent="flex-start"
                  alignItems="center"
                  px="4"
                  w="100%"
                  h="100px"
                  position={"relative"}
                  top={{ base: "-80%", md: "-350px" }}
                  left={{ base: "0", md: "0%" }}
                  // bg="red"
                >
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    direction={"row"}
                    w="100%"
                    h="4rem"
                  >
                    <Box
                      fontWeight={"900"}
                      border={"1px solid white"}
                      borderRadius={"50%"}
                      // padding={"2px"}
                      // mt={{ base: "2rem", md: "0" }}
                      // ml={"1rem"}
                      // position={"relative"}
                      // top={{ base: "-106%", md: "-370px" }}
                      // left={{ base: "0", md: "-10%" }}
                      width={["25%", "18%"]}
                      height={["100%", "100%"]}
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
                    <Box
                      fontWeight={"900"}
                      border={"1px solid white"}
                      borderRadius={"50%"}
                      // padding={"2px"}
                      // mt={"2rem"}
                      // ml={"1rem"}
                      // position={"relative"}
                      // top={{ base: "-106%", md: "-370px" }}
                      // left={{ base: "0", md: "8%" }}
                      width={["25%", "18%"]}
                      height={["100%", "100%"]}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      fontSize={["sm", "lg"]}
                      color="white"
                      background="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                    >
                      {gameState?.value && Math.max(0, gameState.value - 20)}
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            </Flex>

            <Flex
              w={{ base: "100%", md: "50%" }}
              h={{ base: "20rem", md: "100%" }}
              position="relative"
              direction="column"
            >
              <Flex
                justify="space-around"
                alignContent="center"
                w="100%"
                direction="row"
                // p="1"
                // gap="2"
              >
                {/* <Box  border="1px solid red"   m="2" borderRadius="15px"> */}
                <Flex
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  bg="gray.300"
                  borderRadius="15px"
                  w="35%"
                  h="5rem"
                  mt="2"
                  py="2"
                  border="3px solid black"
                >
                  <Text fontWeight={"500"} fontSize={["20px", "24px"]}>
                    Available Credit
                  </Text>
                  <Text fontWeight={"500"} fontSize={["20px", "24px"]}>
                    {user?.coins && Math.max(0, user?.coins)}
                  </Text>
                </Flex>

                <Flex
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  bg="gray.300"
                  borderRadius="15px"
                  w="35%"
                  h="5rem"
                  mt="2"
                  py="2"
                  border="3px solid black"
                >
                  <Text fontWeight={"500"} fontSize={["20px", "24px"]}>
                    Match Id
                  </Text>
                  <Text fontWeight={"500"} fontSize={["19px", "24px"]}>
                    {user?.userId}
                  </Text>
                </Flex>
                {/* </Box> */}
              </Flex>

              <Flex
                justify="space-around"
                alignContent="center"
                w="100%"
                direction="row"
                p="1"
                gap="2"
              >
                <Box width="100%">
                  <Flex flexDirection="column" alignItems="center">
                    <Text
                      fontSize="20px"
                      fontWeight="bold"
                      // marginLeft={["0.5rem"]}
                      mt={"1rem"}
                      color={"white"}
                    >
                      Place Your Bet
                    </Text>

                    <Flex
                      width={["94%", "70%"]}
                      flexWrap={["nowrap", "nowrap"]}
                      justifyContent={["center", "center"]}
                      marginTop={["1rem", "0"]}
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
                          margin={["rem", "0.9rem"]}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontWeight="bold"
                          borderRadius={"50%"}
                          // borderColor={'red'}
                          variant="unstyled"
                          _hover={{
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
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    padding="0rem"
                    width="100%"
                  >
                    <Box
                      width="100%"
                      position="relative"
                      height="8rem"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Flex
                        width="80%"
                        height="100%"
                        position="relative"
                        display="flex"
                        justifyContent="space-around"
                        alignItems="center"
                        px="2"
                        gap="3"
                      >
                        <Button
                          isDisabled={isButtonDisabled}
                          width="50%"
                          height={["50%", "80%"]}
                          // marginLeft="1rem"
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
                          onClick={() => handleBetting(0)}
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
                            <span>Dragon</span>
                            <span> 1.98 </span>
                          </Text>
                        </Button>

                        <Button
                          isDisabled={isButtonDisabled}
                          width="50%"
                          height={["50%", "80%"]}
                          // marginLeft="1rem"
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
                          onClick={() => handleBetting(1)}
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
                          <Text style={{ position: "absolute" }}>
                            <span>Tie</span> <span>1.98</span>
                          </Text>
                        </Button>
                        <Button
                          isDisabled={isButtonDisabled}
                          width="50%"
                          height={["50%", "80%"]}
                          // marginLeft="1rem"
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
                          onClick={() => handleBetting(1)}
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
                          <Text style={{ position: "absolute" }}>
                            <span>Tiger</span> <span>1.98</span>
                          </Text>
                        </Button>
                      </Flex>
                    </Box>
                    <Flex
                      justifyContent={{ base: "space-around", md: "center" }}
                      direction="row"
                      w="100%"
                      h={{ base: "100px", md: "150px" }}
                      gap="2"
                    >
                      <Flex
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        w="150px"
                        h="100%"
                        borderRadius="15px"
                        bg="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                      >
                        <Text color="white" fontWeight="bold">
                          TIGER COLOUR
                        </Text>
                        <Flex justifyContent="space-around" w="100%">
                          <img src={pann} alt="" />
                          <img src={flower} alt="" />
                        </Flex>
                      </Flex>
                      <Flex
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        w="150px"
                        h="100%"
                        borderRadius="15px"
                        bg="linear-gradient(to bottom right, #323349, #880000, #ED9203)"
                      >
                        <Text color="white" fontWeight="bold">
                          {" "}
                          DRAGON COLOUR
                        </Text>
                        <Flex justifyContent="space-around" w="100%">
                          <img src={pann} alt="" />
                          <img src={flower} alt="" />
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex w="100%" justify="center" direction="column">
                      <Flex
                        justifyContent="space-around"
                        w="100%"
                        py="1"
                        alignItems="center"
                        fontSize="20"
                      >
                        <h6 style={{ fontWeight: "bold", color: "white" }}>
                          DRAGON <br />
                          SUIT 3.75
                        </h6>
                        <Box p="10px">
                          <img
                            src={pann}
                            alt=""
                            style={{
                              borderRadius: "1px",
                              border: "4px solid #880000",
                            }}
                          />
                        </Box>
                        <Box p="10px">
                          <img
                            src={flower}
                            alt=""
                            style={{
                              borderRadius: "1px",
                              border: "4px solid #880000",
                            }}
                          />
                        </Box>
                        <Box p="10px">
                          {" "}
                          <img
                            src={heart1}
                            alt=""
                            style={{
                              borderRadius: "1px",
                              border: "4px solid #880000",
                            }}
                          />
                        </Box>
                        <Box p="10px">
                          <img
                            src={pann}
                            alt=""
                            style={{
                              borderRadius: "1px",
                              border: "4px solid #880000",
                            }}
                          />
                        </Box>
                      </Flex>
                      <Flex
                        justifyContent="space-around"
                        w="100%"
                        py="1"
                        alignItems="center"
                        fontSize="20"
                      >
                        <h6 style={{ fontWeight: "bold", color: "white" }}>
                          TIGER <br />
                          SUIT 3.75
                        </h6>
                        <Box p="10px">
                          <img
                            src={pann}
                            alt=""
                            style={{
                              borderRadius: "1px",
                              border: "4px solid #880000",
                            }}
                          />
                        </Box>
                        <Box p="10px">
                          <img
                            src={flower}
                            alt=""
                            style={{
                              borderRadius: "1px",
                              border: "4px solid #880000",
                            }}
                          />
                        </Box>
                        <Box p="10px">
                          {" "}
                          <img
                            src={heart1}
                            alt=""
                            style={{
                              borderRadius: "1px",
                              border: "4px solid #880000",
                            }}
                          />
                        </Box>
                        <Box p="10px">
                          <img
                            src={pann}
                            alt=""
                            style={{
                              borderRadius: "1px",
                              border: "4px solid #880000",
                            }}
                          />
                        </Box>
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </Flex>
          <Flex w="100%" h="250px" py="4">
            <Flex
              justifyContent="center"
              alignItems={{ base: "flex-end", md: "center" }}
              // direction={{base:"column", md:"row"}}
            >
              <Button
                _hover={{ backgroundColor: "blue.500", color: "white" }}
                transition="background-color 0.3s, color 0.3s"
                p={4}
                borderRadius="md"
                bg={"orange"}
                width={["10rem"]}
              >
                Bet History
              </Button>
              {gamehistory.map((item, index) => (
                <Box
                  color={"blue"}
                  p={"3px"}
                  key={index}
                  marginRight={["10px"]}
                  width={["25px", "30px"]}
                  height="39px"
                  border="2px solid black"
                  borderRadius="5px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  w="100%"
                  m="1"
                >
                  {item}
                </Box>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
