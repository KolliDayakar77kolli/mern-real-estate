import React from 'react';
import { useHistory } from "react-router-dom";
import { Box, SimpleGrid, Button, Text } from '@chakra-ui/react';
import { FaHome, FaBuilding, FaIndustry, FaTractor } from "react-icons/fa";

const WeOffer = () => {
  const history = useHistory();
  const cards = [
    { name: 'Amaravathi', image: 'budda.jpg', type: 'Amaravathi', icon: <FaHome />, aos: 'flip-right' },
    { name: 'Andhra', image: 'Ap_land.jpg', type: 'Andhra', icon: <FaBuilding />, aos: 'flip-left' },
    { name: 'Telangana', image: 'Ts_plots.jpg', type: 'Telangana', icon: <FaIndustry />, aos: 'flip-right' },
    { name: 'Commercial', image: 'commercial_build.jpg', type: 'Commercial', icon: <FaTractor />, aos: 'flip-left' },
  ];
  
  const handleTypeClick = (type) => {
    history.push(`/posts?type=${type}`);
  };

  return (
    <Box width="100%" display="flex" justifyContent="center" py={10}>
    <SimpleGrid columns={[1, 2, 2, 4]} spacing={10} width="90%">
      {cards.map((card, index) => (
        <Box
          key={index}
          position="relative"
          height="200px"
          bgImage={card.image}
          bgSize="cover"
          bgPos="center"
          borderRadius="md"
          overflow="hidden"
          cursor="pointer"
          onClick={() => handleTypeClick(card.type)}
          data-aos={card.aos}
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="blackAlpha.700"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            p={4}
          >
            <Box display="flex" color="white" fontSize="xl" alignItems="center" position="absolute" top="4" left="4">
              {card.icon}
              <Text fontSize="xl" color="white" ml={2}>
                {card.name}
              </Text>
            </Box>
            <Button
              position="absolute"
              bottom="4"
              right="4"
              size="sm"
              colorScheme="green"
            >
              View More
            </Button>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  </Box>
  );
};

export default WeOffer;
