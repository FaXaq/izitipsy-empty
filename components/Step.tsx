interface StepProps {
  amount: number;
  tickets: any[];
  stepValue: number;
  stepProfit: number;
}

const Step = (props: StepProps) => {
  return (
    <tr>
      <th>Inférieur ou égal à {(props.amount + 1) * props.stepValue} $</th>
      <td>{props.tickets.length}</td>
      <td>{props.stepProfit}</td>
    </tr>
  );
};

export default Step;
