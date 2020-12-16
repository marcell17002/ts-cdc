import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { base_url } from "../env";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

export const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(base_url, {
      query: { roomId },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (newMessage) => {
      setMessages((oldMessage) => [...oldMessage, newMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (message) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, message);
  };

  return { messages, sendMessage, setMessages };
};
