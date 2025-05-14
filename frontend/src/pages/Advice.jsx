import { Card, CardDetails } from '../components/Card';
import { getBudgetsWithCurrentSpending } from '../utils/calculate';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/progressBarWithText.css';
import '../styles/Advice.css';
import { RecommendationsWidget } from '../components/RecommendationsWidget';

export const Advice = () => {
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
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
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

  // Consider changing weightings to percentage
  const BudgetUtilizationScore =
    100 * (1 - Math.min(1, totalSpent / totalBudget));
  const BudgetCoverageScore = 100 * Math.min(1, totalBudget / income);
  const SpendingRatioScore = 100 * (1 - Math.min(1, totalSpent / income));

  // Should we use a general score for all three?
  const FinancialHealthScore = Math.trunc(
    BudgetUtilizationScore + BudgetCoverageScore + SpendingRatioScore,
  );

  return (
    <>
      <section>
        <h1 className="header">Advice</h1>
      </section>
      <section style={{ display: 'flex', flexDirection: 'row' }}>
        <Card style={{ width: '40%' }}>
          <CardDetails>
            <div className="advice-card-content">
              <h5>Budget Utilization</h5>
              <p>
                Budget Utilization measures how effectively you are using your
                budget. A higher score indicates that you are spending less of
                your allocated budget, which is ideal for maintaining financial
                stability.
              </p>
              <ProgressBarWithText
                value={BudgetUtilizationScore}
                maxValue={100}
              />

              <h5>Budget Coverage</h5>
              <p>
                Budget Coverage evaluates how well your income covers your
                budget. A higher score means your income is sufficient to meet
                your budgeted expenses, reducing the risk of overspending.
              </p>
              <ProgressBarWithText value={BudgetCoverageScore} maxValue={100} />

              <h5>Spending Efficiency</h5>
              <p>
                Spending Efficiency reflects how efficiently you are using your
                income. A higher score indicates that you are spending a smaller
                portion of your income, leaving more room for savings or other
                priorities.
              </p>
              <ProgressBarWithText value={SpendingRatioScore} maxValue={100} />
            </div>
          </CardDetails>
        </Card>
        <RecommendationsWidget />
      </section>
    </>
  );
};

export const ProgressBarWithText = ({ value, maxValue }) => {
  return (
    <div className="custom-progress-bar-container">
      <div
        className="custom-progress-bar"
        style={{ width: `${Math.min(value, maxValue)}%` }}
      >
        <span className="custom-progress-bar-text">
          {Math.trunc(value)}/{maxValue}
        </span>
      </div>
    </div>
  );
};
