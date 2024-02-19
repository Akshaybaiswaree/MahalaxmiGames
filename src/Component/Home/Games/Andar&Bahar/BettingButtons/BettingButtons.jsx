import { Box, Button, Flex, Text } from "@chakra-ui/react";

import BettingAmountButton from "./BettingAmountButton";
import BettingButtonsContainer from "./BettingButtonsContainer";
import MiniBox from "./MiniBox";
import PropTypes from "prop-types";

// import UndoResetButton from "./UndoResetButton";

const BettingButtons = ({
  setCoins,
  handleBait,
  gameState,
  user,
  // buttonClick1,
  // buttonClick2,
}) => (
  <BettingButtonsContainer>
    {/* Mini Boxes */}
    <Flex flexDirection="row" alignItems="center" border="1px solid #333">
      {[...Array(10)].map((_, index) => (
        <MiniBox key={index} index={index} />
      ))}
      {/* Text and Button */}
      <Flex flexDirection="row" alignItems="center">
        <Text marginBottom="0.5rem">Match Id:{user?._id}</Text>
        <Button
          flexDirection="row"
          alignItems="center"
          marginLeft="3rem"
          variant="outline"
          colorScheme="blue"
          width="100%"
        >
          Player History
        </Button>
      </Flex>
    </Flex>

    {/* Betting Amount Buttons */}
    <Box
      // border="5px solid green"
      height="250%"
      position="absolute"
      left="96%"
      bottom="500%"
      width="45%"
      justifyContent="center"
      align="center"
    >
      {/* <Flex border="1px solid #333">
        {[10, 50, 100, 500, 1000, 5000].map((value, index) => (
          <BettingAmountButton key={index} value={value} setCoins={setCoins} />
        ))}
      </Flex> */}
      {/* <Flex spacing="4">
        {[
          { value: 10, imageSrc: "/Coins/10's coin.webp" },
          { value: 50, imageSrc: "/Coins/50's coin.webp" },
          { value: 100, imageSrc: "/Coins/100's coin.webp" },
          { value: 500, imageSrc: "/Coins/500's coin.webp" },
          { value: 1000, imageSrc: "/Coins/1000's coin.webp" },
          { value: 5000, imageSrc: "/Coins/5000's coin.webp" },
        ].map(({ value, imageSrc }, index) => (
          <BettingAmountButton
            key={index}
            value={value}
            imageSrc={imageSrc}
            setCoins={setCoins}
          />
        ))}
      </Flex> */}

      {/* Undo/Reset Buttons */}
      {/* <Box width="50%">
        {["Undo", "Reset"].map((label, index) => (
          <UndoResetButton key={index} label={label} />
        ))}
      </Box> */}

      {/* Andar/Bahar Buttons */}
      {/* {gameState?.value - 20 > 0 && (
        <Box
          width="100%"
          height="100%"
          // border="2px solid black"
          position="absolute"
          display="flex"
          justifyContent="space-around"
          // justifyContent="center"
          alignItems="center"
          top="60%"
          left="0%"
        >
          <Button
            width="47%"
            height="80%"
            display="flex"
            justifyContent="space-around"
            variant="unstyled"
            fontSize="1.5rem"
            textColor="white"
            backgroundColor="#640e18"
            borderRadius="1rem"
            onClick={() => handleBait(0)}
            // isDisabled={buttonClick1 || gameState?.value > 0}
          >
            Andar <span>1.98</span>
          </Button>

          <Button
            width="47%"
            height="80%"
            display="flex"
            justifyContent="space-around"
            variant="unstyled"
            fontSize="1.5rem"
            textColor="white"
            backgroundColor="#1c3e6b"
            borderRadius="1rem"
            onClick={() => handleBait(1)}
            // isDisabled={buttonClick2 || gameState?.value > 0}
          >
            Bahar <span>1.98</span>
          </Button>
        </Box>
       )}    */}
    </Box>
  </BettingButtonsContainer>
);

BettingButtons.propTypes = {
  setCoins: PropTypes.func.isRequired,
  handleBait: PropTypes.func.isRequired,
  gameState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  buttonClick1: PropTypes.func.isRequired,
  buttonClick2: PropTypes.func.isRequired,
};

export default BettingButtons;
