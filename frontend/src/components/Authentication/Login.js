import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { Text, Center, Box } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const history = useHistory();
  const toast = useToast();

  const validateForm = () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return false;
    }
    setError("");
    return true;
  };

  const submitHandler = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post("/api/user/login", { email, password });

      toast({
        title: "Login successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/admin");
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.response?.data.message || "Unknown error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
    }
  };

  const gotoHome = () => {
    history.push("/");
  }



  return (
    <div
      style={{
        backgroundImage: `url("budda.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
     <Center flexDirection="column" textAlign="center" p={4} maxW="600px" borderRadius="lg" boxShadow="lg">
      <Text fontSize="3xl" fontWeight="bold" mb={2} color="white">
        Welcome Admin
      </Text>
      <Text fontSize="lg" mb={4} color="white">
        Please login
      </Text>
      <Box w="100%" bg="white" p={8} borderRadius="lg" color="black" maxW="500px" height="auto">
        <VStack spacing="4" align="stretch">
          <FormControl id="email" isRequired isInvalid={!!error}>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired isInvalid={!!error}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
                <Button h="1.75rem" size="sm" onClick={togglePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          {error && (
            <Text color="red" fontSize="sm" align="left">
              {error}
            </Text>
          )}
          <Button
            colorScheme="blue"
            width="100%"
            onClick={submitHandler}
            isLoading={loading}
            loadingText="Logging In..."
          >
            Login
          </Button>

          <Button
            colorScheme="green"
            width="100%"
            onClick={gotoHome}
          >
            Home
          </Button>
        </VStack>
      </Box>
    </Center>
      </div>
    </div>
  );
};

export default Login;