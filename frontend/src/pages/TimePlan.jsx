import '../styles/TimePlan.css';
import {Table} from '../components/Table';

export const TimePlan = () => {
    return (
      <div>
          <section>
            <h1 className="header">Timeplanning</h1>
            <a className="sub-header">"Eksempel motto-tekst"</a>
          </section>
          <Table />
      </div>
    )
}