import JobComponent from "./JobComponent";

import { useState } from "react";
import { useEffect } from "react";

function JobList(props) {
  useEffect(() => {});

  return (
    <div>
      {props.jobs.map((job) => {
        return (
          <JobComponent
            companyName={job.company_name}
            jobTitle={job.title}
            jobLocation={job.location}
            jobDescription={job.description}
          />
        );
      })}
    </div>
  );
}

export default JobList;
