import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faSignOutAlt,
  faHistory,
  faMoneyCheckAlt,
  faArrowUp,
  faUser,
  faEnvelope,
  faCreditCard,
  faMoneyBillWaveAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [transferMessage, setTransferMessage] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleTransfer = async (event) => {
    event.preventDefault();
    try {
      // Simular respuesta exitosa
      setTransferMessage("Transferencia realizada con éxito.");
      setTransferAmount("");
      setRecipientEmail("");
      // Simular actualización de datos del usuario
      simulateUserUpdate();
    } catch (error) {
      setTransferMessage("Error al realizar la transferencia.");
      console.error("Error making transfer:", error);
    }
  };

  const simulateUserUpdate = () => {
    // Simular actualización de datos del usuario
    setUser({
      name: "John Doe",
      email: "john.doe@example.com",
      accountNumber: "123456789",
      balance: 1500,
    });
  };

  useEffect(() => {
    simulateUserUpdate();
    setLoading(false);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">
          <img
            src="../../src/assets/Logo.jpg"
            alt="Bora"
            className="logo-img"
          />
          <span className="logo-text">Bora</span>
        </div>
        {/* Menu actions*/}
        <div className="actions">
          <div className="action-buttons">
            <button
              className="action-button"
              onClick={() => alert("Ver Historial")}
            >
              <FontAwesomeIcon icon={faHistory} /> Transaction History
            </button>
            <button
              className="action-button"
              onClick={() => alert("Transferir Dinero")}
            >
              <FontAwesomeIcon icon={faArrowUp} /> Transfer money
            </button>
            <button
              className="action-button"
              onClick={() => alert("Depositar")}
            >
              <FontAwesomeIcon icon={faMoneyCheckAlt} /> Deposit
            </button>
          </div>
        </div>

        {/* Menu logout */}
        <div className="menu">
          <button className="menu-item" onClick={() => alert("Ayuda")}>
            <FontAwesomeIcon icon={faQuestionCircle} />
          </button>
          <button className="menu-item" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      </div>

      {/* Content User */}
      <div className="content">
        <div className="header">
          <h1>Bienvenido, {user?.name}</h1>
        </div>
        <div className="user-info">
          <div className="card">
            <div className="user-details">
              <div className="user-detail">
                <span className="detail-label">Number Account</span> <br />
                <span className="detail-value">{user?.accountNumber}</span>
              </div>
              <div className="user-detail">
                <span className="detail-label">Balance</span> <br />
                <span className="detail-value">${user?.balance}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
