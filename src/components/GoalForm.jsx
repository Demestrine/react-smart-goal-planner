import React, { useState, useEffect } from 'react';

const GoalForm = ({ addGoal, updateGoal, selectedGoal, setSelectedGoal }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });

  useEffect(() => {
    if (selectedGoal) {
      setFormData({
        name: selectedGoal.name,
        targetAmount: selectedGoal.targetAmount,
        category: selectedGoal.category,
        deadline: selectedGoal.deadline.split('T')[0]
      });
    }
  }, [selectedGoal]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const goalData = {
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      savedAmount: selectedGoal ? selectedGoal.savedAmount : 0,
      createdAt: selectedGoal ? selectedGoal.createdAt : new Date().toISOString().split('T')[0]
    };

    if (selectedGoal) {
      updateGoal(selectedGoal.id, goalData);
    } else {
      addGoal(goalData);
    }

    setFormData({
      name: '',
      targetAmount: '',
      category: '',
      deadline: ''
    });
  };

  const categories = ['Travel', 'Emergency', 'Electronics', 'Real Estate', 'Vehicle', 'Education', 'Shopping', 'Retirement', 'Home', 'Other'];

  return (
    <div className="goal-form">
      <h2>{selectedGoal ? 'Edit Goal' : 'Add New Goal'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Goal Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Target Amount (Ksh):</label>
          <input
            type="number"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{selectedGoal ? 'Update Goal' : 'Add Goal'}</button>
        {selectedGoal && (
          <button type="button" onClick={() => setSelectedGoal(null)}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default GoalForm;