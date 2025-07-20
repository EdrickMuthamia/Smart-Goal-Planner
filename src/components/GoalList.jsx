import React from "react";
import GoalItem from "./GoalItem";

function GoalList({ goals, onUpdateGoal, onDeleteGoal, onDeposit }) {
  return (
    <div className="goal-list">
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          onUpdateGoal={onUpdateGoal}
          onDeleteGoal={onDeleteGoal}
          onDeposit={onDeposit}
        />
      ))}
    </div>
  );
}

export default GoalList;
