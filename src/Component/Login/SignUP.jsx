import { Box, Button, Flex, Icon, Input, InputGroup, InputRightElement,Text } from '@chakra-ui/react'

import { NavLink } from 'react-router-dom'




const SignUP = () => {
  return (
    <Box
        width="100%"
        minHeight="100vh"
        bgGradient="linear( #2B329B, #0b2948)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          width={["90%", "70%", "50%", "30%"]} // Adjust width for different screen sizes
          p={["2", "4"]} // Adjust padding for different screen sizes
        >
          <Flex align="center" justify="center" mb={2}>
            <img src={"Logo"} alt="" width="150px" />
          </Flex>

          <Box bg="white" color="black" p="4" borderRadius="10px">
            <Flex align="center" justify="center" mb={3} gap={1} color="blue">
              <Text fontSize={["2xl", "3xl"]} fontWeight={{base:"600",lg:"800"}}>Sign Up</Text>
              <Box
                height={["1rem", "1.5rem"]}
                marginLeft={["0.2rem", "0.5rem"]}
                marginTop={["0.3rem", "0.6rem"]}
              >
                
              </Box>
            </Flex>

            <InputGroup mb="4">
                <Box>
                <label htmlFor="Name">First Name *</label>
                <Input placeholder="Username" />
              <InputRightElement>
               
              </InputRightElement>
              <Box>
              <label htmlFor="Name">Last Name*</label>
                <Input placeholder="Username" />
              <InputRightElement>
                
              </InputRightElement>

              </Box>
              <Box>
                <label htmlFor="Email">Email*</label>
                <Input placeholder="example@gmail.com"></Input>

              </Box>
              <Box>
              <label htmlFor="Password">password*</label>
             <Input placeholder="example!@#$%^&*"></Input>
             <label htmlFor="Password">Confirm Password*</label>
             <Input placeholder="example!@#$%^&*"></Input>

              </Box>

                </Box>
                
              
            </InputGroup>

            {/* <InputGroup mb="4">
              <Input type="password" placeholder="Password" />
              <InputRightElement>
                <Icon icon="solar:key-bold" />
              </InputRightElement>
            </InputGroup> */}

            <NavLink to="/mainpage">
              <Button colorScheme="blue" width="100%" mb="2">
                <Flex justify="space-between" align="center">
                  <Text marginLeft="auto">SignUp</Text>
                  {/* <LoginIcon /> */}
                </Flex>
              </Button>
            </NavLink>

            <Text fontWeight="lighter" fontSize="sm" mb="2">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="#">Privacy Policy</a> and{" "}
              <a href="#">Terms of Service</a> apply.
            </Text>

            <NavLink to="/mainpage">
              <Button colorScheme="blue" width="100%">
                <Flex justify="space-between" align="center">
                  LogIn with Demo
                  <Icon icon="entypo:login" ml={2} />
                </Flex>
              </Button>
            </NavLink>
          </Box>
        </Box>
      </Box>
    
  )
}

export default SignUP