/*import React from 'react';
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

export default Navbar; */

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { FcGlobe } from 'react-icons/fc';

const Links = [
  { name: 'Shorten', link: '/' },
  { name: 'Shortned URLs', link: '/shortned-urls' },
];

const NavLink = ({ children }) => (
  <NextLink href={children.link}>
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      {children.name}
    </Link>
  </NextLink>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Url-Shortner</Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <IconButton as={FcGlobe} />
              </MenuButton>
              <MenuList>
                <MenuItem>English</MenuItem>
                <MenuItem>Link 2</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
