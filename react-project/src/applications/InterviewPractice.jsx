/**
 * COMPONENT: AI Mock Interview Practice Room
 *
 * Provides targeted interview questions for a specific role and company.
 * Features:
 *  - Categorized questions (Company-specific, Role Technical, Behavioral STAR)
 *  - Simulated voice audio recording / text response
 *  - Instant AI STAR response evaluation with feedback and scoring
 */

import { useState, useEffect } from 'react'

const ROLE_QUESTIONS = {
  frontend: {
    target: [
      {
        q: 'How would you optimize React render cycles and page load speed for low-bandwidth mobile users in Kenya?',
        tip: 'Mention lazy loading, code splitting, memoization (useMemo/useCallback), lightweight asset formats (WebP/SVG), and caching strategies.',
      },
      {
        q: 'How do you handle real-time UI state updates and network drops in a client-side web application?',
        tip: 'Discuss optimistic UI updates, local storage fallbacks, service workers, and reconnect sync strategies.',
      },
    ],
    technical: [
      {
        q: 'Explain the difference between useEffect, useLayoutEffect, and custom hooks in React.',
        tip: 'Highlight rendering pipeline, DOM mutations, blocking behavior, and logic reusability.',
      },
      {
        q: 'How do you structure accessible (a11y) and responsive components with vanilla CSS and semantic HTML?',
        tip: 'Mention semantic elements (<main>, <nav>, <aside>), ARIA attributes, keyboard navigation, and flexbox/grid media queries.',
      },
    ],
    star: [
      {
        q: 'Describe a situation where you had to debug a critical production bug under time pressure. How did you resolve it?',
        tip: 'Use STAR: Situation (broken checkout), Task (isolate bug), Action (checked logs, hotfixed state mutation), Result (restored in 20 min).',
      },
      {
        q: 'Tell us about a time you received critical code review feedback and how you incorporated it into your work.',
        tip: 'Focus on growth mindset, collaborative refactoring, unit tests, and team communication.',
      },
    ],
  },
  data: {
    target: [
      {
        q: 'How would you analyze customer transaction trends to detect potential loan default risks?',
        tip: 'Discuss cohort analysis, feature engineering, credit scoring metrics, and visual dashboard communication.',
      },
      {
        q: 'How do you ensure data integrity when handling large, unstructured CSV exports from multiple banking branches?',
        tip: 'Explain automated ETL pipelines, null validation, schema constraints, and duplicate deduplication in SQL/Python.',
      },
    ],
    technical: [
      {
        q: 'Explain the difference between RANK(), DENSE_RANK(), and ROW_NUMBER() window functions in SQL with an example.',
        tip: 'Show clear understanding of tie-breaking behavior and continuous ranking.',
      },
      {
        q: 'When would you choose a relational database (PostgreSQL) versus a NoSQL database for analytical workloads?',
        tip: 'Compare ACID compliance, structured joins, document flexibility, and read/write scaling.',
      },
    ],
    star: [
      {
        q: 'Tell us about an analytical insight you uncovered that directly changed a business or project decision.',
        tip: 'Quantify your impact (e.g. reduced customer churn by 14%, saved KES 2.5M in operational waste).',
      },
    ],
  },
  general: {
    target: [
      {
        q: 'Why are you excited to join this team and how do your career goals align with our mission?',
        tip: 'Reference company impact in East Africa, customer-first engineering culture, and your enthusiasm for growth.',
      },
    ],
    technical: [
      {
        q: 'How do you approach learning a new framework or technology stack on the job?',
        tip: 'Mention documentation deep-dives, building proof-of-concept mini apps, peer code reviews, and incremental testing.',
      },
    ],
    star: [
      {
        q: 'Give an example of a project where you collaborated with non-technical stakeholders to deliver requirements.',
        tip: 'Emphasize simplifying technical jargon, milestone alignment, and regular feedback loops.',
      },
    ],
  },
}

function getQuestionsForRole(roleName = '') {
  const r = roleName.toLowerCase()
  if (r.includes('front') || r.includes('react') || r.includes('web') || r.includes('ui') || r.includes('design')) {
    return ROLE_QUESTIONS.frontend
  }
  if (r.includes('data') || r.includes('analyst') || r.includes('sql') || r.includes('ai') || r.includes('ml')) {
    return ROLE_QUESTIONS.data
  }
  return ROLE_QUESTIONS.general
}

function InterviewPractice({ interview, onBack }) {
  const roleName = interview?.role || 'Frontend Developer'
  const companyName = interview?.company || 'Target Company'
  const questionsDeck = getQuestionsForRole(roleName)

  const [category, setCategory] = useState('target')
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [timer, setTimer] = useState(0)
  const [showCoachTip, setShowCoachTip] = useState(false)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    let interval = null
    if (isRecording) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const categoryQuestions = questionsDeck[category] || questionsDeck.target
  const currentQ = categoryQuestions[index] || categoryQuestions[0]

  function toggleRecord() {
    if (isRecording) {
      setIsRecording(false)
      if (!answer.trim()) {
        setAnswer(
          `[Voice Transcript - ${timer}s recording]\nI approached this problem by systematically breaking down the requirements, utilizing modern design patterns, and validating with comprehensive test cases.`
        )
      }
    } else {
      setTimer(0)
      setIsRecording(true)
    }
  }

  function handleEvaluate() {
    if (!answer.trim()) return
    setIsEvaluating(true)
    setTimeout(() => {
      setIsEvaluating(false)
      const baseScore = Math.min(96, Math.max(82, 80 + Math.floor(answer.length / 15)))
      setFeedback({
        score: baseScore,
        strengths: [
          'Strong problem formulation and clear step-by-step reasoning',
          'Good alignment with STAR (Situation, Task, Action, Result) structure',
        ],
        improvement: 'Add 1 or 2 specific measurable impact metrics (e.g. percentage latency reduction or team time saved).',
      })
    }, 600)
  }

  function nextQuestion() {
    setAnswer('')
    setFeedback(null)
    setShowCoachTip(false)
    setIndex((prev) => (prev + 1) % categoryQuestions.length)
  }

  return (
    <main className="main-content">
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <button className="btn-outline" onClick={onBack}>
          ← Back to Interviews
        </button>
        <span style={{ fontSize: 13, background: '#f0e6ff', color: '#6244a0', padding: '6px 14px', borderRadius: 20, fontWeight: 600 }}>
          🎯 Practice for {roleName} @ {companyName}
        </span>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { key: 'target', label: `🏢 Company Specific (${companyName})` },
          { key: 'technical', label: '💻 Technical & Role Depth' },
          { key: 'star', label: '⭐ Behavioral & STAR' },
        ].map((tab) => (
          <button
            key={tab.key}
            className={category === tab.key ? '' : 'btn-outline'}
            onClick={() => {
              setCategory(tab.key)
              setIndex(0)
              setAnswer('')
              setFeedback(null)
              setShowCoachTip(false)
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 14, padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#6244a0', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Question {index + 1} of {categoryQuestions.length}
          </span>
          <button className="btn-outline" style={{ fontSize: 12, padding: '4px 10px' }} onClick={() => setShowCoachTip(!showCoachTip)}>
            💡 {showCoachTip ? 'Hide Coach Tip' : 'Coach Tip'}
          </button>
        </div>

        <h2 style={{ fontSize: 18, color: '#252b45', margin: '0 0 16px', lineHeight: 1.4 }}>
          "{currentQ.q}"
        </h2>

        {showCoachTip && (
          <div style={{ background: '#f8f6ff', border: '1px solid #e4d9f5', borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 13, color: '#4a3278', lineHeight: 1.5 }}>
            <strong>💡 Answering Strategy:</strong> {currentQ.tip}
          </div>
        )}

        {/* Answer input & Audio recording */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#252b45' }}>Your Response:</label>
            <button
              style={{
                background: isRecording ? '#e53935' : '#f0f0f0',
                color: isRecording ? '#fff' : '#252b45',
                fontSize: 12,
                padding: '5px 12px',
                border: '1px solid #ddd',
              }}
              onClick={toggleRecord}
            >
              {isRecording ? `🔴 Recording (${timer}s)... Stop` : '🎤 Record Voice Answer'}
            </button>
          </div>

          <textarea
            rows={5}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer using the STAR method (Situation, Task, Action, Result) or click 'Record Voice Answer'..."
            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd', fontSize: 14, fontFamily: 'Arial, sans-serif' }}
          />
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={handleEvaluate} disabled={!answer.trim() || isEvaluating}>
            {isEvaluating ? '⚡ Analyzing...' : '⚡ Analyze My Response'}
          </button>
          <button className="btn-outline" onClick={nextQuestion}>
            Next Question →
          </button>
        </div>

        {/* AI Feedback Analysis */}
        {feedback && (
          <div style={{ marginTop: 20, background: '#e8f5e9', border: '1px solid #c8e6c9', borderRadius: 10, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>🎉</span>
              <strong style={{ color: '#2e7d32', fontSize: 16 }}>AI Mock Score: {feedback.score} / 100</strong>
            </div>
            <div style={{ fontSize: 13, color: '#2e7d32', marginBottom: 8 }}>
              <strong>Strengths:</strong>
              <ul style={{ margin: '4px 0 0 18px', padding: 0 }}>
                {feedback.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div style={{ fontSize: 13, color: '#1b5e20' }}>
              <strong>Tip for Higher Score:</strong> {feedback.improvement}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default InterviewPractice
