import React from 'react';
import { Flex, Stack, Link } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';

function Navbar() {
  return (
    <Flex backgroundColor="white" alignItems="center" justifyContent="space-between" pt={4} pb={4}>
      <Stack spacing={4} isInline alignItems="center">
        <CopyIcon />
        <Link>Home</Link>
        <Link>Shortned urls</Link>
      </Stack>
      <Flex>
        <Link mr={4}>English</Link>
        <Link>OtherLanguage</Link>
      </Flex>
    </Flex>
  );
}

export default Navbar;
