import { Box } from "@chakra-ui/react";
import Card from "./Card";
import PropTypes from "prop-types";

const CardSection = ({
  cards,
  position,
  bottom,
  middle,
  left,
  right,
  flexDirection,
  transform,
}) => {
  const reverseCards = [...cards].reverse();

  return (
    <Box
      width="6%"
      height="13%"
      position={position}
      bottom={bottom}
      middle={middle}
      flexDirection={flexDirection}
      left={left}
      right={right}
      transform={transform}
      id="andarhiddencards"
    >
      {/* <Text textColor="white">{title}</Text> */}
      <Box display="flex" flexDirection={flexDirection}>
        {reverseCards.map((card, index) => (
          <Card
            // key={`${title.toLowerCase()}-${index}`}
            key={`${index}`}
            card={card}
            index={index}
          />
        ))}
      </Box>
    </Box>
  );
};

CardSection.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  position: PropTypes.string,
  bottom: PropTypes.string,
  middle: PropTypes.string,
  flexDirection: PropTypes.string,
  left: PropTypes.string,
  transform: PropTypes.string,
  right: PropTypes.string,
};
export default CardSection;
