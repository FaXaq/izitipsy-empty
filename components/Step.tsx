interface StepProps {
  tickets: any[];
  stepValue: number;
  stepProfit: number;
}

const Step = (props: StepProps) => {
  return (
    <tr>
      <td className="border px-4 py-2">&lt;{props.stepValue}$</td>
      <td className="border px-4 py-2">{props.tickets.length}</td>
      <td className="border px-4 py-2">
        {Math.round((props.stepProfit + Number.EPSILON) * 100) / 100}%
      </td>
    </tr>
  );
};

export default Step;
