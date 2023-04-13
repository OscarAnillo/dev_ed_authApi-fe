import { useState } from "react";
import axios from "axios";

export const LoginComponent = () => {
  const [userInputSignup, setUserInputSignup] = useState({
    name: "",
    email: "",
    password: "",
  });
  // eslint-disable-next-line
  const [successSignUp, setSuccessSignUp] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [userInputSignIn, setUserInputSignIn] = useState({
    email: "",
    password: "",
  });
  const [successSignIn, setSuccessSignIn] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserInputSignup({
      ...userInputSignup,
      [name]: value,
    });
  };

  const changeHandlerSignIn = (e) => {
    const { name, value } = e.target;
    setUserInputSignIn({
      ...userInputSignIn,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill out all the required data!");
      return;
    }
    axios
      .post("http://localhost:3005/api/user/register", {
        name: userInputSignup.name,
        email: userInputSignup.email,
        password: userInputSignup.password,
      })
      .then((res) => {
        console.log("RES :", res.data);
      })
      .catch((err) => {
        setSignUpError(err.response.data);
        console.log("ERR:", err.response.data);
      });
    setSuccessSignUp(true);
    setUserInputSignup({ name: "", email: "", password: "" });
  };

  const submitHandlerSignIn = (e) => {
    e.preventDefault();
    if (!userInputSignIn.email || !userInputSignIn.password) {
      alert("Please fill out all the required data!");
      return;
    }
    axios
      .post("http://localhost:3005/api/user/login", {
        email: userInputSignIn.email,
        password: userInputSignIn.password,
      })
      .then((res) => {
        console.log(res);
      });
    setSuccessSignIn(true);
  };

  const { name, email, password } = userInputSignup;
  return (
    <>
      {!successSignIn ? (
        <div className="main-div">
          <div className="div-one">
            <h1>Sign Up</h1>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={changeHandler}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={changeHandler}
              />
              {signUpError && <p className="error">{signUpError}</p>}
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={changeHandler}
              />
              <button>Register</button>
            </form>
          </div>
          <div className="div-two">
            <h1>Sign In</h1>
            <form onSubmit={submitHandlerSignIn}>
              <input
                type="email"
                placeholder="email"
                name="email"
                value={userInputSignIn.email}
                onChange={changeHandlerSignIn}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={userInputSignIn.password}
                onChange={changeHandlerSignIn}
              />
              <button>Login</button>
            </form>
          </div>
        </div>
      ) : (
        <h1>Welcome {name}</h1>
      )}
    </>
  );
};
