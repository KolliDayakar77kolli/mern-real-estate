import React, { useState, useRef } from 'react';
import { Box, FormControl, Heading, FormLabel, Input, Textarea, useToast, VStack, Text } from '@chakra-ui/react';
import emailjs from 'emailjs-com';
import Lottie from 'lottie-react';
import animationData from '../../lottie animations/Get in Touch.json';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const lottieRef = useRef(null);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: "Error.",
        description: "Please fill in all fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (lottieRef.current) {
      lottieRef.current.play();
    }

    emailjs.send(
      'service_d3j2qkx',
      'template_knakuw8',
      formData,
      'giWTUw22uc2utr9fr'
    ).then((result) => {
      setTimeout(() => {
        toast({
          title: "Message Sent.",
          description: "Your message has been sent successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 2000); 
    }).catch((error) => {
      toast({
        title: "Error.",
        description: "There was an error sending your message.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });
  };

  return (
    <>
      <Heading id="contact" textAlign="center" fontFamily="'Nunito Sans', Arial, sans-serif">Contact Form</Heading>
      <Text color="#5ea51d" fontWeight="800" fontFamily="'Nunito Sans', Arial, sans-serif" textAlign="center">
        Simply fill the form we will get in touch with you soon...
      </Text>
      <Box
        p={5}
        maxWidth={{ base: "90%", md: "500px" }}
        mx="auto"
        bg="gray.50"
        boxShadow="lg"
        borderRadius="md"
        mt={10}
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} />
            </FormControl>
            <FormControl id="phone" isRequired>
              <FormLabel>Phone</FormLabel>
              <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </FormControl>
            <FormControl id="message" isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea name="message" value={formData.message} onChange={handleChange} />
            </FormControl>
            <Box
              as="button"
              onClick={handleSubmit}
              p={0}
              m={0}
              border="none"
              background="green"
              cursor="pointer"
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="145px"
              height="38px"
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={false}
                autoplay={false}
                style={{ height: '150px', width: '150px' }}
              />
            </Box>
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default ContactForm;