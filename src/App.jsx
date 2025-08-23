import { useState, useEffect } from "react";
import "./App.css";
import appLogo from "./assets/react.svg"; // replace with your own logo
import Chat from "./Chat";

function App() {
  const [agreed, setAgreed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [page, setPage] = useState("home"); // "home" | "chat"

  useEffect(() => {
    const hasAgreed = localStorage.getItem("chatbot_disclaimer_agreed");
    if (hasAgreed === "true") {
      setAgreed(true);
    }
    setChecking(false);
  }, []);

  useEffect(() => {
    // Auto-transition to chat after 7s on homepage
    if (page === "home" && agreed) {
      const timer = setTimeout(() => setPage("chat"), 7000);
      return () => clearTimeout(timer);
    }
  }, [page, agreed]);

  const handleAgree = () => {
    localStorage.setItem("chatbot_disclaimer_agreed", "true");
    setAgreed(true);
  };

  if (checking) return null;

  return (
    <div className="app">
      {!agreed ? (
        // Disclaimer modal
        <div className="modal-overlay">
          <div className="modal">
            <h2>Disclaimer</h2>
            <p>
              <strong>UofTears Bot</strong> is <strong>NOT</strong> a replacement for a licensed
              mental health professional.  
              If you are in crisis or need urgent help, please reach out to a qualified
              professional or contact emergency services.
              For Canada and the US, call <strong>988</strong>.
              For the UK, call <strong>999</strong> or <strong>111</strong> for NHS.
              For other countries, refer to your local emergency number.
            </p>
            <button className="agree-btn" onClick={handleAgree}>
              I Understand & Agree
            </button>
          </div>
        </div>
      ) : page === "home" ? (
        // Splash homepage
        <div className="homepage">
          <img src={appLogo} alt="App Logo" className="app-logo" />
          <h1 className="app-title">MindMate Chatbot</h1>
          <p className="tagline">Your AI companion for mental wellness</p>
          {/*<p className="transition-note">(Starting chat in 7 seconds...)</p>*/}
        </div>
      ) : (
        // Chat page
        <Chat />
      )}
    </div>
  );
}

export default App;
