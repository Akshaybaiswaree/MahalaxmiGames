import { Box, Text } from "@chakra-ui/react";

import PropTypes from "prop-types";

const MiniBox = ({ index }) => (
  <Box
    key={index}
    width="35px"
    height="35px"
    marginRight="5px"
    display="flex"
    justifyContent="center"
    alignItems="center"
    fontWeight="bold"
    border="5px solid #333"
  >
    <Text fontSize="14px" color={index % 2 === 0 ? "#333" : "#2b329b"}>
      {index % 2 === 0 ? "A" : "B"}
    </Text>
  </Box>
);

MiniBox.propTypes = {
  index: PropTypes.number.isRequired,
};

export default MiniBox;
