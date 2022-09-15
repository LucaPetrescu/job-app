function JobsComponentApplied(props) {
  return (
    <div className="job-component">
      <h1>{props.companyName}</h1>
      <p>{props.jobTitle}</p>
      <p>{props.jobLocation}</p>
    </div>
  );
}

export default JobsComponentApplied;
