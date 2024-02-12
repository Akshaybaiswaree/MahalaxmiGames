import { Box, Text } from "@chakra-ui/react";

import PropTypes from "prop-types";

const WinStatusBanner = ({ winStatus, gameState }) => (
  <Box
    position="absolute"
    top="50%"
    left="50%"
    transform="translate(-50%, -50%)"
    zIndex="999"
  >
    <Box backgroundColor="#ee9d1e">
      <Text fontWeight="bold" textColor="#32334a" fontSize="1.5rem">
        {gameState.value - 25 < -16 ? `${winStatus} Win's` : ""}
      </Text>
    </Box>
  </Box>
);

WinStatusBanner.propTypes = {
  winStatus: PropTypes.string,
  gameState: PropTypes.object.isRequired,
};

export default WinStatusBanner;
