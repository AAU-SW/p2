import { Card, CardHeader, CardContent, CardDetails } from '../components/Card';
import '../styles/Home.css';
import { MyBudget } from './MyBudget';
import { useState, useEffect } from 'react';
import { getBudgetsWithCurrentSpending } from '../utils/calculate';
import axios from 'axios';

export const Home = () => {
  const [budgetSections, setBudgetSections] = useState([]);
  const [income, setIncome] = useState(0);

  const fetchBudgetsWithSpending = async () => {
    try {
      const updatedBudgets = await getBudgetsWithCurrentSpending();
      setBudgetSections(updatedBudgets);
    } catch (error) {
      console.error('Error fetching budgets with spending:', error);
    }
  };

  const fetchIncome = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + '/timeplans/',
        {
          withCredentials: true,
        },
      );
      // Calculate total income
      const timeplans = response.data;
      const totalFixedIncome = timeplans
        .filter((row) => row.type === 'Fixed income')
        .reduce((sum, row) => sum + (row.fixedIncome || 0), 0);

      const totalVariableIncome = timeplans
        .filter((row) => row.type === 'Variable income')
        .reduce((sum, row) => sum + (row.wage * row.hours || 0), 0);

      const totalIncome = totalFixedIncome + totalVariableIncome;
      setIncome(totalIncome);
    } catch (error) {
      console.error('Error fetching timeplans:', error);
    }
  };

  useEffect(() => {
    fetchBudgetsWithSpending();
    fetchIncome();
  }, []);

  const totalBudget = budgetSections.reduce(
    (sum, budget) => sum + budget.maxSpending,
    0,
  );
  const totalSpent = budgetSections.reduce(
    (sum, budget) => sum + (budget.currentSpending || 0),
    0,
  );
  
  const DKKFormat = new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
  });

  const percentage = totalBudget > 0 ? Math.trunc((totalSpent / totalBudget) * 100) : 0;
  const percentageIncome = income > 0 ? Math.trunc((totalBudget / income) * 100) : 0;


  return (
    <>
    <div>
      <section>
        <h1 className="header">Overview</h1>
      </section>
      <Card>
        <CardHeader title="Budgets" />
        <MyBudget isWidget={true} />
      </Card>
    </div>

    <div className="budget-widget">
      <Card style={{ width: '100%' }}>
        <CardHeader title="Total spending / Budget" />
        <CardContent>
          <div className="progress-bar-container">
            <progress
              className="progress-bar"
              value={percentage}
              max="100"
            />
          </div>
          <div className="budget-amounts">
            <CardDetails>
              <div className="percentage-current-amount">
                <p>{DKKFormat.format(totalSpent)}</p>
                {percentage < 100 ? (
                  <p className="percentage">{percentage}%</p>
                ) : (
                  <p className="percentage" style={{ color: 'red' }}>
                    {percentage}%
                  </p>
                )}
              </div>
              <p className="total-amount">{`of ${DKKFormat.format(totalBudget)}`}</p>
            </CardDetails>
          </div>
        </CardContent>
      </Card>
    </div>

    <div className="budget-widget">
    <Card style={{ width: '100%' }}>
        <CardHeader title="Budget / Income" />
        <CardContent>
          <div className="progress-bar-container">
            <progress
              className="progress-bar"
              value={Number(percentageIncome)}
              max="100"
            />
          </div>
          <div className="budget-amounts">
            <CardDetails>
              <div className="percentage-current-amount">
                <p>{DKKFormat.format(totalBudget)}</p>
                {percentageIncome < 100 ? (
                  <p className="percentage">{percentageIncome}%</p>
                ) : (
                  <p className="percentage" style={{ color: 'red' }}>
                    {percentageIncome}%
                  </p>
                )}
              </div>
              <p className="total-amount">{`of ${DKKFormat.format(income)}`}</p>
            </CardDetails>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
};

