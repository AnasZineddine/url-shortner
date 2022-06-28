import { Stack, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import swedish from '../I18N/sv';
import english from '../I18N/en';

function Title() {
  const router = useRouter();
  const { locale } = router;
  const translation = locale === 'en' ? english : swedish;
  return (
    <Stack align="center">
      <Heading fontSize="4xl">{translation.title}</Heading>
      <Text fontSize="lg" color="gray.600">
        {translation.secondaryTitle}
        <Link href="/shortned-urls">
          <a>{translation.links}</a>
        </Link>
      </Text>
    </Stack>
  );
}

export default Title;
