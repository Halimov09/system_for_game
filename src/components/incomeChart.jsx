import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import dayjs from 'dayjs';

const IncomeChart = ({ data, type }) => {
  const formattedData = data.map(item => {
    let periodLabel = '';

    if (type === 'hourly') {
      periodLabel = dayjs(item.period).format('HH:mm');
    } else if (type === 'daily') {
      periodLabel = dayjs(item.period).format('MMM D');
    } else {
      periodLabel = dayjs(item.period).format('MMM YYYY');
    }

    return {
      period: periodLabel,
      total: parseFloat(item.total)
    };
  });

  const renderChart = () => {
    switch (type) {
      case 'hourly':
        return (
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#4e73df" />
          </BarChart>
        );
      case 'daily':
        return (
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#1cc88a" />
          </LineChart>
        );
      case 'monthly':
        return (
          <AreaChart data={formattedData}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#36b9cc" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#36b9cc" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="total" stroke="#36b9cc" fillOpacity={1} fill="url(#colorTotal)" />
          </AreaChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={400}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeChart;
