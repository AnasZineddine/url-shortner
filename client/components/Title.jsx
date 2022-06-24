import { Stack, Link, Heading, Text } from '@chakra-ui/react';

function Title() {
  return (
    <Stack align="center">
      <Heading fontSize="4xl">Shorten a URL</Heading>
      <Text fontSize="lg" color="gray.600">
        Or take a look at all our shortned <Link color="blue.400">Links</Link> 🚀
      </Text>
    </Stack>
  );
}

export default Title;
