import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Card from '../ui/Card';
import { formatCurrency } from '../../utils/formatCurrency';

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function DonutChart({ data, title }) {
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
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={window.innerWidth < 640 ? 60 : 80}
              outerRadius={window.innerWidth < 640 ? 80 : 100}
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => formatCurrency(value)}
              contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#F8FAFC', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
