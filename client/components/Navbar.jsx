import React from 'react';
import { Flex, Stack } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import Link from 'next/link';

function Navbar() {
  return (
    <Flex backgroundColor="white" alignItems="center" justifyContent="space-between" pt={4} pb={4}>
      <Stack spacing={4} isInline alignItems="center">
        <CopyIcon />
        <Link href="/">Home</Link>
        <Link href="/shortned-urls">Shortned urls</Link>
      </Stack>
      <Flex>
        <Stack spacing={4} isInline alignItems="center">
          <Link mr={4} href="/">
            English
          </Link>
          <Link href="/">OtherLanguage</Link>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default Navbar;
