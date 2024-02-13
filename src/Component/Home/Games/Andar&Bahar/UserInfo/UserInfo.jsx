import { Box, Button, Image, Text } from "@chakra-ui/react";

import PropTypes from "prop-types";

const UserInfo = ({ user }) => {
  return (
    // <Box
    //   position="absolute"
    //   middle="0"
    //   right="0"
    //   width="27%"
    //   flexDirection="row"
    //   justifyContent="space-between"
    //   border="1rem solid #333"
    //   borderRadius="1rem"
    // >
    //   <Box flex="1" width="100%" backgroundColor="white" textAlign="center">
    //     <Text fontSize="18px" fontWeight="bold">
    //       Available Credit
    //     </Text>
    //     {user?.coins > 0 ? (
    //       <Text fontSize="24px">{user?.coins}</Text>
    //     ) : (
    //       <Text fontSize="24px">0</Text>
    //     )}
    //   </Box>

    //   <Box flex="1" width="100%" backgroundColor="#2b329b" textAlign="center">
    //     <Text fontSize="18px" fontWeight="bold">
    //       PlayerID
    //     </Text>
    //     <Text fontSize="24px">{user?.userId}</Text>
    //   </Box>
    // </Box>

    <Box
    // border="5px dotted blue"
    width="30%"
    height="80%"
    position="absolute"
    right="0"
    top="35%"
    display="flex"
    justifyContent="space-between"
    flexDirection="column"
  >
    <Box
      border="20px solid #333"
      width="100%"
      justifyContent="center"
      align="center"
      borderRadius="10%"
    >
      <Box backgroundColor="#2d6431" padding="0.5rem">
        <Text fontSize="18px" fontWeight="bold">
          Available Credit
        </Text>
        <Text fontSize="18px" margin="0 0 0.5rem">
          ${user?.coins}
        </Text>
      </Box>

      <Box backgroundColor="#e0e0e0" padding="0.5rem">
        <Text fontSize="18px" fontWeight="bold">
          Player ID
        </Text>
        <Text fontSize="18px" margin="0 0 0.5rem">
          123456
        </Text>
      </Box>
    </Box>

    {/* New Box */}
    <Text align="center" fontWeight="bold">
      Place Your Bet!
    </Text>
    <Box
      border="5px solid #4790b5"
      width="100%"
      height="16%"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      borderRadius="5rem"
    >
      {[
        { value: 10, imageName: "10's coin.webp" },
        { value: 50, imageName: "50's coin.webp" },
        { value: 100, imageName: "100's coin.webp" },
        { value: 500, imageName: "500's coin.webp" },
        { value: 1000, imageName: "1000's coin.webp" },
        { value: 5000, imageName: "5000's coin.webp" },
      ].map((item, index) => (
        <Button
          // border="2px solid grey"
          key={index}
          aria-label={`Coin value: ${item.value}`}
          variant="unstyled"
          width="100%"
          height="100%"
        >
          <img
            src={`/Coins/${item.imageName}`}
            alt={`Image for ${item.imageName}`}
            style={{ width: "80%", height: "80%" }}
          />
        </Button>
      ))}
    </Box>

    {/* Player Button */}
    <Box
      border="2px solid red"
      width="100%"
      flexDirection="row"
      height="30%"
      display="flex"
      // justifyContent="space-between"
      // alignItems="center"
    >
      <Button width="100%" height="100%" variant="unstyled">
        <Image
          src="/DragonTigerLion/DRAGON TIGER LION/DRAGON.webp"
          alt="Dragon Image"
          width="100%"
          height="100%"
        />
      </Button>
      <Button width="100%" height="100%" variant="unstyled">
        <Image
          src="/DragonTigerLion/DRAGON TIGER LION/TIGER.webp"
          alt="Tiger Image"
          width="100%"
          height="100%"
        />
      </Button>
      <Button width="100%" height="100%" variant="unstyled">
        <Image
          src="/DragonTigerLion/DRAGON TIGER LION/LION.webp"
          alt="Lion Image"
          width="100%"
          height="100%"
        />
      </Button>
    </Box>
  </Box>

  );
};

UserInfo.propTypes = {
  user: PropTypes.shape({
    coins: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserInfo;
