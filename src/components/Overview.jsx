import React from 'react';

// Overview component displays summary stats and warnings for all goals
const Overview = ({ goals }) => {
  // Calculate total number of goals
  const totalGoals = goals.length;

  // Calculate total amount saved across all goals
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);

  // Calculate total target amount across all goals
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);

  // Count how many goals are completed
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;
  
  // Helper function to calculate days left until deadline
  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    // Calculate difference in days
    return Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  };
  
  // Find goals that are within 30 days of deadline and not completed
  const warningGoals = goals.filter(goal => {
    const daysLeft = calculateDaysLeft(goal.deadline);
    return daysLeft <= 30 && daysLeft > 0 && goal.savedAmount < goal.targetAmount;
  });
  
  // Find goals that are overdue and not completed
  const overdueGoals = goals.filter(goal => {
    const daysLeft = calculateDaysLeft(goal.deadline);
    return daysLeft < 0 && goal.savedAmount < goal.targetAmount;
  });

  // Render overview stats and warning/overdue sections
  return (
    <div className="overview">
      <h2>Overview</h2>
      <div className="overview-stats">
        {/* Stat: Total number of goals */}
        <div className="stat">
          <h3>Total Goals</h3>
          <p>{totalGoals}</p>
        </div>
        {/* Stat: Total saved amount */}
        <div className="stat">
          <h3>Total Saved</h3>
          <p>${totalSaved.toLocaleString()}</p>
        </div>
        {/* Stat: Total target amount */}
        <div className="stat">
          <h3>Total Target</h3>
          <p>${totalTarget.toLocaleString()}</p>
        </div>
        {/* Stat: Number of completed goals */}
        <div className="stat">
          <h3>Goals Completed</h3>
          <p>{completedGoals}</p>
        </div>
      </div>
      
      {/* Show warning section if there are goals needing attention */}
      {warningGoals.length > 0 && (
        <div className="warning-section">
          <h3>Goals Needing Attention ({warningGoals.length})</h3>
          <ul>
            {warningGoals.map(goal => (
              <li key={goal.id}>
                {goal.name} - {calculateDaysLeft(goal.deadline)} days left
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Show overdue section if there are overdue goals */}
      {overdueGoals.length > 0 && (
        <div className="overdue-section">
          <h3>Overdue Goals ({overdueGoals.length})</h3>
          <ul>
            {overdueGoals.map(goal => (
              <li key={goal.id}>
                {goal.name} - {Math.abs(calculateDaysLeft(goal.deadline))} days overdue
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Overview;