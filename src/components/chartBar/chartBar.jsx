import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionsReports } from './chartBarFetch';
import { Bar } from 'react-chartjs-2';

const ChartBar = () => {
  const dispatch = useDispatch();
  const { total, incomesData, loading, error } = useSelector(
    (state) => state.expenses
  );

  useEffect(() => {
    const currentDate = new Date().toISOString(); // Замість цього можна використовувати бажану дату
    dispatch(fetchTransactionsReports(currentDate));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const labels = Object.keys(incomesData);
  const datasets = Object.values(incomesData).map((data) => ({
    label: data.label,
    data: Object.values(data),
  }));

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'chartArea' },
    },
  };

  const data = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <div>
      <h2>Total: {total}</h2>
      <Bar width={400} height={200} options={options} data={data} />
    </div>
  );
};

export default ChartBar;
