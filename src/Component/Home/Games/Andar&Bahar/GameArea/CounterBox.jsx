import { Box, Text } from "@chakra-ui/react";

import PropTypes from "prop-types";

const CounterBox = ({
  value,
  color,
  width,
  height,
  position,
  top,
  right,
  left,
  // completionPercentage,
}) => (
  <Box
    position={position}
    top={top}
    right={right}
    left={left}
    width={width}
    height={height}
    borderRadius="50%"
    display="flex"
    alignItems="center"
    justifyContent="center"
    border="10px solid white"
    id="freezorplaceround"
  >
    <Text id="freezeplacebettext" fontWeight="bold" textColor={color} fontSize="1.5rem">
      {value}
    </Text>
  </Box>
);

CounterBox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  position: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  left: PropTypes.string,
  completionPercentage: PropTypes.number, // Pass the completion percentage as a prop
};

export default CounterBox;
