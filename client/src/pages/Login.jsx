import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(values);
    const dataFromServer = await axios.post(loginRoute, values);
    console.log("aici", dataFromServer.data);
    if (dataFromServer.status === 200) {
      localStorage.setItem("user", JSON.stringify(dataFromServer.data));
      navigate("/");
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="login-form">
      <form onSubmit={(event) => handleSubmit(event)}>
        <h1>Login</h1>
        <div className="content">
          <div className="input-field">
            <input
              type="email"
              placeholder="Email"
              autoComplete="nope"
              name="email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Password"
              autoComplete="nope"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="action">
          <Link to="/register">
            <button>Register</button>
          </Link>
          <button>Sign in</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
