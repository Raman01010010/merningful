import './App.css';
import React, { useCallback } from 'react';
import SideBar from './comp/SideBar';
import jwt_decode from 'jwt-decode';
import { addUser, addUser2, addUser3, isUser } from './service/api';
import ReactDOM from 'react-dom/client';
import Load from './comp/Load';
import Post from './comp/Post';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SideBarH from './comp/SidebarH';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import Otp from './comp/Otp';
import Feed from './comp/Feed';

//const socket=io.connect("http://172.31.139.237:3001/")
//const socket=io.connect("https://mern1-8ka4.onrender.com/")


//const socket=io.connect("chatrmn.eu-4.evennode.com")


function App() {
  const navigate = useNavigate();
  const [load, setLoad] = React.useState("0");
  const [Img, setImg] = React.useState({});
  const handleCallbackResponse = useCallback(async (response) => {
    const userObject = jwt_decode(response.credential);
    setImg(userObject);
    navigate("/dashboard");
  }, [navigate]);

  React.useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: "305937744211-8v5vok62adns8jiok8dcrqltdmlhoqkl.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById('sign1'),
      {
        theme: "outline", 
        size: "large"
      }
    );
  }, [handleCallbackResponse]);
  function Log(){
      setImg({})

      navigate("/")
  }
  async function handleSignUp(user){
    const root = ReactDOM.createRoot(
      document.getElementById('mess')
    );
    
    root.render(
      <>
      <Load/>
      </>
    );
    const k={
        "token":user.token,
      "given_name":user.given_name,
      "family_name":user.family_name,
      
      "name":`${user.given_name}${user.family_name}`,
      "email":user.email,
      "picture":"https://images.pexels.com/photos/360591/pexels-photo-360591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      
      }
      console.log(k)
      const code= await addUser(k)
  console.log(code)
  console.log(code.data)
     if(code.data===2){
      const root = ReactDOM.createRoot(
        document.getElementById('main')
      );
      console.log("otp created")
      
      root.render(
        <>
        <Otp data={k}handleotp={handleO}/>
        </>
      );
     }else{
      console.log("not Submitted")
      const root = ReactDOM.createRoot(
        document.getElementById('mess')
      );
      
      root.render(
        <>
        Error {code.response.data}
        </>)}
      
      /*
      console.log(await addUser())
     const code= await addUser(k)
  
     if(Object.keys(code.response.data).length===0){
        console.log("submitted")
        setImg(k)
        navigate("/dashboard")
        const root = ReactDOM.createRoot(
          document.getElementById('main')
        );
        
        root.render(
          <>
          <Feed see={handleSeeMore} props={Img}/>
          </>
        );
      
       
     }else{
    console.log("not Submitted")
    const root = ReactDOM.createRoot(
      document.getElementById('mess')
    );
    
    root.render(
      <>
      Error
      </>
    );}



    */

}
async function handleO(user){
  


  const root = ReactDOM.createRoot(
    document.getElementById('mess')
  );
  
  root.render(
    <>
    <Load/>
    </>
  );
  const k={
    "otp5":user.otp5,
      "token":user.token,
    "given_name":user.given_name,
    "family_name":user.family_name,
    
    "name":`${user.given_name}${user.family_name}`,
    "email":user.email,
    "picture":"https://images.pexels.com/photos/360591/pexels-photo-360591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    
    }
    console.log(k)
    const code=  await addUser2(k)
    console.log(code)
   if(code.data===2){
    console.log("submitted")
    setImg(k)
    navigate("/dashboard")
    const root = ReactDOM.createRoot(
      document.getElementById('main')
    );
    
    root.render(
      <>
      <Feed see={handleSeeMore} props={Img}/>
      </>
    );
   }else{
    const root = ReactDOM.createRoot(
      document.getElementById('mess')
    );
    
    root.render(
      <>
      Error {code.response.data}
      </>
    );
   }
    
    /*
    console.log(await addUser())
   const code= await addUser(k)

   if(Object.keys(code.response.data).length===0){
      console.log("submitted")
      setImg(k)
      navigate("/dashboard")
      const root = ReactDOM.createRoot(
        document.getElementById('main')
      );
      
      root.render(
        <>
        <Feed see={handleSeeMore} props={Img}/>
        </>
      );
    
     
   }else{
  console.log("not Submitted")
  const root = ReactDOM.createRoot(
    document.getElementById('mess')
  );
  
  root.render(
    <>
    Error
    </>
  );}



  */



}

async function handleSignIn(user) {
    const root = ReactDOM.createRoot(document.getElementById('mess'));
    root.render(<Load />);
    setLoad("1");

  const k={
      "token":user.token,
    "given_name":"l",
    "family_name":"l",
    
    "name":"k",
    "email":user.email,
    "picture":"gfgh",
    
    }
    console.log(k)
    console.log(await isUser())
   const code= await isUser(k)

   if((code.response.data)===0){
      console.log("Please check your credential")
      console.log(code.response.data)
      const root = ReactDOM.createRoot(
        document.getElementById('mess')
      );
      
      root.render(
        <>
        Error Please Check your credientials
        </>
      );
     
   }else{
    setImg(code.response.data)
    navigate("/dashboard")
    const root = ReactDOM.createRoot(
      document.getElementById('main')
    );
    
    root.render(
      <>
      <Feed see={handleSeeMore} props={Img}/>
      </>
    );
   }
}

function handleSeeMore(event) {
    const root = ReactDOM.createRoot(
      document.getElementById('main')
    );
    console.log(Img)
    root.render(
      <>
      <Post user={Img} data={event}/>
      </>
    );
    
  
  }
const fb=async(response)=>{
  console.log(response);
  setImg({
    "token":`$12rmn##{response.data.accessToken}`,
  "given_name":response.data.first_name,
  "family_name":response.data.last_name,
  
  "name":response.data.name,
  "email":`ram${response.data.userID}@gmail.com`,
  "picture":response.data.picture.data.url,
  
   })
  console.log()
  await addUser3({
    "token":`$12rmn##{response.data.accessToken}`,
  "given_name":response.data.first_name,
  "family_name":response.data.last_name,
  
  "name":response.data.name,
  "email":`ram${response.data.userID}@gmail.com`,
  "picture":response.data.picture.data.url,
  
  })
  console.log({
    "token":`$12rmn##{response.data.accessToken}`,
  "given_name":response.data.first_name,
  "family_name":response.data.last_name,
  
  "name":response.data.name,
  "email":`ram${response.data.userID}@gmail.com`,
  "picture":response.data.picture.data.url,
  
  })
navigate("/dashboard")
console.log(Img)


 }
 
  return (
    <div style={{background:"#000000"}}className="App">
 <div id="home">

  
    
    <Routes>
     <Route path="/" element={<SideBarH otp={handleO} fbb={fb} Img={Img} sifun={handleSignIn} sufun={handleSignUp} load={load} log={Log}/>} />
<Route path="/dashboard" element={<SideBar fbb={fb} Img={Img} sifun={handleSignIn} sufun={handleSignUp} load={load} log={Log}/>} />

</Routes><button>
{Object.keys(Img).length===0 &&<LoginSocialFacebook
     appId="1832325630476306"
     onResolve={fb}
     onReject={(error)=>{
      console.log(error);
     }}
     >
      <FacebookLoginButton/>

    
      </LoginSocialFacebook>}</button>
     
     </div>
     <div></div>
     <div id="sign"></div>
 
   
 
    </div>
  );
}

export default App;
