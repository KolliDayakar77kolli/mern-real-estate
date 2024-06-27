import React, { useEffect } from 'react';
import { Box, Flex, Heading, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaBullseye, FaEye, FaHandHoldingHeart } from 'react-icons/fa';

const MV = () => {

  const iconColor = useColorModeValue('teal.500', 'teal.300');
  const boxBgColor = useColorModeValue('white', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Flex 
      direction={['column', 'column', 'row']} 
      align="center" 
      justify="center" 
      w="100%" 
      p={4}
      // bg="white"
    >
      <Box
        flex="1"
        p={6}
        m={4}
        border="1px"
        borderColor={borderColor}
        borderRadius="md"
        textAlign="center"
        bg={boxBgColor}
        boxShadow="xl"
        data-aos="fade-up"
      >
        <Icon as={FaBullseye} w={12} h={12} mb={4} color={iconColor} />
        <Heading size="lg" mb={4}>Our Mission</Heading>
        <Text>
          Our mission is to empower individuals and organizations through innovative solutions and services that drive success and growth.
        </Text>
      </Box>

      <Box
        flex="1"
        p={6}
        m={4}
        border="1px"
        borderColor={borderColor}
        borderRadius="md"
        textAlign="center"
        bg={boxBgColor}
        boxShadow="xl"
        data-aos="fade-up"
      >
        <Icon as={FaEye} w={12} h={12} mb={4} color={iconColor} />
        <Heading size="lg" mb={4}>Our Vision</Heading>
        <Text>
          Our vision is to be a global leader in our industry, setting standards for excellence and integrity, and making a positive impact on society.
        </Text>
      </Box>

      <Box
        flex="1"
        p={6}
        m={4}
        border="1px"
        borderColor={borderColor}
        borderRadius="md"
        textAlign="center"
        bg={boxBgColor}
        boxShadow="xl"
        data-aos="fade-up"
      >
        <Icon as={FaHandHoldingHeart} w={12} h={12} mb={4} color={iconColor} />
        <Heading size="lg" mb={4}>Our Values</Heading>
        <Text>
          Our values are integrity, innovation, and customer focus, guiding our actions and decisions in every aspect of our business.
        </Text>
      </Box>
    </Flex>
  );
}

export default MV;









// import React from 'react';
// import { Box, Flex, Heading, Text, Icon } from '@chakra-ui/react';
// import { FaBullseye, FaEye, FaHandHoldingHeart } from 'react-icons/fa';

// const MV = () => {
//   return (
//     <Flex 
//       direction={['column', 'column', 'row']} 
//       align="center" 
//       justify="center" 
//       w="100%" 
//       p={4}
//     >
//       <Box 
//         flex="1" 
//         p={4} 
//         m={2} 
//         border="1px" 
//         borderColor="gray.200" 
//         borderRadius="md" 
//         textAlign="center"
//       >
//         <Icon as={FaBullseye} w={8} h={8} mb={4} />
//         <Heading size="lg" mb={4}>Our Mission</Heading>
//         <Text>
//           Our mission is to empower individuals and organizations through innovative solutions and services that drive success and growth.
//         </Text>
//       </Box>

//       <Box 
//         flex="1" 
//         p={4} 
//         m={2} 
//         border="1px" 
//         borderColor="gray.200" 
//         borderRadius="md" 
//         textAlign="center"
//       >
//         <Icon as={FaEye} w={8} h={8} mb={4} />
//         <Heading size="lg" mb={4}>Our Vision</Heading>
//         <Text>
//           Our vision is to be a global leader in our industry, setting standards for excellence and integrity, and making a positive impact on society.
//         </Text>
//       </Box>

//       <Box 
//         flex="1" 
//         p={4} 
//         m={2} 
//         border="1px" 
//         borderColor="gray.200" 
//         borderRadius="md" 
//         textAlign="center"
//       >
//         <Icon as={FaHandHoldingHeart} w={8} h={8} mb={4} />
//         <Heading size="lg" mb={4}>Our Values</Heading>
//         <Text>
//           Our values are integrity, innovation, and customer focus, guiding our actions and decisions in every aspect of our business.
//         </Text>
//       </Box>
//     </Flex>
//   );
// }

// export default MV;









// import React from 'react';
// import { Box, Flex, Heading, Text } from '@chakra-ui/react';

// const MV = () => {
//   return (
//     <Flex 
//       direction={['column', 'column', 'row']} 
//       align="center" 
//       justify="center" 
//       w="100%" 
//       p={4}
//     >
//       <Box 
//         flex="1" 
//         p={4} 
//         m={2} 
//         border="1px" 
//         borderColor="gray.200" 
//         borderRadius="md" 
//         textAlign="center"
//       >
//         <Heading size="lg" mb={4}>Our Mission</Heading>
//         <Text>
//           Our mission is to empower individuals and organizations through innovative solutions and services that drive success and growth.
//         </Text>
//       </Box>

//       <Box 
//         flex="1" 
//         p={4} 
//         m={2} 
//         border="1px" 
//         borderColor="gray.200" 
//         borderRadius="md" 
//         textAlign="center"
//       >
//         <Heading size="lg" mb={4}>Our Vision</Heading>
//         <Text>
//           Our vision is to be a global leader in our industry, setting standards for excellence and integrity, and making a positive impact on society.
//         </Text>
//       </Box>

//       <Box 
//         flex="1" 
//         p={4} 
//         m={2} 
//         border="1px" 
//         borderColor="gray.200" 
//         borderRadius="md" 
//         textAlign="center"
//       >
//         <Heading size="lg" mb={4}>Our Values</Heading>
//         <Text>
//           Our values are integrity, innovation, and customer focus, guiding our actions and decisions in every aspect of our business.
//         </Text>
//       </Box>
//     </Flex>
//   );
// }

// export default MV;
