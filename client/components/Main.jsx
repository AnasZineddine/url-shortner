import React from 'react';
import { Flex, Stack, Link, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import Form from './Form';
import Title from './Title';

function Main() {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Title />
        <Form />
      </Stack>
    </Flex>
  );
}

export default Main;
