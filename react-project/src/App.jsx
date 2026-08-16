import { useState } from 'react'
import Sidebar from './Components/Sidebar'
import Landing from './landingpage/Landing'
import Signup from './Components/signup'
import Profile from './profile/Profile'
import EditProfile from './profile/EditProfile'
import OverviewCards from './Components/OverviewCards'
import RecentApplications from './Components/RecentApplication'
import JobDiscovery from './JobDiscovery/JobDiscovery'
import CVCenter from './CV page/CvCenter'
import Applications from './applications/Applications'
import ApplicationDetails from './applications/ApplicationDetails'
import OfferDetails from './applications/OfferDetails'
import Interviews from './applications/Interviews'
import InterviewPractice from './applications/InterviewPractice'
import InterviewDetails from './applications/InterviewDetails'
import RecruiterDashboard from './recruiter/RecruiterDashboard'
import RecruiterInterviews from './recruiter/RecruiterInterviews'
import RecruiterProfile from './recruiter/RecruiterProfile'


const DEFAULT_PROFILE = {
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
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState('student')
  const [currentPage, setCurrentPage] = useState('discover')
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [profile, setProfile] = useState(DEFAULT_PROFILE)

  // Sub-views
  const [selectedApp, setSelectedApp] = useState(null)
  const [selectedOfferApp, setSelectedOfferApp] = useState(null)
  const [selectedInterview, setSelectedInterview] = useState(null)
  const [practiceInterview, setPracticeInterview] = useState(null)

  function clearSubViews() {
    setSelectedApp(null)
    setSelectedOfferApp(null)
    setSelectedInterview(null)
    setPracticeInterview(null)
  }

  function navigateTo(page) {
    setCurrentPage(page)
    clearSubViews()
  }

  function handleLogin(role = 'student') {
    setUserRole(role)
    setIsLoggedIn(true)
    localStorage.setItem('userName', role === 'recruiter' ? 'Recruiter HQ' : profile.fullName)
    setCurrentPage(role === 'recruiter' ? 'recruiter' : 'discover')
  }

  function handleLogout() {
    setIsLoggedIn(false)
    clearSubViews()
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

  function renderApplications() {
    if (selectedOfferApp) {
      return (
        <OfferDetails
          app={selectedOfferApp}
          onBack={() => setSelectedOfferApp(null)}
          onAcceptOffer={(id) => handleStatusChange(id, 'Accepted', 'Offer officially accepted with digital signature.')}
        />
      )
    }
    if (selectedApp) {
      return (
        <ApplicationDetails
          app={selectedApp}
          onBack={() => setSelectedApp(null)}
          onStatusChange={handleStatusChange}
          onViewOffer={setSelectedOfferApp}
          onPracticeInterview={(iv) => {
            setPracticeInterview(iv)
            setCurrentPage('interviews')
          }}
        />
      )
    }
    return <Applications onViewDetails={setSelectedApp} onNavigateToJobs={() => navigateTo('jobs')} />
  }

  function renderInterviews() {
    if (practiceInterview) {
      return <InterviewPractice interview={practiceInterview} onBack={() => setPracticeInterview(null)} />
    }
    if (selectedInterview) {
      return (
        <InterviewDetails
          interview={selectedInterview}
          onBack={() => setSelectedInterview(null)}
          onPractice={setPracticeInterview}
        />
      )
    }
    return <Interviews onPractice={setPracticeInterview} onViewDetails={setSelectedInterview} />
  }

  function renderMainContent() {
    switch (currentPage) {
      case 'discover':
        return (
          <main className="main-content">
            <div style={{ marginBottom: 20 }}>
              <h1 style={{ margin: '0 0 6px' }}>Good morning, {profile.fullName}</h1>
              <p style={{ margin: 0, color: '#666' }}>Here is a summary of your job search progress.</p>
            </div>
            <OverviewCards />
            <RecentApplications onNavigateToApplications={() => navigateTo('applications')} />
          </main>
        )
      case 'jobs':
        return <JobDiscovery onNavigateToApplications={() => navigateTo('applications')} />
      case 'applications':
        return renderApplications()
      case 'interviews':
        return renderInterviews()
      case 'recruiter':
        return <RecruiterDashboard />
      case 'signup':
        return <Signup onLogin={handleLogin} />
      case 'recruiter-interviews':
        return <RecruiterInterviews />
      case 'recruiter-profile':
        return <RecruiterProfile />
      case 'cv':
        return <CVCenter />
      case 'profile':
        return <Profile profile={profile} onEdit={() => setShowEditProfile(true)} />
      default:
        return null
    }
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
        {renderMainContent()}
      </div>

      {showEditProfile && (
        <EditProfile
          profile={profile}
          onSave={(updated) => {
            setProfile(updated)
            setShowEditProfile(false)
          }}
          onCancel={() => setShowEditProfile(false)}
        />
      )}
    </div>
  )
}

export default App
