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
  Image,
  Text,
  Portal,
  useBreakpointValue,
  keyframes
} from '@chakra-ui/react';
import { HamburgerIcon , EmailIcon, PhoneIcon} from '@chakra-ui/icons';

const fadeRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const NavLinks = ({ onClose, animate }) => {
  const links = [
    { href: "/", label: "Home" },
    { href: "#categories", label: "Categories" },
    { href: "/about", label: "About Us" },
    { href: "#contact", label: "Contact Us" },
    { href: "tel:6303433566", label: "6303433566" }, 
    { href: "mailto:ratnarealestateinfo@gmail.com", label: "ratnarealestateinfo@gmail.com" }, 
  ];

  return (
    <>
    {links.map((link, index) => (
      <Link
        key={link.href}
        href={link.href}
        fontWeight="bold"
        onClick={onClose}
        color="#ffffff"
        _hover={{ textDecoration: 'none' }}
        animation={animate ? `${fadeRight} 0.5s ease-in-out ${index * 0.2}s forwards` : 'none'}
        display="flex"
        alignItems="center" 
        gap={2} 
      >
        {link.href.startsWith('tel:') && (
          <PhoneIcon /> 
        )}
        {link.href.startsWith('mailto:') && (
          <EmailIcon /> 
        )}
        <span>{link.label}</span> 
      </Link>
    ))}
  </>
  );
};

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDrawer = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      {/* First Mine */}
      {/* <Flex
        as="header"
        bg="#081637"
        color="#fff"
        padding="2"
        align="center"
        justify="space-between"
        position="fixed"
        zIndex="8999"
        width="100%"
      >
        <Link href="/" fontWeight="bold" _hover={{ textDecoration: "none" }}>
          <Flex align="center">
            <Image
              src="logo.png"
              alt="Logo"
              height="60px"
              width="60px"
              marginLeft="20px"
            />
            <Heading fontSize="25px" marginLeft="20px" color="#5ea51d">
              Ratna Real Estate
            </Heading>
          </Flex>
        </Link>
        <IconButton
          display={{ base: "block", md: "none" }}
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />
        <Flex
          display={{ base: "none", md: "flex" }}
          color="white"
          flex="1"
          justify="start"
          alignItems="center"
          marginLeft="40px"
          gap="10"
        >
          <NavLinks onClose={onClose} animate={false} />
        </Flex>
      </Flex> */}

<Flex
  as="header"
  bg="#081637"
  color="#fff"
  padding="2"
  align="center"
  justify="space-between"
  position="fixed"
  zIndex="8999"
  width="100%"
>
  <Flex align="center">
    <Link href="/" fontWeight="bold" _hover={{ textDecoration: "none" }}>
      <Flex align="center">
        <Image
          src="logo.png"
          alt="Logo"
          height="60px"
          width="60px"
          marginLeft="20px"
        />
        <Heading fontSize="25px" marginLeft="20px" color="#5ea51d">
          Ratna Real Estate
        </Heading>
      </Flex>
    </Link>
  </Flex>
  <Flex align="center">
    <IconButton
      display={{ base: "block", md: "none" }}
      aria-label="Open Menu"
      icon={<HamburgerIcon />}
      onClick={onOpen}
    />
    <Flex
      display={{ base: "none", md: "flex" }}
      color="white"
      flex="1"
      justify="end"
      alignItems="center"
      marginLeft="40px"
      gap="10"
    >
      <NavLinks onClose={onClose} animate={false} />
    </Flex>
  </Flex>
</Flex>


      <Portal>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay zIndex="10000">
            <DrawerContent paddingTop="20px" bg="#081637">
              <DrawerCloseButton paddingTop="40px" color="#ffffff" />
              <DrawerHeader color="#ffffff">Menu</DrawerHeader>
              <DrawerBody mt="15">
                <VStack align="start" spacing={7}>
                  <NavLinks onClose={onClose} animate={isDrawer} />
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Portal>
    </Box>
  );
}

export default Header;