import Redirect from '../components/Redirect';

function URL({ hash }) {
  return <Redirect hash={hash} />;
}

export function getServerSideProps(context) {
  const { hash } = context.query;

  return {
    props: {
      hash,
    },
  };
}

export default URL;
