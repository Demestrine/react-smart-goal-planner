import React, { useState, useEffect } from 'react';
// Importing all main components for the dashboard
import GoalList from './components/GoalList';
import GoalForm from './components/GoalForm';
import DepositForm from './components/DepositForm';
import Overview from './components/Overview';
import './App.css';

// Main App component for Smart Goal Planner
function App() {
  // State to hold all goals
  const [goals, setGoals] = useState([]);
  // State to track which goal is selected for editing
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Fetch all goals from the local json-server when the app loads
  useEffect(() => {
    fetch('http://localhost:3001/goals')
      .then(res => res.json())
      .then(data => setGoals(data)) // Store fetched goals in state
      .catch(err => console.error('Error fetching goals:', err));
  }, []);

  // Function to add a new goal to the server and update state
  const addGoal = (goal) => {
    fetch('http://localhost:3001/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(goal)
    })
      .then(res => res.json())
      .then(newGoal => setGoals([...goals, newGoal])) // Add new goal to state
      .catch(err => console.error('Error adding goal:', err));
  };

  // Function to update an existing goal by ID
  const updateGoal = (id, updatedGoal) => {
    fetch(`http://localhost:3001/goals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedGoal)
    })
      .then(res => res.json())
      .then(updated => {
        // Replace the old goal with the updated one in state
        setGoals(goals.map(goal => goal.id === id ? updated : goal));
        setSelectedGoal(null); // Clear selected goal after update
      })
      .catch(err => console.error('Error updating goal:', err));
  };

  // Function to delete a goal by ID
  const deleteGoal = (id) => {
    fetch(`http://localhost:3001/goals/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        // Remove the deleted goal from state
        setGoals(goals.filter(goal => goal.id !== id));
      })
      .catch(err => console.error('Error deleting goal:', err));
  };

  // Function to make a deposit to a specific goal
  const makeDeposit = (id, amount) => {
    // Find the goal to update
    const goal = goals.find(g => g.id === id);
    // Calculate the new saved amount
    const updatedGoal = {
      ...goal,
      savedAmount: parseFloat(goal.savedAmount) + parseFloat(amount)
    };
    
    // Update the savedAmount on the server
    fetch(`http://localhost:3001/goals/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ savedAmount: updatedGoal.savedAmount })
    })
      .then(res => res.json())
      .then(updated => {
        // Update the goal in state with the new saved amount
        setGoals(goals.map(goal => goal.id === id ? updated : goal));
      })
      .catch(err => console.error('Error making deposit:', err));
  };

  // Render the main dashboard layout
  return (
    <div className="app">
      <header>
        <h1>Smart Goal Planner</h1>
      </header>
      <div className="container">
        {/* Sidebar contains forms and overview */}
        <div className="sidebar">
          <GoalForm 
            addGoal={addGoal} 
            updateGoal={updateGoal}
            selectedGoal={selectedGoal}
            setSelectedGoal={setSelectedGoal}
          />
          <DepositForm 
            goals={goals} 
            makeDeposit={makeDeposit} 
          />
          <Overview goals={goals} />
        </div>
        {/* Main content displays the list of goals */}
        <div className="main-content">
          <GoalList 
            goals={goals} 
            deleteGoal={deleteGoal}
            setSelectedGoal={setSelectedGoal}
          />
        </div>
      </div>
    </div>
  );
}

export default App;