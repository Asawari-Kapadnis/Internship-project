import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const WeeklyChart = ({ data }) => {
  const chartData = data.week.map((day, index) => ({
    day,
    calories: data.caloriesBrunt[index],
  }));

  return (
    <LineChart width={500} height={300} data={chartData}>
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="calories" />
    </LineChart>
  );
};

export default WeeklyChart;
