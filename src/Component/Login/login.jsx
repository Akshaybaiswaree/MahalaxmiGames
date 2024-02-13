import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import axios from "axios";
import { useState } from "react";

// import { API_URL } from "../components/api";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ mobile_no: "", password: "" });
  const navigate = useNavigate();
  const mobileNumber =
    "http://ec2-23-22-31-134.compute-1.amazonaws.com:5100/userMaster/verifyMobile";
  // const verifyMobile = "http://ec2-23-22-31-134.compute-1.amazonaws.com:5100/userMaster/verifyOtp"
  const toast = useToast();
  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const handleSubmit = () => {
    console.log(data);

    axios
      .post(`${mobileNumber}`, data)
      .then((req) => {
        console.log("mobilenumber", req.data);
        if (req.status === 200) {
          toast({
            title: req.data.message,
            // description: "We've created your account for you.",
            status: "success",
            duration: 3000,
            position: "top",
            isClosable: true,
          });
          localStorage.setItem("token", req.data.token);
          localStorage.setItem("auth", true);
          if (req.data.type == "mainpage") {
            navigate("/mainpage");
          } else {
            navigate("/");
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          // Handle other errors and responses here
          console.error("Error response from the server:", error.response.data);
          toast({
            title: error.response.data.message,
            // description: "We've created your account for you.",
            status: "info",
            duration: 3000,
            position: "top",
            isClosable: true,
          });
        } else if (error.request) {
          // Handle network issues
          console.error("Network error:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl
              onChange={(e) => handleChange(e)}
              id="mobile_no"
              isRequired
            >
              <FormLabel>Mobile no</FormLabel>
              <Input type="number" />
            </FormControl>
            <FormControl
              onChange={(e) => handleChange(e)}
              id="password"
              isRequired
            >
              <FormLabel>OTP</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack onClick={() => handleSubmit()} spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Login
              </Button>
            </Stack>

            <Stack onClick={() => handleSubmit()} spacing={10} pt={2}>
              <NavLink to="/mainpage" align="center">
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Login With Demo
                </Button>
              </NavLink>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
