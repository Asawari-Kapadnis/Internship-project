import { PieChart, Pie, Tooltip } from "recharts";

const PieChartComponent = ({ data }) => {
  return (
    <PieChart width={400} height={300}>
      <Pie data={data} dataKey="value" nameKey="label" />
      <Tooltip />
    </PieChart>
  );
};

export default PieChartComponent;
