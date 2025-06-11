  // services/authService.js
  import axios from "axios";

  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  export const loginUser = async (email, password) => {
    const res = await axios.post(`${API}/auth/login`, { email, password });
    return res.data;
  };

  export const signupUser = async (name, email, password) => {
    const res = await axios.post(`${API}/auth/signup`, { name, email, password });
    return res.data;
  };
