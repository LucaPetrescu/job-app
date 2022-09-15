import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { addJob } from "../utils/APIRoutes";

function JobDescription() {
  const location = useLocation();

  const createMarkup = () => {
    return {
      __html: location.state.jobDescription,
    };
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const userFirstName = user.firstName;
  const userLastName = user.lastName;
  const userId = user.id;

  let values = {
    userId: userId,
    jobTitle: location.state.jobTitle,
    companyName: location.state.companyName,
    jobLocation: location.state.jobLocation,
  };
  console.log(values);
  const onClick = async () => {
    await axios.post(addJob, values);
  };

  return (
    <div className="description">
      <div className="topnav">
        <p className="welcome-message">
          Welcome, {`${userFirstName} ${userLastName}`}
        </p>
        <Link to="/user-applications" state={{ userId: userId }}>
          <button className="applications-button">My Applications</button>
        </Link>
        <Link to="/login">
          <button className="log-out-button">Log out</button>
        </Link>
      </div>
      <div className="job-description">
        <div dangerouslySetInnerHTML={createMarkup()}></div>
        <button className="btn btn-outline-primary" onClick={() => onClick()}>
          Apply
        </button>
        <Link to="/">
          <button className="btn btn-outline-danger back-to-dashboard-btn">
            Back to dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default JobDescription;
