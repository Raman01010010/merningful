
import io from 'socket.io-client'
import React from "react"
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import NavBar from './NavBar'
import { addMessage } from "../service/api"
import { getMessages } from '../service/api';
import Load from './Load'
import ReactDOM from 'react-dom/client';
//const socket=io.connect("http://172.31.139.237:3001/")
//const socket=io.connect("https://mern1-8ka4.onrender.com/")
const socket = io.connect("https://college-connect.azurewebsites.net")
//const socket=io.connect("chatrmn.eu-4.evennode.com")

export default function Message(props) {

  const [S, setSS] = React.useState([])
  const [m, setM] = React.useState([])
  //console.log(socket)
  var j;
  const sendM = async (event) => {
    const d = new Date().toLocaleString()
    console.log(event.target.value)
    socket.emit("send_message1", s)
    const p = {
      "content": s,
      "from": props.from,
      "to": props.to,
      "time": d
    };
    j = p;
    console.log(p)
    await addMessage(p)
    const m = await getMessages(p)
    console.log(m.response.data)


    setSS(old => {
      return ([s, ...old])
    })
    console.log(socket)
    const code = await getMessages(p)
    console.log(code.response.data)



    setM(code.response.data.reverse())

  }
  React.useEffect(() => {
    const ev1 = async (data) => {
      const d = new Date().toLocaleString()
      const p = {
        "content": s,
        "from": props.from,
        "to": props.to,
        "time": d
      };
      console.log(data)
      const code = await getMessages(p)
      console.log(code.response.data)



      setM(code.response.data.reverse())


    }

    socket.on("receive1", ev1)

  }, [socket.flag])
  React.useEffect(async (data) => {
    const d = new Date().toLocaleString()
    const p = {
      "content": s,
      "from": props.from,
      "to": props.to,
      "time": d
    };
    console.log(data)
    const root = ReactDOM.createRoot(
      document.getElementById('load')
    );

    root.render(
      <>
        <Load />
      </>
    );
    const code = await getMessages(p)
    console.log(code.response.data)
    root.render(
      <>

      </>
    );


    setM(code.response.data.reverse())

  }, [])
  const [s, setS] = React.useState("")
  const [mess, setMess] = React.useState("")
  //console.log(socket)
  const sendMessage = (event) => {
    setS(event.target.value)
    console.log(s)

    socket.emit("send_message", "")
    console.log(socket)
  }
  React.useEffect(() => {
    const ev = (data) => {
      console.log(data)
      setMess("typing")
      setTimeout(() => {
        setMess("")
      }, 1000)

      clearTimeout()
    }

    socket.on("receive", ev)

  }, [socket.flag])

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


