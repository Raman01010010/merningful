import { getUsers, searchUser } from "../service/api";
import React from "react";
import ReactDOM from 'react-dom/client';
import Message from './Message';
import Load from './Load';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Profile from "./Profile";

export default function User(props) {
  const [users, setUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = React.useCallback(async () => {
    const root = ReactDOM.createRoot(document.getElementById('load'));
    root.render(<Load />);
    
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      const root = ReactDOM.createRoot(document.getElementById('load'));
      root.render(<></>);
    }
  const handleMessage = (event) => {
    const root = ReactDOM.createRoot(document.getElementById('main'));
    root.render(<Message from={props.email} to={event.target.id} />);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const searchData = { "name": searchTerm, "email": searchTerm, "given_name": searchTerm };
      const code = await searchUser(searchData);
      setUsers(code.response.data);
      
      const root = ReactDOM.createRoot(document.getElementById('search'));
      root.render(<>Search Results</>);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleProfile = (event) => {
    const root = ReactDOM.createRoot(document.getElementById('main'));
    root.render(<Profile user={event.target.id} props={props.props} />);
  };

  return (<>

    <div style={{ background: "#ffffff", marginBottom: "10px", borderRadius: "10px" }}>
      <br />
      <TextField
        onChange={handleChange}
        id="name"
        label="Search User"
        multiline
        maxRows={4}
        defaultValue=""
        style={{ marginBottom: "2%" }}
      />


      <Stack direction="row" spacing={2}>
        <br />

        <Button color="success" style={{ marginLeft: "40%" }} onClick={handleSearch} variant="contained" endIcon={<SendIcon />}>
          Search
        </Button>
      </Stack>
    </div>
    <div className="row">
      <div id="load"></div>

      {
        users.reverse().map(item => {
          const k = "https://images.pexels.com/photos/360591/pexels-photo-360591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          var t;
          if (item.picture === k || item.picture === "gfgh") {
            t = "user.png"
          }
          else {
            t = [item.picture]
          }
          return (<>
            <div className="col-md-6 col-xl-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">

                  <h4 className="card-title">{item.name}</h4>
                  <div
                    className="owl-carousel owl-theme full-width owl-carousel-dash portfolio-carousel"

                  >
                    <div className="item">

                    </div>

                  </div>
                  <div className="d-flex py-4">
                
                 
                      <div className="">
                      <div className="preview-thumbnail">

                        <div style={{display:'flex'}} className="">
                          
<img
  src={t}

  alt=""
  style={{ height: "5vw" }}
/>
<button style={{borderRadius:'10px', background: 'linear-gradient(45deg, #429bf5, #dcebfa)'}} id={item.email} onClick={handleMessage} className="text-gray-800 mx-2 w-1/2 bg-indigo-500 hover:bg-indigo-700 ">Message</button><br />
<button style={{borderRadius:'10px', background: 'linear-gradient(45deg, #ff7300, #eaecc6)'}} onClick={() => handleProfile(item)} className=" mx-auto w-1/2 text-gray-800 bg-indigo-500 hover:bg-indigo-700 ">View Profile</button>

                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </>

          )
        })
      }


    </div>

  </>)
}