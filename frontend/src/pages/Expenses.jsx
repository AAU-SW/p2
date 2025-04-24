import { ExpenseTable } from '../components/expenseTable';
import { useState } from 'react';
import { Card, CardHeader } from '../components/Card';

export const Expenses = () => {
  return (
    <div>
          <h1>Expenses</h1>
      <Card>
        <ExpenseTable />
      </Card>


    </div>
  );
}