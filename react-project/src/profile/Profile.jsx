function Profile({ profile, onEdit }) {
  return (
    <main className="main-content profile-page">
      {/* Header */}

      <div className="profile-header">
        <div>
          <h1>Career Profile</h1>

          <p>Your profile powers job matching</p>
        </div>

        <button className="edit-profile-button" onClick={onEdit}>
          ✎ Edit Profile
        </button>
      </div>

      <div className="profile-layout">
        {/* LEFT */}

        <div className="profile-main">
          {/* Personal Information */}

          <section className="profile-card">
            <h3>PERSONAL INFORMATION</h3>

            <div className="personal-grid">
              <ProfileField label="Full Name" value={profile.fullName} />

              <ProfileField label="Email" value={profile.email} />

              <ProfileField label="Location" value={profile.location} />

              <ProfileField
                label="Experience Level"
                value={profile.experienceLevel}
              />
            </div>

            <div className="bio">
              <label>Bio</label>

              <p>{profile.bio}</p>
            </div>
          </section>

          {/* Skills */}

          <section className="profile-card">
            <h3>SKILLS</h3>

            <div className="profile-tags">
              {profile.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </section>

          {/* Target Roles */}

          <section className="profile-card">
            <h3>TARGET ROLES</h3>

            <div className="role-tags">
              {profile.targetRoles.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT */}

        <div className="profile-side">
          {/* Profile summary */}

          <section className="profile-summary">
            <div className="large-avatar">{getInitials(profile.fullName)}</div>

            <h2>{profile.fullName}</h2>

            <p>{profile.location}</p>
          </section>

          {/* Preferences */}

          <section className="profile-card preferences">
            <h3>PREFERENCES</h3>

            <label>Job Types</label>

            <div className="preference-tags">
              {profile.jobTypes.map((type) => (
                <span key={type}>☑ {type}</span>
              ))}
            </div>

            <label>Locations</label>

            <div className="preference-tags">
              {profile.preferredLocations.map((location) => (
                <span key={location}>☑ {location}</span>
              ))}
            </div>
          </section>

          {/* Career Goal */}

          <section className="profile-card career-goal">
            <h3>CAREER GOAL</h3>

            <div className="goal">🎯 {profile.careerGoal}</div>

            <p>Level: {profile.experienceLevel}</p>
          </section>
        </div>
      </div>
    </main>
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="profile-field">
      <label>{label}</label>

      <p>{value}</p>
    </div>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export default Profile;
