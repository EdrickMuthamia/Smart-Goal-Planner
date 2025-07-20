import React, { useState } from "react";

function DepositForm({ onDeposit }) {
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount > 0) {
      onDeposit(parseFloat(amount));
      setAmount(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <div className="deposit-input-group">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          step="any"
          required
        />
        <button type="submit">Add Deposit</button>
      </div>
    </form>
  );
}

export default DepositForm;
