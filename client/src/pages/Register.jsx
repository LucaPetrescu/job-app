import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataFromServer = await axios.post(registerRoute, values);
    console.log(dataFromServer);
    if (dataFromServer.status === 200) {
      localStorage.setItem("user", JSON.stringify(dataFromServer.data));
      navigate("/");
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="register-form">
      <form onSubmit={(event) => handleSubmit(event)}>
        <h1>Register</h1>
        <div className="content">
          <div className="input-field">
            <input
              type="text"
              placeholder="First Name"
              autoComplete="nope"
              name="firstName"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Last Name"
              autoComplete="nope"
              name="lastName"
              onChange={(e) => handleChange(e)}
            />
          </div>
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
          <button type="submit">Register</button>
          <Link to="/login">
            <button>Sign in</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
