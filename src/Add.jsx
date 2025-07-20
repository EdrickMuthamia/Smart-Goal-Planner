import React, { useState, useEffect } from "react";
import GoalList from "./components/GoalList";
import GoalForm from "./components/GoalForm";
import Overview from "./components/Overview";
import "./App.css";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const res = await fetch("http://localhost:3000/goals");
    const data = await res.json();
    setGoals(data);
  };

  const addGoal = async (newGoal) => {
    const res = await fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal),
    });
    const data = await res.json();
    setGoals([...goals, data]);
  };

  const updateGoal = async (updatedGoal) => {
    await fetch(`http://localhost:3000/goals/${updatedGoal.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedGoal),
    });
    setGoals(
      goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal))
    );
  };

  const deleteGoal = async (id) => {
    await fetch(`http://localhost:3000/goals/${id}`, {
      method: "DELETE",
    });
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const depositToGoal = async (id, amount) => {
    const goal = goals.find((goal) => goal.id === id);
    const updatedGoal = { ...goal, savedAmount: goal.savedAmount + amount };
    await fetch(`http://localhost:3000/goals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: updatedGoal.savedAmount }),
    });
    setGoals(goals.map((g) => (g.id === id ? updatedGoal : g)));
  };

  return (
    <div className="app">
      <h1>Smart Goal Planner</h1>
      <Overview goals={goals} />
      <GoalForm onAddGoal={addGoal} />
      <GoalList
        goals={goals}
        onUpdateGoal={updateGoal}
        onDeleteGoal={deleteGoal}
        onDeposit={depositToGoal}
      />
    </div>
  );
}

export default App;
