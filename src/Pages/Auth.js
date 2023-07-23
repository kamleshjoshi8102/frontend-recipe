import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Auth() {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
}

// both login and register components are same
// but api logic is somehow different

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);

  // used to navigate our page on any actions performed
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      // here we will check what api is sending back
      const response = await axios.post("https://recipebackend-qwpw.onrender.com/auth/login", {
        username,
        password,
      });
      // cookie will have response data
      // because in users we have an object which is send from backend which has a token
      // as JSON "secret"
      setCookies("access_token", response.data.token);
      // console.log(response);

      // for quick access we are storing the userID to our local storage
      window.localStorage.setItem("userID", response.data.userID);
      
      
      // navigaing to homepage after login

      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (event) => {
    // to prevent page refresh
    event.preventDefault();

    try {
      await axios.post("https://recipebackend-qwpw.onrender.com/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now Login!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="auth-container">
      <form action="" onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="form-group">
          <label htmlFor="user">Username: </label>
          <input
            type="text"
            id="username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="user">Password: </label>
          <input
            type="password"
            id="password"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <button type="submit">{label}</button>
      </form>
    </div>
  );
};

export default Auth;
