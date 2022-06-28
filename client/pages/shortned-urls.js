import {
  Flex,
  useColorModeValue,
  Spinner,
  Stack,
  Box,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';
const moment = require('moment');
import useSWRInfinite from 'swr/infinite';
import InfiniteScroll from 'react-infinite-scroll-component';

const fetcher = (url) => fetch(url).then((r) => r.json());

function Page() {
  const color = useColorModeValue('white', 'gray.900');
  const grayColor = useColorModeValue('gray.50', 'gray.800');

  const getKey = (pageIndex, previousPageData) => {
    pageIndex += 1;
    if (previousPageData && !previousPageData.data.length) return null;
    return `http://localhost:5100/urls?page=${pageIndex}&limit=50`;
  };

  const { data: paginatedData, error, size, setSize } = useSWRInfinite(getKey, fetcher);
  if (error) return <div>failed to load</div>;
  if (!paginatedData) {
    return (
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    );
  }
  if (paginatedData[0].paging.total === 0) {
    return (
      <Flex align="center" justify="center">
        No shortned URLs yet
      </Flex>
    );
  }

  return (
    <Flex minH="100vh" align="flex-start" justify="center" bg={grayColor}>
      <Stack align="center">
        <InfiniteScroll
          next={() => {
            setSize(size + 1);
          }}
          dataLength={paginatedData.length}
          hasMore
        >
          <Wrap spacing="15px" justify="center" w="full" p={30} bg={grayColor}>
            {paginatedData.map((data) =>
              data.data.map((array) => (
                <WrapItem key={array.shortUrl}>
                  <Box maxW="sm" bg={color} boxShadow="2xl" rounded="md" p={6} overflow="hidden">
                    <VStack mt={6} spacing={4} align="center">
                      <Text color="gray.400">{moment(array.createdAt).format('llll')}</Text>
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
              )),
            )}
          </Wrap>
        </InfiniteScroll>
      </Stack>
    </Flex>
  );
}

export default Page;
