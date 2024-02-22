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
      <Box minW={"100vw"} minH={"30vh"}>
        <Navbar />
      </Box>
      {/* Main Content */}
      <Flex flexGrow={1}>
        {/* Sidebar */}
        <Box width={{ lg: "15%" }}>
          {/* {AndarBahar ? <Sidebar1 /> : <SideBar />} */}
          <SideBar />
          {/* <Sidebar1 /> */}
        </Box>

        {/* Main Content */}
        <Box
          mx={{ base: "1rem", md: "1rem" }}
          mr={{ base: "4rem" }}
          marginLeft={{ base: "0rem", md: "0rem" }}
          flexBasis={{ base: "300%", md: "100%" }}
          alignItems={{ base: "flex-start" }}
          // bg={"#451212"}
        >
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}

export default Rootlayout;
