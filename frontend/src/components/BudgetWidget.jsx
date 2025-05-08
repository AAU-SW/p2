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
      await axios.delete(`http://localhost:4000/budgets/${id}`, {
        withCredentials: true,
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <CardHeader title={title} />
            <button
              onClick={() => {
                deleteRow(id);
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <FiTrash />
            </button>
          </div>
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
