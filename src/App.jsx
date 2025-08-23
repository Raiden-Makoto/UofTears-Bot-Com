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
              <strong>UofTears Bot</strong> is <strong>NOT</strong> a replacement for a licensed
              mental health professional.  
              If you are in crisis or need urgent help, please reach out to a qualified
              professional or contact emergency services.
              For Canada and the US, call <strong>988</strong>.
              For the UK, call <strong>999</strong> or <strong>111</strong> for NHS.
              For other countries, refer to your local emergency number.
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
