import { Link, useNavigate } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import { AuthContext } from "../../store/Context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate()

  const isLoggenIn = authCtx.isLoggenIn;


  const handleLogout = ()=>{
    authCtx.logout()
    localStorage.removeItem('loginId')
    navigate('/auth')
  }

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggenIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggenIn && <li>{<Link to="/profile">Profile</Link>}</li>}
          {isLoggenIn && (
            <li>{<button onClick={handleLogout}>Logout</button>}</li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
