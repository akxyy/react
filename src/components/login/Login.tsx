import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import "./login.css";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    password: "",
    error: "",
    successMessage: "",
  });
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.first_name || !formData.password) {
      setFormData((prev) => ({ ...prev, error: "Both fields are required." }));
      return;
    }

    try {
      const loginResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          first_name: formData.first_name,
          password: formData.password,
        }
      );

      const { token } = loginResponse.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", formData.first_name);
        dispatch(login({ token, username: formData.first_name }));
        setFormData({
          first_name: "",
          password: "",
          error: "",
          successMessage: "Login Approved!",
        });
        setLoginStatus(`Hello, ${formData.first_name}!`);
        navigate("/home");
      } else {
        setLoginStatus("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginStatus("Invalid username or password");
    }
  };

  return (
    <div className="main">
      <div>
        <img className="logo" src={process.env.PUBLIC_URL + '/images/logo2.jpg'}  alt="logo" />
      </div>
      <div className="login-container">
        <h2>Login</h2>
        {formData.error && <div className="error">{formData.error}</div>}
        {loginStatus && <div className="status-message">{loginStatus}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="first_name">User Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;