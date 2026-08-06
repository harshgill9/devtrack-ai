import { useEffect, useState } from "react";
import {
  createJob,
  updateJob,
} from "../../services/jobService";

const initialState = {
  company: "",
  position: "",
  location: "",
  status: "Applied",
  applied_date: new Date().toISOString().split("T")[0],
  job_url: "",
  notes: "",
};

export default function JobForm({
  onJobAdded,
  editingJob,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingJob) {
      setFormData({
        ...editingJob,
      });
    } else {
      setFormData(initialState);
    }
  }, [editingJob]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingJob) {
        await updateJob(editingJob.id, formData);
        alert("Job Updated Successfully");
      } else {
        await createJob(formData);
        alert("Job Added Successfully");
      }

      setFormData(initialState);

      if (onJobAdded) {
        onJobAdded();
      }

      if (onCancelEdit) {
        onCancelEdit();
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-6 mb-6 space-y-4"
    >
      <h2 className="text-xl font-semibold">
        {editingJob ? "Edit Job" : "Add New Job"}
      </h2>

      <input
        type="text"
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />

      <input
        type="text"
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingJob ? "Update Job" : "Add Job"}
        </button>

        {editingJob && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}