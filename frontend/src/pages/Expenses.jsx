import { useState, useEffect } from 'react';
import { ExpenseTable } from '../components/ExpenseTable';
import { Card, CardContent, CardDetails, CardHeader } from '../components/Card';
import axios from 'axios';

export const Expenses = () => {
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
          withCredentials: true,
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
    <div>
      <section>
        <h1 className="header">Expenses</h1>
        <a className="sub-header">"Eksempel motto-tekst"</a>
      </section>
      <Card>
        <CardContent>
          <CardHeader title="Total expenses"></CardHeader>
          <CardDetails>{`${totalExpenses.toLocaleString()} DKK`}</CardDetails>
        </CardContent>
        <CardContent>
          <CardHeader title="Fixed expenses"></CardHeader>
          <CardDetails>{`${fixedExpenses.toLocaleString()} DKK`}</CardDetails>
        </CardContent>
        <CardContent>
          <CardHeader title="Variable expenses"></CardHeader>
          <CardDetails>{`${variableExpenses.toLocaleString()} DKK`}</CardDetails>
        </CardContent>
      </Card>
      <Card>
        <ExpenseTable expenses={expenses} />
      </Card>
    </div>
  );
};
