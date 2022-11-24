import React, { useState } from "react"
import { useStateValue } from "../../StateProvider";
import Cookies from "js-cookie";
import apiClient from "../../apiClient";
import "./ChatInput.css";

export function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState('');
  const [{ user }] = useStateValue();

  /*
  async function sendData(name, user, userImage, message, time) {
    var theans = '';
    const req = await axios
      .post('/home/uniqueTokenForChat', {
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
  }*/

  const sendMessage = (e) => {
    e.preventDefault()

    if(!input) return false

		if (channelId) {
			const req = apiClient.put('/conversation/' + channelId, 
			{"userId":Cookies.get('userid'),"message":input}
	  , { headers: {"Authorization" : `${Cookies.get('token')}`} })
	  .then((response) => {
			console.log(response);
	  }, (error) => {
		console.log(error);
	  });}

    setInput('');
  };

  return (
    <div className="chatInput">
          <img className="sendIcon" src="/chatterLogoBlack.png" width="100" height="100" />
          {/*<div className="chat_inputBackground">hi</div>*/}
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
