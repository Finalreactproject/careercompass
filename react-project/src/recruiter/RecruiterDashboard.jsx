import { useState, useEffect } from 'react'
import RecruiterStatsOverview from './dashboard/RecruiterStatsOverview'
import RecruiterPipelineView from './dashboard/RecruiterPipelineView'
import RecruiterJobsList from './dashboard/RecruiterJobsList'
import CandidateReviewModal from './dashboard/CandidateReviewModal'
import ScheduleInterviewModal from './dashboard/ScheduleInterviewModal'
import RecruiterForm from '../Components/RecruiterForm'

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
  const [showPostForm, setShowPostForm] = useState(false)
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

    const stageNotifications = {
      Screening: 'Your application has advanced to the Screening round.',
      Interview: 'You have been invited for an interview.',
      Offer: 'Congratulations! You have received a formal Job Offer.',
      Accepted: 'Offer accepted. Welcome aboard!',
    }

    if (stageNotifications[newStage]) {
      const notifications = JSON.parse(localStorage.getItem('applicant_notifications')) || []
      localStorage.setItem(
        'applicant_notifications',
        JSON.stringify([
          {
            id: 'notif-' + Date.now(),
            title: `Application Status Updated: ${newStage}`,
            message: `${targetCandidate.role} — ${stageNotifications[newStage]}`,
            date: 'Just now',
            unread: true,
          },
          ...notifications,
        ])
      )
    }

    const apps = JSON.parse(localStorage.getItem('applications')) || []
    const updatedApps = apps.map((app) => {
      if (app.title === targetCandidate.role) {
        return { ...app, status: newStage, notes: notes || app.notes }
      }
      return app
    })
    localStorage.setItem('applications', JSON.stringify(updatedApps))

    const interviews = JSON.parse(localStorage.getItem('interviews')) || []
    if (newStage === 'Interview') {
      const interviewExists = interviews.some((iv) => iv.role === targetCandidate.role)
      if (!interviewExists) {
        interviews.push({
          id: 'iv-' + Date.now(),
          company: 'Safaricom PLC',
          role: targetCandidate.role,
          round: targetCandidate.interviewRound || 'Technical Interview',
          date: targetCandidate.interviewDate?.split(' at ')[0] || 'Aug 24, 2026',
          time: targetCandidate.interviewDate?.split(' at ')[1] || '10:00 AM',
          status: 'Upcoming',
          location: 'Nairobi HQ / Google Meet',
          meetingLink: 'https://meet.google.com/career-compass-call',
        })
        localStorage.setItem('interviews', JSON.stringify(interviews))
      }
    }

    const meetings = JSON.parse(localStorage.getItem('recruiter_meetings')) || []
    localStorage.setItem(
      'recruiter_meetings',
      JSON.stringify([
        {
          id: 'rm-' + Date.now(),
          candidateName: targetCandidate.name,
          role: targetCandidate.role,
          round: targetCandidate.interviewRound || 'Technical Round',
          date: targetCandidate.interviewDate?.split(' at ')[0] || 'Aug 24, 2026',
          time: targetCandidate.interviewDate?.split(' at ')[1] || '10:00 AM',
          status: 'Upcoming',
          meetingLink: 'https://meet.google.com/recruiter-interview-call',
          notes: notes || 'Scheduled via recruiter dashboard.',
        },
        ...meetings,
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

  function handleExtendJob(jobId) {
    const updated = jobs.map((job) => {
      if (job.id !== jobId) return job
      return { ...job, status: 'Active', deadline: 'Oct 15, 2026' }
    })
    setJobs(updated)
    localStorage.setItem('recruiter_jobs', JSON.stringify(updated))
  }

  function handlePostJob(jobData) {
    const defaultCompany = JSON.parse(localStorage.getItem('recruiter_profile') || '{}').companyName || 'Safaricom PLC'
    const newJob = {
      id: 'rj-' + Date.now(),
      company: jobData.company || defaultCompany,
      location: jobData.location || 'Nairobi (Hybrid)',
      type: jobData.type || 'Full-time',
      salary: jobData.salary || '',
      skills: jobData.skills || ['React', 'JavaScript'],
      experience: jobData.experience || 'Entry level',
      description: jobData.description || 'Open position for graduate candidates.',
      status: 'Active',
      deadline: jobData.deadline || 'Nov 30, 2026',
      ...jobData,
    }
    const updatedJobs = [newJob, ...jobs]
    setJobs(updatedJobs)
    localStorage.setItem('recruiter_jobs', JSON.stringify(updatedJobs))
    setShowPostForm(false)
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

  const activeTabStyle = {
    background: 'steelblue',
    color: 'white',
    borderColor: 'steelblue',
  }

  return (
    <main className="main-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14, marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: '0 0 4px' }}>Recruiter Portal & Hiring HQ</h1>
          <p style={{ margin: 0, color: 'gray', fontSize: 14 }}>Manage candidate pipeline, screen applications, and post open positions.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-outline" onClick={() => setShowScheduleModal(true)}>
            Schedule Interview
          </button>
          <button onClick={() => setShowPostForm(true)}>+ Post Job</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button
          className={activeTab === 'pipeline' ? '' : 'btn-outline'}
          style={activeTab === 'pipeline' ? activeTabStyle : {}}
          onClick={() => setActiveTab('pipeline')}
        >
          Candidate Pipeline ({candidates.length})
        </button>
        <button
          className={activeTab === 'jobs' ? '' : 'btn-outline'}
          style={activeTab === 'jobs' ? activeTabStyle : {}}
          onClick={() => setActiveTab('jobs')}
        >
          Your Jobs ({jobs.length})
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
          onOpenPostModal={() => setShowPostForm(true)}
          onDeleteJob={handleDeleteJob}
          onExtendJob={handleExtendJob}
        />
      )}

      <CandidateReviewModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onAdvanceStage={handleAdvanceStage}
      />

      <ScheduleInterviewModal
        isOpen={showScheduleModal}
        candidates={candidates}
        onClose={() => setShowScheduleModal(false)}
        onSchedule={handleScheduleInterview}
      />

      {showPostForm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowPostForm(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '35px',
              width: '100%',
              maxWidth: '520px',
              boxShadow: '0 8px 32px rgba(23,37,84,0.18)',
              color: '#172554',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>Post a Job</h2>
              <button
                className="btn-outline"
                style={{ padding: '4px 12px', cursor: 'pointer' }}
                onClick={() => setShowPostForm(false)}
              >
                &times;
              </button>
            </div>
            <RecruiterForm
              onDone={(newJob) => {
                handlePostJob(newJob)
                setShowPostForm(false)
              }}
            />
          </div>
        </div>
      )}
    </main>
  )
}

export default RecruiterDashboard
