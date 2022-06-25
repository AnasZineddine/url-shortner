import { Stack, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

function Title() {
  return (
    <Stack align="center">
      <Heading fontSize="4xl">Shorten a URL</Heading>
      <Text fontSize="lg" color="gray.600">
        Or take a look at all our shortned{' '}
        <Link href="/shortned-urls">
          <a>Links 🚀</a>
        </Link>
      </Text>
    </Stack>
  );
}

export default Title;
