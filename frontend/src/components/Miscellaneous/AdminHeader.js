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
  Button,
  Image
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink , useHistory} from 'react-router-dom';

function AdminHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    history.push('/login');
  };
  return (
    <Box>
      <Flex
        as="header"
        bg="teal.500"
        color="white"
        padding="4"
        align="center"
        justify="space-between"
      >
        {/* Left section */}
        <Flex align="center">
        <Link href="/" fontWeight="bold" _hover={{ textDecoration: 'none' }}>
          <Flex align="center">
            <Image src="logo.png" alt="Logo" height="60px" width="60px" marginLeft="20px" />
            <Heading fontSize="25px" marginLeft="20px" color="white">Ratna Real Estate</Heading>
          </Flex>
        </Link>

          <Flex
            display={{ base: 'none', md: 'flex' }}
            flex="1"
            justify="flex-start"
            gap="10"
            ml="8"
          >
            <NavLink to="/" onClose={onClose}>
              Home
            </NavLink>
            <NavLink to="/admin" onClose={onClose}>
              Admin
            </NavLink>
            <NavLink to="/chats" onClose={onClose}>
              Chats
            </NavLink>
            <NavLink to="/profile" onClose={onClose}>
              Profile
            </NavLink>
          </Flex>
        </Flex>

        {/* Right section */}
        <Flex align="center">
          <Button
            fontWeight="bold"
            _hover={{ textDecoration: 'none' }}
            display={{ base: 'none', md: 'block' }}
            onClick={handleLogout}
          >
            Logout
          </Button>

          {/* Hamburger menu button for mobile */}
          <IconButton
            display={{ base: 'block', md: 'none' }}
            aria-label="Open Menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            ml="auto"
          />
        </Flex>

        {/* Drawer for mobile */}
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="teal.500" color="white">
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <VStack align="start" spacing={4}>
                <NavLink to="/" onClose={onClose}>
                  Home
                </NavLink>
                <NavLink to="/projects" onClose={onClose}>
                  Profile
                </NavLink>
                <NavLink to="/about" onClose={onClose}>
                  About Us
                </NavLink>
                <NavLink to="/contact" onClose={onClose}>
                  Contact Us
                </NavLink>
                <NavLink to="/admin" onClose={onClose}>
                  Admin Login
                </NavLink>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
}

const NavLink = ({ to, onClose, children }) => (
  <Link
    as={RouterLink}
    to={to}
    fontWeight="bold"
    onClick={onClose}
    _hover={{ textDecoration: 'none' }}
    p={2}
  >
    {children}
  </Link>
);

export default AdminHeader;