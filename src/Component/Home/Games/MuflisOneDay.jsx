import {
    AspectRatio,
    Box,
    Button,
    ChakraProvider,
    Flex,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";

import React from 'react'

function MuflisOneDay() {
  return (
    <div>
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
                MUFLIS TEENPATTI ONE DAY 
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
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                padding="1rem"
              >
                {/* Box 1 */}
                {/* Player Button */}
                <Box
                  width="100%"
                  position="relative"
                  border="2px solid #333"
                  height="9rem"
                  display="flex" // Set display to flex
                  flexDirection="column" // Stack child boxes vertically
                  justifyContent="center" // Center horizontally
                  alignItems="center" // Set align
                >
                  <Box
                       display="flex"
                       flexDirection="row"
                       justifyContent="space-around"
                       w="100%"
                       fontSize={15}
                   >
                  <Box >PLAYER A</Box>
                  <Box>PLAYER B</Box>
                  </Box>
 
                 <Box
                      width="97%" 
                      height="40%"
                      display="flex"
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                      fontWeight="bold"
                      variant="unstyled"
                      fontSize="3rem" 
                      backgroundColor="#640e18"
                      borderRadius="1rem"
                      gap={3}
                      
                    >
                     
                     <Box width="20%" 
                      height="60%"
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      fontWeight="bold"
                      variant="unstyled"
                      backgroundColor="blue.500"
                      borderRadius="1rem"
                      fontSize="small"
                      justifyContent="space-around"
                     >
                      <Text>Black</Text>
                      <Text>1.98</Text>
                     </Box>
                    
                     <Box width="20%" 
                      height="60%"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      fontWeight="bold"
                      variant="unstyled"
                      backgroundColor="pink.200"
                      borderRadius="1rem"
                      fontSize="small"
                     >Lay</Box>

                     <Box width="20%" 
                      height="60%"
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      fontWeight="bold"
                      variant="unstyled"
                      backgroundColor="blue.500"
                      borderRadius="1rem"
                      fontSize="small"
                      justifyContent="space-around"
                     >
                      <Text>Black</Text>
                      <Text>1.98</Text>
                     </Box>

                     <Box width="20%" 
                      height="60%"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      fontWeight="bold"
                      variant="unstyled"
                      backgroundColor="pink.200"
                      borderRadius="1rem"
                      fontSize="small"
                     >Lay</Box>
                     


                    </Box>

                 
                  
                </Box>
              </Flex>
            </Box>
          </Box>

          <Flex flexDirection="column" >
            {/* First Flex - Horizontal View */}
            <Box marginLeft="1rem" marginTop="4rem" backgroundColor="black" >
              <Flex
                width="80%"
                flexDirection="row"
                // border="1rem solid #333"
                borderRadius="1rem"
                m={5}
                
              
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
              <Box display="flex" 
                  flexDirection="row"
                  justifyContent="space-around"
              >
              <Box color='orange' fontWeight="bold">open Bets</Box>
                </Box>
              <Box  width="100%" 
                      height="20%"
                      display="flex"
                      flexDirection="row"
                      
                      alignItems="center"
                      fontWeight="bold"
                      variant="unstyled"
                      fontSize="15px" 
                      backgroundColor="BLACK"
                      color='white'
                      
                      justifyContent='space-between'
                      gap={3}>

                        <Box pl={2}>Market</Box>
                        <Box display='flex' gap={5} pr={2} >
                          <Box>ODDS</Box>
                          <Box>STAKES</Box>
                        </Box>
                      </Box>

                      <Box  width="100%" 
                      display='flex'
                      height="20%"                     
                      fontWeight="bold"
                      backgroundColor="GREY"
                      justifyContent='center'
                      
                      
                      >

                        YOU HAVE NO BETS
                      </Box>
            </Box>

          
            
          </Flex>
        </Flex>
      </ChakraProvider>
    </div>
  )
}

export default MuflisOneDay
