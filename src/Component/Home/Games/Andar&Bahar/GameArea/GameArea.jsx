import { Box, Text } from "@chakra-ui/react";

import CardSection from "./CardSection";
import CounterBox from "./CounterBox";
import MainCardSection from "./MainCardSection";
import PropTypes from "prop-types";
import WinStatusBanner from "./WinStatusBanner";

const GameArea = ({ gameState, mainCard, andarCards, baharCards }) => {
  return (
    <Box
      width="70%"
      height="90vh"
      // border="10px solid #333"
      backgroundImage="url('/Andar&BaharImage/Andar&BaharAvatar.webp')"
      backgroundSize="cover"
      backgroundPosition={`center 100%`}
      backgroundRepeat="no-repeat"
      display="flex"
      position="relative"
    >
      <WinStatusBanner winStatus={mainCard.winstatus} gameState={gameState} />
      <CounterBox
        value={gameState.value - 20 < 0 ? "0" : gameState.value - 20}
        width="13%"
        height="18%"
        position="absolute"
        top="5"
        right="6"
        color="white"
        align="center"
      />

      <CounterBox
        value={gameState.value - 20 < 0 ? "Freeze" : "Place Bet"}
        width="17%"
        height="22%"
        position="absolute"
        top="3"
        left="3"
        color="white"
        align="center"
      />
      <MainCardSection mainCard={mainCard} />
      <Box width="15%">
        <Text
          color="white"
          fontWeight="bold"
          position="absolute"
          bottom="38%"
          left="10%"
        >
          Andar Cards
        </Text>
        <Text
          color="white"
          fontWeight="bold"
          position="absolute"
          bottom="10%"
          left="10%"
        >
          Bahar Cards
        </Text>
      </Box>
      {gameState.value <= 20 && (
        <Box width="100%">
          <CardSection
            // title="Andar cards"
            cards={andarCards}
            position="absolute"
            bottom="25%"
            middle="15%"
            right="20%"
            transform="translateX(-50%)"
            flexDirection="row-reverse"
          />

          <CardSection
            // title="Bahar cards"
            cards={baharCards}
            position="absolute"
            bottom="10%"
            middle="15%"
            right="20%"
            transform="translateX(-50%)"
            flexDirection="row-reverse"
          />
        </Box>
      )}
    </Box>
  );
};

GameArea.propTypes = {
  gameState: PropTypes.object.isRequired,
  mainCard: PropTypes.object.isRequired,
  andarCards: PropTypes.array.isRequired,
  baharCards: PropTypes.array.isRequired,
};

export default GameArea;
