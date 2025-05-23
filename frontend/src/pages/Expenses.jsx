import { useState, useEffect } from 'react';
import { ExpenseTable } from '../components/ExpenseTable';
import { Card, CardContent, CardDetails, CardHeader } from '../components/Card';
import { UserWidget } from '../components/UserWidget';
import axios from 'axios';

export const Expenses = ({ isWidget }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [fixedExpenses, setFixedExpenses] = useState(0);
  const [variableExpenses, setVariableExpenses] = useState(0);
  const [expenses, setExpenses] = useState([]); // Store all expenses

  // Fetch expenses data
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + '/expenses',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      const expenses = response.data;

      // Calculate totals
      const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      const fixed = expenses
        .filter((expense) => expense.recurring === true)
        .reduce((sum, expense) => sum + expense.amount, 0);
      const variable = expenses
        .filter((expense) => expense.recurring === false)
        .reduce((sum, expense) => sum + expense.amount, 0);

      setTotalExpenses(total);
      setFixedExpenses(fixed);
      setVariableExpenses(variable);
      setExpenses(expenses); // Store the fetched expenses
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {!isWidget && (
        <div style={{ display: 'flex', gap: '16px' }}>
          <Card style={{ width: '100%' }}>
            <CardContent>
              <CardHeader title="Total expenses"></CardHeader>
              <CardDetails>{`${totalExpenses.toLocaleString()} DKK`}</CardDetails>
            </CardContent>
          </Card>
          <Card style={{ width: '100%' }}>
            <CardContent>
              <CardHeader title="Fixed expenses"></CardHeader>
              <CardDetails>{`${fixedExpenses.toLocaleString()} DKK`}</CardDetails>
            </CardContent>
          </Card>
          <Card style={{ width: '100%' }}>
            <CardContent>
              <CardHeader title="Variable expenses"></CardHeader>
              <CardDetails>{`${variableExpenses.toLocaleString()} DKK`}</CardDetails>
            </CardContent>
          </Card>
        </div>
      )}
      <Card>
        <ExpenseTable expenses={expenses} fetchExpenses={fetchExpenses} />
      </Card>
    </div>
  );
};
