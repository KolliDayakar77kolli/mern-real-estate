// src/HomeProjects.js
import React from 'react';
import { Box, Flex, Image, Text, Icon, Button } from '@chakra-ui/react';
import { FaBuilding, FaHome, FaIndustry } from 'react-icons/fa';

const projects = [
    {
        type: 'Residential',
        icon: FaHome,
        image: 'https://source.unsplash.com/random/800x600?nature',
        description: 'Beautiful homes for families and individuals.',
    },
    {
        type: 'Commercial',
        icon: FaBuilding,
        image: 'https://source.unsplash.com/random/800x600?nature',
        description: 'Commercial properties for businesses.',
    },
    {
        type: 'Industrial',
        icon: FaIndustry,
        image: 'https://source.unsplash.com/random/800x600?nature',
        description: 'Industrial spaces for manufacturing.',
    },
];

const HomeProjects = () => {
    return (
      <Box bg="#F3F5F1" py={10} px={5}>
            <Text
            paddingTop="100px"
            fontSize="12.5px"
            color="#5ea51d"
            fontFamily="'Nunito Sans', Arial, sans-serif"
            textAlign="center"
            fontWeight="800"
          >
            OUR PROJECTS
          </Text>
        <Text
          fontSize={["24px", "30px", "36px", "45px"]} // Responsive font sizes
          color="#000000CC"
          fontFamily="'Nunito Sans', Arial, sans-serif"
          textAlign="center"
          mb={6}
          data-aos="fade-left"
        >
          Our Projects
        </Text>
        <Flex
          paddingTop="30px"
          paddingBottom="200px"
          direction={["column", "column", "row"]}
          justify="center"
          align="center"
          wrap="wrap"
          maxW="1200px"
          mx="auto"
          gap={5}
        >
          {projects.map((project, index) => (
            <Box
              key={index}
              bg="white"
              borderRadius="md"
              boxShadow="xl"
              maxW="sm"
              overflow="hidden"
              textAlign="center"
              fontFamily="'Roboto', sans-serif"
              data-aos="fade-up"
            >
              <Image src={project.image} alt={project.type} />
              <Box p={5}>
                <Icon as={project.icon} w={8} h={8} mb={4} color="gray.600" />
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  {project.type}
                </Text>
                <Text mb={4}>{project.description}</Text>
                <Button colorScheme="teal" variant="outline">
                  View More
                </Button>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    );
};

export default HomeProjects;
