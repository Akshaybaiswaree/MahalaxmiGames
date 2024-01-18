// Modified BettingAmountButton component

import { Button, Image } from "@chakra-ui/react";

import PropTypes from "prop-types";

const BettingAmountButton = ({ value, imageSrc, setCoins }) => (
  // <Button
  //   width="50px"
  //   height="35px"
  //   marginLeft="1rem"
  //   display="flex"
  //   justifyContent="center"
  //   alignItems="center"
  //   variant="unstyled"
  //   // border="5px solid #333"
  //   onClick={() => setCoins(value)}
  // >
  //   <Image src={imageSrc} alt="Betting Amount" boxSize="110%" />
  // </Button>
  <Button
    variant="unstyled"
    width="14%"
    height="90%"
    onClick={() => setCoins(value)}
  >
    <Image src={imageSrc} alt="Betting Amount" boxSize="110%" />
  </Button>
);

BettingAmountButton.propTypes = {
  value: PropTypes.number.isRequired,
  imageSrc: PropTypes.string.isRequired,
  setCoins: PropTypes.func.isRequired,
};

export default BettingAmountButton;
