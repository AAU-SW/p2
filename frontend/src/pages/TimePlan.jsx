import '../styles/TimePlan.css';
import { TimeplanTable } from '../components/TimeplanTable';
import { Card, CardContent, CardHeader, CardDetails } from '../components/Card';
import { useCallback, useState } from 'react';

export const TimePlan = () => {
  const [data, setData] = useState({
    fixedIncome: 0,
    variableIncome: 0,
    totalHours: 0,
  });

  const handleDataExport = useCallback((exportedData) => {
    setData(exportedData);
  }, []);

  const DKKFormat = new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
  });
  return (
    <div>
      <section>
        <h1 className="header">Income</h1>
        <a className="sub-header">"Grow your income, guide your budget, and own your future"</a>
      </section>
      <div class="flex justify-center items-center w-full">
        <Card style={{ width: '100%' }}>
          <CardContent>
            <CardHeader title="Total hours"></CardHeader>
            <CardDetails>{data.totalHours}</CardDetails>
          </CardContent>
        </Card>
        <Card style={{ width: '100%' }}>
          <CardContent>
            <CardHeader title="Variable Income"></CardHeader>
            <CardDetails>{DKKFormat.format(data.variableIncome)}</CardDetails>
          </CardContent>
        </Card>
        <Card style={{ width: '100%' }}>
          <CardContent>
            <CardHeader title="Fixed Income"></CardHeader>
            <CardDetails>{DKKFormat.format(data.fixedIncome)}</CardDetails>
          </CardContent>
        </Card>
      </div>
      <Card>
        <TimeplanTable setWidgetData={handleDataExport} />
      </Card>
    </div>
  );
};
