import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import dayjs from 'dayjs';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '4px',
          boxShadow: '0 0 5px rgba(0,0,0,0.1)',
          lineHeight: '1.6',
        }}
      >
        <strong>{label}</strong>
        <div style={{ marginTop: '5px' }}>
          {payload.map((item, index) => (
            <div key={index} style={{ color: item.color }}>
              {item.name}: {item.value.toLocaleString()} so'm
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

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
      total: parseFloat(item.total),
      expense: parseFloat(item.expense),
      net_profit: parseFloat(item.net_profit)
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
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="total" fill="#4e73df" name="Tushum" />
            <Bar dataKey="expense" fill="#e74a3b" name="Chiqim" />
            <Bar dataKey="net_profit" fill="#1cc88a" name="Sof foyda" />
          </BarChart>
        );

      case 'daily':
        return (
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#4e73df" name="Tushum" />
            <Line type="monotone" dataKey="expense" stroke="#e74a3b" name="Chiqim" />
            <Line type="monotone" dataKey="net_profit" stroke="#1cc88a" name="Sof foyda" />
          </LineChart>
        );

      case 'monthly':
        return (
          <AreaChart data={formattedData}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4e73df" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4e73df" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e74a3b" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#e74a3b" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1cc88a" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#1cc88a" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="total" stroke="#4e73df" fill="url(#colorTotal)" name="Tushum" />
            <Area type="monotone" dataKey="expense" stroke="#e74a3b" fill="url(#colorExpense)" name="Chiqim" />
            <Area type="monotone" dataKey="net_profit" stroke="#1cc88a" fill="url(#colorProfit)" name="Sof foyda" />
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
