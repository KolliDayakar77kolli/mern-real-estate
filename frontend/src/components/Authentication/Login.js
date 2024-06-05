// import { Button } from "@chakra-ui/button";
// import { FormControl, FormLabel } from "@chakra-ui/form-control";
// import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
// import { VStack } from "@chakra-ui/layout";
// import { useState } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// const Login = () => {
//   const [show, setShow] = useState(false);
//   const handleClick = () => setShow(!show);
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [loading, setLoading] = useState(false);

//   const history = useHistory();

//   const submitHandler = async () => {
//     setLoading(true);
//     if (!email || !password) {
//     //   toast({
//     //     title: "Please Fill all the Feilds",
//     //     status: "warning",
//     //     duration: 5000,
//     //     isClosable: true,
//     //     position: "bottom",
//     //   });
//     window.alert("fill all")
//       setLoading(false);
//       return;
//     }

//     try {
//     //   const config = {
//     //     headers: {
//     //       "Content-type": "application/json",
//     //     },
//     //   };

//       const { data } = await axios.post(
//         "/api/user/login",
//         { email, password }
//         // ,config
//       );

//     //   toast({
//     //     title: "Login Successful",
//     //     status: "success",
//     //     duration: 5000,
//     //     isClosable: true,
//     //     position: "bottom",
//     //   });
//     window.alert("login succ")

//       // setUser(data);
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       setLoading(false);
//       history.push("/admin");
//     } catch (error) {
//     //   toast({
//     //     title: "Error Occured!",
//     //     description: error.response.data.message,
//     //     status: "error",
//     //     duration: 5000,
//     //     isClosable: true,
//     //     position: "bottom",
//     //   });
//     window.alert("err occ")

//       setLoading(false);
//     }
//   };

//   return (
//     <VStack spacing="10px">
//       <FormControl id="email" isRequired>
//         <FormLabel>Email Address</FormLabel>
//         <Input
//           value={email}
//           type="email"
//           placeholder="Enter Your Email Address"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </FormControl>
//       <FormControl id="password" isRequired>
//         <FormLabel>Password</FormLabel>
//         <InputGroup size="md">
//           <Input
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             type={show ? "text" : "password"}
//             placeholder="Enter password"
//           />
//           <InputRightElement width="4.5rem">
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>
//       <Button
//         colorScheme="blue"
//         width="100%"
//         style={{ marginTop: 15 }}
//         onClick={submitHandler}
//         isLoading={loading}
//       >
//         Login
//       </Button>
//       {/* <Button
//         variant="solid"
//         colorScheme="red"
//         width="100%"
//         onClick={() => {
//           setEmail("guest@example.com");
//           setPassword("123456");
//         }}
//       >
//         Get Guest User Credentials
//       </Button> */}
//     </VStack>
//   );
// };

// export default Login;





















// import { Button } from "@chakra-ui/button";
// import { FormControl, FormLabel } from "@chakra-ui/form-control";
// import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
// import { VStack } from "@chakra-ui/layout";
// import { useState } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import { Text, Box } from "@chakra-ui/react";
// import { useToast } from "@chakra-ui/toast";

// const Login = () => {
//   const [show, setShow] = useState(false);
//   const handleClick = () => setShow(!show);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const history = useHistory();
//   const toast = useToast();

//   const submitHandler = async () => {
//     setLoading(true);
//     if (!email || !password) {
//       toast({
//         title: "Please fill all fields",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//       return;
//     }

//     try {
//       const { data } = await axios.post("/api/user/login", { email, password });

//       toast({
//         title: "Login successful",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });

//       localStorage.setItem("userInfo", JSON.stringify(data));
//       setLoading(false);
//       history.push("/admin");
//     } catch (error) {
//       toast({
//         title: "An error occurred!",
//         description: error.response?.data.message || "Unknown error",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });

//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//       }}
//     > <Box display="flex" flexDirection="column">
//       <Text textAlign="center" fontSize="20px">Welcome, Admin</Text>

//       <VStack spacing="20px" p={7} bg="#F3F5F1" width="100%" maxW="400px">
//         <FormControl id="email" isRequired>
//           <FormLabel>Email Address</FormLabel>
//           <Input
//             value={email}
//             type="email"
//             placeholder="Enter Your Email Address"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </FormControl>
//         <FormControl id="password" isRequired>
//           <FormLabel>Password</FormLabel>
//           <InputGroup size="md">
//             <Input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type={show ? "text" : "password"}
//               placeholder="Enter password"
//             />
//             <InputRightElement width="4.5rem">
//               <Button h="1.75rem" size="sm" onClick={handleClick}>
//                 {show ? "Hide" : "Show"}
//               </Button>
//             </InputRightElement>
//           </InputGroup>
//         </FormControl>
//         <Button
//           colorScheme="blue"
//           width="100%"
//           style={{ marginTop: 15 }}
//           onClick={submitHandler}
//           isLoading={loading}
//         >
//           Login
//         </Button>
//         {(!email || !password) && (
//           <Text color="red" fontSize="sm">
//             Please fill all fields.
//           </Text>
//         )}
//       </VStack>
//       </Box>
//     </div>
//   );
// };

// export default Login;






import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
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
        backgroundImage: `url("https://source.unsplash.com/random/1600x900")`,
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
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity if needed
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
