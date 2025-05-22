import '../styles/BudgetWidget.css';
import { Card, CardContent, CardDetails, CardHeader } from './Card';
import { FiTrash } from 'react-icons/fi';
import axios from 'axios';

export const BudgetWidget = ({
  title,
  id,
  currentSpending,
  maxSpending,
  fetchBudgetsWithSpending,
}) => {
  const DKKFormat = new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
  });

  let percentage = Math.trunc((currentSpending / maxSpending) * 100);

  const deleteRow = async (id) => {
    try {
      await axios.delete(import.meta.env.VITE_API_URL + '/budgets/' + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchBudgetsWithSpending();
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  return (
    <div className="budget-widget">
      <Card>
        <CardContent>
          <CardHeader title={title}>
            <button
              className="budget-delete-button"
              onClick={() => {
                deleteRow(id);
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginRight: '-10px',
              }}
            >
              <FiTrash />
            </button>
          </CardHeader>
          <div className="progress-bar-container">
            <progress
              className="progress-bar"
              value={(currentSpending / maxSpending) * 100}
              max="100"
            />
          </div>
          <div className="budget-amounts">
            <CardDetails>
              <div className="percentage-current-amount">
                <p>{DKKFormat.format(currentSpending)}</p>
                {percentage < 100 ? (
                  <p className="percentage">{percentage}%</p>
                ) : (
                  <p className="percentage" style={{ color: 'red' }}>
                    {percentage}%
                  </p>
                )}
              </div>
              <p className="total-amount">{`of ${DKKFormat.format(maxSpending)}`}</p>
            </CardDetails>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
