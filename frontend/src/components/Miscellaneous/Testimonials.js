import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Box, Image, Text, Center, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const testimonials = [
  {
    image: 'Mandali_Rama_Krishna.jpeg',
    quote: "Ratna Real Estate helped us find our dream home with ease. The team is professional and extremely knowledgeable about the market.",
    name: "Mandali Rama Krishna"
  },
  {
    image: 'Agasthya_Sai.jpeg',
    quote: "Thanks to Ratna Real Estate, I sold my house at a great price. Their service is exceptional and Highly recommend!",
    name: "Agasthya Sai"
  },
  {
    image: 'Hema_Ram_Reddy.jpeg',
    quote: "Finding a rental property was never this easy. Highly recommend Ratna Real Estate for their outstanding service.",
    name: "Hema Ram Reddy"
  }
];

const Testimonials = () => {
  return (
    <>
      <Text
        fontSize="12.5px"
        color="#5ea51d"
        fontFamily="'Nunito Sans', Arial, sans-serif"
        textAlign="center"
        fontWeight="800"
      >
        TESTIMONIALS
      </Text>
      <Text
        fontSize={["24px", "30px", "36px", "45px"]} // Responsive font sizes
        color="#000000CC"
        fontFamily="'Nunito Sans', Arial, sans-serif"
        textAlign="center"
        mb={6}
        data-aos="fade-right"
      >
        What Our Customers Says...
      </Text>
      <Box maxW="800px" mx="auto" py={10} px={5}>
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={3000}
          transitionTime={500}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <IconButton
                onClick={onClickHandler}
                aria-label={label}
                icon={<ChevronLeftIcon boxSize={8} color="green.500" />}
                position="absolute"
                left={5}
                top="50%"
                transform="translateY(-50%)"
                bg="white"
                _hover={{ bg: "gray.200" }}
                zIndex={2}
              />
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <IconButton
                onClick={onClickHandler}
                aria-label={label}
                icon={<ChevronRightIcon boxSize={8} color="green.500" />}
                position="absolute"
                right={5}
                top="50%"
                transform="translateY(-50%)"
                bg="white"
                _hover={{ bg: "gray.200" }}
                zIndex={2}
              />
            )
          }
        >
          {testimonials.map((testimonial, index) => (
            <Box
              key={index}
              p={5}
              borderWidth="1px"
              borderRadius="xl"
              overflow="hidden"
              bg="white"
              boxShadow="xl"
              textAlign="center"
            >
              <Center>
                <Box
                  w="200px"
                  h="200px"
                  border="3px dashed green"
                  p={1}
                  borderRadius="full"
                  overflow="hidden"
                >
                  <Image
                    borderRadius="full"
                    src={testimonial.image}
                    alt={testimonial.name}
                    objectFit="cover"
                    h="100%"
                    w="100%"
                  />
                </Box>
              </Center>
              <Text mt={4} fontSize="lg" fontStyle="italic">
                "{testimonial.quote}"
              </Text>
              <Text mt={2} mb={7} fontWeight="bold">
                - {testimonial.name}
              </Text>
            </Box>
          ))}
        </Carousel>
      </Box>
    </>
  );
};

export default Testimonials;
