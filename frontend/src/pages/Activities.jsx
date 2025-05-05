import { ActivitiesTable } from '../components/ActivitiesTable';
import { useState } from 'react';
import { Card, CardHeader } from '../components/Card';

export const Activities = () => {
  return (
    <div>
          <h1>Activities</h1>
      <Card>
        <ActivitiesTable />
      </Card>


    </div>
  );
}

