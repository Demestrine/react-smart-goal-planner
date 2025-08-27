import React from 'react';
import ProgressBar from './ProgressBar';

const GoalList = ({ goals, deleteGoal, setSelectedGoal }) => {
  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatus = (goal) => {
    const daysLeft = calculateDaysLeft(goal.deadline);
    
    if (goal.savedAmount >= goal.targetAmount) {
      return { status: 'Completed', class: 'completed' };
    } else if (daysLeft < 0) {
      return { status: 'Overdue', class: 'overdue' };
    } else if (daysLeft <= 30) {
      return { status: `${daysLeft} days left`, class: 'warning' };
    } else {
      return { status: `${daysLeft} days left`, class: 'normal' };
    }
  };

  return (
    <div className="goal-list">
      <h2>Your Savings Goals</h2>
      {goals.length === 0 ? (
        <p>No goals yet. Add your first goal!</p>
      ) : (
        goals.map(goal => {
          const status = getStatus(goal);
          const progress = (goal.savedAmount / goal.targetAmount) * 100;
          const remaining = goal.targetAmount - goal.savedAmount;
          
          return (
            <div key={goal.id} className={`goal-card ${status.class}`}>
              <div className="goal-header">
                <h3>{goal.name}</h3>
                <div className="goal-actions">
                  <button onClick={() => setSelectedGoal(goal)}>Edit</button>
                  <button onClick={() => deleteGoal(goal.id)}>Delete</button>
                </div>
              </div>
              <div className="goal-details">
                <p>Category: {goal.category}</p>
                <p>Target: Ksh{goal.targetAmount.toLocaleString()}</p>
                <p>Saved: Ksh{goal.savedAmount.toLocaleString()}</p>
                <p>Remaining: Ksh{remaining.toLocaleString()}</p>
                <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
                <p className={`status ${status.class}`}>{status.status}</p>
              </div>
              <ProgressBar progress={progress} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default GoalList;