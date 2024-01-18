import { Box, Text } from "@chakra-ui/react";

import Card from "./Card";
import PropTypes from "prop-types";

const MainCardSection = ({ mainCard }) => (
  <Box
    width="7%"
    height="8%"
    position="absolute"
    bottom="30%"
    right="7%"
    // border="5px solid black"
  >
    <Text textColor="white">
      Main Card
    </Text>
    <Card card={mainCard.main_card} index="main" />
  </Box>
);

MainCardSection.propTypes = {
  mainCard: PropTypes.object.isRequired,
};

export default MainCardSection;
