import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';
import Navbar from './Navbar';

function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <Flex flexDirection="column">
      {(pathname === '/' || pathname === '/shortned-urls') && <Navbar />}
      {children}
    </Flex>
  );
}

export default Layout;
