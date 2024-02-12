import { Box, Flex } from "@chakra-ui/react";

import PropTypes from "prop-types";

const BettingButtonsContainer = ({ children }) => (
    <Box border="2px solid #333" position="absolute" bottom="0" center="0">
      <Flex flexDirection="column" alignItems="center">
        {children}
      </Flex>
    </Box>
  );
  
  BettingButtonsContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

  export default BettingButtonsContainer;