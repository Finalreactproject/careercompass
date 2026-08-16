import { useState, useEffect } from 'react'

const QUESTIONS = {
  frontend: {
    target: [
      { question: 'How would you optimize React render cycles for low-bandwidth mobile users in Kenya?', tip: 'Mention lazy loading, code splitting, useMemo/useCallback, WebP assets, and caching.' },
      { question: 'How do you handle real-time UI updates and network drops in a client-side app?', tip: 'Discuss optimistic updates, localStorage fallbacks, service workers, and reconnect sync.' },
    ],
    technical: [
      { question: 'Explain the difference between useEffect, useLayoutEffect, and custom hooks.', tip: 'Highlight rendering pipeline, DOM mutations, blocking behavior, and logic reusability.' },
      { question: 'How do you structure accessible, responsive components with semantic HTML and CSS?', tip: 'Mention <main>, <nav>, <aside>, ARIA attributes, keyboard nav, and flexbox/grid queries.' },
    ],
    star: [
      { question: 'Describe a time you debugged a critical production bug under time pressure.', tip: 'STAR: broken checkout → isolate bug → checked logs, hotfixed state mutation → restored in 20 min.' },
      { question: 'Tell us about a time you incorporated critical code review feedback.', tip: 'Focus on growth mindset, refactoring, unit tests, and team communication.' },
    ],
  },
  data: {
    target: [
      { question: 'How would you analyze transaction trends to detect potential loan default risks?', tip: 'Discuss cohort analysis, feature engineering, credit scoring, and dashboard communication.' },
      { question: 'How do you ensure data integrity when handling large CSV exports from multiple branches?', tip: 'Explain ETL pipelines, null validation, schema constraints, and SQL deduplication.' },
    ],
    technical: [
      { question: 'Explain RANK(), DENSE_RANK(), and ROW_NUMBER() window functions with an example.', tip: 'Show clear understanding of tie-breaking behavior and continuous ranking.' },
      { question: 'When would you choose PostgreSQL vs NoSQL for analytical workloads?', tip: 'Compare ACID compliance, structured joins, document flexibility, and read/write scaling.' },
    ],
    star: [
      { question: 'Tell us about an insight you uncovered that directly changed a business decision.', tip: 'Quantify your impact — e.g. reduced churn by 14%, saved KES 2.5M in operational waste.' },
    ],
  },
  general: {
    target: [
      { question: 'Why are you excited to join this team and how do your goals align with our mission?', tip: 'Reference company impact in East Africa and your enthusiasm for growth.' },
    ],
    technical: [
      { question: 'How do you approach learning a new framework or tech stack on the job?', tip: 'Mention docs deep-dives, proof-of-concept mini apps, peer reviews, and incremental testing.' },
    ],
    star: [
      { question: 'Give an example of collaborating with non-technical stakeholders to deliver requirements.', tip: 'Emphasize simplifying jargon, milestone alignment, and regular feedback loops.' },
    ],
  },
}

function getQuestionsForRole(roleTitle = '') {
  const normalizedRole = roleTitle.toLowerCase()

  if (
    normalizedRole.includes('front') ||
    normalizedRole.includes('react') ||
    normalizedRole.includes('ui') ||
    normalizedRole.includes('design')
  ) {
    return QUESTIONS.frontend
  }

  if (
    normalizedRole.includes('data') ||
    normalizedRole.includes('analyst') ||
    normalizedRole.includes('sql') ||
    normalizedRole.includes('ml')
  ) {
    return QUESTIONS.data
  }

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
  const questionDeck = getQuestionsForRole(role)

  const [tab, setTab] = useState('target')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [recording, setRecording] = useState(false)
  const [timer, setTimer] = useState(0)
  const [showTip, setShowTip] = useState(false)
  const [evaluating, setEvaluating] = useState(false)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    if (!recording) return

    const intervalId = setInterval(() => {
      setTimer((seconds) => seconds + 1)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [recording])

  const questions = questionDeck[tab] || questionDeck.target
  const currentQuestion = questions[questionIndex] || questions[0]

  function toggleRecord() {
    if (recording) {
      setRecording(false)

      if (!answer.trim()) {
        setAnswer(
          `[Voice Transcript - ${timer}s]\nI approached this systematically, using modern design patterns and validating with test cases.`
        )
      }
    } else {
      setTimer(0)
      setRecording(true)
    }
  }

  function evaluateAnswer() {
    if (!answer.trim()) return

    const words = answer.trim().split(/\s+/)
    const wordCount = words.length
    const lowerAnswer = answer.toLowerCase()

    // If the answer is too short, push back instead of scoring
    if (wordCount < 20) {
      setFeedback({
        notSerious: true,
        message: `Your response is only ${wordCount} word${wordCount === 1 ? '' : 's'} long. A solid interview answer needs at least 3–5 sentences. Please take this seriously — interviewers notice shallow answers immediately. Try again.`,
      })
      return
    }

    // Detect low-effort answers (random keys, repeated characters, or filler)
    const uniqueWords = new Set(words.map((word) => word.toLowerCase()))
    const isRepetitive = uniqueWords.size < wordCount * 0.3
    const looksLikeNonsense = /(.)\1{4,}/.test(answer) || words.filter((word) => word.length < 2).length > wordCount * 0.5

    if (isRepetitive || looksLikeNonsense) {
      setFeedback({
        notSerious: true,
        message: "This doesn't look like a genuine answer. Interviewers can spot filler instantly. Type a real response — describe what you actually did, why, and what the outcome was.",
      })
      return
    }

    setEvaluating(true)

    setTimeout(() => {
      setEvaluating(false)

      // Check for STAR structure keywords
      const starKeywords = ['situation', 'task', 'action', 'result', 'when', 'because', 'so', 'therefore', 'outcome', 'impact', 'achieved', 'reduced', 'increased', 'improved']
      const starHits = starKeywords.filter((keyword) => lowerAnswer.includes(keyword))

      // Check for tip-specific keywords from the current question
      const tipKeywords = currentQuestion.tip.toLowerCase().split(/[\s,./()–]+/).filter((word) => word.length > 4)
      const tipHits = tipKeywords.filter((keyword) => lowerAnswer.includes(keyword))

      // Score: base 60, +1 per 10 words (up to 20), +2 per STAR keyword (up to 10), +2 per tip keyword (up to 10)
      const lengthBonus = Math.min(20, Math.floor(wordCount / 10))
      const starBonus = Math.min(10, starHits.length * 2)
      const tipBonus = Math.min(10, tipHits.length * 2)
      const score = Math.min(98, 60 + lengthBonus + starBonus + tipBonus)

      const strengths = []
      if (wordCount >= 60) strengths.push('Strong answer depth — you gave enough detail to be convincing')
      if (starHits.length >= 3) strengths.push('Good STAR structure — the interviewer can follow your story')
      if (tipHits.length >= 2) strengths.push(`You covered key concepts: ${tipHits.slice(0, 3).join(', ')}`)
      if (strengths.length === 0) strengths.push('You gave a genuine attempt — build on this with more specifics')

      const improvementTip = tipHits.length < 2
        ? `Try to mention: ${tipKeywords.slice(0, 4).join(', ')}. These are exactly what interviewers listen for.`
        : 'Add 1–2 measurable results (e.g. reduced load time by 40%, saved 3 hours per week) to make your answer unforgettable.'

      setFeedback({ score, strengths, tip: improvementTip, notSerious: false })
    }, 600)
  }

  function handleNextQuestion() {
    setAnswer('')
    setFeedback(null)
    setShowTip(false)

    setQuestionIndex((currentIndex) => (currentIndex + 1) % questions.length)
  }

  function switchTab(tabKey) {
    setTab(tabKey)
    setQuestionIndex(0)
    setAnswer('')
    setFeedback(null)
    setShowTip(false)
  }

  return (
    <main className="main-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <button className="btn-outline" onClick={onBack}>
          ← Back to Interviews
        </button>
        <span style={{ fontSize: 13, background: 'lavender', color: 'darkblue', padding: '6px 14px', borderRadius: 20, fontWeight: 600 }}>
          🎯 {role} @ {company}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {TABS.map((tabItem) => (
          <button
            key={tabItem.key}
            className={tab === tabItem.key ? '' : 'btn-outline'}
            onClick={() => switchTab(tabItem.key)}
          >
            {tabItem.key === 'target' ? `🏢 ${company} Specific` : tabItem.label}
          </button>
        ))}
      </div>

      <div style={{ background: 'white', border: '1px solid lightgray', borderRadius: 14, padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'slateblue', textTransform: 'uppercase' }}>
            Question {questionIndex + 1} of {questions.length}
          </span>
          <button className="btn-outline" style={{ fontSize: 12, padding: '4px 10px' }} onClick={() => setShowTip(!showTip)}>
            💡 {showTip ? 'Hide Tip' : 'Coach Tip'}
          </button>
        </div>

        <h2 style={{ fontSize: 18, margin: '0 0 16px', lineHeight: 1.4 }}>"{currentQuestion.question}"</h2>

        {showTip && (
          <div style={{ background: 'lavender', borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 13, color: 'darkblue', lineHeight: 1.5 }}>
            <strong>💡 Strategy:</strong> {currentQuestion.tip}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Your Response:</label>
            <button
              style={{
                background: recording ? 'crimson' : 'whitesmoke',
                color: recording ? 'white' : 'black',
                fontSize: 12,
                padding: '5px 12px',
                border: '1px solid lightgray',
              }}
              onClick={toggleRecord}
            >
              {recording ? `🔴 Recording (${timer}s)... Stop` : '🎤 Record Voice Answer'}
            </button>
          </div>
          <textarea
            rows={5}
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Type your answer using STAR (Situation, Task, Action, Result)..."
            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid lightgray', fontSize: 14 }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={evaluateAnswer} disabled={!answer.trim() || evaluating}>
            {evaluating ? '⚡ Analyzing...' : '⚡ Analyze My Response'}
          </button>
          <button className="btn-outline" onClick={handleNextQuestion}>
            Next Question →
          </button>
        </div>

        {feedback && feedback.notSerious ? (
          <div style={{ marginTop: 20, background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 10, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 20 }}>⚠️</span>
              <strong style={{ color: '#8a5700', fontSize: 15 }}>Take This Seriously</strong>
            </div>
            <p style={{ fontSize: 13, color: '#6b4200', margin: 0, lineHeight: 1.6 }}>{feedback.message}</p>
          </div>
        ) : feedback && (
          <div style={{ marginTop: 20, background: 'honeydew', border: '1px solid lightgreen', borderRadius: 10, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>🎉</span>
              <strong style={{ color: 'darkgreen', fontSize: 16 }}>Score: {feedback.score} / 100</strong>
            </div>
            <div style={{ fontSize: 13, color: 'darkgreen', marginBottom: 8 }}>
              <strong>Strengths:</strong>
              <ul style={{ margin: '4px 0 0 18px', padding: 0 }}>
                {feedback.strengths.map((strengthItem, index) => (
                  <li key={index}>{strengthItem}</li>
                ))}
              </ul>
            </div>
            <div style={{ fontSize: 13, color: 'darkgreen' }}>
              <strong>Improve:</strong> {feedback.tip}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default InterviewPractice
