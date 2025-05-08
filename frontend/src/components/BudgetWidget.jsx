import '../styles/BudgetWidget.css';
import { Card, CardContent, CardDetails, CardHeader } from './Card';
import { FiTrash } from 'react-icons/fi';

export const BudgetWidget = ({ title, currentSpending, maxSpending }) => {
  const DKKFormat = new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
  });
  return (
    <div className="budget-widget">
      <Card>
        <CardContent>
          <div style={{ display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <CardHeader title={title} />
          <button onClick={() => console.log('Delete budget')} style={{ background: 'none', border: 'none', cursor: 'pointer'}}>
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
                <p className="percentage">
                  {Math.trunc((currentSpending / maxSpending) * 100)}%
                </p>
              </div>
              <p className="total-amount">{`of ${DKKFormat.format(maxSpending)}`}</p>
            </CardDetails>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
