"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [credits, setCredits] = useState(null);
  const [user, setUser] = useState(null);

  const { data: session, status } = useSession();
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  const isNextAuth = status === "authenticated" && session?.user?.email;

  // Load local token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchCredits(storedToken);
    }
  }, []);

  // Handle Google login
  useEffect(() => {
    if (isNextAuth) {
      axios
        .post(`${API}/auth/sync-user`, {
          email: session.user.email,
          name: session.user.name,
          provider: "google",
        })
        .then((res) => {
          const jwt = res.data.token;
          const userData = res.data.user;

          // ✅ Save token & use for credit fetch
          localStorage.setItem("token", jwt);
          setToken(jwt);
          setUser(userData);
          fetchCredits(jwt);
        })
        .catch((err) => {
          console.error("Google login sync failed:", err);
        });
    }
  }, [session?.user?.email]);

  const fetchCredits = async (jwtParam = null) => {
    try {
      const jwt = jwtParam || localStorage.getItem("token"); // ✅ Fallback to localStorage
      if (!jwt) throw new Error("No token found");
  
      const res = await axios.get(`${API}/user/credits`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
  
      setCredits(res.data.credits);
    } catch (err) {
      console.error("Failed to fetch credits", err);
      setCredits(0);
    }
  };
  

  const login = (tokenFromServer, userInfo = null) => {
    localStorage.setItem("token", tokenFromServer);
    setToken(tokenFromServer);
    setUser(userInfo || {});
    fetchCredits(tokenFromServer);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setCredits(null);
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        token,
        user,
        credits,
        isLoggedIn: !!token || isNextAuth,
        login,
        logout,
        fetchCredits,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
