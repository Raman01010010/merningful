import * as React from 'react';

export default function SignIn(props) {
  console.log(props.Load)
 
  const [user,setUser]=React.useState({})
  function handleChange(event){
    setUser(old=>{
        return(
            {
                ...old,
                [event.target.id]:event.target.value
            }
        )
       
    })
    console.log(user)
  }

  return (
    <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
    <div className="card col-lg-4 mx-auto">
      <div className="card-body px-5 py-5">
    
        <h3 className="card-title text-left mb-3">Login</h3>
        <form>
          <div className="form-group">
            <label>E mail *</label>
            <input id="email"  onChange={handleChange} type="text" className="form-control p_input" />
          </div>
          <div className="form-group">
            <label>Password *</label>
            <input 
            onChange={handleChange} id="token" type="password" className="form-control p_input" />
          </div>
      
          <div className="text-center">
            <div
               onClick={()=>props.props(user)}
              className="btn btn-primary btn-block enter-btn"
            >
              Login
            </div>
            <br/>
            <div id="mess"></div>
       
          </div>
          <div className="d-flex">
           
          </div>
          <p className="sign-up">
            Don't have an Account?<button type="button" className="btn-link" style={{border: 'none', background: 'none', color: 'inherit', textDecoration: 'underline', cursor: 'pointer'}}> Sign Up</button>
          </p>
        </form>
      </div>
    </div>
  </div>
  );
}