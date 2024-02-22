import { Box, Flex } from "@chakra-ui/react"; // Import Box and Flex from Chakra UI

import AndarBahar from "../Home/Games/Andar&Bahar/AndarBahar";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/Sidebar";
import Sidebar1 from "../Sidebar/Sidebar1";

// import AndarBahar from "../Home/Games/AndarBahar";

// import Sidebar1 from "../Sidebar/Sidebar1";

function Rootlayout() {
  return (
    <Flex direction="column">
      <Box minW={"100vw"} minH={"20vh"}>
        <Navbar />
      </Box>

      <Flex flexGrow={1}>
        <Box width={{ lg: "15%" }}>
          <SideBar />
        </Box>

        <Box
          mx={{ base: "0rem", md: "0rem" }}
          // mr={{ base: "4rem" }}
          marginLeft={{ base: "0rem", md: "0rem" }}
          flexBasis={{ base: "300%", md: "100%" }}
          alignItems={{ base: "flex-start" }}
          // bg={"black"}
        >
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}

export default Rootlayout;
