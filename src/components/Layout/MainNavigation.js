import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import { AuthContext } from "../../store/Context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggenIn = authCtx.isLoggenIn;

  // const [login, setLogin] = useState(false)
  // const loginId = localStorage.getItem('loginId')
  // useEffect(()=>{
  //   if(loginId){
  //     setLogin(true)
  //   }else{
  //     setLogin(false)
  //   }
  // }, [])


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
            <li>{<button onClick={authCtx.logout}>Logout</button>}</li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
