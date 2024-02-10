import { Box, Text } from "@chakra-ui/react";

import Card from "./Card";
import PropTypes from "prop-types";

const MainCardSection = ({ mainCard }) => (
  <Box
    // border="1px solid black"
    width="5.5%"
    // height="13%"
    position="absolute"
    bottom="23%"
    right="19.5%"
    // id="maincardsection"
    // border="5px solid black"
  >
    <Card card={mainCard?.main_card} index="main" />
  </Box>
);

MainCardSection.propTypes = {
  mainCard: PropTypes.object.isRequired,
};

export default MainCardSection;
