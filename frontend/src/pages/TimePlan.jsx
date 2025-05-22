import '../styles/TimePlan.css';
import { TimeplanTable } from '../components/TimeplanTable';
import { Card, CardContent, CardHeader, CardDetails } from '../components/Card';
import { useCallback, useState } from 'react';
import { UserWidget } from '../components/UserWidget';

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
        }}
      >
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
