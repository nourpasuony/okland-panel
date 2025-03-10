import React, { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import API from "../../api";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (Cookies.get("token")) navigate("/");
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    
    const { username, password } = credentials;
    if (!username || !password) {
      setError("Username and password are required!");
      return;
    }
    try {
      const { data, status } = await axios.post(`https://okland.me/api/v1/login/`, credentials , {
        withCredentials: false,
      });

      if (status === 200) {
        Cookies.set("token", data.superadmin.token, { expires: 1, secure: true, sameSite: "Strict" });
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password");
    }
  }, [credentials, navigate]);

  return (
    <div className="layout">
      <div className="left-half">
        <div className="illustration">
          <img src="images/Okland Lion Main Logo@8x.png" alt="Illustration" />
        </div>
      </div>
      <div className="right-half">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Hello Again!</h2>
          <p>Welcome back, you’ve been missed!</p>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <TextField name="username" label="Username" variant="outlined" margin="dense" fullWidth value={credentials.username} onChange={handleChange} />
          <TextField name="password" label="Password" variant="outlined" type="password" margin="dense" fullWidth value={credentials.password} onChange={handleChange} />
          <button className="bounce-top" type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
