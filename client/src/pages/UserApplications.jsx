import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { getJobsForUser } from "../utils/APIRoutes";
import JobCompnentApplied from "../components/JobComponentApplied";

function UserApplications() {
  const location = useLocation();
  const userId = location.state.userId;
  const [jobs, setJobs] = useState([]);
  const url = getJobsForUser + "/" + userId;
  console.log(url);

  const user = JSON.parse(localStorage.getItem("user"));
  const userFirstName = user.firstName;
  const userLastName = user.lastName;

  useEffect(() => {
    async function getJobsForUser() {
      const jobsForUser = await axios.get(url);
      setJobs(jobsForUser.data);
    }
    getJobsForUser();
  }, []);
  console.log(jobs);

  return (
    <div>
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
      <h2 className="title">Your applications</h2>
      <div>
        {jobs.map((job) => {
          return (
            <JobCompnentApplied
              companyName={job.companyName}
              jobTitle={job.jobTitle}
              jobLocation={job.jobLocation}
            />
          );
        })}
      </div>
      <div className="user-applications-btn">
        <Link to="/">
          <button className="btn btn-outline-danger">Back to dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default UserApplications;
