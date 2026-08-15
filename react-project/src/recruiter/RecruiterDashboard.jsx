import { useState, useEffect } from 'react'
import RecruiterStatsOverview from './dashboard/RecruiterStatsOverview'
import RecruiterPipelineView from './dashboard/RecruiterPipelineView'
import RecruiterJobsList from './dashboard/RecruiterJobsList'
import CandidateReviewModal from './dashboard/CandidateReviewModal'
import PostJobModal from './dashboard/PostJobModal'
import ScheduleInterviewModal from './dashboard/ScheduleInterviewModal'

const INITIAL_JOBS = [
  { id: 'rj-1', title: 'Frontend Developer', type: 'Full-time', location: 'Nairobi', salary: 'KES 140k–190k', status: 'Active' },
  { id: 'rj-2', title: 'Fullstack Engineer', type: 'Full-time', location: 'Nairobi', salary: 'KES 160k–220k', status: 'Active' },
  { id: 'rj-3', title: 'Junior Data Analyst', type: 'Full-time', location: 'Remote', salary: 'KES 95k–130k', status: 'Active' },
]

const INITIAL_CANDIDATES = [
  {
    id: 'cand-1',
    name: 'Gladys Wanjiku',
    role: 'Frontend Developer',
    university: 'University of Nairobi',
    skills: ['React', 'JavaScript', 'CSS', 'Git'],
    atsScore: 94,
    stage: 'Interview',
    appliedDate: 'Aug 10, 2026',
    email: 'gladys@example.com',
    phone: '+254 712 345 678',
    notes: 'Strong portfolio projects and great problem-solving answers.',
    interviewRound: 'Technical Round',
    interviewDate: 'Aug 24, 2026 at 10:00 AM',
  },
  {
    id: 'cand-2',
    name: 'Kevin Otieno',
    role: 'Fullstack Engineer',
    university: 'Strathmore University',
    skills: ['Node.js', 'React', 'PostgreSQL', 'Docker'],
    atsScore: 89,
    stage: 'Screening',
    appliedDate: 'Aug 11, 2026',
    email: 'kevin.o@example.com',
    phone: '+254 722 987 654',
    notes: 'Good backend foundation. Ready for tech interview.',
  },
  {
    id: 'cand-3',
    name: 'Amina Hassan',
    role: 'Junior Data Analyst',
    university: 'JKUAT',
    skills: ['Python', 'SQL', 'Tableau', 'Excel'],
    atsScore: 91,
    stage: 'Offer',
    appliedDate: 'Aug 4, 2026',
    email: 'amina.h@example.com',
    phone: '+254 733 112 233',
    notes: 'Exceeded expectations in analytics case study.',
  },
  {
    id: 'cand-4',
    name: 'Brian Kiprono',
    role: 'Frontend Developer',
    university: 'Moringa School',
    skills: ['JavaScript', 'HTML', 'CSS', 'React'],
    atsScore: 86,
    stage: 'Applied',
    appliedDate: 'Aug 13, 2026',
    email: 'brian.k@example.com',
    phone: '+254 744 556 677',
    notes: 'Fresh graduate with strong practical capstone.',
  },
]

function RecruiterDashboard() {
  const [candidates, setCandidates] = useState(() => {
    const stored = localStorage.getItem('recruiter_candidates')
    return stored ? JSON.parse(stored) : INITIAL_CANDIDATES
  })
  const [jobs, setJobs] = useState(() => {
    const stored = localStorage.getItem('recruiter_jobs')
    return stored ? JSON.parse(stored) : INITIAL_JOBS
  })

  const [activeTab, setActiveTab] = useState('pipeline')
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [showPostModal, setShowPostModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)

  useEffect(() => {
    localStorage.setItem('recruiter_candidates', JSON.stringify(candidates))
  }, [candidates])

  useEffect(() => {
    localStorage.setItem('recruiter_jobs', JSON.stringify(jobs))
  }, [jobs])

  function handleAdvanceStage(candidateId, newStage, notes = '') {
    const target = candidates.find((c) => c.id === candidateId)
    if (!target) return

    const updatedCandidates = candidates.map((c) => c.id === candidateId ? { ...c, stage: newStage, notes: notes || c.notes } : c)
    setCandidates(updatedCandidates)

    if (selectedCandidate?.id === candidateId)
      setSelectedCandidate({ ...selectedCandidate, stage: newStage, notes: notes || selectedCandidate.notes })

    // Sync to applicant's applications
    const storedApps = JSON.parse(localStorage.getItem('applications')) || []
    localStorage.setItem('applications', JSON.stringify(
      storedApps.map((app) =>
        app.title.toLowerCase().includes(target.role.toLowerCase())
          ? { ...app, status: newStage, notes: notes ? `Recruiter: ${notes}` : `Updated to ${newStage}.` }
          : app
      )
    ))

    // If Interview, add to candidate's interview list
    if (newStage === 'Interview') {
      const ivList = JSON.parse(localStorage.getItem('interviews')) || []
      if (!ivList.some((iv) => iv.role === target.role)) {
        ivList.unshift({ id: 'iv-' + Date.now(), company: 'Safaricom PLC', role: target.role, round: target.interviewRound || 'Technical Round', date: target.interviewDate || 'Aug 24, 2026', time: '10:00 AM', status: 'Upcoming', location: 'Nairobi HQ / Google Meet', meetingLink: 'https://meet.google.com/saf-interview-call' })
        localStorage.setItem('interviews', JSON.stringify(ivList))
      }
    }

    // Notify job seeker
    const notifs = JSON.parse(localStorage.getItem('applicant_notifications')) || []
    localStorage.setItem('applicant_notifications', JSON.stringify([{ id: 'notif-' + Date.now(), title: `Update: ${target.role}`, message: `Your application moved to "${newStage}".${notes ? ` Note: "${notes}"` : ''}`, date: 'Just now', unread: true }, ...notifs]))

    window.dispatchEvent(new Event('applicationsUpdated'))
    window.dispatchEvent(new Event('notificationsUpdated'))
  }

  function handlePostJob(jobData) {
    const company = JSON.parse(localStorage.getItem('recruiter_profile') || '{}').companyName || 'Safaricom PLC'
    const newJob = { id: 'rj-' + Date.now(), company, ...jobData, skills: jobData.skills || ['React', 'JavaScript'], experience: jobData.experience || 'Entry level', description: jobData.description || 'Open position for graduate candidates.', status: 'Active' }
    const updatedJobs = [newJob, ...jobs]
    setJobs(updatedJobs)
    localStorage.setItem('recruiter_jobs', JSON.stringify(updatedJobs))
    setShowPostModal(false)

    const notifs = JSON.parse(localStorage.getItem('applicant_notifications')) || []
    localStorage.setItem('applicant_notifications', JSON.stringify([{ id: 'notif-' + Date.now(), title: 'New Job Posted 🚀', message: `${jobData.title} at ${company} — now open in ${jobData.location}.`, date: 'Just now', unread: true }, ...notifs]))
    window.dispatchEvent(new Event('notificationsUpdated'))
  }

  function handleScheduleInterview({ candidateId, date, time, round }) {
    const updatedCandidates = candidates.map((c) =>
      c.id === candidateId ? { ...c, stage: 'Interview', interviewDate: `${date} at ${time}`, interviewRound: round } : c
    )
    setCandidates(updatedCandidates)
    handleAdvanceStage(candidateId, 'Interview', `Interview scheduled for ${date} at ${time} (${round})`)
    setShowScheduleModal(false)
  }

  const stats = { jobsCount: jobs.length, candidatesCount: candidates.length, interviewCount: candidates.filter((c) => c.stage === 'Interview').length, offersCount: candidates.filter((c) => c.stage === 'Offer' || c.stage === 'Accepted').length }

  return (
    <main className="main-content">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <h1>Recruiter Portal & Hiring HQ 💼</h1>
          <p>Review applicants, evaluate candidates, and manage verified job listings.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-outline" onClick={() => setShowScheduleModal(true)}>
            📅 Schedule Interview
          </button>
          <button onClick={() => setShowPostModal(true)}>
            + Post Job Listing
          </button>
        </div>
      </div>

      {/* 1. KPI Stats Cards */}
      <RecruiterStatsOverview stats={stats} onSelectTab={setActiveTab} />

      {/* 2. Main Navigation Tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button
          className={activeTab === 'pipeline' ? '' : 'btn-outline'}
          onClick={() => setActiveTab('pipeline')}
        >
          👥 Candidate Pipeline ({candidates.length})
        </button>
        <button
          className={activeTab === 'jobs' ? '' : 'btn-outline'}
          onClick={() => setActiveTab('jobs')}
        >
          📋 Posted Job Listings ({jobs.length})
        </button>
      </div>

      {/* 3. Active Tab View */}
      {activeTab === 'pipeline' ? (
        <RecruiterPipelineView
          candidates={candidates}
          onInspectCandidate={setSelectedCandidate}
          onAdvanceStage={handleAdvanceStage}
        />
      ) : (
        <RecruiterJobsList
          jobs={jobs}
          candidates={candidates}
          onOpenPostModal={() => setShowPostModal(true)}
        />
      )}

      {/* 4. Modals */}
      <CandidateReviewModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onAdvanceStage={handleAdvanceStage}
      />

      <PostJobModal
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
        onPostJob={handlePostJob}
      />

      <ScheduleInterviewModal
        isOpen={showScheduleModal}
        candidates={candidates}
        onClose={() => setShowScheduleModal(false)}
        onSchedule={handleScheduleInterview}
      />
    </main>
  )
}

export default RecruiterDashboard
