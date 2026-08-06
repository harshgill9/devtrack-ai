import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { getJobs, getResumes } from "../../services/dashboardService";

export default function StatsSection() {
  const [jobs, setJobs] = useState([]);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const jobsData = await getJobs();
        const resumesData = await getResumes();

        setJobs(jobsData);
        setResumes(resumesData);
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    loadData();
  }, []);

  const appliedCount = jobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interviewCount = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const stats = [
    {
      title: "Total Jobs",
      value: jobs.length,
      color: "bg-blue-600",
    },
    {
      title: "Applied",
      value: appliedCount,
      color: "bg-green-600",
    },
    {
      title: "Interviews",
      value: interviewCount,
      color: "bg-yellow-600",
    },
    {
      title: "Resumes",
      value: resumes.length,
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => (
        <StatCard key={item.title} {...item} />
      ))}
    </div>
  );
}