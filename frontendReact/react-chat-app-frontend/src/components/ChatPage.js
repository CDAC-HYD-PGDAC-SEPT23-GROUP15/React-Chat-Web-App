import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/chat"); // Update the URL as per your backend
      setChats(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chats:", error);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!chats.length) return <div>No chats found</div>;

  return (
    <div>
      <h1>Chat Page</h1>
      <p>This is the chat page of your application.</p>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>
            <strong>Chat Name:</strong> {chat.chatName} <br />
            {chat.participants && (
              <React.Fragment>
                <strong>Participants:</strong>{" "}
                {chat.participants.map((participant) => (
                  <span key={participant.email}>{participant.name}, </span>
                ))}
                <br />
              </React.Fragment>
            )}
            <strong>Timestamp:</strong> {chat.timestamp}{" "}
            {/* Assuming timestamp is a property of chat */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatPage;
