import "./App.css";
import React ,{useState} from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { Mongoose } from "mongoose";
import ProjectsIndex from "./pages/ProjectsIndex/ProjectsIndex";
import Profile from "./pages/ProfileIndex/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import { GoogleLogout } from 'react-google-login';



function App() {

const [userObj, setUserObj] = useState({})

  let profileObj

  const handleLogin = (response) => {
    // console.log(response.profileObj);
    // console.log(response.profileObj.isSignedIn);
    profileObj = response.profileObj
    setUserObj(
    {...profileObj}
    )
    console.log("userObj email " + userObj.email)
  };

  const handleLogout = (e) => {

    console.log('you are logged out')
  }

  


  return (
    <div className="App">
      
      
      <GoogleLogin 
        clientId='893359449772-dd1ri95gq198m28a1k6t534k35fr0ovk.apps.googleusercontent.com'
        render={renderProps => (
          <button className="googleLogin" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</button>
        )}
        buttonText="Login"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        isSignedIn={true}
        cookiePolicy={"single_host_origin"}
      />
      <GoogleLogout
  clientId="893359449772-dd1ri95gq198m28a1k6t534k35fr0ovk.apps.googleusercontent.com"
  render={renderProps => (
    <button className="googleLogout" onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</button>
  )}
  buttonText="Logout"
  onLogoutSuccess={handleLogout}
>
</GoogleLogout>
      <Link style={{ margin: "10px" }}to='/projects'>Projects</Link>
      <Link style={{ margin: "10px" }} to='/profile'>Profile</Link>
      <Link style={{ margin: "10px" }} to='/EditProfile'>Edit</Link>
      <Switch>
        <Route path="/projects">
          <ProjectsIndex />
        </Route>
        <Route path="/EditProfile">
          <EditProfile />
        </Route>
       
        <Route path="/profile">
          <Profile userObj={userObj} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
