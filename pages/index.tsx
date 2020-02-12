import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
import Steps from "../components/Steps";

import "../assets/main.scss";

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
      const roundedStep = Math.floor(t.amount / step);

      // if no ticket has been at this step initialize it with empty array
      if (!steps[roundedStep]) steps[roundedStep] = [];

      // add ticket to this step
      steps[roundedStep].push(t);
    });
    return steps;
  }

  useEffect(() => {
    setAmounts(sortTicketsByAmounts(tickets));
  }, [tickets, step]);

  function stepTransactionProfit(tickets: any[], stepValue: number): number {
    // create a profit and amount map
    const ticketsMap = tickets.map(t => {
      if (!t.tips) t.tips = 0;
      // We should use t.total but data mismatch tips plus amount of ticket
      // sometimes, so calculus is more precise
      const ticketBankingFee = (t.tips + t.amount) * bankingFee + staticFee;
      return {
        profit: t.tips - ticketBankingFee,
        amount: t.amount
      };
    });

    const { profit, amount } = ticketsMap.reduce((p, n) => ({
      profit: p.profit + n.profit,
      amount: p.amount + n.amount
    }));

    return profit > 0 ? profit * 100 / amount : 0;
  }

  return (
    <div className="container mx-auto">
      <img src="/images/simplyk-logo.png" className="block h-20 mx-auto" />
      <h3 className="text-2xl text-center font-bold p-4">
        Bénéfices par prix du billet
      </h3>
      <div className="flex items-center justify-center py-2">
        <label className="p-2" htmlFor="bankingFee">
          Frais bancaires
        </label>
        <input
          className="bg-white border border-gray-300 py-2 px-4 block appearance-none leading-normal w-40 block"
          type="number"
          id="bankingFee"
          value={bankingFee * 100}
          onChange={e => setBankingFee(parseFloat(e.target.value) / 100)}
        />
      </div>
      <div className="flex items-center justify-center py-2">
        <label className="p-2" htmlFor="staticFee">
          Frais fixes
        </label>
        <input
          className="bg-white border border-gray-300 py-2 px-4 block appearance-none leading-normal w-40 block"
          type="number"
          id="staticFee"
          value={staticFee}
          onChange={e => setStaticFee(parseFloat(e.target.value))}
        />
      </div>
      <Steps
        amounts={amounts}
        stepPrice={step}
        stepTransactionProfit={stepTransactionProfit}
      />
    </div>
  );
};

export default Home;
