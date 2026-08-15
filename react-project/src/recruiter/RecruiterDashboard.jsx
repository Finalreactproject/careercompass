/**
 * Recruiter Dashboard & Hiring HQ
 *
 * Coordinates candidate pipeline management, active job postings,
 * interview scheduling, and applicant dossier review with live
 * notification dispatch to job seekers.
 */

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

  // Advances candidate stage, updates candidate list, syncs with applicant's applications, and emits notification
  function handleAdvanceStage(candidateId, newStage, notes = '') {
    const targetCandidate = candidates.find((c) => c.id === candidateId)
    if (!targetCandidate) return

    const updatedCandidates = candidates.map((c) =>
      c.id === candidateId ? { ...c, stage: newStage, notes: notes || c.notes } : c
    )
    setCandidates(updatedCandidates)

    if (selectedCandidate?.id === candidateId) {
      setSelectedCandidate({ ...selectedCandidate, stage: newStage, notes: notes || selectedCandidate.notes })
    }

    // 1. Sync directly with Applicant's Applications in localStorage
    const storedApps = JSON.parse(localStorage.getItem('applications')) || []
    const updatedApps = storedApps.map((app) => {
      // match by role or company (or if it's Gladys Wanjiku)
      if (
        app.title.toLowerCase().includes(targetCandidate.role.toLowerCase()) ||
        targetCandidate.name.toLowerCase().includes('gladys')
      ) {
        return {
          ...app,
          status: newStage,
          notes: notes ? `Recruiter update: ${notes}` : `Status updated to ${newStage} by employer.`,
        }
      }
      return app
    })
    localStorage.setItem('applications', JSON.stringify(updatedApps))

    // 2. If moved to Interview, sync with Scheduled Interviews list
    if (newStage === 'Interview') {
      const storedInterviews = JSON.parse(localStorage.getItem('interviews')) || []
      const interviewExists = storedInterviews.some((iv) => iv.role === targetCandidate.role)
      if (!interviewExists) {
        storedInterviews.unshift({
          id: 'iv-' + Date.now(),
          company: 'Safaricom PLC',
          role: targetCandidate.role,
          round: targetCandidate.interviewRound || 'Technical Round',
          date: targetCandidate.interviewDate || 'Aug 24, 2026 at 10:00 AM',
          time: '10:00 AM',
          status: 'Upcoming',
          location: 'Nairobi HQ / Google Meet',
          meetingLink: 'https://meet.google.com/saf-interview-call',
        })
        localStorage.setItem('interviews', JSON.stringify(storedInterviews))
      }
    }

    // 3. Dispatch Notification for the Job Seeker
    const notifications = JSON.parse(localStorage.getItem('applicant_notifications')) || []
    const newNotification = {
      id: 'notif-' + Date.now(),
      title: `Application Update: ${targetCandidate.role}`,
      message: `Your application has advanced to "${newStage}" stage. ${notes ? `Note: "${notes}"` : ''}`,
      date: 'Just now',
      unread: true,
    }
    localStorage.setItem('applicant_notifications', JSON.stringify([newNotification, ...notifications]))

    // 4. Trigger live updates across views
    window.dispatchEvent(new Event('applicationsUpdated'))
    window.dispatchEvent(new Event('notificationsUpdated'))
  }

  function handlePostJob(jobData) {
    const recruiterData = JSON.parse(localStorage.getItem('recruiter_profile') || '{}')
    const company = recruiterData.companyName || 'Safaricom PLC'
    const newJobObj = {
      id: 'rj-' + Date.now(),
      company,
      title: jobData.title,
      type: jobData.type,
      location: jobData.location,
      salary: jobData.salary,
      skills: jobData.skills || ['React', 'JavaScript'],
      experience: jobData.experience || 'Entry level',
      description: jobData.description || 'Open position for student & graduate candidates.',
      status: 'Active',
    }
    const updatedJobs = [newJobObj, ...jobs]
    setJobs(updatedJobs)
    localStorage.setItem('recruiter_jobs', JSON.stringify(updatedJobs))
    setShowPostModal(false)

    // Notify job seekers
    const notifications = JSON.parse(localStorage.getItem('applicant_notifications')) || []
    const newNotification = {
      id: 'notif-' + Date.now(),
      title: 'New Verified Job Posted 🚀',
      message: `${jobData.title} at ${company} is now open for applications in ${jobData.location}.`,
      date: 'Just now',
      unread: true,
    }
    localStorage.setItem('applicant_notifications', JSON.stringify([newNotification, ...notifications]))
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

  const stats = {
    jobsCount: jobs.length,
    candidatesCount: candidates.length,
    interviewCount: candidates.filter((c) => c.stage === 'Interview').length,
    offersCount: candidates.filter((c) => c.stage === 'Offer' || c.stage === 'Accepted').length,
  }

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
