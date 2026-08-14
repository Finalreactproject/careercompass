import { useState } from "react";

function EditProfile({ profile, onSave, onCancel }) {
  const [form, setForm] = useState({
    ...profile,
    skills: profile.skills.join(", "),
    targetRoles: profile.targetRoles.join(", "),
    jobTypes: profile.jobTypes.join(", "),
    preferredLocations: profile.preferredLocations.join(", "),
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updatedProfile = {
      ...form,

      skills: form.skills
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      targetRoles: form.targetRoles
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      jobTypes: form.jobTypes
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      preferredLocations: form.preferredLocations
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    onSave(updatedProfile);
  }

  return (
    <div className="edit-overlay">
      <div className="edit-modal">
        <div className="edit-header">
          <div>
            <h2>Edit Profile</h2>

            <p>Update your profile information</p>
          </div>

          <button className="close-button" onClick={onCancel}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <FormInput
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />

            <FormInput
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <FormInput
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
            />

            <div className="form-group">
              <label>Experience Level</label>

              <select
                name="experienceLevel"
                value={form.experienceLevel}
                onChange={handleChange}
              >
                <option>Student</option>
                <option>Entry level</option>
                <option>Junior</option>
                <option>Mid-level</option>
                <option>Senior</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Bio</label>

            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Skills</label>

            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="React, JavaScript, CSS"
            />

            <small>Separate skills with commas</small>
          </div>

          <div className="form-group">
            <label>Target Roles</label>

            <input
              name="targetRoles"
              value={form.targetRoles}
              onChange={handleChange}
              placeholder="Frontend Developer, Software Engineer"
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Job Types</label>

              <input
                name="jobTypes"
                value={form.jobTypes}
                onChange={handleChange}
                placeholder="Internship, Entry level"
              />
            </div>

            <div className="form-group">
              <label>Preferred Locations</label>

              <input
                name="preferredLocations"
                value={form.preferredLocations}
                onChange={handleChange}
                placeholder="Kenya, Remote"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Career Goal</label>

            <input
              name="careerGoal"
              value={form.careerGoal}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>

            <button type="submit" className="save-profile-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormInput({ label, name, value, onChange }) {
  return (
    <div className="form-group">
      <label>{label}</label>

      <input name={name} value={value} onChange={onChange} />
    </div>
  );
}

export default EditProfile;
