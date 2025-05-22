import { useEffect, useState } from 'react';
import { CardHeader, Card, CardContent } from '../components/Card';
import { calculateTotalSpending } from '../utils/calculate';
import axios from 'axios';

export const NecessaryWorkHoursWidget = () => {
  const [income, setIncome] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [lastWage, setLastWage] = useState(0);
  const fetchIncome = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + '/timeplans/',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      // Calculate total income
      const timeplans = response.data;
      const fixedIncomes = timeplans.filter(
        (row) => row.type === 'Fixed income',
      );
      const variableIncomes = timeplans.filter(
        (row) => row.type === 'Variable income',
      );

      const totalFixedIncome = fixedIncomes.reduce(
        (sum, row) => sum + (row.fixedIncome || 0),
        0,
      );
      const totalVariableIncome = variableIncomes.reduce(
        (sum, row) => sum + (row.wage * row.hours || 0),
        0,
      );

      if (variableIncomes.length != 0) {
        setLastWage(variableIncomes[variableIncomes.length - 1].wage);
      }

      const totalIncome = totalFixedIncome + totalVariableIncome;
      setIncome(totalIncome);
    } catch (error) {
      console.error('Error fetching timeplans:', error);
    }
  };

  const getTotalSpending = async () => {
    const { combinedTotal } = await calculateTotalSpending();
    console.log(await calculateTotalSpending());
    setTotalSpent(combinedTotal);
  };

  useEffect(() => {
    fetchIncome();
    getTotalSpending();
  }, []);
  const DKKFormat = new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
  });

  const amountOverSpent = totalSpent - income;
  const hoursNeeded = Math.ceil(amountOverSpent / lastWage);

  if (amountOverSpent < 0) return null;

  return (
    <Card style={{ height: 'max-content', flexShrink: 0 }}>
      <CardHeader title="Work Hours Needed to Cover Spending" />
      <CardContent>
        <div class="flex">
          <Card style={{ width: '100%' }}>
            <CardHeader title="Income" />
            <CardContent>{DKKFormat.format(income)}</CardContent>
          </Card>
          <Card style={{ width: '100%' }}>
            <CardHeader title="Total Spendature" />
            <CardContent>{DKKFormat.format(totalSpent)}</CardContent>
          </Card>
          <Card style={{ width: '100%' }}>
            <CardHeader title="Overspent" />
            <CardContent>{DKKFormat.format(amountOverSpent)}</CardContent>
          </Card>
        </div>
        <p>
          With your latest hourly wage, you need to work {hoursNeeded} more
          hours to cover your total spending. <span style={{ color: 'grey' }}>(Not including taxes)</span>
        </p>
      </CardContent>
    </Card>
  );
};
