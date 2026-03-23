import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../ui/Card';
import { formatCurrency } from '../../utils/formatCurrency';

export default function LineChart({ data, title }) {
  if (!data || data.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center h-80">
        <p className="text-text-muted">No data available</p>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full">
      {title && <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>}
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="month" tick={{ fill: '#64748B' }} axisLine={false} tickLine={false} />
            <YAxis 
              tick={{ fill: '#64748B' }} 
              axisLine={false} 
              tickLine={false}
              tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
            />
            <Tooltip 
              formatter={(value) => formatCurrency(value)}
              contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
            />
            <Legend iconType="plainline" />
            <Line type="monotone" dataKey="principal" name="Remaining Balance" stroke="#2563EB" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="interest" name="Cumulative Interest" stroke="#EF4444" strokeWidth={3} dot={false} />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
