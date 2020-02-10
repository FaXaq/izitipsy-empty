import { NextPage } from "next";
import fetch from "isomorphic-unfetch";

interface HomeProps {
  tickets: any;
}

const Home: NextPage<HomeProps> = props => {
  return <p>{JSON.stringify(props.tickets)}</p>;
};

// fetch async data before loading the page
// see : https://nextjs.org/learn/basics/fetching-data-for-pages
Home.getInitialProps = async ctx => {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const tickets = await res.json();

  return {
    tickets
  };
};

export default Home;
