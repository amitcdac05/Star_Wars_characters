import { useState, useEffect, useCallback } from "react";

// Constants for fake authentication
const FAKE_USERNAME = "user";
const FAKE_PASSWORD = "password";
const TOKEN_EXPIRATION_TIME = 60000;

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  // Function to generate a fake JWT (JSON Web Token)
  const generateFakeJWT = useCallback(() => {
    const expirationTime = Math.floor(Date.now() / 1000) + 60;
    const payload = {
      token: "fake-jwt-token",
      exp: expirationTime,
    };
    const base64Payload = btoa(JSON.stringify(payload));
    return `eyJhbGciOiJfakeHeader.${base64Payload}.fakeSignature`;
  }, []);

  // Function to start token refresh process
  const startTokenRefresh = useCallback(() => {
    const refresh = () => {
      const newToken = generateFakeJWT();
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setTimeout(refresh, TOKEN_EXPIRATION_TIME - 5000);
    };
    refresh();
  }, [generateFakeJWT]);

  // Function to decode a JWT
  const decodeJWT = useCallback((token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Invalid token format", e);
      return null;
    }
  }, []);

  // Function to check if a token is expired
  const isTokenExpired = useCallback(
    (token) => {
      const decodedToken = decodeJWT(token);
      return decodedToken && decodedToken.exp
        ? Date.now() >= decodedToken.exp * 1000
        : true;
    },
    [decodeJWT]
  );

  // Function to handle user login
  const handleLogin = (username, password) => {
    if (username === FAKE_USERNAME && password === FAKE_PASSWORD) {
      const newToken = generateFakeJWT();
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setIsAuthenticated(true);
      startTokenRefresh();
    } else {
      alert("Invalid username or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !isTokenExpired(storedToken)) {
      setIsAuthenticated(true);
      setToken(storedToken);
      startTokenRefresh();
    }
  }, [isTokenExpired, startTokenRefresh]);

  return { isAuthenticated, token, handleLogin, handleLogout };
};

export default useAuth;
