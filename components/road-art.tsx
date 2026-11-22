import type { Readiness } from '../lib/readiness';

export function LPlate({ className }: { className?: string }) {
  return <svg className={className} aria-hidden="true" viewBox="0 0 44 44" fill="none">
    <rect x="1" y="1" width="42" height="42" rx="6" fill="white" stroke="#1C1F22" strokeWidth="2"/>
    <path d="M14 9h7v20h11v7H14z" fill="var(--plate-red)"/>
  </svg>;
}

function Signal({ lit, sequence }: { lit?: Readiness; sequence?: boolean }) {
  return <g className={sequence ? 'signal signal-sequence' : 'signal'}>
    <rect x="1" y="1" width="72" height="169" rx="12" fill="#181b1e" stroke="#111417" strokeWidth="2.5"/>
    <rect x="6" y="6" width="62" height="159" rx="8" fill="none" stroke="var(--marking)" strokeWidth="2"/>
    {(['red', 'amber', 'green'] as const).map((lamp, index) => (
      <g className={`signal-lamp lamp-${lamp}${lit === lamp ? ' is-lit' : ''}`} key={lamp} transform={`translate(37 ${34 + index * 51})`}>
        <path d="M-23 2v-6a23 23 0 0 1 46 0v6" fill="#101315" stroke="#0b0e10" strokeWidth="2"/>
        <circle r="16.5" className="lamp-face"/>
        <path d="M-9-5Q-5-12 5-10" fill="none" stroke="white" strokeOpacity=".3" strokeWidth="2" strokeLinecap="round"/>
      </g>
    ))}
  </g>;
}

export function TrafficLight({ lit, size = 'sm' }: { lit?: Readiness; size?: 'sm' | 'lg' }) {
  return <svg className={`traffic-light traffic-light-${size}`} aria-hidden="true" viewBox="-12 -12 98 195"><Signal lit={lit}/></svg>;
}

function LearnerCar() {
  return <g stroke="#1c1f22" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
    <path className="headlight-beam" d="M342 96 540 58v106l-198-52Z" fill="url(#headlight-grad)" stroke="none"/>
    <ellipse cx="185" cy="149" rx="183" ry="23" fill="#141719" opacity=".24" stroke="none"/>
    <path d="M27 106q1-15 19-18l27-5 42-43q9-10 29-11h91q27 1 48 17l47 40q24 7 27 28l1 22-20 11H41l-15-12z" fill="var(--car-fill)"/>
    <path d="M30 108q16 10 45 11l268-4 14-7 1 28-20 11H41l-15-12z" fill="var(--car-shadow)"/>
    <path d="M83 83l40-40q6-5 19-5h32l-15 46zm86 1 15-46h45q25 0 44 14l34 31z" fill="var(--car-glass)"/>
    <path d="M226 40l3 44m50-20-37 19m-100-43-33 39m58 8-5 34m103-32 3 28" fill="none"/>
    <path d="M175 96h16m45 0h16" fill="none" stroke="#e7f2e9"/>
    <path d="M28 106l13 3 6 11-20-3" fill="#c8211b"/>
    <path d="M327 91q16 4 23 13l-25-3-9-9z" fill="#fff4ba"/>
    <path d="M343 123h13m-111 6h30m-177 2h34" fill="none"/>
    <g fill="#1c1f22"><circle cx="87" cy="138" r="25"/><circle cx="298" cy="138" r="25"/></g>
    <g fill="#f0eee2" stroke="#737b7a"><circle cx="87" cy="138" r="13"/><circle cx="298" cy="138" r="13"/></g>
    <g fill="#25292c" stroke="none"><circle cx="87" cy="138" r="4"/><circle cx="298" cy="138" r="4"/></g>
    <g transform="translate(50 88)"><rect width="22" height="23" rx="3" fill="white" strokeWidth="1.5"/><path d="M7 4h4v12h7v4H7z" fill="var(--plate-red)" stroke="none"/></g>
    <g transform="translate(312 107)"><rect width="21" height="22" rx="3" fill="white" strokeWidth="1.5"/><path d="M6 4h4v11h7v4H6z" fill="var(--plate-red)" stroke="none"/></g>
    <path d="M141 29l7-17q2-3 6-3h65q5 0 7 4l7 16z" fill="#fffdf4" strokeWidth="2"/>
    <text x="187" y="24" textAnchor="middle" fill="#1e7a3c" stroke="none" fontFamily="Lilita One, sans-serif" fontSize="11">GREEN LIGHT</text>
    <path d="M319 100h13" stroke="#ecfff0" strokeWidth="1.4"/>
  </g>;
}

const houses = [
  [59, 242, '#cbab9e'], [120, 235, '#e7c789'], [181, 245, '#a8c1ac'], [242, 239, '#decab2'],
  [303, 251, '#cfab9f'], [364, 257, '#dfc88f'], [425, 263, '#acc7ae'],
] as const;

const stars = [
  [84, 52, 1.6], [192, 38, 1.2], [298, 66, 1.8], [412, 34, 1.4],
  [514, 58, 1.5], [756, 46, 1.7], [782, 92, 1.2], [148, 86, 1.3],
] as const;

export function HeroScene() {
  return <svg className="scene hero-scene" aria-hidden="true" viewBox="0 0 820 570" preserveAspectRatio="xMidYMax slice" fill="none">
    <defs>
      <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--sky-top)"/>
        <stop offset="100%" stopColor="var(--sky)"/>
      </linearGradient>
      <linearGradient id="headlight-grad" x1="0" y1=".5" x2="1" y2=".5">
        <stop offset="0%" stopColor="#fff4ba" stopOpacity=".85"/>
        <stop offset="55%" stopColor="#ffe599" stopOpacity=".28"/>
        <stop offset="100%" stopColor="#ffe599" stopOpacity="0"/>
      </linearGradient>
      <radialGradient id="signal-halo">
        <stop offset="0%" stopColor="var(--green-lamp)" stopOpacity=".55"/>
        <stop offset="50%" stopColor="var(--green-lamp)" stopOpacity=".16"/>
        <stop offset="100%" stopColor="var(--green-lamp)" stopOpacity="0"/>
      </radialGradient>
      <pattern id="street-grain" width="57" height="59" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="12" r="1" fill="#fff" opacity=".13"/><circle cx="26" cy="34" r=".8" fill="#fff" opacity=".17"/>
        <circle cx="38" cy="4" r=".7" fill="#101315" opacity=".25"/><circle cx="51" cy="47" r="1.1" fill="#101315" opacity=".35"/>
      </pattern>
      <radialGradient id="scene-sun"><stop stopColor="var(--sky-glow)" stopOpacity=".58"/><stop offset="1" stopColor="var(--sky-glow)" stopOpacity="0"/></radialGradient>
    </defs>
    <path d="M0 0h820v570H0z" fill="url(#sky-grad)"/>
    <g className="night-stars" fill="#fff6d4">
      {stars.map(([cx, cy, r]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r}/>)}
    </g>
    <circle cx="650" cy="113" r="135" fill="url(#scene-sun)"/>
    <circle cx="650" cy="113" r="47" fill="var(--sky-glow)" opacity=".8"/>
    <g fill="var(--cloud)" opacity=".74">
      <path d="M69 136q18-18 47-12 9-36 45-21 14 6 19 20 35-4 54 13z"/>
      <path d="M357 89q13-11 31-9 7-24 32-15 11 4 14 14 22 0 31 10z"/>
      <path d="M716 195q17-14 35-11 11-27 39-13 6 4 9 12 15 0 21 4v8z"/>
    </g>
    <path d="M0 263Q120 173 258 218t242-15q149-95 320 34v136H0z" fill="var(--hill-back)"/>
    <path d="M0 298q110-66 219-39 155 42 253-3 181-56 348-6v128H0z" fill="var(--hill-front)"/>
    <g stroke="var(--bridge)" strokeWidth="3" strokeLinejoin="round">
      <path d="M437 250h328M442 248q30-8 49-47 84 91 184-7 35 49 82 54"/>
      <path d="M488 249v-55h-7v-8h34v8h-7v55m164 0v-64h-7v-8h36v8h-8v64" fill="var(--bridge)"/>
      <path d="M520 222v27m22-15v15m24-8v8m25-8v8m23-14v14m23-24v24m22-41v41m-193-21v21m248-28v28m19-16v16" strokeWidth="1.4"/>
    </g>
    <g stroke="var(--scene-outline)" strokeWidth="2.5" strokeLinejoin="round">
      {houses.map(([x, y, fill], i) => <g key={x} transform={`translate(${x} ${y})`} className="terrace">
        <path d="M3 12 31-6l28 16v98H3z" fill={fill}/>
        <path d="M6-9v-13h10v13m30 0v-16h10v23" fill={fill}/>
        <path d="M-2 14 31-11l33 23-3 7L31 0 3 21z" fill="#525851"/>
        <path d="M11 32h14v21H11zm26 0h14v21H37zm0 34h14v18H37z" fill={i % 2 ? 'var(--window)' : 'var(--glass)'} className={i % 2 ? 'lit-window' : undefined}/>
        <path d="M16 108V67q7-8 15 0v41" fill="var(--door)"/><path d="M12 107h24m-27 5h31M11 43h14m12 0h14" fill="none"/>
      </g>)}
    </g>
    <path d="M0 346q133-18 256 9 234 54 339-27 90-69 225-38v280H0z" fill="var(--verge)"/>
    <path d="M0 378q131-14 282 12 206 37 308-43 94-74 230-39v262H0z" fill="var(--kerb-scene)" stroke="var(--scene-outline)" strokeWidth="2"/>
    <path d="M0 396q129-14 284 12 217 37 319-49 81-69 217-33v244H0z" fill="var(--road-scene)"/>
    <path d="M0 396q129-14 284 12 217 37 319-49 81-69 217-33v244H0z" fill="url(#street-grain)"/>
    <path d="M0 484q197-14 341 8 171 24 274-77 94-90 205-67" stroke="var(--marking)" strokeWidth="5" strokeDasharray="28 22"/>
    <path d="M577 384l-12 18 10 16 13-17zM525 446l-17 10 12 17 17-11z" fill="var(--marking)" opacity=".9"/>
    <path d="M523 414 583 570h17l-63-156z" fill="var(--marking)"/>
    <g transform="translate(526 244)" stroke="var(--scene-outline)" strokeWidth="2.5" strokeLinejoin="round">
      <path d="M45 38h8v74h-8z" fill="#5f6965"/>
      <rect width="104" height="42" rx="4" fill="#fffdf1"/>
      <rect x="4" y="4" width="96" height="34" rx="2" strokeWidth="1" />
      <text x="11" y="26" fontFamily="Lilita One, sans-serif" fontSize="14" fill="#1c1f22" stroke="none">Test centre</text>
      <path d="M88 27V14m-5 5 5-5 5 5" stroke="#1c1f22" />
    </g>
    <g transform="translate(650 155)">
      <circle cx="37" cy="136" r="88" fill="url(#signal-halo)" className="signal-halo"/>
      <path d="M30 151h14v205H30z" fill="#242a2c" stroke="#16191b" strokeWidth="2.5"/>
      <path d="M35 172v167" stroke="#78827e" strokeWidth="2"/>
      <Signal lit="green" sequence/>
    </g>
    <g transform="translate(196 351) scale(1.04)"><LearnerCar/></g>
    <path d="M0 550h140m-132 6h64m679-29 67-11m-79 19 45-5" stroke="var(--marking)" strokeOpacity=".25" strokeWidth="2" strokeLinecap="round"/>
  </svg>;
}

export function RoadArrow({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 40 26" fill="none" aria-hidden="true">
    <path d="M2 13h34M25 3l12 10-12 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}

export function RoadIcon({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    wheel: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M4 9l6 2m4 0 6-2m-8 5v7"/></>,
    manual: <><path d="M5 5v14m7-14v14m7-14v7H5"/><path d="M3 5h4m3 0h4m3 0h4m-18 14h4m3 0h4"/></>,
    automatic: <><rect x="3" y="3" width="18" height="18" rx="4"/><path d="m8 16 4-8 4 8m-7-2h6"/></>,
    pin: <><path d="M19 10c0 5-7 10-7 10s-7-5-7-10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></>,
    licence: <><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="10" r="2"/><path d="M5 16q3-5 6 0m3-6h4m-4 4h4"/></>,
    mirror: <><path d="M4 8h15l2 3-3 5H7l-4-3Z"/><path d="m9 14 4-4"/></>,
    roundabout: <><path d="M6 9a7 7 0 0 1 11-3m2 3a7 7 0 0 1-3 10m-4 0a7 7 0 0 1-7-7"/><path d="M17 3v4h-4m8 10-5 2-1-4m-12-1 2-3 4 2"/></>,
    parking: <><path d="M4 4v16m16-16v16m-10-4V8h3a2 2 0 0 1 0 4h-3"/></>,
    motorway: <path d="M6 20 9 4m9 16L15 4M3 10h18m-9 3v2m0 3v2"/>,
    phone: <path d="m8 3 3 5-3 2a14 14 0 0 0 6 6l2-3 5 3-1 4C13 23 1 11 4 4z"/>,
    email: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 7 8-7"/></>,
  };
  return <svg className={className || 'road-icon'} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
}

export function LessonLog({ children }: { children: React.ReactNode }) {
  return <div className="lesson-log"><div aria-hidden="true" className="log-rings"/>{children}
    <RoadIcon name="roundabout" className="log-doodle"/>
  </div>;
}

export function Dashboard() {
  return <svg className="scene dashboard" viewBox="0 0 540 270" aria-hidden="true" fill="none" strokeLinejoin="round">
    <path d="M30 170 81 53q8-19 32-23h315q23 3 32 24l50 116z" fill="var(--sky)" stroke="var(--text)" strokeWidth="3"/>
    <path d="M48 156q139-119 234-59 96 48 207 59z" fill="var(--hill-front)"/>
    <path d="M206 164q30-33 44-48t49-24q-9 19 13 35l71 39z" fill="var(--road-scene)"/>
    <path d="M275 161q11-22 3-36t7-27" stroke="var(--marking)" strokeWidth="3" strokeDasharray="8 8"/>
    <path d="M15 165q112-40 255-29 144-11 255 29v62q-119 23-255 18-137 5-255-18z" fill="#2c3034" stroke="var(--text)" strokeWidth="3"/>
    <path d="M35 172q95-31 236-22 125-10 230 22" stroke="#77817d" strokeWidth="2"/>
    <rect x="210" y="163" width="101" height="59" rx="8" fill="#1b2022" stroke="#9fa8a5" strokeWidth="2"/>
    <path d="M226 178h68v24h-68z" fill="#85af91"/><path d="M233 192h15l7-8 8 11 9-5h13" stroke="#1c1f22" strokeWidth="2"/>
    <circle cx="402" cy="203" r="54" stroke="#101316" strokeWidth="16" fill="none"/>
    <circle cx="402" cy="203" r="54" stroke="#76817c" strokeWidth="2" fill="none"/>
    <path d="M352 186l50 17 47-17m-47 17v52" stroke="#101316" strokeWidth="13"/><circle cx="402" cy="203" r="12" fill="#dbe3d7"/>
    <path d="M83 193h82m-82 10h82m-82 10h82" stroke="#9fa8a5" strokeWidth="2"/>
    <path d="M249 30v11m-22 0h44a5 5 0 0 1 5 5v10h-55V46q0-5 6-5z" fill="#2c3034" stroke="#1c1f22" strokeWidth="3"/>
  </svg>;
}

export function NotFoundScene() {
  return <svg className="scene wrong-turn-scene" viewBox="0 0 900 375" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="900" height="375" fill="var(--sky)"/>
    <path d="M0 157q97-63 208-32t210 2q162-66 310-35t172 17v266H0z" fill="var(--hill-front)"/>
    <path d="M-5 266q258-15 398-2 121 10 133-62 13-58 107-58 128 1 126 106-2 81-163 85H0z" fill="var(--kerb-scene)" stroke="var(--scene-outline)" strokeWidth="3"/>
    <path d="M-5 278q258-15 398-2 132 9 144-71 14-50 96-49 117 1 113 93-1 72-151 73H0z" fill="var(--road-scene)"/>
    <path d="M12 301h386q153 6 210-70l29-41 39 57-86 51" fill="none" stroke="var(--marking)" strokeWidth="4" strokeDasharray="12 8"/>
    <path d="m603 298-13 0 4-13" fill="none" stroke="var(--marking)" strokeWidth="4"/>
    <g transform="translate(585 59)" stroke="#1c1f22" strokeWidth="2.5">
      <path d="M50 36h9v75h-9z" fill="#667270"/>
      <rect width="111" height="47" rx="5" fill="#fffdf1"/><path d="M10 8h28v30H10z" fill="#1d5fa8"/>
      <path d="M24 17v17" stroke="white" strokeWidth="5"/><path d="M16 16h16" stroke="#c8211b" strokeWidth="5"/>
      <text x="44" y="21" fill="#1c1f22" stroke="none" fontSize="12" fontFamily="Lilita One, sans-serif">No through</text>
      <text x="44" y="34" fill="#1c1f22" stroke="none" fontSize="12" fontFamily="Lilita One, sans-serif">road</text>
    </g>
    <g transform="translate(215 159) scale(.87)"><LearnerCar/></g>
  </svg>;
}
