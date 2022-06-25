import {
  Stack,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Box,
  Button,
  Text,
  useColorModeValue,
  HStack,
  Center,
  FormErrorMessage,
  useClipboard,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';

const schema = Yup.object().shape({
  url: Yup.string().url().max(2024, 'Must be shorter than 2024').required('Must enter a URL'),
});

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });
  const [shortnedValue, setShortnedValue] = React.useState('');
  const [buttonColor, setButtonColor] = React.useState('green');
  const { hasCopied, onCopy } = useClipboard(shortnedValue);

  const onSubmit = async (values) => {
    console.log({ values });
    const response = await fetch('http://localhost:5100/url', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setShortnedValue(`http://localhost:3000/${data.shortUrl}`);
    console.log({ data });
  };

  return (
    <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
      <Stack spacing={7}>
        <FormControl id="url" isInvalid={errors.url?.message}>
          <FormLabel htmlFor="url">URL to shorten</FormLabel>
          <HStack spacing={0}>
            <Input
              borderRightRadius="0"
              w="550px"
              placeholder="Start with http://..."
              {...register('url')}
            />
            <Button
              w="150px"
              colorScheme="blue"
              borderLeftRadius="0"
              onClick={handleSubmit(onSubmit)}
              disabled={errors.url}
            >
              Shorten
            </Button>
          </HStack>
          <FormErrorMessage>{errors?.url?.message}</FormErrorMessage>
          <FormHelperText color="gray.400">Example : ...</FormHelperText>
        </FormControl>
        <FormControl id="shortnedUel">
          <FormLabel>Result</FormLabel>
          <HStack spacing={0}>
            <Input w="550px" borderRightRadius="0" isReadOnly defaultValue={shortnedValue} />
            <Button
              disabled={!shortnedValue}
              w="150px"
              colorScheme={buttonColor}
              borderLeftRadius="0"
              onClick={() => {
                onCopy();
                setButtonColor('green');
              }}
            >
              {hasCopied ? 'Copied' : 'Copy'}
            </Button>
          </HStack>
        </FormControl>
        <Center>
          <Text fontSize="xs" color="gray.400">
            Made with ❤️ by AnasZineddine
          </Text>
        </Center>
      </Stack>
    </Box>
  );
}

export default Form;
