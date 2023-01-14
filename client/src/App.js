import React from "react";
import {useState, useEffect, setRole} from "react";
import './App.css';
import Axios from 'axios';

 
function App() {
 
  const [usernameReg, setUernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState ("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("https://cap-capstone.herokuapp.com/register", {
      username: usernameReg,
      password: passwordReg,
     }).then((response) => {
        console.log(response);
     });
   };
 
   const login = () => {
    Axios.post("https://cap-capstone.herokuapp.com/login", {
       username: username,
       password: password,
    }).then((response) => {
       if (!response.data.message) {
          setLoginStatus( response.data.message);
       } else {
          setLoginStatus (response.data[0].message);
       }
    });
    };
    useEffect(() => {
      Axios.get("https://cap-capstone.herokuapp.com/login").then((response) => {
        if (response.data.loggedIn === true) {
          setRole(response.data.user[0].role);
        }
      });
    }, []);

   return (

     <div className="App">
        <div className="registration">
           <h1>Registration</h1>
           <label>Username</label>
           <input
           type="text"
           onChange={(e) => {
              setUernameReg(e.target.value);
           }} /><br/>
           <label>password</label>
           <input type="text"  onChange={(e) =>{
              setPasswordReg(e.target.value);
           }}/> <br />
           <button onClick={register}> Register</button>
        </div>
        <div className="login">
           <h1>Login</h1>
           <input type="text" placeholder="Username…"  onChange = { (e) => {
                 setUsername (e.target.value);
              }}/> <br/>
           <input type="password" placeholder="Password…" onChange = { (e) => {
                 setPassword (e.target.value);
              }} />
           <button onClick={login}>Login</button>
        </div>
        <h1> {loginStatus}</h1>
     </div>
   );
   
}
 
export default App;