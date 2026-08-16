function RecruiterForm({ onDone }) {
  const submitJob = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const newJob = {
      id: Date.now(),
      title: data.get("title"),
      company: data.get("company"),
      location: data.get("location"),
      type: data.get("type"),
      description: data.get("description"),
      apply: data.get("apply"),
    };

    const jobs = JSON.parse(localStorage.getItem("postedJobs")) || [];

    localStorage.setItem("postedJobs", JSON.stringify([...jobs, newJob]));

    const recruiterJobs = JSON.parse(localStorage.getItem("recruiter_jobs")) || [];
    localStorage.setItem("recruiter_jobs", JSON.stringify([newJob, ...recruiterJobs]));

    window.dispatchEvent(new Event("jobsUpdated"));
    window.dispatchEvent(new Event("applicationsUpdated"));

    onDone(newJob);
  };

  const s = {
    display: "block",
    width: "100%",
    padding: "13px",
    marginBottom: "16px",
    boxSizing: "border-box",
    border: "1px solid #d8dce8",
    borderRadius: "8px",
  };

  const b = {
    width: "100%",
    padding: "13px",
    marginTop: "5px",
    border: 0,
    borderRadius: "8px",
    background: "#172554",
    color: "white",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
  };

  return (
    <form
      onSubmit={submitJob}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <input required name="company" placeholder="Company" style={s} />
      <input required name="location" placeholder="Location" style={s} />
      <input required name="title" placeholder="Job title" style={s} />
      <input name="type" placeholder="Job type" style={s} />

      <textarea
        required
        name="description"
        placeholder="Job description"
        style={{ ...s, height: "120px", resize: "vertical" }}
      />

      <input name="apply" placeholder="How to apply" style={s} />

      <button type="submit" style={b}>
        Post Job
      </button>
    </form>
  );
}

export default RecruiterForm;
