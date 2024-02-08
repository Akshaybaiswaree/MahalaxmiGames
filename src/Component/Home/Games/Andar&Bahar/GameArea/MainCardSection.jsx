import { Box, Text } from "@chakra-ui/react";

import Card from "./Card";
import PropTypes from "prop-types";

const MainCardSection = ({ mainCard }) => (
  
  <Box
  // border="1px solid black"
    width="5%"
    height="14.6%"
    position="absolute"
    bottom="17%"
    right="9%"
    id="maincardsection"
    // border="5px solid black"
  >
    <Text textColor="white"
    id="maincardsectiontext">
      Main Card
    </Text>
    <Card card={mainCard?.main_card} index="main" />
  </Box>
);

MainCardSection.propTypes = {
  mainCard: PropTypes.object.isRequired,
};

export default MainCardSection;
