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
import { useRouter } from 'next/router';
import swedish from '../I18N/sv';
import english from '../I18N/en';

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
  const router = useRouter();
  const { locale } = router;
  const translation = locale === 'en' ? english : swedish;

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
          <FormLabel htmlFor="url">{translation.urlToShorten}</FormLabel>
          <HStack spacing={0}>
            <Input
              borderRightRadius="0"
              w="550px"
              placeholder={translation.inputHelper}
              {...register('url')}
            />
            <Button
              w="150px"
              colorScheme="blue"
              borderLeftRadius="0"
              onClick={handleSubmit(onSubmit)}
              disabled={errors.url}
            >
              {translation.shorten}
            </Button>
          </HStack>
          <FormErrorMessage>{errors?.url?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="shortnedUel">
          <FormLabel>{translation.result}</FormLabel>
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
              {hasCopied ? translation.copied : translation.copy}
            </Button>
          </HStack>
        </FormControl>
        <Center>
          <Text fontSize="xs" color="gray.400">
            {translation.madeBy}
          </Text>
        </Center>
      </Stack>
    </Box>
  );
}

export default Form;
