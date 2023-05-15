import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const enteredEmail = useRef();
  const enteredPassword = useRef();

  const [isLoading, setIsLoading] = useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

const formSubmit = async (e) => {
  e.preventDefault();

  const emailData = enteredEmail.current.value;
  const passwordData = enteredPassword.current.value;
  setIsLoading(true);

  if (isLogin) {
    // Code for login
  } else {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDC7d3qLUkkIlrKFfWsQrqn1Xl-9uxeQFc",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailData,
            password: passwordData,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
        const data = await response.json();
        let alertMessage = "Authentication Failed";
        if (data && data.error && data.error.message) {
          alertMessage = data.error.message;
        }
        alert(alertMessage);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
};

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={formSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={enteredEmail} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={enteredPassword} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button type="submit">{isLogin ? "Log In" : "Create Account"}</button>}
          {isLoading && <button>Sending Response ....</button>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;