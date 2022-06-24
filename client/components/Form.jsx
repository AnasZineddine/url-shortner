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
} from '@chakra-ui/react';

function Form() {
  return (
    <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
      <Stack spacing={7}>
        <FormControl id="urlToShorten">
          <FormLabel>URL to shorten</FormLabel>
          <HStack spacing={0}>
            <Input borderRightRadius="0" w="550px" placeholder="Long URL (max 2024 characters)" />
            <Button w="150px" colorScheme="blue" borderLeftRadius="0">
              Shorten
            </Button>
          </HStack>
          <FormHelperText color="gray.400">Example: http://www.google.com</FormHelperText>
        </FormControl>
        <FormControl id="shortnedUel">
          <FormLabel>Result</FormLabel>
          <HStack spacing={0}>
            <Input w="550px" borderRightRadius="0" isReadOnly />
            <Button w="150px" colorScheme="blue" borderLeftRadius="0">
              Copy
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
