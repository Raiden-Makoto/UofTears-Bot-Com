import { useState, useEffect } from "react";
import axios from "axios";
import "./Chat.css";
import logo from "./assets/UofTears.png"; 

function Chat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // Generate random user ID once per session
  useEffect(() => {
    const randomId = Math.floor(Math.random() * 1_000_000); 
    setUserId(randomId.toString());
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !userId) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("https://42cummer-uoftearsbotapi.hf.space/chat", {
        user_id: userId,
        user_text: userMsg.text,
      });

      const botReply = { sender: "bot", text: res.data.response };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
        if (err.response) {
          console.error("Server error:", err.response.data);
        } else {
          console.error("Network error:", err.message);
        }
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "⚠️ Error: " + (err.response?.data?.detail || "check console logs") },
        ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <img src={logo} alt="App Logo" className="chat-logo" />
        <h1 className="chat-title">
          UofTears Bot: Your AI Companion for Mental Wellness
        </h1>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="chat-bubble bot">Bot is typing...</div>}
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
