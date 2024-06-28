import React from 'react';
import { Box, Flex, Text, VStack, Stack, useBreakpointValue, Link, Icon, Heading } from '@chakra-ui/react';
import { PhoneIcon, EmailIcon, InfoIcon } from '@chakra-ui/icons';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const linkStyles = {
  textDecoration: 'none',
  fontWeight: '450',
  color: 'white',
  _hover: { textDecoration: 'none' }
};

const Footer = () => {
  const stackDirection = useBreakpointValue({ base: 'column', md: 'row' });
  const alignItems = useBreakpointValue({ base: 'flex-start', md: 'center' });

  return (
    <>
      <Flex w="100%" direction="column">
        <Box
          flex="0 0 85%"
          bg="#06112A"
          color="#FFFFFFB3"
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          p={10}
        >
          <Stack
            direction={stackDirection}
            spacing={8}
            w="100%"
            justify="space-evenly"
            alignItems={alignItems}
            px={4}
            py={2}
          >
            {/* Logo and Social Media Links */}
            <VStack spacing={4} textAlign="center" alignItems="center">
              {/* Logo */}
              <Box>
                <img
                  src="logo.png"
                  alt="Logo"
                  style={{ height: "150px", width: "auto" }}
                />
              </Box>

              {/* Social Media Icons */}
              <Flex>
                <Link href="tel:9701333112" mr={2} sx={linkStyles}>
                  <Icon as={PhoneIcon} boxSize={6} />
                </Link>
                <Link
                  href="mailto:ratnarealestateinfo@gmail.com"
                  mr={2}
                  sx={linkStyles}
                >
                  <Icon as={EmailIcon} boxSize={6} />
                </Link>
                <Link href="https://wa.me/9701333112" mr={2} sx={linkStyles}>
                  <Icon as={FaWhatsapp} boxSize={6} />
                </Link>
                <Link
                  href="https://www.instagram.com/ratnarealestate?igsh=MTZlMGNmd2FoNDhlbg=="
                  mr={2}
                  sx={linkStyles}
                >
                  <Icon as={FaInstagram} boxSize={6} />
                </Link>
              </Flex>
            </VStack>

            <VStack spacing={4} textAlign="start" alignItems="flex-start">
              <Heading fontSize="lg" color="#5ea51d">
                Quick Links
              </Heading>
              <Link href="/" sx={linkStyles}>
                Home
              </Link>
              <Link href="#categories" sx={linkStyles}>
                Categories
              </Link>
              <Link href="#about" sx={linkStyles}>
                About Us
              </Link>
              <Link href="#contact" sx={linkStyles}>
                Contact Us
              </Link>
            </VStack>

            <VStack spacing={4} textAlign="start" alignItems="flex-start">
              <Heading fontSize="lg" color="#5ea51d">
                Categories
              </Heading>
              <Link
                href="https://www.ratnarealestate.com/posts?type=Amaravathi"
                sx={linkStyles}
              >
                Amaravathi Plots/Lands
              </Link>
              <Link
                href="https://www.ratnarealestate.com/posts?type=Andhra"
                sx={linkStyles}
              >
                Andhra Plots/Lands
              </Link>
              <Link
                href="https://www.ratnarealestate.com/posts?type=Telangana"
                sx={linkStyles}
              >
                Telangana Plots/Lands
              </Link>
              <Link
                href="https://www.ratnarealestate.com/posts?type=Commercial"
                sx={linkStyles}
                maxW={{ base: "100%", md: "250px" }}
                textAlign="center"
              >
                Commercial Buildings
              </Link>
            </VStack>

            <VStack spacing={4} textAlign="left" alignItems="flex-start">
              <Heading fontSize="lg" color="#5ea51d">
                Contact Us
              </Heading>
              <Flex align="center">
                <PhoneIcon mr={2} />
                <Link href="tel:9701333112" sx={linkStyles}>
                  9701333112
                </Link>
              </Flex>
              <Flex align="center">
                <EmailIcon mr={2} />
                <Link
                  href="mailto:ratnarealestateinfo@gmail.com"
                  sx={linkStyles}
                >
                  ratnarealestateinfo@gmail.com
                </Link>
              </Flex>
              <Flex align="center">
                <InfoIcon mr={2} />
                <Link
                  href="#"
                  sx={linkStyles}
                  fontSize="small"
                  maxW={{ base: "100%", md: "250px" }}
                >
                  YSR COMPLEX SHOP NO.1 GAUTHAM BUDHA ROAD MANGALAGIRI GUNTUR
                  DIST AP 522503
                </Link>
              </Flex>
            </VStack>
          </Stack>
        </Box>

        <Box
          flex="0 0 15%"
          bg="#050D21"
          color="#FFFFFFB3"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={6}
          flexDirection="column"
        >
          <Text
            mt={4}
            fontSize="lg"
            color="white"
            fontWeight="450"
            textAlign="center"
          >
            Ratna Real Estate &copy; 2024
          </Text>
          <Text
            color="#5ea51d"
            mt={2}
            fontSize="xs"
            fontWeight="450"
            textAlign="center"
          >
            All Rights Reserved
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default Footer;
