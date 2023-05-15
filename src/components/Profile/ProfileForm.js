import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import { AuthContext } from "../../store/Context";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const newPassword = useRef();
  const navigate = useNavigate()

  const authctx = useContext(AuthContext)
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredPassword = newPassword.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDC7d3qLUkkIlrKFfWsQrqn1Xl-9uxeQFc", {
        method : 'POST',
        body : JSON.stringify({
          idToken : authctx.token,
          password : enteredPassword,
          returnSecureToken: true 
        }),
        headers : {
          'Content-Type' : 'application/json'
        }
      }
    ).then((res)=>{
      if(res.ok){
        navigate('/')
        console.log("passwordChanged")
      }
    })
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPassword} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
