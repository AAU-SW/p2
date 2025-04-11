import '../styles/TimePlan.css';
import {Table} from '../components/Table';
import { Card , CardContent, CardHeader, CardDetails } from '../components/Card';


export const TimePlan = () => {
    return (
      <div>
          <section>
            <h1 className="header">Timeplanning</h1>
            <a className="sub-header">"Eksempel motto-tekst"</a>
          </section>
          <Card>
            <CardContent>
              <CardHeader title="Total hours"></CardHeader>
              <CardDetails>5 hours</CardDetails>
            </CardContent>
            <CardContent>
              <CardHeader title="Variable Income"></CardHeader>
              <CardDetails>10,00kr</CardDetails>
            </CardContent>
            <CardContent>
              <CardHeader title="Fixed Income"></CardHeader>
              <CardDetails>2,00kr</CardDetails>
            </CardContent>
          </Card>

          <Card>
            <Table /> 
          </Card>

      </div>
    )
}