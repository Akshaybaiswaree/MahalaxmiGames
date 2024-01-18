import { Button, Text } from "@chakra-ui/react";

import PropTypes from "prop-types";

const UndoResetButton = ({ label }) => (
    <Button
      variant="outline"
      colorScheme="blue"
      justifyContent="end"
      width="50%"
    >
      <Text>{label}</Text>
    </Button>
  );
  
  UndoResetButton.propTypes = {
    label: PropTypes.string.isRequired,
  };
  export default UndoResetButton;