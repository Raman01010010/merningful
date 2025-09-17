
import io from 'socket.io-client';
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addMessage, getMessages } from '../service/api';
import Load from './Load';
import ReactDOM from 'react-dom/client';

const socket = io.connect("https://college-connect.azurewebsites.net");

export default function Message(props) {
  const [messages, setMessages] = React.useState([]);
  const [currentMessage, setCurrentMessage] = React.useState("");
  const [typingIndicator, setTypingIndicator] = React.useState("");

  React.useEffect(() => {
    loadInitialMessages();
  }, []);

  React.useEffect(() => {
    const handleReceiveMessage = async () => {
      await loadInitialMessages();
    };

    const handleTypingIndicator = () => {
      setTypingIndicator("typing");
      setTimeout(() => {
        setTypingIndicator("");
      }, 1000);
    };

    socket.on("receive1", handleReceiveMessage);
    socket.on("receive", handleTypingIndicator);

    return () => {
      socket.off("receive1", handleReceiveMessage);
      socket.off("receive", handleTypingIndicator);
    };
  }, []);

  const loadInitialMessages = async () => {
    showLoadingSpinner();
    try {
      const messageParams = {
        "content": currentMessage,
        "from": props.from,
        "to": props.to,
        "time": new Date().toLocaleString()
      };
      const response = await getMessages(messageParams);
      setMessages(response.response.data.reverse());
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      hideLoadingSpinner();
    }
  };

  const showLoadingSpinner = () => {
    const root = ReactDOM.createRoot(document.getElementById('load'));
    root.render(<Load />);
  };

  const hideLoadingSpinner = () => {
    const root = ReactDOM.createRoot(document.getElementById('load'));
    root.render(<></>);
  };

  const sendMessage = async () => {
    const messageData = {
      "content": currentMessage,
      "from": props.from,
      "to": props.to,
      "time": new Date().toLocaleString()
    };

    socket.emit("send_message1", currentMessage);
    await addMessage(messageData);
    await loadInitialMessages();
    setCurrentMessage("");
  };

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
    socket.emit("send_message", "");
  };

  function Chat() {
    return (
      <div>

        <div class="container mx-auto shadow-lg rounded-lg">



          <div class="flex flex-row justify-between bg-white">

            <div class="flex flex-col w-2/5 border-r-2 overflow-y-auto">





            </div>

            <div class="w-full px-5 flex flex-col justify-between">
              <div class="flex flex-col mt-5">



                <div id="load"></div>
                {<h1>{m.map(item => {
                  if (item.from !== props.from) {
                    return (

                      <div class="flex justify-start mb-4">
                        
                        <div
                          class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                        >
                          {item.content}
                        </div>

                      </div>
                    )
                  }
                  else {
                    return (
                      <>
                        <div class="flex justify-end mb-4">
                          <div
                            class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                          >
                            {item.content}
                          </div>
                    
                        </div>
                      </>
                    )
                  }
                })}</h1>}





              </div>

            </div>

            <div class="w-2/5 border-l-2 px-5">
              <div class="flex flex-col">

              </div>
            </div>
          </div>
        </div>
      </div>)

  }
  return (
    <div className="App">

      <br></br>
      <br></br>
      <div className="blockquote blockquote-primary" style={{ display: "flex", background: "#ffffff" }}>
        <TextField style={{ marginLeft: "20%" }} id="outlined-basic" name="t1" onChange={sendMessage} label="Enter Message" variant="outlined" />
        <br></br>
        <Button style={{ marginLeft: "20%" }} onClick={sendM} variant="contained">Send Now</Button>
      </div>
      <div>
        <br></br>
        {<h1>{mess}</h1>}
      </div>
      <div>
        Messages<br></br>

      </div>
      <Chat />

    </div>
  );
}


