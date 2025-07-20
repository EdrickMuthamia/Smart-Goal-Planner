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
              <strong>{goal.name}</strong> -{" "}
              {isCompleted
                ? "✅ Completed"
                : isOverdue
                ? "❌ Overdue"
                : isNearDeadline
                ? `⚠️ Near Deadline (${daysLeft} days left)`
                : `⏳ On Track (${daysLeft} days left)`}
              <div className="goal-overview-details">
                <span>Progress: {((goal.savedAmount / goal.targetAmount) * 100).toFixed(1)}%</span>
                <span>Target: KSh {goal.targetAmount.toFixed(2)}</span>
                <span>Saved: KSh {goal.savedAmount.toFixed(2)}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Overview;
