import {
  Flex,
  useColorModeValue,
  Spinner,
  Stack,
  Box,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';
import useSWR from 'swr';
import React from 'react';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((r) => r.json());

function Page({ index }) {
  const { data, error } = useSWR(`http://localhost:5100/urls?page=${index}&limit=5`, fetcher);
  const color = useColorModeValue('white', 'gray.900');

  if (error) return <div>failed to load</div>;
  if (!data) {
    return (
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    );
  }
  console.log({ data });

  return (
    <>
      {data.data.map((array) => (
        <Box
          // maxW={"445px"}
          w="full"
          bg={color}
          boxShadow="2xl"
          rounded="md"
          p={6}
          overflow="hidden"
          key={array.shortUrl}
        >
          <VStack mt={6} spacing={4} align="center">
            <Text fontWeight={600}>
              <Link href={`http://localhost:3000/${array.shortUrl}`}>
                <a target="_blank"> {`http://localhost:3000/${array.shortUrl} 🚀`} </a>
              </Link>
            </Text>
            <Text fontWeight={100} noOfLines={[1, 2, 3]} istruncated="false" maxWidth="100px">
              <Link href={array.url}>
                <a target="_blank">{array.url} </a>
              </Link>
            </Text>
          </VStack>
        </Box>
      ))}
    </>
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
