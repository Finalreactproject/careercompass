import { useState } from 'react'

function OfferDetails({ app, onBack, onAcceptOffer }) {
  const [agreed, setAgreed] = useState(false)
  const [signature, setSignature] = useState('')
  const [signed, setSigned] = useState(app?.status === 'Accepted')

  if (!app) return <main className="main-content"><p>Offer not found. <button onClick={onBack}>Go back</button></p></main>

  const salary = app.salary || 'KES 140,000 – 180,000 / month'

  function handleAccept(e) {
    e.preventDefault()
    if (!agreed || !signature.trim()) return
    setSigned(true)
    onAcceptOffer?.(app.id)
  }

  return (
    <main className="main-content">
      <button className="btn-outline" style={{ marginBottom: 20 }} onClick={onBack}>← Back to Applications</button>

      <div className="app-detail-header" style={{ background: signed ? 'honeydew' : 'white', border: `1px solid ${signed ? 'lightgreen' : 'lightgray'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, color: signed ? 'darkgreen' : 'black' }}>{app.company} — Offer Package</h1>
          <p style={{ margin: '4px 0 0', color: 'slateblue', fontWeight: 600 }}>{app.title}</p>
        </div>
        <span style={{ background: signed ? 'darkgreen' : 'lavender', color: signed ? 'white' : 'darkblue', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
          {signed ? '✓ Offer Accepted' : 'Pending Review'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Monthly Compensation', value: salary, color: 'darkgreen' },
          { label: 'Proposed Start Date',  value: 'September 1, 2026', color: 'black' },
          { label: 'Role Classification',  value: `${app.title} (Full-time)`, color: 'slateblue' },
        ].map((item) => (
          <div key={item.label} style={{ background: 'white', border: '1px solid lightgray', borderRadius: 10, padding: 18 }}>
            <small style={{ color: 'gray', textTransform: 'uppercase', fontSize: 11, fontWeight: 700 }}>{item.label}</small>
            <div style={{ fontSize: 16, fontWeight: 700, color: item.color, marginTop: 4 }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div className="detail-card">
        <h3>Employment Terms & Benefits</h3>
        <p style={{ fontSize: 14, color: 'dimgray', lineHeight: 1.6, margin: '0 0 16px' }}>
          We are pleased to formally extend this offer for <strong>{app.title}</strong> at <strong>{app.company}</strong>.
        </p>
        <ul style={{ fontSize: 13, color: 'dimgray', lineHeight: 1.7, margin: '0 0 20px', paddingLeft: 20 }}>
          <li><strong>Base Pay:</strong> {salary}, paid on the 25th of every month.</li>
          <li><strong>Medical:</strong> Inpatient & Outpatient comprehensive cover across Kenya.</li>
          <li><strong>Work Setup:</strong> Hybrid with modern workstation allowance.</li>
          <li><strong>Leave:</strong> 21 annual days + public holidays.</li>
        </ul>

        {signed ? (
          <div style={{ background: 'honeydew', border: '1px solid lightgreen', borderRadius: 8, padding: 16, color: 'darkgreen', fontWeight: 600 }}>
            🎉 Digitally signed and accepted. Welcome to the team!
          </div>
        ) : (
          <form onSubmit={handleAccept} style={{ borderTop: '1px solid lightgray', paddingTop: 18 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, marginBottom: 14, cursor: 'pointer' }}>
              <input type="checkbox" required checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ width: 16, height: 16 }} />
              I have reviewed and agree to the terms of this offer.
            </label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <input required type="text" value={signature} onChange={(e) => setSignature(e.target.value)} placeholder="Type your full legal name to sign..." style={{ flex: 1, minWidth: 260, padding: '10px 14px', borderRadius: 8, border: '1px solid lightgray', fontSize: 14 }} />
              <button type="submit" disabled={!agreed || !signature.trim()}>🎉 Accept & Sign</button>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}

export default OfferDetails
