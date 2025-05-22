import { useEffect, useState } from 'react';
import { CardHeader, Card, CardDetails } from '../components/Card';
import { getBudgetsWithCurrentSpending } from '../utils/calculate';

export const RecommendationsWidget = () => {
  const [overBudgetItems, setOverBudgetItems] = useState([]);

  const DKKFormat = new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
  });

  const fetchBudgetsWithOverSpending = async () => {
    try {
      const updatedBudgets = await getBudgetsWithCurrentSpending();

      const overBudget = updatedBudgets.filter(
        (budget) => budget.currentSpending > budget.maxSpending,
      );
      setOverBudgetItems(overBudget);
    } catch (error) {
      console.error('Error fetching budgets with spending:', error);
    }
  };
  useEffect(() => {
    fetchBudgetsWithOverSpending();
  }, []);

  return (
    <Card style={{ height: '100%' }}>
      <CardHeader title="Over-Budget Warnings" />
      <CardDetails>
        {overBudgetItems.length > 0 ? (
          <ul style={{ marginTop: 0 }}>
            {overBudgetItems.map((budget, index) => (
              <li key={index}>
                <strong>{budget.title}</strong>: You have spent{' '}
                {DKKFormat.format(budget.currentSpending)} out of{' '}
                {DKKFormat.format(budget.maxSpending)}
              </li>
            ))}
          </ul>
        ) : (
          <p>Great job! You are staying within your budgets.</p>
        )}
      </CardDetails>
    </Card>
  );
};
