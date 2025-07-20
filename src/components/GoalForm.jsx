import React, { useState } from "react";

function GoalForm({ onAddGoal }) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      name,
      targetAmount: parseFloat(targetAmount),
      savedAmount: 0,
      category,
      deadline,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    onAddGoal(newGoal);
    setName("");
    setTargetAmount(0);
    setCategory("");
    setDeadline("");
  };

  const categories = ["Travel", "Emergency", "Electronics", "Real Estate", "Vehicle", "Education", "Shopping", "Home", "Retirement", "Other"];

  return (
    <div className="form-container">
      <h2>Add New Goal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Goal Name</label>
          <input
            id="name"
            type="text"
            placeholder="e.g., Travel Fund - Japan"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="targetAmount">Target Amount (KSh)</label>
          <input
            id="targetAmount"
            type="number"
            placeholder="e.g., 5000"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="deadline">Target Date</label>
          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="submit-button">Add New Goal</button>
      </form>
    </div>
  );
}

export default GoalForm;
