import { useState } from 'react'
import Sidebar from './Components/Sidebar'
import Landing from './landingpage/Landing'
import Profile from './profile/Profile'
import EditProfile from './profile/EditProfile'
import OverviewCards from './Components/OverviewCards'
import RecentApplications from './Components/RecentApplication'
import DiscoverJobs from './Components/DiscoverJobs'
import CVCenter from './CV page/CvCenter'
import Applications from './applications/Applications'
import ApplicationDetails from './applications/ApplicationDetails'
import OfferDetails from './applications/OfferDetails'
import Interviews from './applications/Interviews'
import InterviewPractice from './applications/InterviewPractice'
import InterviewDetails from './applications/InterviewDetails'
import RecruiterDashboard from './recruiter/RecruiterDashboard'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState('student')
  const [currentPage, setCurrentPage] = useState('discover')
  const [showEditProfile, setShowEditProfile] = useState(false)

  // Sub-view states
  const [selectedApp, setSelectedApp] = useState(null)
  const [selectedOfferApp, setSelectedOfferApp] = useState(null)
  const [selectedInterview, setSelectedInterview] = useState(null)
  const [practiceInterview, setPracticeInterview] = useState(null)

  const [profile, setProfile] = useState({
    fullName: 'Gladys Wanjiku',
    email: 'gladys@example.com',
    location: 'Nairobi, Kenya',
    experienceLevel: 'Student',
    bio: 'Computer Science student passionate about building accessible, performant web applications.',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Python', 'Git', 'TypeScript'],
    targetRoles: ['Frontend Developer', 'Software Engineer', 'AI Intern'],
    jobTypes: ['Internship', 'Entry level'],
    preferredLocations: ['Kenya', 'Remote'],
    careerGoal: 'Frontend Developer',
  })

  function saveProfile(updated) {
    setProfile(updated)
    setShowEditProfile(false)
  }

  function handleStatusChange(id, status, notes) {
    const apps = JSON.parse(localStorage.getItem('applications')) || []
    const updated = apps.map((a) => (a.id === id ? { ...a, status, notes } : a))
    localStorage.setItem('applications', JSON.stringify(updated))
    window.dispatchEvent(new Event('applicationsUpdated'))
    if (selectedApp?.id === id) {
      setSelectedApp({ ...selectedApp, status, notes })
    }
  }

  function handleAcceptOffer(appId) {
    handleStatusChange(appId, 'Accepted', 'Offer officially accepted with digital signature.')
  }

  function navigateTo(page) {
    setCurrentPage(page)
    setSelectedApp(null)
    setSelectedOfferApp(null)
    setSelectedInterview(null)
    setPracticeInterview(null)
  }

  function handleLogin(role = 'student') {
    setUserRole(role)
    setIsLoggedIn(true)
    localStorage.setItem('userName', role === 'recruiter' ? 'Recruiter HQ' : profile.fullName)
    setCurrentPage(role === 'recruiter' ? 'recruiter' : 'discover')
  }

  function handleLogout() {
    setIsLoggedIn(false)
    setSelectedApp(null)
    setSelectedOfferApp(null)
    setSelectedInterview(null)
    setPracticeInterview(null)
  }

  if (!isLoggedIn) {
    return <Landing onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={navigateTo}
        profile={profile}
        userRole={userRole}
        onLogout={handleLogout}
      />

      <div className="page-container">
        {/* DASHBOARD */}
        {currentPage === 'discover' && (
          <main className="main-content">
            <div style={{ marginBottom: 20 }}>
              <h1 style={{ margin: '0 0 6px' }}>Good morning, {profile.fullName} 👋</h1>
              <p style={{ margin: 0, color: '#666' }}>Here is a summary of your job search progress.</p>
            </div>
            <OverviewCards />
            <RecentApplications onNavigateToApplications={() => navigateTo('applications')} />
          </main>
        )}

        {/* DISCOVER JOBS */}
        {currentPage === 'jobs' && (
          <DiscoverJobs onNavigateToApplications={() => navigateTo('applications')} />
        )}

        {/* APPLICATIONS */}
        {currentPage === 'applications' && (
          selectedOfferApp ? (
            <OfferDetails
              app={selectedOfferApp}
              onBack={() => setSelectedOfferApp(null)}
              onAcceptOffer={handleAcceptOffer}
            />
          ) : selectedApp ? (
            <ApplicationDetails
              app={selectedApp}
              onBack={() => setSelectedApp(null)}
              onStatusChange={handleStatusChange}
              onViewOffer={(app) => setSelectedOfferApp(app)}
              onPracticeInterview={(iv) => {
                setPracticeInterview(iv)
                setCurrentPage('interviews')
              }}
            />
          ) : (
            <Applications
              onViewDetails={setSelectedApp}
              onNavigateToJobs={() => navigateTo('jobs')}
            />
          )
        )}

        {/* INTERVIEWS & PRACTICE */}
        {currentPage === 'interviews' && (
          practiceInterview ? (
            <InterviewPractice
              interview={practiceInterview}
              onBack={() => setPracticeInterview(null)}
            />
          ) : selectedInterview ? (
            <InterviewDetails
              interview={selectedInterview}
              onBack={() => setSelectedInterview(null)}
              onPractice={(iv) => setPracticeInterview(iv)}
            />
          ) : (
            <Interviews
              onPractice={(iv) => setPracticeInterview(iv)}
              onViewDetails={(iv) => setSelectedInterview(iv)}
            />
          )
        )}

        {/* RECRUITER PORTAL */}
        {currentPage === 'recruiter' && <RecruiterDashboard />}

        {/* CV CENTER */}
        {currentPage === 'cv' && <CVCenter />}

        {/* PROFILE */}
        {currentPage === 'profile' && (
          <Profile profile={profile} onEdit={() => setShowEditProfile(true)} />
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfile
          profile={profile}
          onSave={saveProfile}
          onCancel={() => setShowEditProfile(false)}
        />
      )}
    </div>
  )
}

export default App
