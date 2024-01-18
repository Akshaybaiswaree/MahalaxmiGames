// //import React from 'react'


 



// import {
//     ChakraProvider,
//     Box,
//     Text,
//     Flex,
//     Center,
//     Tooltip,
//     Accordion,
//     AccordionItem,
//     AccordionButton,
//     AccordionPanel,
//     AccordionIcon,
//     NumberInput,
//     NumberInputField,
//     NumberInputStepper,
//     NumberIncrementStepper,
//     NumberDecrementStepper,
//     Button,
//     WrapItem,
//     Grid,
//     GridItem,
//   } from "@chakra-ui/react";
//   import Card from './Card'
//   import { Icon } from "@iconify/react";
//   import { AspectRatio } from "@chakra-ui/react";
//   //import Video from "../Games/GameVideo/Videogame/"
  
//   const RaceGame = () => {
//     return (
//       <>
//         <ChakraProvider>
//           {/* {/ AsideSection /} */}
//           <Box width="100%">
//             <Flex
//               direction={{ base: "column", md: "row" }}
//               justify="space-evenly"
//               flex="wrap"
//               gap={1}
//             >
        
//               <Box
//              flex="1"
//              bgColor="#333"
//              display="flex"
//              alignItems="center"
//              justifyContent="center"
//              position="relative"
//             width={{ base: "125%", md: "105%", lg: "50%" }} 
//              height={{ base: "auto", md: "500px" }}
//              p={2}
         
//               >
//                 <AspectRatio
//                   width="100%"
//                   height="500px"
//                   borderRadius="10px"
//                   controls
//                 >
//                   <iframe
//                 title="naruto"
//                 src={Video}
//                 allowFullScreen
//                 style={{ objectFit: "cover", borderRadius: "10px" }}
        
//                   />
//                 </AspectRatio>
//                 <Flex
//                   position="absolute"
//                   bottom="0"
//                   width="100%"
//                   justifyContent="space-between"
//                   padding="10px"
//                 >
//                   <Text
//                     color="white"
//                     position="absolute"
//                     left="10px"
//                     bottom="10px"
//                   >
//                     Volume
//                   </Text>
//                   <Text
//                     color="white"
//                     position="absolute"
//                     right="10px"
//                     bottom="10px"
//                   >
//                     00:00 / 05:30
//                   </Text>
//                 </Flex>
//               </Box>
  
//               {/* {/ SmallAsideSection /} */}
//               <Accordion width={{base: "125%", md: "105%", lg: "50%" }}>
//                 <AccordionItem bg="#092844" color="white" borderLeftRadius="5">
//                   <h2>
//                     <AccordionButton>
//                       <Box as="span" flex="1" textAlign="left">
//                         Place Bet
//                       </Box>
//                       <AccordionIcon />
//                     </AccordionButton>
//                   </h2>
//                   <AccordionPanel pb={4}>
//                     <NumberInput>
//                       <NumberInputField />
//                       <NumberInputStepper>
//                         <NumberIncrementStepper color="white" />
//                         <NumberDecrementStepper color="white" />
//                       </NumberInputStepper>
//                     </NumberInput>
//                     <Flex justify="space-around" m={3}>
//                       <WrapItem>
//                         <Button colorScheme="red" size="lg">
//                           Andar
//                         </Button>
//                       </WrapItem>
//                       <WrapItem>
//                         <Button colorScheme="green" size="lg">
//                           Bahar
//                         </Button>
//                       </WrapItem>
//                     </Flex>
//                   </AccordionPanel>
//                 </AccordionItem>
//                 <AccordionItem bg="#092844" color="white" borderLeftRadius="5">
//                   <h2>
//                     <AccordionButton>
//                       <Box as="span" flex="1" textAlign="left">
//                         My Bet
//                       </Box>
//                       <AccordionIcon />
//                     </AccordionButton>
//                   </h2>
//                   <AccordionPanel pb={4}>
//                     <h1>Your Coins</h1>
//                   </AccordionPanel>
//                 </AccordionItem>
  
//                 <Box
//                   width="100%"
//                   height="30px"
//                   bg="#cccccc"
//                   mt={1}
//                   ml={1}
//                   borderBottom="2px"
//                   borderBottomColor="black.200"
//                 >
//                   <Flex
//                     align="center"
//                     justify="space-between"
//                     height="100%"
//                     px={2}
//                   >
//                     <Text color="white" fontWeight="600">
//                       Match bet
//                     </Text>
//                     <Text color="white" fontWeight="600">
//                       Odds
//                     </Text>
//                     <Text color="white" fontWeight="600">
//                       Stacks
//                     </Text>
//                   </Flex>
//                 </Box>
//                 <Box
//                   width="99%"
//                   height="30px"
//                   bg="white"
//                   borderBottom="1px"
//                   borderBottomColor="gray.200"
//                   base= "125%" md= "105%" lg= "50%"
//                 >
//                   <Text textAlign="center">No records Found</Text>


//                   <Grid
//         templateColumns={{ base:'repeat(2, 1fr)' , md: 'repeat(2, 1fr)' }}
//         gap={4}
//         p={4}
//       >
//         {/* Box 1 */}
//         <GridItem bg="blue.300" p={4} borderRadius="md">
//           {/* Your content for Box 1 */}
//           Card 1
//         </GridItem>

//         {/* Box 2 */}
//         <GridItem bg="green.300" p={4} borderRadius="md">
//           {/* Your content for Box 2 */}
//           Card 2
//         </GridItem>
//       </Grid> 


//       <Grid>
//        <Grid
//         templateColumns={{ base:'repeat(2, 1fr)' , md: 'repeat(2, 1fr)' }}
//         gap={4}
//         p={4}
//       >
//         {/* Box 1 */}
//         <GridItem bg="blue.300" p={4} borderRadius="md">
//           {/* Your content for Box 1 */}
//           Card 3
//         </GridItem>

//         {/* Box 2 */}
//         <GridItem bg="green.300" p={4} borderRadius="md">
//           {/* Your content for Box 2 */}
//           Card 4
//         </GridItem>
//       </Grid>
      
//       </Grid>


//       <Box>
//                   <Grid
//         templateColumns={{ base:'repeat(3, 1fr)' , md: 'repeat(3, 1fr)' }}
//         gap={4}
//         p={4}
//       >
//       <Box 
//       padding="3"
//       fontSize="20"
//       >
//       <Text 
//       fontWeight="400"

      
//       >Total Point</Text>
//       </Box>
//         {/* Box 1 */}
//         <GridItem bg="blue.300"
//          p={4}
//          borderRadius="md"
         
//         >
//           {/* Your content for Box 1 */}
//           Card 1
//         </GridItem>

//         {/* Box 2 */}
//         <GridItem bg="green.300" p={4} borderRadius="md">
//           {/* Your content for Box 2 */}
//           Card 2
//         </GridItem>
//       </Grid> 

//                  <Grid
//         templateColumns={{ base:'repeat(3, 1fr)' , md: 'repeat(3, 1fr)' }}
//         gap={4}
//         p={4}
//       >
//       <Box 
//       padding="3"
//       fontSize="20"
//       >
//       <Text 
//       fontWeight="400"

      
//       >Total Card</Text>
//       </Box>
//         {/* Box 1 */}
//         <GridItem bg="blue.300"
//          p={4}
//          borderRadius="md"
         
//         >
//           {/* Your content for Box 1 */}
//           Card 1
//         </GridItem>

//         {/* Box 2 */}
//         <GridItem bg="green.300" p={4} borderRadius="md">
//           {/* Your content for Box 2 */}
//           Card 2
//         </GridItem>
//       </Grid> 
      
//       </Box>

//       <Box marginTop="2" bg="whitesmoke">

//         <Grid
//         templateColumns={{ base:'repeat(3, 1fr)' , md: 'repeat(3, 1fr)' }}
//         gap={4}
//         p={4}
//       >
      
//         {/* Box 1 */}
//         <GridItem bg="blue.300"
//          p={4}
//          borderRadius="md"
         
//         >
//           {/* Your content for Box 1 */}
//           Card 1
//         </GridItem>

//         {/* Box 2 */}
//         <GridItem bg="green.300" p={4} borderRadius="md">
//           {/* Your content for Box 2 */}
//           Card 2
//         </GridItem>
//         <GridItem bg="green.300" p={4} borderRadius="md">
//           {/* Your content for Box 2 */}
//           Card32
//         </GridItem>
//       </Grid> 
      
//        <Grid
//         templateColumns={{ base:'repeat(3, 1fr)' , md: 'repeat(3, 1fr)' }}
//         gap={4}
//         p={4}
//       >
      
//         {/* Box 1 */}
//         <GridItem bg="blue.300"
//          p={4}
//          borderRadius="md"
         
//         >
//           {/* Your content for Box 1 */}
//           Card 1
//         </GridItem>

//         {/* Box 2 */}
//         <GridItem bg="green.300" p={4} borderRadius="md">
//           {/* Your content for Box 2 */}
//           Card 2
//         </GridItem>
//         <GridItem bg="green.300" p={4} borderRadius="md">
//           {/* Your content for Box 2 */}
//           Card32
//         </GridItem>
//       </Grid> 
      
//       </Box>




                
                  
//                 </Box>

                
              
              
            
//               </Accordion>
//             </Flex>
//           </Box>
  
//           {/* {/ CardBahar /} */}

          
         
          
//         </ChakraProvider>
//       </>
//     );
//   };
  
//   export default RaceGame
  