import { ExpenseTable } from '../components/ExpenseTable';
import { FixedExpenseTable } from '../components/FixedExpenseTable';
import { Card, CardContent, CardDetails, CardHeader } from '../components/Card';

export const Expenses = () => {
  return (
    <div>
      <Card>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <h1>Expenses</h1>
          <ExpenseTable />
          <h1>Fixed expenses</h1>
          <FixedExpenseTable />
        </div>
      </Card>
    </div>
  );
};

/* Detailed view of each expense */
/* add monthly expenses (routes og controllers)*/

/* Table og monthly expenses */
/* Filtering of monthly expenses */
