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
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Deposit Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;
