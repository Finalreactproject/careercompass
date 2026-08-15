import { useState, useEffect } from 'react'

const QUESTIONS = {
  frontend: {
    target:    [{ q: 'How would you optimize React render cycles for low-bandwidth mobile users in Kenya?', tip: 'Mention lazy loading, code splitting, useMemo/useCallback, WebP assets, and caching.' }, { q: 'How do you handle real-time UI updates and network drops in a client-side app?', tip: 'Discuss optimistic updates, localStorage fallbacks, service workers, and reconnect sync.' }],
    technical: [{ q: 'Explain the difference between useEffect, useLayoutEffect, and custom hooks.', tip: 'Highlight rendering pipeline, DOM mutations, blocking behavior, and logic reusability.' }, { q: 'How do you structure accessible, responsive components with semantic HTML and CSS?', tip: 'Mention <main>, <nav>, <aside>, ARIA attributes, keyboard nav, and flexbox/grid queries.' }],
    star:      [{ q: 'Describe a time you debugged a critical production bug under time pressure.', tip: 'STAR: broken checkout → isolate bug → checked logs, hotfixed state mutation → restored in 20 min.' }, { q: 'Tell us about a time you incorporated critical code review feedback.', tip: 'Focus on growth mindset, refactoring, unit tests, and team communication.' }],
  },
  data: {
    target:    [{ q: 'How would you analyze transaction trends to detect potential loan default risks?', tip: 'Discuss cohort analysis, feature engineering, credit scoring, and dashboard communication.' }, { q: 'How do you ensure data integrity when handling large CSV exports from multiple branches?', tip: 'Explain ETL pipelines, null validation, schema constraints, and SQL deduplication.' }],
    technical: [{ q: 'Explain RANK(), DENSE_RANK(), and ROW_NUMBER() window functions with an example.', tip: 'Show clear understanding of tie-breaking behavior and continuous ranking.' }, { q: 'When would you choose PostgreSQL vs NoSQL for analytical workloads?', tip: 'Compare ACID compliance, structured joins, document flexibility, and read/write scaling.' }],
    star:      [{ q: 'Tell us about an insight you uncovered that directly changed a business decision.', tip: 'Quantify your impact — e.g. reduced churn by 14%, saved KES 2.5M in operational waste.' }],
  },
  general: {
    target:    [{ q: 'Why are you excited to join this team and how do your goals align with our mission?', tip: 'Reference company impact in East Africa and your enthusiasm for growth.' }],
    technical: [{ q: 'How do you approach learning a new framework or tech stack on the job?', tip: 'Mention docs deep-dives, proof-of-concept mini apps, peer reviews, and incremental testing.' }],
    star:      [{ q: 'Give an example of collaborating with non-technical stakeholders to deliver requirements.', tip: 'Emphasize simplifying jargon, milestone alignment, and regular feedback loops.' }],
  },
}

function getQuestions(role = '') {
  const r = role.toLowerCase()
  if (r.includes('front') || r.includes('react') || r.includes('ui') || r.includes('design')) return QUESTIONS.frontend
  if (r.includes('data') || r.includes('analyst') || r.includes('sql') || r.includes('ml')) return QUESTIONS.data
  return QUESTIONS.general
}

const TABS = [
  { key: 'target', label: '🏢 Company Specific' },
  { key: 'technical', label: '💻 Technical' },
  { key: 'star', label: '⭐ Behavioral / STAR' },
]

function InterviewPractice({ interview, onBack }) {
  const role = interview?.role || 'Frontend Developer'
  const company = interview?.company || 'Target Company'
  const deck = getQuestions(role)

  const [tab, setTab] = useState('target')
  const [idx, setIdx] = useState(0)
  const [answer, setAnswer] = useState('')
  const [recording, setRecording] = useState(false)
  const [timer, setTimer] = useState(0)
  const [showTip, setShowTip] = useState(false)
  const [evaluating, setEvaluating] = useState(false)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    if (!recording) return
    const interval = setInterval(() => setTimer((t) => t + 1), 1000)
    return () => clearInterval(interval)
  }, [recording])

  const questions = deck[tab] || deck.target
  const current = questions[idx] || questions[0]

  function toggleRecord() {
    if (recording) {
      setRecording(false)
      if (!answer.trim()) setAnswer(`[Voice Transcript - ${timer}s]\nI approached this systematically, using modern design patterns and validating with test cases.`)
    } else {
      setTimer(0)
      setRecording(true)
    }
  }

  function evaluate() {
    if (!answer.trim()) return
    setEvaluating(true)
    setTimeout(() => {
      setEvaluating(false)
      setFeedback({
        score: Math.min(96, Math.max(82, 80 + Math.floor(answer.length / 15))),
        strengths: ['Clear step-by-step reasoning', 'Good alignment with STAR structure'],
        tip: 'Add 1–2 specific measurable metrics (e.g. % latency reduction or time saved).',
      })
    }, 600)
  }

  function next() {
    setAnswer(''); setFeedback(null); setShowTip(false)
    setIdx((i) => (i + 1) % questions.length)
  }

  function switchTab(key) {
    setTab(key); setIdx(0); setAnswer(''); setFeedback(null); setShowTip(false)
  }

  return (
    <main className="main-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <button className="btn-outline" onClick={onBack}>← Back to Interviews</button>
        <span style={{ fontSize: 13, background: 'lavender', color: 'darkblue', padding: '6px 14px', borderRadius: 20, fontWeight: 600 }}>
          🎯 {role} @ {company}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {TABS.map((t) => (
          <button key={t.key} className={tab === t.key ? '' : 'btn-outline'} onClick={() => switchTab(t.key)}>
            {t.key === 'target' ? `🏢 ${company} Specific` : t.label}
          </button>
        ))}
      </div>

      <div style={{ background: 'white', border: '1px solid lightgray', borderRadius: 14, padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'slateblue', textTransform: 'uppercase' }}>
            Question {idx + 1} of {questions.length}
          </span>
          <button className="btn-outline" style={{ fontSize: 12, padding: '4px 10px' }} onClick={() => setShowTip(!showTip)}>
            💡 {showTip ? 'Hide Tip' : 'Coach Tip'}
          </button>
        </div>

        <h2 style={{ fontSize: 18, margin: '0 0 16px', lineHeight: 1.4 }}>"{current.q}"</h2>

        {showTip && (
          <div style={{ background: 'lavender', borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 13, color: 'darkblue', lineHeight: 1.5 }}>
            <strong>💡 Strategy:</strong> {current.tip}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Your Response:</label>
            <button style={{ background: recording ? 'crimson' : 'whitesmoke', color: recording ? 'white' : 'black', fontSize: 12, padding: '5px 12px', border: '1px solid lightgray' }} onClick={toggleRecord}>
              {recording ? `🔴 Recording (${timer}s)... Stop` : '🎤 Record Voice Answer'}
            </button>
          </div>
          <textarea rows={5} value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Type your answer using STAR (Situation, Task, Action, Result)..." style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid lightgray', fontSize: 14 }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={evaluate} disabled={!answer.trim() || evaluating}>
            {evaluating ? '⚡ Analyzing...' : '⚡ Analyze My Response'}
          </button>
          <button className="btn-outline" onClick={next}>Next Question →</button>
        </div>

        {feedback && (
          <div style={{ marginTop: 20, background: 'honeydew', border: '1px solid lightgreen', borderRadius: 10, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>🎉</span>
              <strong style={{ color: 'darkgreen', fontSize: 16 }}>Score: {feedback.score} / 100</strong>
            </div>
            <div style={{ fontSize: 13, color: 'darkgreen', marginBottom: 8 }}>
              <strong>Strengths:</strong>
              <ul style={{ margin: '4px 0 0 18px', padding: 0 }}>
                {feedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div style={{ fontSize: 13, color: 'darkgreen' }}><strong>Improve:</strong> {feedback.tip}</div>
          </div>
        )}
      </div>
    </main>
  )
}

export default InterviewPractice
