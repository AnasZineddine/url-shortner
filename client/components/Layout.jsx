import { Flex } from '@chakra-ui/react';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <Flex flexDirection="column">
      <Navbar />
      {children}
    </Flex>
  );
}

export default Layout;
