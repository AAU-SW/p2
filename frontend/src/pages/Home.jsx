import { Card, CardHeader } from '../components/Card';
import '../styles/Home.css';
import { Expenses } from './Expenses';
import { MyBudget } from './MyBudget';

export const Home = () => {
  return (
    <div>
      <section>
        <h1 className="header">Overview</h1>
      </section>
      <Card>
        <CardHeader title="Budgets" />
        <MyBudget isWidget={true} />
      </Card>
      <Card>
        <CardHeader title="Expenses" />
        <Expenses isWidget={true} />
      </Card>
    </div>
  );
};

