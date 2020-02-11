interface LoaderProps {
  loading: boolean;
}

const Loader = (props: LoaderProps) => {
  return <div>{JSON.stringify(props)}</div>;
};

export default Loader;
