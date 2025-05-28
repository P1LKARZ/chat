import Start from "./components/Start";
import ChatApp from "./components/ChatApp";
import "../src/index.css";
import { useState, useEffect } from "react";

export default function App() {
  const [isChatting, setIsChatting] = useState(false);
  const [chat, setChat] = useState([]);
  const[activeChat, setActiveChat]=useState(null);
  const createNewChat=()=>{
    const newChat={
      id:`Chat ${new Date().toLocaleDateString()} ${new Date().toLocaleDateString()}`,
      messages:[],
    }
      const updatedChats=[newChat,...chat];
    setChat(updatedChats);
    setActiveChat(newChat.id);
  }

  const handleStart = () => {
    if (chat.length === 0) {
      
    createNewChat();
    
    }
  };

  const handleGoBack = () => {
    setIsChatting(false);
  };

  return (
    <div className="container">
      {isChatting ? (
        chat.length > 0 ? (
          <ChatApp 
          onGoBack={handleGoBack} 
          chat={chat} 
          setChat={setChat} 
          activeChat={activeChat}
          />
        ) : (
          <div>Ładowanie czatu...</div>
        )
      ) : (
        <Start onStart={handleStart} />
      )}
    </div>
  );
}
