import { useState, useEffect } from 'react';
import { BudgetWidget } from '../components/BudgetWidget';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import axios from 'axios';

export const MyBudget = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [budgetSections, setBudgetSections] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        // First calculate the latest spending
        await axios.get('http://localhost:4000/budgets/calculate', {
          withCredentials: true,
        });

        // Then fetch the updated budgets
        const response = await axios.get('http://localhost:4000/budgets', {
          withCredentials: true,
        });

        setBudgetSections(response.data);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };

    fetchBudgets();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get('type');
    const maxSpending = formData.get('maxSpending');
    try {
      const response = await axios.post(
        'http://localhost:4000/budgets',
        {
          title,
          maxSpending,
          categories: [title], // Use the title as the category
        },
        { withCredentials: true },
      );

      setBudgetSections([...budgetSections, response.data]);
      e.target.reset();
      setModalOpen(false);
    } catch (error) {
      console.error('Error creating budget:', error);
    }
  }

  return (
    <>
      <section>
        <h1 className="header">Budgetting</h1>
        <a className="sub-header">"Eksempel motto-tekst"</a>
      </section>
      <Button
        onClick={() => setModalOpen(true)}
      >Add new budget</Button>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Budget Category"
        onSubmit={handleSubmit}
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
            <option value="Food & Groceries">Food & Groceries</option>
            <option value="Transport">Transport</option>
            <option value="Rent">Rent</option>
            <option value="Insurance">Insurance</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>

          <input
            name="maxSpending"
            type="number"
            placeholder="maxSpending"
          ></input>
        </div>
      </Modal>

      {budgetSections.length > 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '100%',
            flexWrap: 'wrap',
          }}
        >
          {budgetSections.map((widget) => (
            <BudgetWidget
              key={widget._id}
              title={widget.title}
              currentSpending={widget.currentSpending}
              maxSpending={widget.maxSpending}
            />
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
};

const NoData = () => (
  <div
    style={{
      width: '100%',
      padding: '40px',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      margin: '20px 0',
    }}
  >
    <h3>No Budget Data Available</h3>
    <p>Add budget categories to start tracking your expenses</p>
  </div>
);
