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
  }, [getAllUsers]);

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
  }, []);

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

  const handleProfile = (item) => {
    const root = ReactDOM.createRoot(document.getElementById('main'));
    root.render(<Profile user={item.email} props={item} />);
  };

  const getProfilePicture = (item) => {
    const defaultPicture = "https://images.pexels.com/photos/360591/pexels-photo-360591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    return (item.picture === defaultPicture || item.picture === "gfgh") 
      ? "user.png" 
      : item.picture;
  };

  return (
    <>
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
        <br />
        <Button onClick={handleSearch} variant="contained">Search</Button>
        <div id="search"></div>
      </div>
      
      <div className="row">
        <div id="load"></div>
        {users.slice().reverse().map((item, index) => (
          <div key={index} className="col-md-6 col-xl-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">{item.name}</h4>
                <div className="d-flex py-4">
                  <div className="preview-thumbnail">
                    <div style={{display:'flex'}} className="">
                      <img
                        src={getProfilePicture(item)}
                        alt=""
                        style={{ height: "5vw" }}
                      />
                      <div style={{marginLeft: "10px"}}>
                        <button 
                          style={{borderRadius:'10px', background: 'linear-gradient(45deg, #429bf5, #dcebfa)', marginBottom: "5px"}} 
                          id={item.email} 
                          onClick={handleMessage} 
                          className="text-gray-800 mx-2 w-full bg-indigo-500 hover:bg-indigo-700"
                        >
                          Message
                        </button>
                        <br />
                        <button 
                          style={{borderRadius:'10px', background: 'linear-gradient(45deg, #ff7300, #eaecc6)'}} 
                          onClick={() => handleProfile(item)} 
                          className="mx-auto w-full text-gray-800 bg-indigo-500 hover:bg-indigo-700"
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}