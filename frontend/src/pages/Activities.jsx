import { ActivitiesTable } from '../components/ActivitiesTable';
import { Card, CardHeader } from '../components/Card';

export const Activities = (isWidget) => {
  return (
    <div>
      {!isWidget && (
        <>
        <h1>Activities</h1>
        </>
      )}
      
      <Card>
        <ActivitiesTable isWidget={isWidget} />
      </Card>
    </div>
  );
};
