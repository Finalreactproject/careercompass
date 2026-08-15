// Simple SVG path showing: Discover → Apply → Interview → Offer
const STOPS = [
  { label: 'Discover', y: 40 },
  { label: 'Apply', y: 190 },
  { label: 'Interview', y: 340 },
  { label: 'Offer', y: 490 },
]

function JourneyPath() {
  const pathString = STOPS.map((stop, i) => {
    const x = i % 2 === 0 ? 70 : 170
    const prevX = i % 2 === 0 ? 170 : 70
    return i === 0
      ? `M ${x} ${stop.y}`
      : `Q ${prevX} ${(stop.y + STOPS[i - 1].y) / 2} ${x} ${stop.y}`
  }).join(' ')

  return (
    <svg viewBox="0 0 240 540" style={{ width: '100%', maxWidth: 240 }} aria-hidden="true">
      <path d={pathString} fill="none" stroke="#ddd" strokeWidth="2" />
      {STOPS.map((stop, i) => {
        const x = i % 2 === 0 ? 70 : 170
        const isLast = i === STOPS.length - 1
        return (
          <g key={stop.label}>
            <circle cx={x} cy={stop.y} r={isLast ? 9 : 6}
              fill={isLast ? '#6244a0' : '#fff'}
              stroke={isLast ? '#6244a0' : '#bbb'}
              strokeWidth="2" />
            <text
              x={i % 2 === 0 ? x + 18 : x - 18}
              y={stop.y}
              textAnchor={i % 2 === 0 ? 'start' : 'end'}
              dominantBaseline="central"
              style={{ fontSize: 13, fill: isLast ? '#6244a0' : '#666', fontWeight: isLast ? 700 : 400 }}
            >
              {stop.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default JourneyPath
