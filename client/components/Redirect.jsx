import useSWR from 'swr';
import { Spinner, Flex } from '@chakra-ui/react';
import React from 'react';

const fetcher = (url) => fetch(url).then((r) => r.json());

const redirectToOriginalUrl = ({ hash }) => {
  const { data, error } = useSWR(`http://localhost:5100/url?hash=${hash}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) {
    return (
      <Flex align="center" justify="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Flex>
    );
  }
  if (data) {
    window.location.href = data.url;
  }
};

export default redirectToOriginalUrl;
