import React, { useState, useEffect } from 'react';
import GoalList from './components/GoalList';
import GoalForm from './components/GoalForm';
import Overview from './components/Overview';
import './App.css';

// Use environment variable or fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function App() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFarGoals, setShowFarGoals] = useState(false);

  // Fetch goals from json-server
  useEffect(() => {
    fetch(`${API_URL}/goals`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch goals');
        return response.json();
      })
      .then(data => {
        setGoals(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  // Add a new goal
  const handleAddGoal = (newGoal) => {
    fetch(`${API_URL}/goals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGoal),
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to add goal');
        return response.json();
      })
      .then(data => {
        setGoals([...goals, data]);
      })
      .catch(err => setError(err.message));
  };

  // Update an existing goal
  const handleUpdateGoal = (updatedGoal) => {
    fetch(`${API_URL}/goals/${updatedGoal.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedGoal),
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to update goal');
        return response.json();
      })
      .then(data => {
        setGoals(goals.map(goal => goal.id === data.id ? data : goal));
      })
      .catch(err => setError(err.message));
  };

  // Delete a goal
  const handleDeleteGoal = (goalId) => {
    fetch(`${API_URL}/goals/${goalId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete goal');
        setGoals(goals.filter(goal => goal.id !== goalId));
      })
      .catch(err => setError(err.message));
  };

  // Make a deposit to a goal
  const handleDeposit = (goalId, amount) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    
    const updatedGoal = {
      ...goal,
      savedAmount: goal.savedAmount + amount
    };
    
    fetch(`${API_URL}/goals/${goalId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ savedAmount: updatedGoal.savedAmount }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to make deposit');
        return response.json();
      })
      .then(data => {
        setGoals(goals.map(g => g.id === goalId ? { ...g, savedAmount: data.savedAmount } : g));
      })
      .catch(err => setError(err.message));
  };

  // Filter goals that are 24 days or more from deadline
  const filterFarGoals = () => {
    setShowFarGoals(!showFarGoals);
  };

  // Get filtered goals based on current filter state
  const getFilteredGoals = () => {
    if (!showFarGoals) return goals;
    
    return goals.filter(goal => {
      const daysLeft = Math.floor(
        (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
      );
      return daysLeft >= 24;
    });
  };

  const filteredGoals = getFilteredGoals();

  if (isLoading) return <div>Loading goals...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Smart Goal Planner</h1>
        <button onClick={filterFarGoals} className="filter-button">
          {showFarGoals ? "Show All Goals" : "Show Goals 24+ Days Away"}
        </button>
      </header>
      <main>
        <Overview goals={filteredGoals} />
        <GoalForm onAddGoal={handleAddGoal} />
        <GoalList 
          goals={filteredGoals} 
          onUpdateGoal={handleUpdateGoal} 
          onDeleteGoal={handleDeleteGoal} 
          onDeposit={handleDeposit} 
        />
      </main>
    </div>
  );
}

export default App;