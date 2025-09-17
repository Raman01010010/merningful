import * as React from 'react';
import {addUser} from '../service/api'

export default function SignU(props) {
 const [user,setUser]=React.useState({})
function handleChange(event){
    setUser(old=>{
        return(
            {
                ...old,
                [event.target.id]:event.target.value,

            }
        )
    })
    console.log(user)

}
console.log(props.props)
  return (
    <div className="container-scroller">
    <div className="container-fluid page-body-wrapper full-page-wrapper">
      <div className="row w-100 m-0">
        <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
          <div className="card col-lg-4 mx-auto">
            <div className="card-body px-5 py-5">
              <h3 className="card-title text-left mb-3">Register</h3>
              <form>
                <div className="form-group">
                  <label>First Name</label>
                  <input  onChange={handleChange}  id="given_name"type="text" className="form-control p_input" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input  onChange={handleChange} id="family_name"type="text" className="form-control p_input" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input  onChange={handleChange} id="email"type="email" className="form-control p_input" />
                </div>
                <div   className="form-group">
                  <label>Password</label>
                  <input  onChange={handleChange} type="password"id="token" className="form-control p_input" />
                </div>
              
                <div className="text-center">
                  <div
                     onClick={()=>props.props(user)}
                    className="btn btn-primary btn-block enter-btn"
                  >
                    Sign Up
                  </div>
                  <div id="mess"></div>
                </div>
                <div className="d-flex">
                
                </div>
                <p className="sign-up text-center">
                  Already have an Account?<button type="button" className="btn-link" style={{border: 'none', background: 'none', color: 'inherit', textDecoration: 'underline', cursor: 'pointer'}}> Sign Up</button>
                </p>
                <p className="terms">
                  By creating an account you are accepting our
                  <button type="button" className="btn-link" style={{border: 'none', background: 'none', color: 'inherit', textDecoration: 'underline', cursor: 'pointer'}}> Terms &amp; Conditions</button>
                </p>
              </form>
            </div>
          </div>
        </div>
        {/* content-wrapper ends */}
      </div>
      {/* row ends */}
    </div>
    {/* page-body-wrapper ends */}
  </div>
  );
}