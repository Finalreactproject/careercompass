/**
 * COMPONENT: Job Offer Review & Digital Acceptance
 *
 * Displays the job offer package and lets candidates digitally accept & sign.
 */

import { useState } from 'react'

function OfferDetails({ app, onBack, onAcceptOffer }) {
  const [agreed, setAgreed] = useState(false)
  const [signature, setSignature] = useState('')
  const [isSigned, setIsSigned] = useState(app?.status === 'Accepted')

  if (!app) {
    return (
      <main className="main-content">
        <p>Offer not found. <button onClick={onBack}>Go back</button></p>
      </main>
    )
  }

  const salaryDisplay = app.salary || 'KES 140,000 – 180,000 / month'

  function handleAccept(e) {
    e.preventDefault()
    if (!agreed || !signature.trim()) return
    setIsSigned(true)
    if (onAcceptOffer) {
      onAcceptOffer(app.id)
    }
  }

  return (
    <main className="main-content">
      <button className="btn-outline" style={{ marginBottom: 20 }} onClick={onBack}>
        ← Back to Applications
      </button>

      {/* Header Banner */}
      <div
        className="app-detail-header"
        style={{
          background: isSigned ? '#e8f5e9' : '#fff',
          border: isSigned ? '1px solid #c8e6c9' : '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 14,
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 22, color: isSigned ? '#2e7d32' : '#252b45' }}>
            {app.company} — Official Offer Package
          </h1>
          <p style={{ margin: '4px 0 0', color: '#6244a0', fontWeight: 600 }}>{app.title}</p>
        </div>
        <span
          style={{
            background: isSigned ? '#2e7d32' : '#f0e6ff',
            color: isSigned ? '#fff' : '#6244a0',
            padding: '6px 14px',
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {isSigned ? '✓ Offer Accepted' : 'Offer Pending Review'}
        </span>
      </div>

      {/* Compensation & Terms Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 20 }}>
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 10, padding: 18 }}>
          <small style={{ color: '#888', textTransform: 'uppercase', fontSize: 11, fontWeight: 700 }}>Monthly Compensation</small>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#2e7d32', marginTop: 4 }}>{salaryDisplay}</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 10, padding: 18 }}>
          <small style={{ color: '#888', textTransform: 'uppercase', fontSize: 11, fontWeight: 700 }}>Proposed Start Date</small>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#252b45', marginTop: 4 }}>September 1, 2026</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 10, padding: 18 }}>
          <small style={{ color: '#888', textTransform: 'uppercase', fontSize: 11, fontWeight: 700 }}>Role Classification</small>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#6244a0', marginTop: 4 }}>{app.title} (Full-time)</div>
        </div>
      </div>

      {/* Employment Agreement */}
      <div className="detail-card">
        <h3>Employment Terms & Benefits</h3>
        <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, margin: '0 0 16px' }}>
          We are pleased to formally extend this offer of employment for the role of <strong>{app.title}</strong> at <strong>{app.company}</strong>.
        </p>

        <ul style={{ fontSize: 13, color: '#666', lineHeight: 1.7, margin: '0 0 20px', paddingLeft: 20 }}>
          <li><strong>Base Compensation:</strong> {salaryDisplay}, paid on the 25th of every month.</li>
          <li><strong>Medical Insurance:</strong> Inpatient & Outpatient comprehensive cover across Kenya.</li>
          <li><strong>Work Setup:</strong> Hybrid flexibility with modern workstation allowance.</li>
          <li><strong>Paid Time Off:</strong> 21 annual leave days + public holidays.</li>
        </ul>

        {/* Digital Signature */}
        {isSigned ? (
          <div style={{ background: '#e8f5e9', border: '1px solid #c8e6c9', borderRadius: 8, padding: 16, color: '#2e7d32', fontWeight: 600 }}>
            🎉 Digitally signed and accepted. Welcome to the team!
          </div>
        ) : (
          <form onSubmit={handleAccept} style={{ borderTop: '1px solid #eee', paddingTop: 18 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#252b45', marginBottom: 14, cursor: 'pointer' }}>
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{ width: 16, height: 16 }}
              />
              <span>I have reviewed and agree to the terms of the employment agreement.</span>
            </label>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                required
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Type your full legal name to digitally sign..."
                style={{ flex: 1, minWidth: 260, padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14 }}
              />
              <button type="submit" disabled={!agreed || !signature.trim()}>
                🎉 Accept & Sign Offer
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}

export default OfferDetails
