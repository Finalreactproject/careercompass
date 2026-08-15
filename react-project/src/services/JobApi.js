const API_URL =
  "https://remotive.com/api/remote-jobs?limit=20&category=software-dev";

export async function fetchJobs() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await response.json();

  const jobs = data.jobs.map((job) => ({
    ...job,
    description: job.description.replace(/<[^>]*>/g, ""),
  }));

  return jobs;
}
