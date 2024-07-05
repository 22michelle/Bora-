import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    fetchAccounts();
    fetchTransactions();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("/api/accounts");
      if (Array.isArray(response.data)) {
        setAccounts(response.data);
      } else {
        console.error("Invalid accounts data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/api/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Accounts</h2>
          <ul className="list-group">
            {accounts.map((account) => (
              <li
                key={account.id}
                className="list-group-item"
                onClick={() => handleAccountSelect(account)}
              >
                {account.name} - ${account.balance}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h2>Transactions</h2>
          <ul className="list-group">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="list-group-item">
                {transaction.sender_id} sent ${transaction.amount} to {transaction.receiver_id}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedAccount && <TransferForm account={selectedAccount} />}
    </div>
  );
};

const TransferForm = ({ account }) => {
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [feeRate, setFeeRate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/transactions/transfer", {
        sender_id: account.id,
        receiver_id: receiverId,
        amount,
        fee_rate: feeRate,
      });
      console.log("Transfer successful:", response.data);
    } catch (error) {
      console.error("Error making transfer:", error);
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h2>Make a Transfer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="receiverId" className="form-label">Receiver ID</label>
            <input
              type="text"
              className="form-control"
              id="receiverId"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="feeRate" className="form-label">Fee Rate (%)</label>
            <input
              type="number"
              className="form-control"
              id="feeRate"
              value={feeRate}
              onChange={(e) => setFeeRate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Transfer</button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
