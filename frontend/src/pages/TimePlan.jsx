import '../styles/TimePlan.css';
import { TimeplanTable } from '../components/TimeplanTable';
import { Card , CardContent, CardHeader, CardDetails } from '../components/Card';
import { useCallback, useState } from "react";


export const TimePlan = () => {
    const [data, setData] = useState({
      fixedIncome: 0,
      variableIncome: 0,
      totalHours: 0,
    });

    const handleDataExport = useCallback((exportedData) => {
        setData(exportedData);
      },[]);

    const DKKFormat = new Intl.NumberFormat("da-DK", { style: "currency", currency: "DKK" });

    return (
      <div>
          <section>
            <h1 className="header">Timeplanning</h1>
            <a className="sub-header">"Eksempel motto-tekst"</a>
          </section>
          <Card>
            <CardContent>
              <CardHeader title="Total hours"></CardHeader>
              <CardDetails>{data.totalHours}</CardDetails>
            </CardContent>
            <CardContent>
              <CardHeader title="Variable Income"></CardHeader>
              <CardDetails>{DKKFormat.format(data.variableIncome)}</CardDetails>
            </CardContent>
            <CardContent>
              <CardHeader title="Fixed Income"></CardHeader>
              <CardDetails>{DKKFormat.format(data.fixedIncome)}</CardDetails>
            </CardContent>
          </Card>

          <Card>
            <TimeplanTable setWidgetData={handleDataExport} /> 
          </Card>

      </div>
    )
}