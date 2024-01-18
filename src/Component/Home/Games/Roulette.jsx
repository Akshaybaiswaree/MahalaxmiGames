import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Grid,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";

import img from "../Games/Images/odds-bg-dark.svg";
// import Card from "./Card";
// import { Icon } from "@iconify/react";
// import { AspectRatio } from "@chakra-ui/react";
import video from "../Games/GameVideo/Roullete.mp4";

// import img1 from "../Games/Images/odds-bg-dark.svg";
// import ToggleOffIcon from "@mui/icons-material/ToggleOff";

const Roulette = () => {
  const boxData = [19, 23, 30, 34, 35, 26, 17, 28, 39, 10];
  const roundId = 1703071884.5322905;
  const numbers = [
    0,
    undefined,
    3,
    6,
    9,
    12,
    15,
    18,
    21,
    24,
    27,
    30,
    33,
    36,
    "2:1",
    undefined,
    undefined,
    2,
    5,
    8,
    11,
    14,
    17,
    20,
    23,
    26,
    29,
    32,
    35,
    "2:1",
    undefined,
    undefined,
    1,
    4,
    7,
    10,
    13,
    16,
    19,
    22,
    25,
    28,
    31,
    34,
    "2:1",
  ];

  return (
    <ChakraProvider>
      <Box>
        <Flex>
          <Box
            bg="#FFFFFF"
            pt={0}
            boxSize={640}
            ml={100}
            mt={35}
            width={640}
            height={450}
          >
            <Text fontWeight="bolder" bg="#FFFFFF" pb={3} pl={2}>
              AUTO ROULETTE
            </Text>
            <video src={video} alt="video" controls />
          </Box>

          <Box>
            <Box
              bg="white"
              p={2}
              position="relative"
              left={35}
              b={43}
              width={40}
              height={5}
            >
              <Box d="flex" gap={3} p={2} w={330} background="whitesmoke">
                <Text fontSize={8} position="relative" top={0} color="black">
                  demo123_4316
                </Text>
                <Text position="relative" left="34em" fontSize={8} bottom="1em">
                  Theme
                </Text>
              </Box>

              <Box
                bg={`url(${img})`}
                backgroundColor="#222222"
                p={3}
                borderRadius="md"
                width={"230%"}
                fontWeight="0"
                fontSize={10}
                height={200}
                border="5px solid black"
              >
                <Box d="flex" justifyContent="space-between">
                  <Text color="black" p="relative" bg="#FFFFFF" width="15em">
                    AVAILABLE <br />
                    CREDIT EXPOSUR{" "}
                  </Text>
                  <Text
                    color="orange.300"
                    ml={90}
                    fontSize="13px"
                    marginTop={3}
                    fontWeight="bolder"
                  >
                    OPEN BETS{" "}
                  </Text>
                </Box>

                <Box
                  d="flex"
                  position="relative"
                  left={151}
                  bottom="6.2em"
                  background="orange.300"
                  justifyContent="space-between"
                  width="15em"
                >
                  <Text marginLeft={20} fontSize="1.1em" color="White">
                    0
                  </Text>
                  <Text color="White" marginLeft={20} fontSize="bolder">
                    0
                  </Text>
                </Box>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={15}
                  color="white"
                  position="relative"
                  bottom="1.5em"
                  left="0em"
                  fontFamily="bold"
                  fontSize={13}
                  bg="black"
                  p={3}
                  w={300}
                  height={45}
                >
                  <Text>MARKETS</Text>
                  <Text>ODDS</Text>
                  <Text>STAKE</Text>
                </Box>
                <Box>
                  <Text
                    bg="grey"
                    fontFamily="bold"
                    fontSize={13}
                    textAlign="center"
                    p={3}
                    w={300}
                    height={35}
                  >
                    You have no bets
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Flex>

        <Table
          variant="simple"
          bg={`url(${img}) white`}
          color="black"
          fontSize={10}
          fontWeight="bold"
          position="relative"
          marginRight="20px"
          left="49rem"
          bottom="14rem"
          width={330}
          boxShadow="0px 0px 20px 30px rgba(0, 0, 0, 0.1)"
        >
          <Tbody p="">
            <Tr
              bg={"whitesmoke"}
              m={2}
              style={{
                fontSize: "10px",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Td style={{ fontWeight: "bold" }}>Straight up</Td>
              <Td>1 to 35</Td>
            </Tr>

            <Tr
              style={{
                fontSize: "10px",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Td style={{ fontWeight: "bold" }}>Split Bet</Td>
              <Td>1 to 17</Td>
            </Tr>

            <Tr
              style={{
                fontSize: "10px",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Td style={{ fontWeight: "bold" }}>Street Bet</Td>
              <Td>1 to 11</Td>
            </Tr>

            <Tr
              style={{
                fontSize: "10px",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Td style={{ fontWeight: "bold" }}>Corner Bet</Td>
              <Td>1 to 8</Td>
            </Tr>

            <Tr
              style={{
                fontSize: "10px",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Td style={{ fontWeight: "bold" }}>Line Bet</Td>
              <Td>1 to 5</Td>
            </Tr>

            <Tr
              style={{
                fontSize: "10px",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Td style={{ fontWeight: "bold" }}>Column Bet</Td>
              <Td>1 to 2</Td>
            </Tr>

            <Tr
              style={{
                fontSize: "10px",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Td style={{ fontWeight: "bold" }}>Dozen Bet</Td>
              <Td>1 to 2</Td>
            </Tr>

            <Tr
              style={{
                fontSize: "10px",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Td style={{ fontWeight: "bold" }}>Red/Black</Td>
              <Td>1 to 1</Td>
            </Tr>

            <Tr
              style={{
                fontSize: "10px",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Td style={{ fontWeight: "bold" }}>Even/Odd</Td>
              <Td>1 to 1</Td>
            </Tr>

            <Tr
              style={{
                fontSize: "10px",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Td style={{ fontWeight: "bold" }}>1-18/19-36</Td>
              <Td>1 to 1</Td>
            </Tr>
          </Tbody>
        </Table>

        <Flex>
          {boxData.map((item, index) => (
            <Box
              key={item}
              bg={index % 2 === 0 ? "red" : "black"}
              position="relative"
              bottom="47em"
              left="8em"
              color="white"
              pl={3}
              pt={3}
              pb={4}
              pr={3}
              fontWeight="bold"
              fontSize="12"
            >
              {item}
            </Box>
          ))}
          <Box
            bg="#FFFFFF"
            display="flex"
            alignItems="center"
            position="relative"
            bottom="35.2em"
            ml="6.5em"
          >
            <Text ml={7} fontSize="12px" color="black" whiteSpace="nowrap">
              Round ID: <br /> <span>{roundId}</span>
            </Text>
            <Button
              ml={10}
              bg="#CF8D2E"
              p={1}
              fontSize="12px"
              color="white"
              fontWeight="normal"
            >
              Player History
            </Button>
          </Box>
        </Flex>

        <Box boxSize={590}>
          <Grid
            templateColumns="repeat(15, 0fr)"
            width="105%"
            minHeight="20vh"
            mt={1}
            borderRadius="50px"
            position="relative"
            left="7em"
            bottom="32em"
            overflow="hidden"
            cursor="pointer"
            height="9em"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${img})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            {numbers.map((number, index) => (
              <Box
                key={number}
                bg={
                  index === 0
                    ? "green"
                    : index % 2 === 0
                    ? "black"
                    : index === "2:1"
                    ? "black"
                    : "red"
                }
                color="white"
                p={3}
                width="7vh"
                m={0}
                fontWeight="bold"
                fontSize={12}
                textAlign="center"
                height={index === 0 ? "200px" : "50px"}
                bottom={index > 0 ? "22em" : undefined}
                position={index > 0 ? "relaive" : "absolute"}
              >
                {number}
              </Box>
            ))}
          </Grid>

          <Box mt={8} mb={5} textAlign="center" cursor="pointer">
            <Flex
              justifyContent="center"
              mb={2}
              position="relative"
              bottom="34rem"
              left="8rem"
              style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${img})`,
                backgroundSize: "cover",
              }}
            >
              <Box
                bg="grey"
                color="white"
                width="190px"
                height="30px"
                borderRadius="5px"
                fontWeight="bold"
                fontSize="14px"
                p={5}
                border="1px solid white" // Add this line
              >
                1-12
              </Box>
              <Box
                color="white"
                bg="grey"
                width="190px"
                height="30px"
                borderRadius="5px"
                fontWeight="bold"
                fontSize="14px"
                p={5}
                ml={0}
                border="1px solid white" // Add this line
              >
                13-24
              </Box>
              <Box
                bg="grey"
                color="white"
                width="190px"
                height="30px"
                borderRadius="5px"
                fontWeight="bold"
                fontSize="14px"
                p={5}
                ml={0}
                border="1px solid white" // Add this line
              >
                25-36
              </Box>
            </Flex>
          </Box>

          <Box mt={8} mb={5} textAlign="center" cursor="pointer">
            <Flex
              cursor="pointer"
              justifyContent="center"
              mb={2}
              position="relative"
              bottom="36rem"
              left="8rem"
              style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${img})`,
                backgroundSize: "cover",
              }}
            >
              <Box
                bg="grey"
                color="white"
                width="95px"
                height="30px"
                borderRadius="5px"
                fontWeight="bold"
                fontSize="14px"
                p={5}
                border="1px solid white" // Add this line
              >
                1-18
              </Box>
              <Box
                color="white"
                bg="grey"
                width="95px"
                height="30px"
                borderRadius="5px"
                fontWeight="bold"
                fontSize="14px"
                p={5}
                ml={0}
                border="1px solid white" // Add this line
              >
                EVEN
              </Box>
              <Box
                bg=" Red"
                color="white"
                width="95px"
                height="30px"
                borderRadius="5px"
                fontWeight="bold"
                fontSize="14px"
                p={5}
                ml={0}
                border="1px solid white" // Add this line
              >
                RED
              </Box>
              <Box
                bg="Black"
                color="white"
                width="95px"
                height="30px"
                borderRadius="5px"
                fontWeight="bold"
                fontSize="14px"
                p={5}
                border="1px solid white" // Add this line
              >
                BLACK
              </Box>
              <Box
                bg="grey"
                color="white"
                width="95px"
                height="30px"
                borderRadius="5px"
                fontWeight="bold"
                fontSize="14px"
                p={5}
                ml={0}
                border="1px solid white" // Add this line
              >
                ODD
              </Box>
              <Box
                bg="grey"
                width="95px"
                color="white"
                height="30px"
                borderRadius="5px"
                fontWeight="bold"
                fontSize="14px"
                p={5}
                ml={0}
                border="1px solid white" // Add this line
              >
                19-36
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Roulette;
