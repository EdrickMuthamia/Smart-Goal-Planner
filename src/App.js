import React, { useState, useEffect } from 'react';
import GoalList from './components/GoalList';
import GoalForm from './components/GoalForm';
import Overview from './components/Overview';
import { mockGoals } from './mockData';
import './App.css';

// Use environment variable or fallback to mock data approach
// For Vercel deployment, set REACT_APP_API_URL in the Vercel dashboard
const API_URL = process.env.REACT_APP_API_URL || 
  (window.location.hostname === 'localhost' ? 'http://localhost:3001' : '');

function App() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFarGoals, setShowFarGoals] = useState(false);

  // Fetch goals from json-server
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch(`${API_URL}/goals`);
        if (!response.ok) throw new Error('Failed to fetch goals');
        const data = await response.json();
        setGoals(data);
        setIsLoading(false);
      } catch (err) {
        console.warn('Using mock data due to API error:', err.message);
        // Use mock data as fallback
        setGoals(mockGoals);
        setIsLoading(false);
        setError(null); // Clear error since we're using mock data
      }
    };
    
    fetchGoals();
  }, []);

  // Add a new goal
  const handleAddGoal = (newGoal) => {
    // If no API_URL, work with local state only
    if (!API_URL) {
      const newGoalWithId = {
        ...newGoal,
        id: Date.now().toString(),
      };
      setGoals([...goals, newGoalWithId]);
      return;
    }
    
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
      .catch(err => {
        // Fall back to local state
        const newGoalWithId = {
          ...newGoal,
          id: Date.now().toString(),
        };
        setGoals([...goals, newGoalWithId]);
        console.warn('Using local state due to API error:', err.message);
      });
  };

  // Update an existing goal
  const handleUpdateGoal = (updatedGoal) => {
    // If no API_URL, work with local state only
    if (!API_URL) {
      setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
      return;
    }
    
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
      .catch(err => {
        // Fall back to local state
        setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
        console.warn('Using local state due to API error:', err.message);
      });
  };

  // Delete a goal
  const handleDeleteGoal = (goalId) => {
    // If no API_URL, work with local state only
    if (!API_URL) {
      setGoals(goals.filter(goal => goal.id !== goalId));
      return;
    }
    
    fetch(`${API_URL}/goals/${goalId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete goal');
        setGoals(goals.filter(goal => goal.id !== goalId));
      })
      .catch(err => {
        // Fall back to local state
        setGoals(goals.filter(goal => goal.id !== goalId));
        console.warn('Using local state due to API error:', err.message);
      });
  };

  // Make a deposit to a goal
  const handleDeposit = (goalId, amount) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    
    const updatedGoal = {
      ...goal,
      savedAmount: goal.savedAmount + amount
    };
    
    // If no API_URL, work with local state only
    if (!API_URL) {
      setGoals(goals.map(g => g.id === goalId ? updatedGoal : g));
      return;
    }
    
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
      .catch(err => {
        // Fall back to local state
        setGoals(goals.map(g => g.id === goalId ? updatedGoal : g));
        console.warn('Using local state due to API error:', err.message);
      });
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