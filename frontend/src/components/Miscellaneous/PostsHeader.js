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
    <Link href="/about" fontWeight="bold" onClick={onClose} color="#ffffff" _hover={{ textDecoration: 'none' }}>
      About Us
    </Link>
    <Link href="#contact" fontWeight="bold" onClick={onClose} color="#ffffff" _hover={{ textDecoration: 'none' }}>
      Contact Us
    </Link>
    {/* <Link href="/admin" fontWeight="bold" onClick={onClose} color="#ffffff" _hover={{ textDecoration: 'none' }}>
      Admin Login
    </Link> */}
  </>
);

function PostsHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex
        as="header"
        // bg="#333"
        // bg="#06112A"
        bg="#081637"
        color="#fff"
        padding="3"
        align="center"
        justify="space-between"
        position="fixed"
        zIndex="9999"
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
          bg="#5ea51d"
          padding="7px 15px"
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
    </Box>
  );
}

export default PostsHeader;
