import React, { useState, ChangeEvent } from "react";
import InternalLeads from "../components/features/internal-leads/internalLeads.js";

const InternalLeadsPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Tracks login status
  const [password, setPassword] = useState<string>("");

  const handleLogin = (): void => {
    // Mock authentication with a hardcoded password
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid password!");
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h1>Login Required</h1>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            style={{
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              display: "block",
              margin: "0 auto",
            }}
          />
          <button
            onClick={handleLogin}
            style={{
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>
      ) : (
        <InternalLeads />
      )}
    </div>
  );
};

export default InternalLeadsPage;
