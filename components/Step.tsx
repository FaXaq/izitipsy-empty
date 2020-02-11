interface StepProps {
  amount: number;
  tickets: any[];
  stepValue: number;
  stepProfit: number;
}

const Step = (props: StepProps) => {
  return (
    <tr>
      <td className="border px-4 py-2">
        Inférieur ou égal à {(props.amount + 1) * props.stepValue} $
      </td>
      <td className="border px-4 py-2">{props.tickets.length}</td>
      <td className="border px-4 py-2">{props.stepProfit}</td>
    </tr>
  );
};

export default Step;
