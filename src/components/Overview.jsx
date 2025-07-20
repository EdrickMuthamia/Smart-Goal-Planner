import React from "react";

function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter(
    (g) => g.savedAmount >= g.targetAmount
  ).length;

  return (
    <div className="overview">
      <h2>Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: KSh {totalSaved.toFixed(2)}</p>
      <p>Goals Completed: {completedGoals}</p>
      <ul>
        {goals.map((goal) => {
          const daysLeft = Math.floor(
            (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
          );
          const isCompleted = goal.savedAmount >= goal.targetAmount;
          const isOverdue = !isCompleted && daysLeft < 0;
          const isNearDeadline = daysLeft <= 30 && daysLeft >= 0;

          return (
            <li key={goal.id}>
              {goal.name} -{" "}
              {isCompleted
                ? "✅ Completed"
                : isOverdue
                ? "❌ Overdue"
                : isNearDeadline
                ? "⚠️ Near Deadline"
                : "⏳ On Track"}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Overview;
