export default function PostJobModal({ isOpen, onClose, onPostJob }) {
  if (!isOpen) return null

  const submitJob = (e) => {
    e.preventDefault()

    const data = new FormData(e.target)

    const newJob = {
      id: 'rj-' + Date.now(),
      title: data.get("title"),
      company: data.get("company"),
      location: data.get("location"),
      type: data.get("type") || "Full-time",
      salary: "KES 120,000 – 160,000/mo",
      description: data.get("description"),
      apply: data.get("apply"),
      skills: ["React", "JavaScript"],
      experience: "Entry level",
      status: "Active",
      deadline: "Nov 30, 2026",
    }

    const jobs = JSON.parse(localStorage.getItem("postedJobs")) || []
    localStorage.setItem("postedJobs", JSON.stringify([...jobs, newJob]))

    onPostJob(newJob)
    onClose()
  }

  const s = {
    display: "block",
    width: "100%",
    padding: "13px",
    marginBottom: "16px",
    boxSizing: "border-box",
    border: "1px solid #d8dce8",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "inherit",
    background: "#fff",
  }

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
  }

  return (
    <div className="edit-overlay" onClick={onClose}>
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          margin: "30px auto",
          padding: "35px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(23, 37, 84, 0.15)",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h1 style={{ margin: 0, fontSize: "24px", color: "#172554" }}>Post a Job</h1>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#666",
              padding: "0 4px",
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={submitJob}>
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
      </div>
    </div>
  )
}



