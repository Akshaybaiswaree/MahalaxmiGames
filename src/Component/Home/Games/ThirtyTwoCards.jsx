import {
  AspectRatio,
  Box,
  Button,
  ChakraProvider,
  Flex,
  Text,
} from "@chakra-ui/react";

export default function ThirtyTwoCards() {
  return (
    <>
      <ChakraProvider>
        <Flex
          align="left-top"
          justify="left-top"
          minH="50%" // Set the minimum height to 100% of the viewport height
        >
          <Box width="65%" marginTop="0px" marginLeft="0px" marginBottom="1rem">
            <Flex justify="space-between" align="center" mb="2">
              <Text
                fontSize="24px"
                fontWeight="bold"
                borderRadius="10px"
                position="relative"
              >
                32 Cards
              </Text>
              <Button variant="outline" colorScheme="blue" ml="2">
                Rules
              </Button>
            </Flex>
            <AspectRatio minHeight="50%" borderRadius="10px" controls>
              <Box
                border="4px solid #333"
                height="100%" // Adjust the height as needed
                background="linear-gradient(#1c3e6b, #640e18)"
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="top"
              >
                {/* <Image
                      src=""
                      alt="Main card image"
                      maxW="200px"
                      p="4"
                      boxShadow="lg"
                      rounded="md"
                      height="8rem"
                    />
    
                    <Flex direction="column" align="start" marginRight="25rem">
                      <Text color="white">Andar</Text>
    
                      <Box
                        height="100%" // Adjust the height as needed
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Image
                          src=""
                          alt=""
                          maxW="200px"
                          p="4"
                          boxShadow="lg"
                          rounded="md"
                          height="8rem"
                        />
                      </Box>
                      <Text color="white">Bahar</Text>
    
                      <Box
                        height="100%" // Adjust the height as needed
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <Image
                          src=""
                          alt=""
                          maxW="200px"
                          p="4"
                          boxShadow="lg"
                          rounded="md"
                          height="8rem"
                        />
                      </Box>
                    </Flex> */}
              </Box>
            </AspectRatio>
            {/* 10 Mini Boxes */}
            <Flex flexDirection="row" alignItems="center">
              {[...Array(10)].map((_, index) => (
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
                    {index % 2 === 0 ? "A" : "B"}
                  </Text>
                </Box>
              ))}
              {/* Text and Button */}
              <Flex flexDirection="row" alignItems="center" padding="1rem">
                <Text>Match Id: 123456789</Text>
                <Button
                  flexDirection="row"
                  alignItems="center"
                  marginLeft="3rem"
                  variant="outline"
                  colorScheme="blue"
                  width="100%"
                >
                  Player History
                </Button>
              </Flex>
            </Flex>
            {/* New Box */}
            <Box width="100%">
              <Flex flexDirection="row" alignItems="center">
                <Text fontSize="15px" fontWeight="bold" marginLeft="0.5rem">
                  Last Win
                </Text>
                {/* <Text fontSize="12px">0</Text> */}
                <Text fontSize="15px" fontWeight="bold" marginLeft="0.5rem">
                  Last Bet
                </Text>
                {/* <Text fontSize="12px">0</Text> */}
                <Flex>
                  {[100, 500, "1K", "5K", "10K", "25K"].map((value, index) => (
                    <Button
                      key={index}
                      width="35px"
                      height="35px"
                      marginLeft="1rem"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      fontWeight="bold"
                      variant="unstyled" // Use "unstyled" instead of "unstyles"
                      border="5px solid #333"
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
                  ))}
                </Flex>
                {/* Margin */}
                <Box marginLeft="4rem">
                  {/* 3 More Buttons */}
                  {["Undo", "Reset"].map((label, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      colorScheme="blue"
                      justifyContent="end"
                      width="50%"
                    >
                      <Text>{label}</Text>
                    </Button>
                  ))}
                </Box>
              </Flex>
              {/* Player Button */}
              <Flex
                padding="1rem"
                border="2px solid #333"
                marginTop="1rem"
                justifyContent="center"
                alignItems="center"
                width="100%"
                height="22rem"
                flexDirection="column"
              >
                {/* Box 1 */}
                <Box
                  //   border="2px solid black"
                  width="99%"
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  height="50%"
                >
                  <Flex
                    // border="2px solid #333"

                    width="48%"
                    height="80%"
                    flexDirection="column" // Set flexDirection to column
                    justifyContent="center" // Center content vertically
                    alignItems="center" // Center content horizontally
                  >
                    <Text fontSize="16px" fontWeight="bold" marginBottom="1rem">
                      Player 8
                    </Text>
                    <Flex
                      flexDirection="row" // Set flexDirection to row
                      justifyContent="space-between" // Distribute space evenly
                      alignItems="center" // Center content vertically
                      width="100%" // Ensure the Flex container takes full width
                      height="100%"
                    >
                      <Button
                        width="48%"
                        height="70%"
                        // border="1px solid #333"
                        display="flex"
                        flexDirection="row"
                        // justifyContent="space-between"
                        justifyContent="space-around"
                        alignItems="center"
                        backgroundColor="#1c3e6b"
                        variant="unstyled"
                      >
                        <Text textColor="white">BACK</Text>
                        <Text textColor="white">12.2</Text>
                      </Button>
                      <Button
                        width="48%"
                        height="70%"
                        // border="1px solid #333"
                        display="flex"
                        flexDirection="row"
                        // justifyContent="space-between"
                        justifyContent="space-around"
                        alignItems="center"
                        backgroundColor="#640e18"
                        variant="unstyled"
                      >
                        <Text textColor="white">LAY</Text>
                        <Text textColor="white">13.7</Text>
                      </Button>
                    </Flex>
                  </Flex>

                  <Flex
                    // border="2px solid #333"
                    width="48%"
                    height="80%"
                    flexDirection="column" // Set flexDirection to column
                    justifyContent="center" // Center content vertically
                    alignItems="center" // Center content horizontally
                  >
                    <Text fontSize="16px" fontWeight="bold" marginBottom="1rem">
                      Player 9
                    </Text>
                    <Flex
                      flexDirection="row" // Set flexDirection to row
                      justifyContent="space-between" // Distribute space evenly
                      alignItems="center" // Center content vertically
                      width="100%" // Ensure the Flex container takes full width
                      height="100%"
                    >
                      <Button
                        width="48%"
                        height="70%"
                        // border="1px solid #333"
                        display="flex"
                        flexDirection="row"
                        // justifyContent="space-between"
                        justifyContent="space-around"
                        alignItems="center"
                        backgroundColor="#1c3e6b"
                        variant="unstyled"
                      >
                        <Text textColor="white">BACK</Text>
                        <Text textColor="white">5.95</Text>
                      </Button>
                      <Button
                        width="48%"
                        height="70%"
                        // border="1px solid #333"
                        display="flex"
                        flexDirection="row"
                        // justifyContent="space-between"
                        justifyContent="space-around"
                        alignItems="center"
                        backgroundColor="#640e18"
                        variant="unstyled"
                      >
                        <Text textColor="white">LAY</Text>
                        <Text textColor="white">6.45</Text>
                      </Button>
                    </Flex>
                  </Flex>
                </Box>

                {/* Box 2 */}
                <Box
                  //   border="2px solid black"
                  width="99%"
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  height="50%"
                >
                  <Flex
                    // border="2px solid #333"
                    width="48%"
                    height="80%"
                    flexDirection="column" // Set flexDirection to column
                    justifyContent="center" // Center content vertically
                    alignItems="center" // Center content horizontally
                  >
                    <Text fontSize="16px" fontWeight="bold" marginBottom="1rem">
                      Player 10
                    </Text>
                    <Flex
                      flexDirection="row" // Set flexDirection to row
                      justifyContent="space-between" // Distribute space evenly
                      alignItems="center" // Center content vertically
                      width="100%" // Ensure the Flex container takes full width
                      height="100%"
                    >
                      <Button
                        width="48%"
                        height="70%"
                        // border="1px solid #333"
                        display="flex"
                        flexDirection="row"
                        // justifyContent="space-between"
                        justifyContent="space-around"
                        alignItems="center"
                        backgroundColor="#1c3e6b"
                        variant="unstyled"
                      >
                        <Text textColor="white">BACK</Text>
                        <Text textColor="white">3.2</Text>
                      </Button>
                      <Button
                        width="48%"
                        height="70%"
                        // border="1px solid #333"
                        display="flex"
                        flexDirection="row"
                        // justifyContent="space-between"
                        justifyContent="space-around"
                        alignItems="center"
                        backgroundColor="#640e18"
                        variant="unstyled"
                      >
                        <Text textColor="white">LAY</Text>
                        <Text textColor="white">3.45</Text>
                      </Button>
                    </Flex>
                  </Flex>

                  <Flex
                    // border="2px solid #333"
                    width="48%"
                    height="80%"
                    flexDirection="column" // Set flexDirection to column
                    justifyContent="center" // Center content vertically
                    alignItems="center" // Center content horizontally
                  >
                    <Text fontSize="16px" fontWeight="bold" marginBottom="1rem">
                      Player 11
                    </Text>
                    <Flex
                      flexDirection="row" // Set flexDirection to row
                      justifyContent="space-between" // Distribute space evenly
                      alignItems="center" // Center content vertically
                      width="100%" // Ensure the Flex container takes full width
                      height="100%"
                    >
                      <Button
                        width="48%"
                        height="70%"
                        // border="1px solid #333"
                        display="flex"
                        flexDirection="row"
                        // justifyContent="space-between"
                        justifyContent="space-around"
                        alignItems="center"
                        backgroundColor="#1c3e6b"
                        variant="unstyled"
                      >
                        <Text textColor="white">BACK</Text>
                        <Text textColor="white">2.08</Text>
                      </Button>
                      <Button
                        width="48%"
                        height="70%"
                        // border="1px solid #333"
                        display="flex"
                        flexDirection="row"
                        // justifyContent="space-between"
                        justifyContent="space-around"
                        alignItems="center"
                        backgroundColor="#640e18"
                        variant="unstyled"
                      >
                        <Text textColor="white">LAY</Text>
                        <Text textColor="white">2.18</Text>
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Box>

          {/* First Flex - Horizontal View */}
          <Box marginLeft="1rem" marginTop="4rem" width="80%">
            <Flex
              width="100%"
              flexDirection="row"
              border="1rem solid #333"
              borderRadius="1rem"
            >
              {/* First Half - White Background */}
              <Box
                flex="1"
                width="48%"
                backgroundColor="white"
                textAlign="center"
              >
                <Text fontSize="18px" fontWeight="bold">
                  Available Credit
                </Text>
                <Text fontSize="24px">0</Text>
              </Box>

              {/* Second Half - Orange Background */}
              <Box
                flex="1"
                width="48%"
                backgroundColor="#2b329b"
                textAlign="center"
              >
                <Text fontSize="18px" fontWeight="bold">
                  Exposure
                </Text>
                <Text fontSize="24px">0</Text>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </ChakraProvider>
    </>
  );
}
