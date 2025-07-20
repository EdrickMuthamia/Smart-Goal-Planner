import React, { useState } from "react";
import DepositForm from "./DepositForm";

function GoalItem({ goal, onUpdateGoal, onDeleteGoal, onDeposit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(goal.name);
  const [targetAmount, setTargetAmount] = useState(goal.targetAmount);
  const [savedAmount, setSavedAmount] = useState(goal.savedAmount);
  const [category, setCategory] = useState(goal.category);
  const [deadline, setDeadline] = useState(goal.deadline);

  const handleUpdate = () => {
    onUpdateGoal({
      ...goal,
      name,
      targetAmount: parseFloat(targetAmount),
      savedAmount: parseFloat(savedAmount),
      category,
      deadline,
    });
    setIsEditing(false);
  };

  const daysLeft = Math.floor(
    (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );
  const isCompleted = goal.savedAmount >= goal.targetAmount;
  const isOverdue = !isCompleted && daysLeft < 0;
  const isNearDeadline = daysLeft <= 30 && daysLeft >= 0;

  const percent =
    goal.targetAmount > 0 ? (goal.savedAmount / goal.targetAmount) * 100 : 0;

  // Determine the status class
  const statusClass = isCompleted
    ? "completed"
    : isOverdue
    ? "overdue"
    : isNearDeadline
    ? "near-deadline"
    : "on-track";

  return (
    <div className={`goal-item ${statusClass}`}>
      {isEditing ? (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
          />
          <input
            value={savedAmount}
            onChange={(e) => setSavedAmount(e.target.value)}
          />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{goal.name}</h3>
          <p>Target: KSh {goal.targetAmount.toFixed(2)}</p>
          <p>Saved: KSh {goal.savedAmount.toFixed(2)}</p>
          <p>Remaining: KSh {(goal.targetAmount - goal.savedAmount).toFixed(2)}</p>
          <p>Category: {goal.category}</p>
          <p>Deadline: {goal.deadline}</p>
          <p>
            Status:{" "}
            {isCompleted
              ? "Completed"
              : isOverdue
              ? "Overdue"
              : isNearDeadline
              ? "Near Deadline"
              : "On Track"}
          </p>
          <progress value={percent} max="100" />
          <p>{percent.toFixed(1)}%</p>
          <DepositForm onDeposit={(amount) => onDeposit(goal.id, amount)} />
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDeleteGoal(goal.id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default GoalItem;
