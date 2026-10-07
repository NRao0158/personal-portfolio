function Grid({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={id} width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M32 0H0V32" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
      </pattern>
      <linearGradient id={`${id}-fade`} x1="0" x2="1">
        <stop offset="0" stopColor="#55c7ff" stopOpacity="0" />
        <stop offset="0.5" stopColor="#55c7ff" stopOpacity="0.8" />
        <stop offset="1" stopColor="#55c7ff" stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

export function HeroEvidenceVisual() {
  return (
    <div className="technical-frame hero-evidence" aria-label="Conceptual engineering evidence visualization">
      <div className="technical-frame-labels">
        <span>SYSTEMS / ML / CV</span>
        <span>MODEL EVIDENCE</span>
      </div>
      <svg viewBox="0 0 620 390" role="img" aria-labelledby="hero-evidence-title" className="h-auto w-full">
        <title id="hero-evidence-title">Conceptual traces showing input, model, evaluation, and system output</title>
        <Grid id="hero-grid" />
        <rect width="620" height="390" fill="url(#hero-grid)" />

        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 92 C70 71 94 106 134 85 S205 73 247 91 S317 108 357 78 S427 59 468 88 S544 94 596 65" stroke="#55c7ff" strokeWidth="2" />
          <path d="M24 133 C74 128 96 111 140 126 S207 152 252 129 S322 113 365 139 S431 156 477 128 S551 116 596 137" stroke="#a6b0bc" strokeOpacity="0.55" strokeWidth="1.4" />
          <path d="M24 168 C57 153 96 174 131 160 S196 142 242 165 S306 181 350 159 S413 144 452 161 S540 185 596 156" stroke="#55c7ff" strokeOpacity="0.35" strokeWidth="1.4" />
        </g>

        <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="10" letterSpacing="1" fill="#7c8998">
          <text x="24" y="40">TELEMETRY / EVENTS / FRAMES</text>
          <text x="24" y="211">CAUSAL PIPELINE</text>
        </g>

        <g transform="translate(24 232)">
          {[
            [0, "INPUT"],
            [145, "FEATURES"],
            [290, "MODEL"],
            [435, "EVALUATION"],
          ].map(([x, label], index) => (
            <g key={String(label)} transform={`translate(${x} 0)`}>
              <rect width="118" height="64" rx="8" fill="#10161d" stroke="#94a3b8" strokeOpacity="0.22" />
              <circle cx="18" cy="18" r="4" fill={index === 3 ? "#55c7ff" : "#7c8998"} />
              <text x="18" y="43" fill="#dce4ec" fontSize="11" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
                {label}
              </text>
              {index < 3 ? <path d="M119 32h25" stroke="#55c7ff" strokeOpacity="0.65" /> : null}
            </g>
          ))}
        </g>

        <g transform="translate(24 330)" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          <text y="0" fill="#7c8998" fontSize="9" letterSpacing="1.4">ENGINEERING PRIORITIES</text>
          <text y="27" fill="#dce4ec" fontSize="11">correctness</text>
          <text x="117" y="27" fill="#dce4ec" fontSize="11">reproducibility</text>
          <text x="259" y="27" fill="#dce4ec" fontSize="11">failure modes</text>
          <text x="380" y="27" fill="#dce4ec" fontSize="11">deployment</text>
        </g>
      </svg>
    </div>
  );
}

export function SentinelVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`technical-frame ${compact ? "technical-frame-compact" : ""}`}>
      <div className="technical-frame-labels">
        <span>NASA C-MAPSS / FD001</span>
        <span>HELD-OUT TEST</span>
      </div>
      <svg viewBox="0 0 760 470" role="img" aria-labelledby="sentinel-title" className="w-full">
        <title id="sentinel-title">Sentinel conceptual telemetry, failure horizon, and remaining useful life evidence</title>
        <Grid id="sentinel-grid" />
        <rect width="760" height="470" fill="url(#sentinel-grid)" />

        <g transform="translate(28 36)">
          <text fill="#7c8998" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="10" letterSpacing="1.2">ENGINE TELEMETRY</text>
          <path d="M0 116 C38 109 65 93 94 98 S156 111 189 91 S251 82 291 105 S359 119 399 83 S473 72 511 99 S582 127 639 91 S681 83 704 91" fill="none" stroke="#55c7ff" strokeWidth="2" />
          <path d="M0 145 C49 128 67 148 110 132 S179 123 217 144 S281 155 329 133 S401 115 442 143 S521 158 561 138 S652 121 704 139" fill="none" stroke="#a6b0bc" strokeOpacity="0.55" strokeWidth="1.3" />
          <path d="M0 166 C45 154 78 168 116 155 S175 143 222 163 S293 173 337 151 S405 147 448 165 S535 184 574 155 S649 145 704 160" fill="none" stroke="#55c7ff" strokeOpacity="0.3" strokeWidth="1.2" />
          <line x1="612" y1="34" x2="612" y2="183" stroke="#55c7ff" strokeDasharray="4 5" strokeOpacity="0.8" />
          <text x="623" y="53" fill="#55c7ff" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="9">30-CYCLE</text>
          <text x="623" y="68" fill="#55c7ff" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="9">HORIZON</text>
        </g>

        <g transform="translate(28 250)">
          <rect width="438" height="166" rx="10" fill="#0d1117" stroke="#94a3b8" strokeOpacity="0.16" />
          <text x="17" y="26" fill="#7c8998" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="9" letterSpacing="1.1">REMAINING USEFUL LIFE</text>
          <path d="M22 58 C80 76 126 83 178 103 S281 125 408 151" fill="none" stroke="#a6b0bc" strokeOpacity="0.48" strokeWidth="7" />
          <path d="M22 62 C79 72 127 91 176 100 S284 131 408 149" fill="none" stroke="#55c7ff" strokeWidth="2.2" />
          <text x="22" y="145" fill="#7c8998" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="9">PREDICTED</text>
          <text x="334" y="145" fill="#7c8998" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="9">FAILURE</text>
        </g>

        <g transform="translate(486 250)" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          <rect width="246" height="166" rx="10" fill="#0d1117" stroke="#94a3b8" strokeOpacity="0.16" />
          <text x="16" y="26" fill="#7c8998" fontSize="9" letterSpacing="1.1">MODEL EVIDENCE</text>
          <text x="16" y="65" fill="#55c7ff" fontSize="24">0.949</text>
          <text x="16" y="84" fill="#a6b0bc" fontSize="10">average precision</text>
          <text x="16" y="116" fill="#f1f5f9" fontSize="13">84% recall</text>
          <text x="132" y="116" fill="#f1f5f9" fontSize="13">87.5% precision</text>
          <text x="16" y="142" fill="#7c8998" fontSize="10">100 held-out engines</text>
        </g>
      </svg>
    </div>
  );
}

export function InterceptIQVisual({ compact = false }: { compact?: boolean }) {
  const nodes = [
    { x: 20, title: "FastAPI", sub: "ingest" },
    { x: 164, title: "PostgreSQL", sub: "state" },
    { x: 308, title: "Outbox", sub: "transactional" },
    { x: 452, title: "RabbitMQ", sub: "delivery" },
    { x: 596, title: "Consumer", sub: "idempotent" },
  ];
  return (
    <div className={`technical-frame ${compact ? "technical-frame-compact" : ""}`}>
      <div className="technical-frame-labels">
        <span>EVENT-DRIVEN BACKEND</span>
        <span>SYNTHETIC DATA</span>
      </div>
      <svg viewBox="0 0 760 430" role="img" aria-labelledby="intercept-title" className="w-full">
        <title id="intercept-title">InterceptIQ event pipeline from ingestion through durable state, queue delivery, and idempotent consumption</title>
        <Grid id="intercept-grid" />
        <rect width="760" height="430" fill="url(#intercept-grid)" />

        <g transform="translate(20 46)">
          {nodes.map((node, index) => (
            <g key={node.title} transform={`translate(${node.x} 0)`}>
              <rect width="120" height="82" rx="9" fill="#10161d" stroke="#94a3b8" strokeOpacity="0.24" />
              <circle cx="18" cy="18" r="4" fill={index === 2 ? "#55c7ff" : "#7c8998"} />
              <text x="17" y="47" fill="#f1f5f9" fontSize="11" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">{node.title}</text>
              <text x="17" y="65" fill="#7c8998" fontSize="9" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">{node.sub}</text>
              {index < nodes.length - 1 ? <path d="M120 41h24" stroke="#55c7ff" strokeWidth="1.4" /> : null}
            </g>
          ))}
        </g>

        <g transform="translate(28 182)" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          <text fill="#7c8998" fontSize="9" letterSpacing="1.2">EVENT LIFECYCLE</text>
          <line x1="0" y1="55" x2="702" y2="55" stroke="#94a3b8" strokeOpacity="0.18" />
          {[
            [0, "HOLD"],
            [138, "SCORE"],
            [276, "VIOLATION"],
            [414, "ALERT"],
            [552, "ACK / RETRACT"],
          ].map(([x, label], index) => (
            <g key={String(label)} transform={`translate(${x} 29)`}>
              <circle cx="11" cy="26" r="10" fill="#0d1117" stroke={index === 2 ? "#55c7ff" : "#94a3b8"} strokeOpacity={index === 2 ? 0.9 : 0.34} />
              <text x="0" y="58" fill="#dce4ec" fontSize="9">{label}</text>
            </g>
          ))}
        </g>

        <g transform="translate(28 296)" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          <rect width="704" height="92" rx="10" fill="#0d1117" stroke="#94a3b8" strokeOpacity="0.16" />
          <text x="16" y="25" fill="#7c8998" fontSize="9" letterSpacing="1.1">RELIABILITY BEHAVIOR</text>
          {[
            [16, "duplicate suppression"],
            [187, "late-event recompute"],
            [365, "alert retraction"],
            [508, "broker recovery"],
          ].map(([x, label]) => (
            <g key={String(label)} transform={`translate(${x} 48)`}>
              <rect width="8" height="8" rx="2" fill="#55c7ff" fillOpacity="0.68" />
              <text x="15" y="8" fill="#dce4ec" fontSize="9">{label}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

export function FocusMateVisual({ compact = false }: { compact?: boolean }) {
  const stages = ["BROWSER", "SOCKET", "OPENCV", "STATE", "UI"];
  return (
    <div className={`technical-frame ${compact ? "technical-frame-compact" : ""}`}>
      <div className="technical-frame-labels">
        <span>REAL-TIME CV PIPELINE</span>
        <span>ACCESSIBILITY</span>
      </div>
      <svg viewBox="0 0 760 430" role="img" aria-labelledby="focus-title" className="w-full">
        <title id="focus-title">FocusMate real-time webcam, WebSocket, computer vision, state, and interface response pipeline</title>
        <Grid id="focus-grid" />
        <rect width="760" height="430" fill="url(#focus-grid)" />

        <g transform="translate(42 46)">
          {stages.map((stage, index) => (
            <g key={stage} transform={`translate(${index * 137} 0)`}>
              <rect width="108" height="62" rx="9" fill="#10161d" stroke="#94a3b8" strokeOpacity="0.22" />
              <text x="54" y="37" textAnchor="middle" fill={index === 2 ? "#55c7ff" : "#dce4ec"} fontSize="10" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">{stage}</text>
              {index < stages.length - 1 ? <path d="M108 31h29" stroke="#55c7ff" strokeOpacity="0.66" /> : null}
            </g>
          ))}
        </g>

        <g transform="translate(48 164)">
          <rect width="282" height="205" rx="11" fill="#0d1117" stroke="#94a3b8" strokeOpacity="0.18" />
          <ellipse cx="141" cy="102" rx="68" ry="84" fill="none" stroke="#55c7ff" strokeOpacity="0.5" />
          <path d="M96 87c13-9 27-9 40 0M149 87c13-9 27-9 40 0M120 126c14 9 28 9 43 0" fill="none" stroke="#55c7ff" strokeOpacity="0.55" />
          {[
            [94, 84], [110, 82], [126, 87], [151, 87], [167, 82], [183, 84], [141, 105], [118, 128], [141, 134], [164, 128], [101, 112], [181, 112]
          ].map(([x, y], index) => <circle key={index} cx={x} cy={y} r="2.2" fill="#55c7ff" />)}
          <text x="18" y="185" fill="#7c8998" fontSize="9" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">FACIAL-MARKER ABSTRACTION</text>
        </g>

        <g transform="translate(360 164)" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          <rect width="352" height="205" rx="11" fill="#0d1117" stroke="#94a3b8" strokeOpacity="0.18" />
          <text x="18" y="26" fill="#7c8998" fontSize="9" letterSpacing="1.1">ATTENTION STATE / EXAMPLE</text>
          {[
            [62, "FACE DETECTED", 0.88],
            [101, "FOCUS SIGNAL", 0.72],
            [140, "DISTRACTION", 0.31],
          ].map(([y, label, value]) => (
            <g key={String(label)}>
              <text x="18" y={Number(y)} fill="#dce4ec" fontSize="9">{label}</text>
              <rect x="150" y={Number(y) - 8} width="165" height="7" rx="3.5" fill="#1b2732" />
              <rect x="150" y={Number(y) - 8} width={165 * Number(value)} height="7" rx="3.5" fill="#55c7ff" fillOpacity="0.75" />
            </g>
          ))}
          <line x1="18" y1="160" x2="334" y2="160" stroke="#94a3b8" strokeOpacity="0.14" />
          <text x="18" y="184" fill="#55c7ff" fontSize="10">LOW-STIMULATION RESPONSE</text>
        </g>
      </svg>
    </div>
  );
}

export function ProjectVisual({ slug, compact = false }: { slug: string; compact?: boolean }) {
  if (slug === "sentinel") return <SentinelVisual compact={compact} />;
  if (slug === "interceptiq") return <InterceptIQVisual compact={compact} />;
  return <FocusMateVisual compact={compact} />;
}
