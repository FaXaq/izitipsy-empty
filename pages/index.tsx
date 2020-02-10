import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
import Steps from "../components/Steps";

const Home: NextPage<{}> = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [staticFee, setStaticFee] = useState(0.3);
  // Currently banking fee is a 2.9%
  const [bankingFee, setBankingFee] = useState(0.029);
  const [step, setStep] = useState(20);
  const [amounts, setAmounts] = useState({});

  async function refreshTickets() {
    const res = await fetch("/api/dashboard");
    const unsortedTickets = await res.json();
    setTickets(unsortedTickets);
  }

  useEffect(() => {
    refreshTickets();
  }, []);

  function sortTicketsByAmounts(tickets: any[]): any {
    const steps: { [key: number]: any[] } = {};
    tickets.map(t => {
      // find the step of this ticket
      const roundedStep = Math.ceil(t.amount / step);

      // if no ticket has been at this step initialize it with empty array
      if (!steps[roundedStep]) steps[roundedStep] = [];

      // add ticket to this step
      steps[roundedStep].push(t);
    });
    console.log(steps);
    return steps;
  }

  useEffect(() => {
    setAmounts(sortTicketsByAmounts(tickets));
  }, [tickets, step]);

  function stepTransactionProfit(tickets: any[]): number {
    // create a tip map
    const tipMap = tickets.map(t => {
      if (!t.tips) return 0;
      return t.tips;
    });

    // average is the sum divided by the length
    return tipMap.reduce((p, n) => p + n, 0) / tipMap.length;
  }

  return (
    <div>
      <Steps
        amounts={amounts}
        stepValue={step}
        stepTransactionProfit={stepTransactionProfit}
      />
    </div>
  );
};

export default Home;
