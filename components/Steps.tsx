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
    <table>
      <tbody>{steps}</tbody>
    </table>
  );
};

export default Steps;
