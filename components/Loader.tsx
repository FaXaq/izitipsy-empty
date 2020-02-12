import { useState } from "react";

interface LoaderProps {
  loading: boolean;
}

const Loader = (props: LoaderProps) => {
  const [loadText, setLoadText] = useState("Loading");
  const classes = ["text-center"]

  if (!props.loading) classes.push("hidden")

  setTimeout(() => {
    setLoadText(loadText + ".")
  }, 200);

  return <div className={classes.join(' ')}>{loadText}</div>;
};

export default Loader;
