import React, { useState } from 'react';
import { useStateValue } from '../../StateProvider';
import axios from '../../axios';
import { imageListClasses } from '@mui/material';
import Message from './Message';
//import db from "database";

export function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState('');
  const [{ user }] = useStateValue();

  async function sendData(name, user, userImage, message, time) {
    var theans = '';
    const req = await axios
      .post('/home/uniqueTokenForChat', {
        name: name,
        username: user,
        userImage: userImage,
        userMessage: message,
        time: time,
      })
      .then(
        (response) => {
          console.log(response);
          theans = response.data.message;
          return theans;
        },
        (error) => {
          console.log(error);
        }
      );
    return theans;
  }

  const sendMessage = (e) => {
    e.preventDefault();

    if (!input) return false;

    if (channelId) {
      /*db.collection("rooms").doc(channelId).collection("messages").add({
				message: input,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				user: user.displayName,
				userImage: user.photoURL,
			})
		*/
      sendData(name, username, userImage, input);
    }

    setInput('');
  };

  return (
    <div className="chatInput">
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName}`}
        />
        <button type="submit" onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
}
export default ChatInput;
