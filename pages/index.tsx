import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";

const Home: NextPage<{}> = () => {
  const [tickets, setTickets] = useState([]);

  async function fetchTickets() {
    const res = await fetch("/api/dashboard");
    setTickets(await res.json());
  }

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div>
      <p>{JSON.stringify(tickets)}</p>
    </div>
  );
};

export default Home;
