import React, { useState } from 'react';

const DepositForm = ({ goals, makeDeposit }) => {
  const [depositData, setDepositData] = useState({
    goalId: '',
    amount: ''
  });

  const handleChange = (e) => {
    setDepositData({
      ...depositData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (depositData.goalId && depositData.amount > 0) {
      makeDeposit(depositData.goalId, parseFloat(depositData.amount));
      setDepositData({
        goalId: '',
        amount: ''
      });
    }
  };

  return (
    <div className="deposit-form">
      <h2>Make a Deposit</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Goal:</label>
          <select
            name="goalId"
            value={depositData.goalId}
            onChange={handleChange}
            required
          >
            <option value="">Select a goal</option>
            {goals.map(goal => (
              <option key={goal.id} value={goal.id}>
                {goal.name} (${goal.savedAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Amount ($):</label>
          <input
            type="number"
            name="amount"
            value={depositData.amount}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <button type="submit">Deposit</button>
      </form>
    </div>
  );
};

export default DepositForm;