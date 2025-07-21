import React, { useMemo } from "react";

function Overview({ goals = [] }) {
  // Use useMemo to calculate derived state only when goals change
  const { totalGoals, totalSaved, completedGoals } = useMemo(() => {
    return {
      totalGoals: goals.length,
      totalSaved: goals.reduce((sum, goal) => sum + (goal.savedAmount || 0), 0),
      completedGoals: goals.filter((g) => g.savedAmount >= g.targetAmount).length
    };
  }, [goals]);

  return (
    <div className="overview">
      <h2>Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: KSh {totalSaved.toFixed(2)}</p>
      <p>Goals Completed: {completedGoals}</p>
      {goals.length === 0 ? (
        <p className="no-data-message">No goals available. Add your first goal to see statistics.</p>
      ) : (
        <ul>
          {goals.map((goal) => (
            <GoalStatusDisplay key={goal.id} goal={goal} />
          ))}
        </ul>
      )}
    </div>
  );
}

// Create a GoalStatusDisplay component for better component abstraction
const GoalStatusDisplay = React.memo(({ goal }) => {
  const getGoalStatus = (goal) => {
    const daysLeft = Math.floor(
      (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
    );
    const isCompleted = goal.savedAmount >= goal.targetAmount;
    const isOverdue = !isCompleted && daysLeft < 0;
    const isNearDeadline = !isCompleted && daysLeft <= 30 && daysLeft >= 0;
    
    return { daysLeft, isCompleted, isOverdue, isNearDeadline };
  };
  
  const { daysLeft, isCompleted, isOverdue, isNearDeadline } = getGoalStatus(goal);
  
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
        <span>Progress: {goal.targetAmount > 0 ? ((goal.savedAmount / goal.targetAmount) * 100).toFixed(1) : '0.0'}%</span>
        <span>Target: KSh {(goal.targetAmount || 0).toFixed(2)}</span>
        <span>Saved: KSh {(goal.savedAmount || 0).toFixed(2)}</span>
      </div>
    </li>
  );
});

// Memoize the main component to prevent unnecessary re-renders
export default React.memo(Overview);
