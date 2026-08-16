import { useState, useEffect } from 'react'
import RecruiterStatsOverview from './dashboard/RecruiterStatsOverview'
import RecruiterPipelineView from './dashboard/RecruiterPipelineView'
import RecruiterJobsList from './dashboard/RecruiterJobsList'
import CandidateReviewModal from './dashboard/CandidateReviewModal'
import PostJobModal from './dashboard/PostJobModal'
import ScheduleInterviewModal from './dashboard/ScheduleInterviewModal'

const INITIAL_JOBS = [
  { id: 'rj-1', title: 'Frontend Developer', type: 'Full-time', location: 'Nairobi', salary: 'KES 140k–190k', status: 'Active', deadline: 'Sep 15, 2026' },
  { id: 'rj-2', title: 'Fullstack Engineer', type: 'Full-time', location: 'Nairobi', salary: 'KES 160k–220k', status: 'Active', deadline: 'Sep 20, 2026' },
  { id: 'rj-3', title: 'Junior Data Analyst', type: 'Full-time', location: 'Remote', salary: 'KES 95k–130k', status: 'Active', deadline: 'Aug 31, 2026' },
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
    const targetCandidate = candidates.find((candidate) => candidate.id === candidateId)
    if (!targetCandidate) return

    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === candidateId ? { ...candidate, stage: newStage, notes: notes || candidate.notes } : candidate
    )
    setCandidates(updatedCandidates)

    if (selectedCandidate?.id === candidateId) {
      setSelectedCandidate({ ...selectedCandidate, stage: newStage, notes: notes || selectedCandidate.notes })
    }

    const storedApps = JSON.parse(localStorage.getItem('applications')) || []
    localStorage.setItem(
      'applications',
      JSON.stringify(
        storedApps.map((application) =>
          application.title.toLowerCase().includes(targetCandidate.role.toLowerCase())
            ? { ...application, status: newStage, notes: notes ? `Recruiter: ${notes}` : `Updated to ${newStage}.` }
            : application
        )
      )
    )

    if (newStage === 'Interview') {
      const interviewList = JSON.parse(localStorage.getItem('interviews')) || []
      if (!interviewList.some((interview) => interview.role === targetCandidate.role)) {
        interviewList.unshift({
          id: 'iv-' + Date.now(),
          company: 'Safaricom PLC',
          role: targetCandidate.role,
          round: targetCandidate.interviewRound || 'Technical Round',
          date: targetCandidate.interviewDate || 'Aug 24, 2026',
          time: '10:00 AM',
          status: 'Upcoming',
          location: 'Nairobi HQ / Google Meet',
          meetingLink: 'https://meet.google.com/saf-interview-call',
        })
        localStorage.setItem('interviews', JSON.stringify(interviewList))
      }
    }

    const notifications = JSON.parse(localStorage.getItem('applicant_notifications')) || []
    localStorage.setItem(
      'applicant_notifications',
      JSON.stringify([
        {
          id: 'notif-' + Date.now(),
          title: `Update: ${targetCandidate.role}`,
          message: `Your application moved to "${newStage}".${notes ? ` Note: "${notes}"` : ''}`,
          date: 'Just now',
          unread: true,
        },
        ...notifications,
      ])
    )

    window.dispatchEvent(new Event('applicationsUpdated'))
    window.dispatchEvent(new Event('notificationsUpdated'))
  }

  function handleDeleteJob(jobId) {
    const updated = jobs.filter((job) => job.id !== jobId)
    setJobs(updated)
    localStorage.setItem('recruiter_jobs', JSON.stringify(updated))
  }

  // Extends a job's deadline by 30 days and re-activates it if it was expired
  function handleExtendJob(jobId) {
    const updated = jobs.map((job) => {
      if (job.id !== jobId) return job
      return { ...job, status: 'Active', deadline: 'Oct 15, 2026' }
    })
    setJobs(updated)
    localStorage.setItem('recruiter_jobs', JSON.stringify(updated))
  }

  function handlePostJob(jobData) {
    const company = JSON.parse(localStorage.getItem('recruiter_profile') || '{}').companyName || 'Safaricom PLC'
    const newJob = {
      id: 'rj-' + Date.now(),
      company,
      ...jobData,
      skills: jobData.skills || ['React', 'JavaScript'],
      experience: jobData.experience || 'Entry level',
      description: jobData.description || 'Open position for graduate candidates.',
      status: 'Active',
    }
    const updatedJobs = [newJob, ...jobs]
    setJobs(updatedJobs)
    localStorage.setItem('recruiter_jobs', JSON.stringify(updatedJobs))
    setShowPostModal(false)

    const notifications = JSON.parse(localStorage.getItem('applicant_notifications')) || []
    localStorage.setItem(
      'applicant_notifications',
      JSON.stringify([
        {
          id: 'notif-' + Date.now(),
          title: 'New Job Posted 🚀',
          message: `${jobData.title} at ${company} — now open in ${jobData.location}.`,
          date: 'Just now',
          unread: true,
        },
        ...notifications,
      ])
    )
    window.dispatchEvent(new Event('notificationsUpdated'))
  }

  function handleScheduleInterview({ candidateId, date, time, round }) {
    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === candidateId
        ? { ...candidate, stage: 'Interview', interviewDate: `${date} at ${time}`, interviewRound: round }
        : candidate
    )
    setCandidates(updatedCandidates)
    handleAdvanceStage(candidateId, 'Interview', `Interview scheduled for ${date} at ${time} (${round})`)
    setShowScheduleModal(false)
  }

  const stats = {
    jobsCount: jobs.length,
    candidatesCount: candidates.length,
    interviewCount: candidates.filter((candidate) => candidate.stage === 'Interview').length,
    offersCount: candidates.filter((candidate) => candidate.stage === 'Offer' || candidate.stage === 'Accepted').length,
  }

  return (
    <main className="main-content">
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

      <RecruiterStatsOverview stats={stats} onSelectTab={setActiveTab} />

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
          onDeleteJob={handleDeleteJob}
          onExtendJob={handleExtendJob}
        />
      )}

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
