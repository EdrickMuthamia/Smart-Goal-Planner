import React, { useState } from 'react';
import GoalList from './components/GoalList';
import GoalForm from './components/GoalForm';
import Overview from './components/Overview';
import { mockGoals } from './mockData';
import './App.css';

// For Vercel deployment, we'll use mock data directly
const API_URL = '';

function App() {
  // Initialize with mock data directly
  const [goals, setGoals] = useState(mockGoals);
  const [showFarGoals, setShowFarGoals] = useState(false);

  // Add a new goal (local state only)
  const handleAddGoal = (newGoal) => {
    const newGoalWithId = {
      ...newGoal,
      id: Date.now().toString(),
    };
    setGoals([...goals, newGoalWithId]);
  };

  // Update an existing goal (local state only)
  const handleUpdateGoal = (updatedGoal) => {
    setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
  };

  // Delete a goal (local state only)
  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  // Make a deposit to a goal (local state only)
  const handleDeposit = (goalId, amount) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    
    const updatedGoal = {
      ...goal,
      savedAmount: goal.savedAmount + amount
    };
    
    setGoals(goals.map(g => g.id === goalId ? updatedGoal : g));
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Smart Goal Planner</h1>
        <button onClick={filterFarGoals} className="filter-button">
          {showFarGoals ? "Show All Goals" : "Show Goals 24+ Days Away"}
        </button>
      </header>
      <main>
        <div className="dashboard-container">
          <div className="dashboard-left">
            <Overview goals={filteredGoals} />
            <GoalForm onAddGoal={handleAddGoal} />
          </div>
          <div className="dashboard-right">
            <h2>Your Goals</h2>
            {filteredGoals.length === 0 ? (
              <div className="no-goals-message">
                <p>No goals found. Create your first goal to get started!</p>
              </div>
            ) : (
              <GoalList 
                goals={filteredGoals} 
                onUpdateGoal={handleUpdateGoal} 
                onDeleteGoal={handleDeleteGoal} 
                onDeposit={handleDeposit} 
              />
            )}
          </div>
        </div>
      </main>
      <footer className="App-footer">
        <p>© 2025 Smart Goal Planner - Track your financial goals with ease</p>
      </footer>
    </div>
  );
}

export default App;