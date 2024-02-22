import { Box, Flex } from "@chakra-ui/react"; // Import Box and Flex from Chakra UI

import AndarBahar from "../Home/Games/Andar&Bahar/AndarBahar";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/Sidebar";
import Sidebar1 from "../Sidebar/Sidebar1";
// import TwoCardPattiBG from "../../images/2cardpattibg.svg";
import TwoCardPattiBG from  "../images/2cardpattibg.svg";
// import AndarBahar from "../Home/Games/AndarBahar";

// import Sidebar1 from "../Sidebar/Sidebar1";

function Rootlayout() {
  return (
    <Flex direction="column">
      <Box 
    
      minW={"100%"} minH={"20vh"}>
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
          mx={{ base: "0rem", md: "0rem" }}
          marginLeft={{ base: "0rem", md: "0rem" }}
          flexBasis={{ base: "300%", md: "100%" }}
          alignItems={{ base: "flex-start" }}
          backgroundImage={TwoCardPattiBG}
        >
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}

export default Rootlayout;
