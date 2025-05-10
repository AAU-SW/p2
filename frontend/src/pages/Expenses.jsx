import { ExpenseTable } from '../components/ExpenseTable';
import { FixedExpenseTable } from '../components/FixedExpenseTable';
import { Card } from '../components/Card';

export const Expenses = () => {
  return (
    <div>
      <h1>Expenses</h1>
      <h4>Add your daily expenses here (e.g., groceries and transport)</h4>
      <Card>
        <ExpenseTable />
      </Card>
      <h1>Fixed expenses</h1>
      <h4>Add your fixed expenses here (e.g., rent and subscriptions)</h4>
      <Card>
        <FixedExpenseTable />
      </Card>
    </div>
  );
};

/* Detailed view of each expense */
/* add monthly expenses (routes og controllers)*/

/* Table og monthly expenses */
/* Filtering of monthly expenses */
