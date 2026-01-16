import React, { useContext, useEffect, useState } from "react";
import { getAllHandler } from "../utils/FetchHandlers";

const jobContext = React.createContext();

const JobContext = ({ children }) => {
  const [jobLoading, setJobLoading] = useState(true);
  const [jobError, setJobError] = useState({ status: false, message: "" });
  const [jobs, setJobs] = useState({});

  const handleJobFetch = async (url) => {
    setJobLoading(true);
    console.log("JobContext: Fetching jobs from URL:", url);
    try {
      const response = await getAllHandler(url);
      console.log("JobContext: Received response:", response);
      setJobError({ status: false, message: "" });
      setJobs(response);
    } catch (error) {
      console.error("JobContext: Error fetching jobs:", error);
      setJobError({ status: true, message: error?.message });
      setJobs({ status: false });
      setJobLoading(false);
    }
    setJobLoading(false);
  };

  useEffect(() => {
    handleJobFetch(`/jobs?page=1`);
  }, []);
  const passing = {
    jobLoading,
    jobError,
    jobs,
    setJobs,
    handleJobFetch,
  };

  return <jobContext.Provider value={passing}>{children}</jobContext.Provider>;
};

const useJobContext = () => useContext(jobContext);

export { useJobContext, JobContext };
