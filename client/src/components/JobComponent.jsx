import { Link } from "react-router-dom";

function JobCompnent(props) {
  let jobDescription = props.jobDescription;

  return (
    <div className="job-component">
      <h1>{props.companyName}</h1>
      <p>{props.jobTitle}</p>
      <p>{props.jobLocation}</p>
      <Link
        to="/job-description"
        state={{
          jobDescription: jobDescription,
          jobTitle: props.jobTitle,
          jobLocation: props.jobLocation,
          companyName: props.companyName,
        }}
      >
        <button className="btn btn-outline-primary">Details</button>
      </Link>
    </div>
  );
}

export default JobCompnent;
