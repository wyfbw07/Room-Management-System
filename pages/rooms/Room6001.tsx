// pages/rooms/Room6001.tsx
import "../../app/globals.css";
import io from 'socket.io-client';
import styles from './Room6001.module.css';
import { useEffect, useState } from 'react';

let socket;

const Room6001 = () => {
  const [message, setMessage] = useState('');
  const [messageHistory, setMessages] = useState<any[]>([]);

  useEffect(() => {

    const establishConnection = async () => {
      try {
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });

        const result = await response.json();
        console.log(result);
        setMessage('');
      } catch (error) {
        console.error('Failed to establish connection:', error);
      }
    };

    // Establish a connection to the server
    (async () => {
      await establishConnection();
    })();

    socket = io();
    // Listen for messages from the server
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [msg, ...prevMessages]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off('message');
      socket.disconnect();
    };
  }, []);

  // Send a message to the server
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('message', { message, id: socket.id });
      setMessage('');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.header}>Room 6027</h1>
      
      <h2>Room Schduled Usage</h2>
      {/* Can integrate room schedules in the future */}
      <img src={`/rooms/RoomSchedule.png?}`} alt="Room Schedule Image" style={{ width: '100%', height: 'auto' }} />
      <h2>Contact Administrators</h2>
      <form onSubmit={sendMessage} className={styles.messageFormContainer}>
        <div className={styles.messageForm}>
          <input
            type="text"
            className={styles.messageInput}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit" className={styles.sendButton}>
            Send
          </button>
        </div>
      </form>
      <div className={styles.messageHistory}>
        {messageHistory.map((msg, index) => (
          <div key={index} className={styles.message}>
            <span>{msg.message}</span>
            <span className={styles.messageId}>User: {msg.id.slice(0, 3)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room6001;
