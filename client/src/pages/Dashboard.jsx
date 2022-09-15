import { useEffect, useState } from "react";
import axios from "axios";
import JobList from "../components/JobList";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import Logout from "../components/Logout";

function Dashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(10);

  useEffect(() => {
    async function checkLocalStorage() {
      if (!localStorage.getItem("user")) {
        navigate("/login");
      }
    }
    checkLocalStorage();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const results = await axios.get(
        "https://arbeitnow.com/api/job-board-api"
      );
      setJobs(results.data.data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  const userFirstName = user.firstName;
  const userLastName = user.lastName;
  const userId = user.id;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstPost = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstPost, indexOfLastJob);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="topnav">
        <p className="welcome-message">
          Welcome, {`${userFirstName} ${userLastName}`}
        </p>
        <Link to="/user-applications" state={{ userId: userId }}>
          <button className="applications-button">My Applications</button>
        </Link>

        <Logout />
      </div>
      <JobList jobs={currentJobs} />
      <Pagination
        jobsPerPage={jobsPerPage}
        totalJobs={jobs.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Dashboard;
