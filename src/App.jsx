import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="app">
      {!agreed ? (
        // Disclaimer modal
        <div className="modal-overlay">
          <div className="modal">
            <h2>Disclaimer</h2>
            <p>
              This chatbot is <strong>not</strong> a replacement for a licensed
              mental health professional.  
              If you are in crisis or need urgent help, please reach out to a qualified
              professional or call your local emergency number.
            </p>
            <button className="agree-btn" onClick={() => setAgreed(true)}>
              I Understand & Agree
            </button>
          </div>
        </div>
      ) : (
        // Your original logo + counter stuff
        <>
          <div>
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setAgreed(false)}>
              Back to Disclaimer
            </button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </>
      )}
    </div>
  );
}

export default App;
