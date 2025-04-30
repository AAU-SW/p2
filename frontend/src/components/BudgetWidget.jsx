import '../styles/BudgetWidget.css';
import { Card, CardContent, CardDetails, CardHeader } from './Card';
import { LinearProgressWithLabel } from './LinearProgressWithLabel';

export const BudgetWidget = ({ title, currentSpending, maxSpending }) => {
  const DKKFormat = new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
  });
  return (
    <div className="budget-widget">
      <Card>
        <CardContent>
          <CardHeader title={title} />
          <div className="progress-bar">
            <LinearProgressWithLabel
              value={(currentSpending / maxSpending) * 100}
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
