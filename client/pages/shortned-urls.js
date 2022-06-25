import { Flex, useColorModeValue, Spinner, Stack } from '@chakra-ui/react';
import useSWRInfinite from 'swr/infinite';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWR from 'swr';
import React from 'react';

const fetcher = (url) => fetch(url).then((r) => r.json());

function Page({ index }) {
  const { data, error } = useSWR(`http://localhost:5100/urls?page=${index}&limit=10`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) {
    return (
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    );
  }
  console.log({ data });

  return (
    <div>
      {data.data.map((array) => (
        <h1>{array.shortUrl}</h1>
      ))}
    </div>
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
      <Stack>
        {pages}
        <button onClick={() => setCnt(cnt + 1)}>Load More</button>
      </Stack>
    </Flex>
  );
}

export default ShortnedUrls;
