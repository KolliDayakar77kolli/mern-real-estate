import React from 'react';
import { Box, Text, Flex, Image, Button, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';  // Assuming you are using react-router-dom

const Unique = () => {
  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });

  return (
    <Flex
      direction={flexDirection}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      align="center"
    >
      {/* Left side with image */}
      <Flex
        flex="1"
        justify={{ base: 'center', md: 'center' }}
        align="center"
        p={1}
      >
        <Image
          src="Owner_Big_Photo.jpg"  // Replace with your actual image path
          alt="Real Estate"
          // boxSize="400px"  // Adjust size as needed
          w="100%"
          h="400px"
          objectFit="cover"
          borderRadius="md"
        />
      </Flex>

 {/* Right side with text and button */}
 <Flex flex="1" direction="column" p={8}>
     
        <Text
            fontSize="12.5px"
            color="#5ea51d"
            fontFamily="'Nunito Sans', Arial, sans-serif"
            fontWeight="800"
          >
            Our Special
          </Text>
          <Text
            fontSize={["16px", "24px", "30px", "36px"]} // Responsive font sizes
            color="#000000CC"
            fontFamily="'Nunito Sans', Arial, sans-serif"
            mb={6}
          >
          What makes us unique from others

          </Text>
        <Text ml={6} fontSize="lg" color="gray.600" mb={8}  listStyleType="disc">
          <ul>
          <li>Exceptional customer service</li>
            <li>Unparalleled market expertise</li>
            <li>Dedication to finding the perfect property</li>
            <li>Experienced professionals staying ahead of market trends</li>
            <li>Innovative solutions and personalized service</li>
            <li>Building lasting relationships grounded in trust, integrity, and transparency</li>
          </ul>
        </Text>
        <Button
          as={Link}
          to="/about"
          bg="#5ea51d"
          size="md"
          mt="auto"
          width="200px"
        >
          Read more
        </Button>
      </Flex>
    </Flex>
  );
};

export default Unique;



// import React from 'react';
// import { Box, Text, Flex, useBreakpointValue } from '@chakra-ui/react';

// const Unique = () => {
//   const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });

//   return (
//     <Flex
//       direction={flexDirection}
//       p={4}
//       borderWidth={1}
//       borderRadius="md"
//       boxShadow="md"
//       bg="white"
//       align="center"
//     >
//       <Box flex="1" p={4}>
//         <Text
//           fontSize="2xl"
//           fontWeight="bold"
//           textAlign={{ base: 'center', md: 'left' }}
//         >
//           What makes us unique from others
//         </Text>
//       </Box>
//       <Box flex="1" p={4}>
//         <Text
//           fontSize="lg"
//           textAlign={{ base: 'center', md: 'left' }}
//           color="gray.600"
//         >
//           At Ratna Real Estate, we pride ourselves on offering exceptional customer service, unparalleled market expertise, and a dedication to ensuring our clients find the perfect property to meet their needs. Our team of experienced professionals works tirelessly to stay ahead of market trends, providing innovative solutions and personalized service that sets us apart from the competition. We believe in building lasting relationships with our clients, grounded in trust, integrity, and transparency.
//         </Text>
//       </Box>
//     </Flex>
//   );
// };

// export default Unique;



