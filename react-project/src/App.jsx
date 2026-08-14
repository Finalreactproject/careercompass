import { useState } from "react";
import Sidebar from "./Components/Sidebar";
import LandingPage from "./Components/LandingPage";
import Profile from "./profile/Profile";
import EditProfile from "./profile/EditProfile";
import OverviewCards from "./Components/OverviewCards";
import RecentApplications from "./Components/RecentApplication";
import CVCenter from "./CV page/CvCenter";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("discover");
  const [showEditProfile, setShowEditProfile] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Gladys Wanjiku",
    email: "gladys@example.com",
    location: "Nairobi, Kenya",
    experienceLevel: "Student",
    bio: "Computer Science student passionate about building accessible, performant web applications.",
    skills: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Python",
      "Git",
      "TypeScript",
    ],
    targetRoles: ["Frontend Developer", "Software Engineer", "AI Intern"],
    jobTypes: ["Internship", "Entry level"],
    preferredLocations: ["Kenya", "Remote"],
    careerGoal: "Frontend Developer",
  });

  function saveProfile(updatedProfile) {
    setProfile(updatedProfile);
    setShowEditProfile(false);
  }

  // Show login page if not logged in
  if (!isLoggedIn) {
    return (
      <LandingPage
        onLogin={(role) => {
          setIsLoggedIn(true);
          localStorage.setItem("userName", "Gladys Wanjiku");
        }}
      />
    );
  }

  // Show main app with sidebar after login
  return (
    <div className="app">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        profile={profile}
      />

      <div className="page-container">
        {currentPage === "discover" && (
          <main className="main-content">
            <h1>Good morning, {profile.fullName} 👋</h1>
            <p>Here's what's happening with your career.</p>
            <OverviewCards />
            <RecentApplications />
          </main>
        )}

        {currentPage === "profile" && (
          <Profile profile={profile} onEdit={() => setShowEditProfile(true)} />
        )}

        {currentPage === "cv" && (
          <CVCenter />
        )}
      </div>

      {showEditProfile && (
        <EditProfile
          profile={profile}
          onSave={saveProfile}
          onCancel={() => setShowEditProfile(false)}
        />
      )}
    </div>
  );
}

export default App;
