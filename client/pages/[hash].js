import Redirect from '../components/Redirect';

const URL = ({ hash }) => {
  return <Redirect hash={hash} />;
};

export function getServerSideProps(context) {
  const hash = context.query.hash;

  return {
    props: {
      hash,
    },
  };
}

export default URL;
