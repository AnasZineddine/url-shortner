import {
  Flex,
  useColorModeValue,
  Spinner,
  Stack,
  Box,
  Text,
  VStack,
  Button,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import useSWR from 'swr';
import React from 'react';
import Link from 'next/link';
const moment = require('moment');

const fetcher = (url) => fetch(url).then((r) => r.json());

function Page({ index }) {
  const { data, error } = useSWR(`http://localhost:5100/urls?page=${index}&limit=15`, fetcher);
  const color = useColorModeValue('white', 'gray.900');

  if (error) return <div>failed to load</div>;
  if (!data) {
    return (
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    );
  }
  if (data.paging.total === 0) {
    return (
      <Flex align="center" justify="center">
        No shortned URLs yet
      </Flex>
    );
  }
  console.log(data);

  return (
    <Wrap spacing="15px" justify="center" w="full" p={30}>
      {data.data.map((array) => (
        <WrapItem id={array.shortUrl}>
          <Box
            maxW="sm"
            //w="100%"
            bg={color}
            boxShadow="2xl"
            rounded="md"
            p={6}
            overflow="hidden"
            key={array.shortUrl}
          >
            <VStack mt={6} spacing={4} align="center">
              <Text id={array.shortUrl} color="gray.400">
                {moment(array.createdAt).format('llll')}
              </Text>
              <Text fontWeight={600}>
                <Link href={`http://localhost:3000/${array.shortUrl}`}>
                  <a target="_blank"> {`http://localhost:3000/${array.shortUrl} 🚀`} </a>
                </Link>
              </Text>

              <Link href={array.url}>
                <a target="_blank">Original URL</a>
              </Link>
            </VStack>
          </Box>
        </WrapItem>
      ))}
    </Wrap>
  );
}

function ShortnedUrls() {
  const grayColor = useColorModeValue('gray.50', 'gray.800');
  const [cnt, setCnt] = React.useState(2);
  const pages = [];
  for (let i = 1; i < cnt; i++) {
    pages.push(<Page index={i} key={i} />);
  }

  return (
    <Flex minH="100vh" align="flex-start" justify="center" bg={grayColor}>
      <Stack align="center">
        {pages}

        <Button onClick={() => setCnt(cnt + 1)} w="full" colorScheme="blue">
          Load more
        </Button>
      </Stack>
    </Flex>
  );
}

export default ShortnedUrls;
