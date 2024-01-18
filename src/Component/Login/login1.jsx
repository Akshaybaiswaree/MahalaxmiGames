import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react";
import LoginIcon from "@mui/icons-material/Login";
import Logo from "./Logo.png";
import axios from "axios";
import { useState } from "react";

// import Logo from "@/assets/Logo.png";




//  import LOGO from "../images/Logo.png";

const Login = () => {
  const [formData, setFormData] = useState({
    playerEmail: "harsh@example.com",
    playerPassword: "harsh123",
    // playerEmail: "",
    // playerPassword: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your logic for admin login here
    try {
      console.log(formData, "response");
      // eslint-disable-next-line no-undef
      const response = await axios.post(`http://localhost:4000/login/user`, {
        data: formData,

        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      alert("Saved successfully.");
      // navigate("/");
      navigate("/Mainpage");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Box
        width="100%"
        minHeight="100vh"
        bgGradient="linear( #2B329B, #0b2948)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          width={["90%", "70%", "50%", "30%"]} // Adjust width for different screen sizes
          p={["2", "4"]} // Adjust padding for different screen sizes
        >
          <Flex align="center" justify="center" mb={2}>
            <img src={Logo} alt="" width="150px" />
          </Flex>

          <Box bg="white" color="black" p="4" borderRadius="10px">
            <Flex align="center" justify="center" mb={3} gap={1} color="blue">
              <Text fontSize={["2xl", "3xl"]}>LOGIN</Text>
              <Box
                height={["1rem", "1.5rem"]}
                marginLeft={["0.2rem", "0.5rem"]}
                marginTop={["0.3rem", "0.6rem"]}
              >
                <Icon
                  height={["1.5rem", "1.8rem"]}
                  icon="fa-solid:hand-point-down"
                  ml={2}
                  boxSize={6}
                />
              </Box>
            </Flex>

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="playerEmail"
                  value={formData.playerEmail}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="playerPassword"
                  value={formData.playerPassword}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                />
              </FormControl>
              {/* <NavLink to="/admin/dashboard"> */}
              <Button colorScheme="teal" width="50%" mt={4} type="submit">
                Submit
              </Button>
              {/* </NavLink> */}
            </form>

            <Text fontWeight="lighter" fontSize="sm" mb="2">
              This site is protected by reCAPTCHA and the Google
              <a href="#">Privacy Policy</a> and
              <a href="#">Terms of Service</a> apply.
            </Text>

            <NavLink to="/mainpage">
              <Button colorScheme="blue" width="100%">
                <Flex justify="space-between" align="center">
                  Login With Demo <LoginIcon />
                  {/* <Icon icon="entypo:login" ml={2} /> */}
                </Flex>
              </Button>
            </NavLink>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
