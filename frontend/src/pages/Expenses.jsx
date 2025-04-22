import { ExpenseTable } from '../components/expenseTable';
import { useState } from 'react';
import { Card } from '../components/Card';
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export const Expenses = () => {
  const [chartData, setChartData] = useState([]);
  return (
    <div>
      <h1>Expenses</h1>
      <Card>
        <PieChart
          series={[
            {
              data: chartData,
            },
          ]}
          width={200}
          height={200}
        />
      </Card>
      <Card>
        <ExpenseTable setChartData={setChartData} />
      </Card>


    </div>
  );
}

/* Detailed view of each expense */
/* add monthly expenses (routes og controllers)*/


/* Table og monthly expenses */
/* Filtering of monthly expenses */
