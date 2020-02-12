import Step from "./Step";

interface StepsProps {
  amounts: { [key: number]: [] };
  stepPrice: number;
  stepTransactionProfit: (tickets: any[], stepPrice: number) => number;
}

const Steps = (props: StepsProps) => {
  const steps = [];

  for (let i in props.amounts) {
    const stepValue = (parseInt(i) + 1) * props.stepPrice;
    steps.push(
      <Step
        tickets={props.amounts[i]}
        key={`amount-${i}`}
        stepValue={stepValue}
        stepProfit={props.stepTransactionProfit(props.amounts[i], stepValue)}
      />
    );
  }

  return (
    <table className="table-auto mx-auto">
      <thead>
        <tr>
          <th className="border px-4 py-2">Prix du billet</th>
          <th className="border px-4 py-2">Nombre de billets</th>
          <th className="border px-4 py-2">Bénéfice net moyen</th>
        </tr>
      </thead>
      <tbody>{steps}</tbody>
    </table>
  );
};

export default Steps;
