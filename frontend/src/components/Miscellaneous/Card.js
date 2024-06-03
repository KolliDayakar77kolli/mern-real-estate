import React from 'react';
import {
  ChakraProvider, Box, Image, Heading, Text, Tag, Flex, Icon,
} from '@chakra-ui/react';
import { FaStar, FaStarHalfAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const slides = [
  {
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/first-course.jpg',
    title: 'A Taste of the Kitchen',
    tag: 'Served Family Style',
    description: 'Possimus deserunt nisi perferendis, consequuntur odio et aperiam, est, dicta dolor itaque sunt laborum, magni qui optio.',
    rating: 5,
  },
  {
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/second-course.jpg',
    title: 'Rustic Reds',
    tag: 'From the land of Italy',
    description: 'Totam at eius excepturi deleniti sed, error repellat itaque omnis maiores tempora ratione dolor velit minus porro aspernatur repudiandae.',
    rating: 3.5,
  },
  {
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/third-course.jpg',
    title: 'Delicious Desserts',
    tag: 'Seasonal Ingredients',
    description: 'Vel nam odio dolorem, voluptas sequi minus quo tempore, animi est quia earum maxime. Reiciendis quae repellat, modi non, veniam.',
    rating: 4,
  },
];

const Card = () => {
  const renderThumbs = () => {
    return slides.map((slide, index) => (
      <Box
        key={index}
        className="thumb"
        width="75px"
        height="75px"
        borderRadius="50%"
        overflow="hidden"
        border="3px solid white"
        _hover={{ border: '3px solid #d3c8be' }}
      >
        <Image src={slide.img} alt={slide.title} objectFit="cover" width="100%" height="100%" />
      </Box>
    ));
  };

  return (
    <ChakraProvider>
      <Box
        bgImage="url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/wine-bg.jpg')"
        bgPos="center"
        bgSize="cover"
        minH="100vh"
        fontFamily="'Open Sans', serif"
      >
        <Flex justify="center" mt={8}>
          <Box
            maxW="1100px"
            width={{ base: '90%', md: '800px' }}
            bg="white"
            p={{ base: 4, md: 8 }}
            borderRadius="md"
            boxShadow="xl"
          >
            <Carousel
              showThumbs
              showStatus={false}
              infiniteLoop
              renderThumbs={renderThumbs}
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <Icon
                    as={FaChevronLeft}
                    onClick={onClickHandler}
                    position="absolute"
                    left={0}
                    top="50%"
                    transform="translateY(-50%)"
                    boxSize={6}
                    cursor="pointer"
                    zIndex={1}
                  />
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <Icon
                    as={FaChevronRight}
                    onClick={onClickHandler}
                    position="absolute"
                    right={0}
                    top="50%"
                    transform="translateY(-50%)"
                    boxSize={6}
                    cursor="pointer"
                    zIndex={1}
                  />
                )
              }
            >
              {slides.map((slide, index) => (
                <Flex direction={{ base: 'column', md: 'row' }} key={index}>
                  <Image src={slide.img} alt={slide.title} objectFit="cover" flex={{ base: 'none', md: '1' }} />
                  <Box p={4} flex={{ base: 'none', md: '1' }}>
                    <Heading as="h3" fontSize="2xl" fontWeight="bold" color="gray.800">
                      {slide.title}
                    </Heading>
                    <Tag mt={2} colorScheme="orange">
                      {slide.tag}
                    </Tag>
                    <Text mt={4} fontSize="md" lineHeight="tall">
                      {slide.description}
                    </Text>
                    <Box mt={4} color="orange.400">
                      <Flex>
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            as={i < Math.floor(slide.rating) ? FaStar : FaStarHalfAlt}
                            boxSize={4}
                            mr={1}
                          />
                        ))}
                      </Flex>
                    </Box>
                  </Box>
                </Flex>
              ))}
            </Carousel>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default Card;
