import React, { useEffect, useState } from "react";

import './Form.css';

const MonthlyIncome = () => {
  const [availableMonths, setAvailableMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [income, setIncome] = useState(null);

  useEffect(() => {
    async function fetchMonths() {
      try {
        const res = await fetch('http://localhost:3000/available-months');
        const data = await res.json();
        const options = data.map(({ month, year }) => {
          const date = new Date(year, month - 1);
          return {
            value: `${year}-${month}`,
            label: date.toLocaleString('default', { month: 'long', year: 'numeric' }),
            month,
            year
          };
        });
        setAvailableMonths(options);
      } catch (error) {
        console.error('Failed to fetch months', error);
      }
    }

    fetchMonths();
  }, []);

  const handleCheckIncome = async () => {
    if (!selectedMonth) return;

    const [year, month] = selectedMonth.split('-');
    try {
      const res = await fetch(`http://localhost:3000/monthly-income?month=${month}&year=${year}`);
      const data = await res.json();
      setIncome(data.income);
    } catch (error) {
      console.error('Failed to fetch income', error);
    }
  };

  return (
    <div>
      <h2>Monthly Income</h2>
      <div className="form-block">
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="">Select month</option>
          {availableMonths.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button className="btn" onClick={handleCheckIncome} disabled={!selectedMonth}>Calculate</button>
      </div>
      {income !== null && (
        <p>Total income for {availableMonths.find(opt => opt.value === selectedMonth)?.label}: <strong>${income}</strong></p>
      )}
    </div>
  );
};

export default MonthlyIncome;
