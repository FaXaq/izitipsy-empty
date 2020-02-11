import Step from "./Step";

interface StepsProps {
  amounts: { [key: number]: [] };
  stepValue: number;
  stepTransactionProfit: (tickets: any[]) => number;
}

const Steps = (props: StepsProps) => {
  const steps = [];

  for (let i in props.amounts) {
    steps.push(
      <Step
        amount={parseInt(i)}
        tickets={props.amounts[i]}
        key={`amount-${i}`}
        stepValue={props.stepValue}
        stepProfit={props.stepTransactionProfit(props.amounts[i])}
      />
    );
  }

  return (
    <table className="table-auto mx-auto">
      <thead>
        <tr>
          <th className="border px-4 py-2">Prix du billet</th>
          <th className="border px-4 py-2">Nombre de billets</th>
          <th className="border px-4 py-2">Bénéfice net moyen (%)</th>
        </tr>
      </thead>
      <tbody>{steps}</tbody>
    </table>
  );
};

export default Steps;
