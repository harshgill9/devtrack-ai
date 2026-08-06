import { useEffect, useState } from "react";
import { getJobs, deleteJob } from "../../services/jobService";
import JobForm from "../../components/jobs/JobForm";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(id);
      loadJobs();
    } catch (error) {
      console.error(error);
      alert("Failed to delete job");
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Job Management
      </h1>

      <JobForm
        onJobAdded={loadJobs}
        editingJob={editingJob}
        onCancelEdit={() => setEditingJob(null)}
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">Company</th>
              <th className="text-left p-3">Position</th>
              <th className="text-left p-3">Location</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-t">
                <td className="p-3">{job.company}</td>
                <td className="p-3">{job.position}</td>
                <td className="p-3">{job.location}</td>
                <td className="p-3">{job.status}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(job)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                            
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {jobs.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-6">
                  No Jobs Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}