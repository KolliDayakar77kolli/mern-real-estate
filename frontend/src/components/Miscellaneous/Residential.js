// src/components/Residential.js
import React, { useState } from 'react';
import { Box, Flex, Image, Text, Button, VStack, HStack, Stack } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Residential = () => {
  
const data = [
    {
      title: 'Beautiful Home 1',
      description: 'Description for Beautiful Home 1',
      images: ['https://source.unsplash.com/random/800x600?nature', 'https://source.unsplash.com/random/800x600?nature']
    },
    {
      title: 'Beautiful Home 2',
      description: 'Description for Beautiful Home 2',
      images: ['https://source.unsplash.com/random/800x600?nature', 'https://source.unsplash.com/random/800x600?nature']
    },
    {
      title: 'Beautiful Home 3',
      description: 'Description for Beautiful Home 3',
      images: ['https://source.unsplash.com/random/800x600?nature', 'https://source.unsplash.com/random/800x600?nature']
    },
    // Add more items as needed
  ];
  
  const itemsPerPage = 2; // Adjust based on desired items per page
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <VStack spacing={4} align="stretch">
      {paginatedData.map((item, index) => (
        <Flex
          key={index}
          direction={{ base: 'column', md: 'row' }}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          overflow="hidden"
          w="100%"
          h={{ base: 'auto', md: '300px' }}
        >
          <Box flex={{ base: '0 0 auto', md: '0 0 50%' }} h={{ base: '200px', md: '100%' }}>
            <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
              {item.images.map((img, imgIndex) => (
                <Image key={imgIndex} src={img} objectFit="cover" h="100%" w="100%" />
              ))}
            </Carousel>
          </Box>
          <Box flex={{ base: '0 0 auto', md: '0 0 50%' }} p={4} display="flex" flexDirection="column" justifyContent="space-between">
            <Box>
              <Text fontSize="lg" fontWeight="bold">{item.title}</Text>
              <Text mt={2}>{item.description}</Text>
            </Box>
            <Button mt={4} colorScheme="teal" alignSelf={{ base: 'center', md: 'flex-start' }}>
              View More
            </Button>
          </Box>
        </Flex>
      ))}
      <Stack direction="row" spacing={4} align="center" justify="center" mt={4}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          leftIcon={<ChevronLeftIcon />}
          variant="outline"
          colorScheme="teal"
        >
          Previous
        </Button>
        {[...Array(totalPages).keys()].map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page + 1)}
            variant={currentPage === page + 1 ? "solid" : "outline"}
            colorScheme={currentPage === page + 1 ? "teal" : "gray"}
          >
            {page + 1}
          </Button>
        ))}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          rightIcon={<ChevronRightIcon />}
          variant="outline"
          colorScheme="teal"
        >
          Next
        </Button>
      </Stack>
    </VStack>
  );
};

export default Residential;
