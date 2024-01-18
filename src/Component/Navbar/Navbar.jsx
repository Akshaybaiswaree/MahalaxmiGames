import { AccountBalance, ZoomIn } from "@mui/icons-material";
import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import LOGO from "./Logo.png";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [playerBalance, setPlayerBalance] = useState(0);
  // console.log(playerBalance)

  // useEffect(() => {
  //   const fetchPlayerBalance = async () => {
  //     try {
  //       const playerId = 3;
  //       const response = await axios.post(
  //         `http://localhost:4000/andarBahar/getPlayerBalance`,
  //         { playerId }
  //       );
  //       setPlayerBalance(response.data.playerBal);
  //       console.log(response,"Player Balance")
  //     } catch (error) {
  //       console.error("Error fetching player balance:", error);
  //     }
  //   };

  //   fetchPlayerBalance();
  // }, [playerBalance]); // The empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <Container p="0" bg="#2b329b" textColor="white" maxW="100vw">
      <HStack
        spacing={4}
        justify="space-between"
        height={{ base: "20", lg: "20" }}
      >
        <Box display="flex">
          <Image
            width={{ base: "9rem", md: "12 rem", lg: "15rem" }}
            height={{ base: "9rem", md: "6rem", lg: "9rem" }}
            m={-3}
            src={LOGO}
          />

          <Box marginTop={{ base: "2rem", lg: "3.5rem" }}>
            {/* <Text fontWeight={{lg:'600'}}>MahaLaxmi</Text> */}
          </Box>
        </Box>

        <Box alignItems="flex-start">
          <Box
            paddingRight={{ lg: "30" }}
            display={{ base: "grid", md: "flex", lg: "flex" }}
            // justifyContent={{ lg: "space-between" }}
            gap={{ lg: "4" }}
          >
            <Box
              display={{ base: "none", md: "flex", lg: "flex" }}
              gap={{ lg: "4" }}
              marginTop={{ lg: "2" }}
              justifyContent="end"
            >
              <ZoomIn />

              <Text
                display={{ base: "none", mg: "flex", lg: "fl" }}
                marginRight={{ lg: "1.5rem" }}
                fontSize={{ lg: "20" }}
              >
                Rule
              </Text>
            </Box>

            <Box>
              <Text display={{ lg: "none" }}>
                <AccountBalance />
              </Text>
            </Box>

            <Text
              marginTop={{ lg: "2" }}
              marginRight={{ lg: "1.5rem" }}
              fontSize={{ lg: "20" }}
              justifyContent={{ base: "end" }}
              display={{ base: "none", md: "flex", lg: "flex" }}
            >
              Balance: {playerBalance}
            </Text>
            <Text
              textDecor={{ lg: "underline" }}
              marginTop={{ lg: "2" }}
              fontSize={{ lg: "20" }}
              marginRight={{ lg: "1.5rem" }}
            >
              Exposure:0
            </Text>
            {/* <Menu>
              <MenuButton
                px={4}
                py={2}
                // transition="all 0.2s"
                // borderRadius="md"
                // borderWidth="1px"
                _hover={{ bg: "gray.400" }}
                _expanded={{ bg: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
                fontSize={{ lg: "16" }}
                fontWeight={{ base: "500", md: "500", lg: "600" }}
              >
                MahaLaxmi
                <ChevronDownIcon />
              </MenuButton>
              <MenuList textColor="black">
                <MenuItem>Account Statement</MenuItem>
                <MenuItem>Profit Loss Report</MenuItem>

                <MenuItem>Bet History</MenuItem>
                <MenuItem>Unsettled Bet</MenuItem>
                <MenuItem>Set Button Value</MenuItem>
                <MenuItem>Change Password</MenuItem>
                <MenuDivider />
                <MenuItem>SignOut</MenuItem>
              </MenuList>
            </Menu> */}

            {/* <Box bg="#2b329b">
              <NavLink to="/admin">
                <Button>Admin</Button>
              </NavLink>
            </Box> */}
          </Box>
        </Box>
      </HStack>

      <HStack>
        <Flex padding="0">
          <Box
            display={{ base: "flex", md: "flex", lg: "flex" }}
            alignItems="flex-start"
          >
            <Box width={{ base: "7", lg: "50%" }} padding={{ base: "1" }}></Box>

            <Box width={{ base: "70%" }} alignItems={{ lg: "flex-end" }}>
              {/* <marquee behavior="scroll" direction="left" scrolldelay="150"> */}
              <marquee direction="left">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Corporis quae nam dignissimos vel, aliquam ipsum veniam
                reiciendis ex, commodi consectetur similique, aliquid incidunt!
                Repellendus laudantium non voluptas facilis, facere voluptatem.
              </marquee>
            </Box>
          </Box>
        </Flex>
      </HStack>

      <Stack
        alignContent={"center"}
        alignItems={"center"}
        // justifyContent={"center"}
        fontWeight={650}
        maxW={"100%"}
        direction={{ base: "row", md: "row" }}
        bg="#092844"
        color="white"
        p={2}
        spacing={6}
        overflowX={{ base: "scroll", md: "visible" }}
      >
        <NavLink to="/home">
          <Box>HOME</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>CRICKET</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>FOOTBALL</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>TENNIS</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>HORSE RACING</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>GREYHOUND RACING</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>BINARY</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>KABADDI</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>POLITICS</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>CASINO</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>INT CASINO</Box>
        </NavLink>
        <NavLink to="/home">
          <Box>SPORT BOOK</Box>
        </NavLink>
      </Stack>
    </Container>
  );
};

export default Navbar;
