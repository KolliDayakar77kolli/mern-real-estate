import React, { useState } from 'react';
import { Box, Button, FormControl, Heading, FormLabel, Input, Textarea, Spinner, useToast, VStack, Text } from '@chakra-ui/react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      'service_8ct0qfa',
      'template_pdyo4bg',
      formData,
      'umsWnFdwHMAakJXcs'
    ).then((result) => {
      setLoading(false);
      toast({
        title: "Message Sent.",
        description: "Your message has been sent successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    }).catch((error) => {
      setLoading(false);
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
      <Heading textAlign="center"  fontFamily="'Nunito Sans', Arial, sans-serif">Contact Form</Heading>
      <Text color="#5ea51d"  fontWeight="800" fontFamily="'Nunito Sans', Arial, sans-serif" textAlign="center">Simply fill the form we will get in touch with you soon...</Text>
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
            <Button type="submit" colorScheme="teal" isFullWidth>
              {loading ? <Spinner size="sm" /> : "Send"}
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default ContactForm;
