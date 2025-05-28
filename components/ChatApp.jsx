import "./ChatApp.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function ChatApp({ onGoBack, chat, setChat,activeChat,setActiveChat,onNewChat }) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chat.length > 0 && chat[0].messages) {
      setMessages(chat[0].messages);
    }
  }, [chat,activeChat]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      type: "prompt",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputValue("");

    const updatedChats = chat.map((chatItem, index) => {
      if (index === 0) {
        return { ...chatItem, messages: updatedMessages };
      }
      return chatItem;
    });

    setChat(updatedChats);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!chat || chat.length === 0) {
    return <div className="chat-window">Ładowanie czatu...</div>;
  }

  return (
    <div className="chat-app">
      {/* Lista czatów */}
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Chat List</h2>
          <i className="bx bx-edit-alt new-chat"></i>
        </div>

        {chat.map((chatItem, index) => (
          <div key={index} className={`chat-list-item ${index === 0 ? "active" : ""}`}>
            <h4>{chatItem.id}</h4>
            <i className="bx bx-x-circle"></i>
          </div>
        ))}
      </div>

      {/* Okno czatu */}
      <div className="chat-window">
        <div className="chat-title">
          <h3>Chat z AI</h3>
          <i className="bx bx-arrow-back arrow" onClick={onGoBack}></i>
        </div>

        <div className="chat">
          {messages.map((msg, index) => (
            <div key={index} className={msg.type === "prompt" ? "prompt" : "response"}>
              {msg.text} <span>{msg.timestamp}</span>
            </div>
          ))}
          <div className="typing">Typing...</div>
        </div>

        <form className="msg-form" onSubmit={(e) => e.preventDefault()}>
          <i className="fa-solid fa-face-smile emoji"></i>
          <input
            type="text"
            className="msg-input"
            placeholder="Napisz pytanie ..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <i className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
        </form>
      </div>
    </div>
  );
}

ChatApp.propTypes = {
  onGoBack: PropTypes.func.isRequired,
  chat: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      messages: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          timestamp: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  setChat: PropTypes.func.isRequired,
};
