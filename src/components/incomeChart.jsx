import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import dayjs from 'dayjs';

const IncomeChart = ({ data, type }) => {
  const formattedData = data.map(item => {
    const period = item.period;
    let formattedPeriod = '';

    if (type === 'hourly') {
      formattedPeriod = dayjs(period).format('HH:mm');
    } else if (type === 'daily') {
      formattedPeriod = dayjs(period).format('MMM D');
    } else {
      formattedPeriod = dayjs(period).format('MMM YYYY');
    }

    return {
      period: formattedPeriod,
      total: parseFloat(item.total)
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default IncomeChart;
