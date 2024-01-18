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
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// import { API_URL } from "../components/api";




export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ mobile_no: "", password: "" });
  const navigate = useNavigate();
  const toast = useToast();
  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const handleSubmit = () => {
    console.log(data);

    axios
      .post(`${API_URL}/user/login`, data)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          toast({
            title: res.data.message,
            // description: "We've created your account for you.",
            status: "success",
            duration: 3000,
            position: "top",
            isClosable: true,
          });
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("auth", true);
          if (res.data.type == "admin") {
            navigate("/admin");
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
              <FormLabel>Password</FormLabel>
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
            <Stack pt={6}>
              <Text align={"center"}>
                Not Registered?{" "}
                <Link href="./RegisterPage" color={"blue.400"}>
                  Register here
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
