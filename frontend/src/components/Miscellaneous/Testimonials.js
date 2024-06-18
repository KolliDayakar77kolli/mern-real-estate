import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Box, Image, Text, Center } from '@chakra-ui/react';

const testimonials = [
  {
    image: 'budda.jpg',
    quote: "Ratna Real Estate helped us find our dream home with ease. The team is professional and extremely knowledgeable about the market.",
    name: "John Doe"
  },
  {
    image: 'commercial_build.jpg',
    quote: "Thanks to Ratna Real Estate, we sold our house at a great price. Their service is exceptional!",
    name: "Jane Smith"
  },
  {
    image: 'Ap_land.jpg',
    quote: "Finding a rental property was never this easy. Highly recommend Ratna Real Estate for their outstanding service.",
    name: "Mike Johnson"
  }
];

const Testimonials = () => {
  return (
    <Box maxW="800px" mx="auto" py={10} px={5}>
      <Carousel 
        showThumbs={false} 
        showStatus={false} 
        infiniteLoop 
        autoPlay 
        interval={3000} 
        transitionTime={500}
      >
        {testimonials.map((testimonial, index) => (
          <Box key={index} p={5} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg" textAlign="center">
            <Center>
              <Image
                borderRadius="full"
                boxSize="150px"
                src={testimonial.image}
                alt={testimonial.name}
                border="2px solid black"
                p={1}
              />
            </Center>
            <Text mt={4} fontSize="lg" fontStyle="italic">
              "{testimonial.quote}"
            </Text>
            <Text mt={2} fontWeight="bold">
              - {testimonial.name}
            </Text>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Testimonials;
