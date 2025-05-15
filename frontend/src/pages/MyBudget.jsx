import { useState, useEffect } from 'react';
import { BudgetWidget } from '../components/BudgetWidget';
import { Modal } from '../components/Modal';
import { BUDGET_CATEGORIES } from '../utils/BUDGET_CATEGORIES';
import axios from 'axios';
import { getBudgetsWithCurrentSpending } from '../utils/calculate';
import { Card, CardHeader, CardContent, CardDetails } from '../components/Card';
import { AddWidget } from '../components/AddWidget';

export const MyBudget = ({ isWidget = false }) => {
  const [modalOpen, setModalOpen] = useState(false);
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
  const totalRemaining = totalBudget - totalSpent;

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get('type');
    const maxSpending = parseFloat(formData.get('maxSpending'));
    try {
      await axios.post(
        import.meta.env.VITE_API_URL + '/budgets',
        {
          title,
          maxSpending,
          categories: [title], // Use the title as the category
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      // Fetch updated budgets with spending to ensure accuracy
      const updatedBudgets = await getBudgetsWithCurrentSpending();
      setBudgetSections(updatedBudgets);

      e.target.reset();
      setModalOpen(false);
    } catch (error) {
      console.error('Error creating budget:', error);
    }
  }
  console.log(modalOpen);
  return (
    <>
      {!isWidget ? (
        <>
          <section>
            <h1 className="header">Budgetting</h1>
            <a className="sub-header">
              "Budget with purpose, spend with confidence, live with freedom"
            </a>
          </section>
        </>
      ) : (
        <></>
      )}
      <section
        style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}
      >
        <Card style={{ width: '100%' }}>
          <CardContent>
            <CardHeader title="Total Budget"></CardHeader>
            <CardDetails>{totalBudget.toLocaleString()} kr.</CardDetails>
          </CardContent>
        </Card>
        <Card style={{ width: '100%' }}>
          <CardHeader title="Spent"></CardHeader>
          <CardDetails>{totalSpent.toLocaleString()} kr.</CardDetails>
        </Card>
        <Card style={{ width: '100%' }}>
          <CardHeader title="Remaining of budget"></CardHeader>
          <CardDetails>{totalRemaining.toLocaleString()} kr.</CardDetails>
        </Card>
        <Card style={{ width: '100%' }}>
          <CardHeader title="Income"></CardHeader>
          <CardDetails>{income.toLocaleString()} kr.</CardDetails>
        </Card>
      </section>

      {!isWidget ? (
        <>
          <form onSubmit={handleSubmit}>
            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Add Budget Category"
              onSubmitClick={handleSubmit}
              submitButtonText="Save Budget"
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: '5px',
                }}
              >
                <select name="type" required>
                  {BUDGET_CATEGORIES.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <input
                  name="maxSpending"
                  type="number"
                  placeholder="Budget limit"
                ></input>
              </div>
            </Modal>
          </form>
          {budgetSections.length > 0 ? (
            <div className="budget-widgets-wrapper">
              {budgetSections.map((widget) => (
                <BudgetWidget
                  key={widget._id}
                  id={widget._id}
                  title={widget.title}
                  currentSpending={widget.currentSpending || 0}
                  maxSpending={widget.maxSpending}
                  fetchBudgetsWithSpending={fetchBudgetsWithSpending}
                />
              ))}
              <AddWidget onClick={() => setModalOpen(true)} />
            </div>
          ) : (
            <AddWidget
              style={{ maxWidth: '350px' }}
              noData
              onClick={() => setModalOpen(true)}
            />
          )}
        </>
      ) : null}
    </>
  );
};
