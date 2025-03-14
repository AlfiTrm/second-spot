import React, { useEffect, useState } from "react";
import { Realtime } from "ably";
import { useUser } from "@clerk/clerk-react";

interface Message {
  username: string;
  text: string;
  timestamp: number;
}

const ChatRoom: React.FC = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const ably = new Realtime({ key: import.meta.env.VITE_ABLY_API_KEY });
    const channel = ably.channels.get("chatroom");

    channel.subscribe("message", (message) => {
      setMessages((prev) => [...prev, message.data]);
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const ably = new Realtime({
      key: "BKMNJg.feIljg:5tqTQI7u_E0TOjP3yFmuucKbjwwinUCStkpLZopBwG8",
    });
    const channel = ably.channels.get("chatroom");

    const messageData = {
      username: user?.username || "Anonim",
      text: newMessage,
      timestamp: Date.now(),
    };

    channel.publish("message", messageData);
    setNewMessage("");
  };

  return (
    <div className="w-full mt-30 p-5 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Chat Real-Time</h2>
      <div className="h-64 overflow-y-auto border p-3 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <strong>{msg.username}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Ketik pesan..."
          className="flex-grow border px-4 py-2 rounded-md"
        />
        <button
          onClick={sendMessage}
          className="bg-primary text-white px-5 py-2 rounded-md"
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
