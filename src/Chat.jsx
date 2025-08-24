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
      const res = await fetch("https://42cummer-uoftearsbotapi.hf.space/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          user_text: userMsg.text,
        }),
      });
  
      if (!res.body) throw new Error("ReadableStream not supported");
  
      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
  
      let botText = "";
      // add placeholder bot message immediately
      setMessages((prev) => [...prev, { sender: "bot", text: "" }]);
      const botIndex = messages.length + 1;
  
      let firstChunk = true;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
  
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;
  
        botText += chunk;
  
        setMessages((prev) => {
          const newMsgs = [...prev];
          newMsgs[botIndex] = { sender: "bot", text: botText };
          return newMsgs;
        });
  
        if (firstChunk) {
          setLoading(false); // remove "Bot is typing..." once first chunk arrives
          firstChunk = false;
        }
      }
    } catch (err) {
      console.error("Stream error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error streaming response" },
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
