import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Link,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Text,
  Button,
  Image
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const NavLinks = ({ onClose }) => (
  <>
    <Link href="/" fontWeight="bold" onClick={onClose} color="#ffffff" _hover={{ textDecoration: 'none' }}>
      Home
    </Link>
    <Link href="/projects" fontWeight="bold" onClick={onClose} color="#ffffff" _hover={{ textDecoration: 'none' }}>
      Projects
    </Link>
    <Link href="/about" fontWeight="bold" onClick={onClose} color="#ffffff" _hover={{ textDecoration: 'none' }}>
      About Us
    </Link>
    <Link href="/contact" fontWeight="bold" onClick={onClose} color="#ffffff" _hover={{ textDecoration: 'none' }}>
      Contact Us
    </Link>
    <Link href="/admin" fontWeight="bold" onClick={onClose} color="#ffffff" _hover={{ textDecoration: 'none' }}>
      Admin Login
    </Link>
  </>
);

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex
        as="header"
        // bg="#333"
        // bg="#06112A"
        bg="#081637"
        color="#fff"
        padding="1"
        align="center"
        justify="space-between"
        position="fixed"
        zIndex="1"
        width="100%"
      >
        <Link href="/" fontWeight="bold" _hover={{ textDecoration: 'none' }}>
          <Flex align="center">
            <Image src="https://via.placeholder.com/50" alt="Logo" mr="8px" />
            <Heading size="lg">Logo</Heading>
          </Flex>
        </Link>
        <IconButton
          display={{ base: 'block', md: 'none' }}
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />
        <Flex display={{ base: 'none', md: 'flex' }} flex="1" justify="center" gap="10">
          <NavLinks />
        </Flex>
        <Link
          href="/admin"
          fontWeight="bold"
          color="#ffffff" 
          _hover={{ textDecoration: 'none' }}
          display={{ base: 'none', md: 'block' }}
        >
          Admin Login
        </Link>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <VStack align="start" spacing={7}>
                <NavLinks onClose={onClose} />
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      <Box
        as="section"
        height="500px"
        bgImage="url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTE3OTM5My1pbWFnZS1rd3Z5MG94eC5qcGc.jpg')"
        bgSize="cover"
        bgPos="center"
        backgroundAttachment="fixed"
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Box maxWidth="800px" color="black" textAlign="left">
          <Heading as="h1" fontSize="48px" mb="20px">
            Real Estate Development Company. Near You.
          </Heading>
          <Text fontSize="24px" mb="20px">
            Find your perfect property among our 5,000+ choices with the help of our expert agents!
          </Text>
          <Button bg="#333" color="#fff" padding="15px 20px" fontSize="18px" onClick={() => alert('Explore our properties')}>
            Explore our properties
          </Button>
        </Box>
      </Box>

      <Box as="section" p="20px" lineHeight="1.5" color="black">
        <Text>
          At Real Estate Developers, we are dedicated to helping you find your dream home. Overwhelmed by the options available? We offer support, and personalized itineraries to make your home search easier and more enjoyable.
        </Text>
        <Text mt="10px">
          Our agents are more than consultants, they are fellow homebuyers with a passion for helping you find your perfect home. With over 75 years of combined experience, you can trust us to find the best solutions for your needs.
        </Text>
      </Box>
    </Box>
  );
}

export default Header;
