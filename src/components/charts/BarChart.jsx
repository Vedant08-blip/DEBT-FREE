import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../ui/Card';
import { formatCurrency } from '../../utils/formatCurrency';

export default function BarChart({ data, title }) {
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
          <RechartsBarChart
            data={data}
            margin={{ top: 20, right: 10, left: -10, bottom: 5 }}
            barSize={window.innerWidth < 640 ? 25 : 40}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 13 }} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 13 }}
              tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
            />
            <Tooltip 
              formatter={(value) => formatCurrency(value)}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#F8FAFC', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
            <Bar dataKey="value" name="EMI Payment" fill="#2563EB" radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
