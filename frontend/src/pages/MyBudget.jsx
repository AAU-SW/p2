import { useState } from 'react';
import { BudgetWidget } from '../components/BudgetWidget';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';

export const MyBudget = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [budgetSections, setBudgetSections] = useState([]);

  async function handleSubmit(e){
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("type");
    const maxSpending = formData.get("maxSpending");
    const newBudgetSection = {
      id: budgetSections.length + 1, // Simple ID generation
      title: title,
      currentSpending: 0,  // New budget starts at 0
      maxSpending: maxSpending
    };

    setBudgetSections([...budgetSections, newBudgetSection]);
    e.target.reset();
    setModalOpen(false);
  }

  return (
    <>
      <section>
        <h1 className="header">Budgetting</h1>
        <a className="sub-header">"Eksempel motto-tekst"</a>
      </section>
      <Button label="Add new budget" onClick={() => setModalOpen(true)}></Button>
      <Modal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Budget Category"
        onSubmit={handleSubmit}
        submitButtonText="Save Budget"
      >
        <div style={{display: 'flex', flexDirection:'column', width:'100%', gap: '5px'}}>
          <select name="type" required>
            <option>Food</option>
            <option>Transport</option>
            <option>Rent</option>
            <option>Insurance</option>
            <option>Entertainment</option>
          </select>

          <input name="maxSpending" type="number"placeholder="maxSpending"></input>
        </div>
      </Modal>

      {budgetSections.length > 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          width: '100%',
          flexWrap: 'wrap'
        }}>
          {budgetSections.map(widget => (
            <BudgetWidget
              key={widget.id}
              title={widget.title}
              currentSpending={widget.currentSpending}
              maxSpending={widget.maxSpending} />
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </>
  )
}

const NoData = () => (
  <div style={{
    width: '100%',
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    margin: '20px 0'
  }}>
    <h3>No Budget Data Available</h3>
    <p>Add budget categories to start tracking your expenses</p>
  </div>
);