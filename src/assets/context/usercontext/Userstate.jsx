import { useState, useEffect } from "react";
import UserContext from "./Usercontext";

export default function Userstate(props) {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const host = import.meta.env.VITE_BACKEND_HOST;

  async function Register() {
    const authWindow = window.open(`${host}/auth/google`, '_blank', 'width=500,height=600');
  
    const checkPopup = setInterval(() => {
      try {
        // Check if popup is closed or redirected back with token
        if (authWindow.closed) {
          clearInterval(checkPopup);
          console.log("Authentication window closed");
        }
        
        if (authWindow.location.href.includes('token=')) {
          const urlParams = new URLSearchParams(authWindow.location.search);
          const accessToken = urlParams.get('token');
          authWindow.close();
          clearInterval(checkPopup);
  
          if (accessToken) {
            localStorage.setItem('token', accessToken);
            verifyToken(accessToken); // Call a function to verify token
          }
        }
      } catch (e) {
        // Error due to cross-origin, ignore it until redirected to your domain
      }
    }, 1000);
  }
  
  async function verifyToken(token) {
    try {
      const res = await fetch(`${host}/verifyjwt`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const resp = await res.json();
      localStorage.setItem('temp', JSON.stringify(resp));
      setAuth(true);
      setUser(resp.user);
      setToken(token);
    } catch (error) {
      console.error("JWT verification failed:", error);
    }
  }
  
  
  async function Getdatalocal() {
    const token=localStorage.getItem("token");
    if(!token){
      setAuth(false);
      setUser(null);
      setToken(null);
      return;}
    try {
      const res = await fetch(`${host}/verifyjwt`, {
        method: "POST",  // Change to POST
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token }),
      });
      const resp = await res.json();
      console.log(resp);
      setAuth(true);
      setUser(resp.user);
      setToken(token);
    } catch (error) {
      console.error("JWT verification failed:", error);
    }
  }

  async function logout() {
    setAuth(false);
      setUser(null);
      setToken(null);
    localStorage.clear();
  }


  return (
    <UserContext.Provider value={{ auth, token, user, Register,Getdatalocal,logout }}>
      {props.children}
    </UserContext.Provider>
  );
}
