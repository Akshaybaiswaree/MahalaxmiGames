import PropTypes from "prop-types";

const Card = ({ card, index }) => {
  return <img src={`./cards/${card}`} alt={`Card ${index}`} />;
};

Card.propTypes = {
  card: PropTypes.string.isRequired,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
export default Card;
