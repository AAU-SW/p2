import { useState } from 'react';
import { BudgetWidget } from '../components/BudgetWidget';

export const MyBudget = () => {
  const [budgetSections, setBudgetSections] = useState([{
    id: 1,
    title: "Food & Groceries",
    currentSpending: 1000,
    maxSpending: 3000
  },
  {
      id: 2,
      title: "Transport",
      currentSpending: 300,
      maxSpending: 650
  },
  {
    id: 3,
    title: "Food & Groceries",
    currentSpending: 1000,
    maxSpending: 3000
  },
  {
    id: 4,
    title: "Food & Groceries",
    currentSpending: 1000,
    maxSpending: 3000
  },
  {
    id: 5,
    title: "Food & Groceries",
    currentSpending: 1000,
    maxSpending: 3000
  },
  {
    id: 6,
    title: "Food & Groceries",
    currentSpending: 1000,
    maxSpending: 3000
  },]);

  return (
    <>
      <section>
        <h1 className="header">Budgetting</h1>
        <a className="sub-header">"Eksempel motto-tekst"</a>
      </section>

      {budgetSections.length > 0 ? (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        width: '100%', 
        flexWrap: 'wrap' }}>
        {budgetSections.map(widget => (
          <BudgetWidget
          key={widget.id}
          title={widget.title}
          currentSpending={widget.currentSpending}
          maxSpending={widget.maxSpending} />
          ))}
      </div>
      ) : (
      <NoData/> 
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