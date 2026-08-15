import { useEffect, useState } from "react";
import { fetchJobs } from "../services/JobApi";
import JobCard from "./JobCard";
import JobDetails from "./JobDetails";
import SearchBar from "./SearchBar";

function JobDiscovery() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [savedJobs, setSavedJobs] = useState([]);

  function toggleSaveJob(job) {
    setSavedJobs((currentSavedJobs) => {
      const alreadySaved = currentSavedJobs.some(
        (savedJob) => savedJob.id === job.id,
      );

      if (alreadySaved) {
        return currentSavedJobs.filter((savedJob) => savedJob.id !== job.id);
      }

      return [...currentSavedJobs, job];
    });
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadJobs() {
      try {
        const apiData = await fetchJobs();
        const storedRecruiterJobs = JSON.parse(localStorage.getItem('recruiter_jobs') || '[]');
        const recruiterFormatted = storedRecruiterJobs.map((rj) => ({
          id: rj.id,
          title: rj.title,
          company_name: rj.company || 'Verified Employer',
          candidate_required_location: rj.location || 'Nairobi (Hybrid)',
          job_type: rj.type ? rj.type.toLowerCase().replace('-', '_') : 'full_time',
          description: rj.description || 'Verified job opening on CareerCompass platform.',
          url: '#',
          salary: rj.salary,
          skills: rj.skills,
        }));
        setJobs([...recruiterFormatted, ...apiData]);
      } catch {
        const storedRecruiterJobs = JSON.parse(localStorage.getItem('recruiter_jobs') || '[]');
        if (storedRecruiterJobs.length > 0) {
          setJobs(storedRecruiterJobs.map((rj) => ({
            id: rj.id,
            title: rj.title,
            company_name: rj.company || 'Verified Employer',
            candidate_required_location: rj.location || 'Nairobi (Hybrid)',
            job_type: rj.type ? rj.type.toLowerCase().replace('-', '_') : 'full_time',
            description: rj.description || 'Verified job opening on CareerCompass platform.',
            url: '#',
            salary: rj.salary,
            skills: rj.skills,
          })));
        } else {
          setError("Failed to load jobs.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  if (loading) {
    return (
      <main className="job-discovery">
        <p style={{ padding: 40, textAlign: 'center', color: '#666' }}>Loading jobs...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="job-discovery">
        <p style={{ padding: 40, textAlign: 'center', color: '#e53935' }}>{error}</p>
      </main>
    );
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = locationFilter
      ? job.candidate_required_location
          .toLowerCase()
          .includes(locationFilter.toLowerCase())
      : true;

    const matchesJobType = jobTypeFilter
      ? job.job_type?.toLowerCase().includes(jobTypeFilter.toLowerCase())
      : true;

    return matchesSearch && matchesLocation && matchesJobType;
  });

  if (selectedJob) {
    return (
      <JobDetails
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        isSaved={savedJobs.some((savedJob) => savedJob.id === selectedJob.id)}
        onSave={() => toggleSaveJob(selectedJob)}
      />
    );
  }

  return (
    <main className="job-discovery">
      <div className="job-discovery-header">
        <h1>Discover Jobs 🔍</h1>
        <p>Find your next opportunity from top tech companies and verified recruiters.</p>
      </div>

      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

      <div className="job-filters">
        <select
          value={locationFilter}
          onChange={(event) => setLocationFilter(event.target.value)}
        >
          <option value="">All Locations</option>
          <option value="Nairobi">Nairobi / Kenya</option>
          <option value="Remote">Remote</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
        </select>

        <select
          value={jobTypeFilter}
          onChange={(event) => setJobTypeFilter(event.target.value)}
        >
          <option value="">All Job Types</option>
          <option value="full_time">Full-Time</option>
          <option value="part_time">Part-Time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      <p className="job-count">{filteredJobs.length} jobs found</p>

      <div className="job-list">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onSelect={(selectedJob) => setSelectedJob(selectedJob)}
            isSaved={savedJobs.some((savedJob) => savedJob.id === job.id)}
            onSave={() => toggleSaveJob(job)}
          />
        ))}
      </div>
    </main>
  );
}

export default JobDiscovery;

