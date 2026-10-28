export type Metric = {
  value: string;
  label: string;
  detail?: string;
};

export type CaseStudySection = {
  title: string;
  body?: string[];
  items?: { title: string; body: string }[];
};

export type Project = {
  slug: "sentinel" | "interceptiq" | "focusmate";
  index: string;
  title: string;
  category: string;
  descriptor: string;
  summary: string;
  metrics: Metric[];
  stack: string[];
  proofLine: string[];
  github: string;
  demo?: string;
  demoNote?: string;
  disclaimer: string;
  caseStudy: {
    eyebrow: string;
    headline: string;
    intro: string[];
    sections: CaseStudySection[];
  };
};

export const projects: Project[] = [
  {
    slug: "sentinel",
    index: "01",
    title: "Sentinel",
    category: "Predictive maintenance · Machine learning",
    descriptor: "Predictive maintenance from engine telemetry",
    summary:
      "A machine-learning system for predicting failure within 30 operating cycles and estimating remaining useful life from NASA C-MAPSS simulated turbofan telemetry. Built around causal features, machine-disjoint evaluation, reproducibility, and leakage-aware testing.",
    metrics: [
      { value: "0.949", label: "Average precision" },
      { value: "84%", label: "Recall" },
      { value: "87.5%", label: "Precision" },
      { value: "12.9", label: "Cycles RUL MAE" },
      { value: "100", label: "Held-out engines" },
    ],
    stack: ["Python", "scikit-learn", "pandas", "Streamlit"],
    proofLine: [
      "Machine-disjoint evaluation",
      "Causal features",
      "Reproducible training",
      "Leakage tests",
    ],
    github: "https://github.com/NRao0158/sentinel-predictive-maintenance",
    demo: "https://nihal-sentinel.streamlit.app/",
    disclaimer:
      "Independent portfolio project using NASA C-MAPSS simulated turbofan data.",
    caseStudy: {
      eyebrow: "Predictive maintenance · Machine learning",
      headline: "Predicting equipment failure without looking into the future.",
      intro: [
        "Sentinel predicts whether a simulated turbofan engine is approaching failure within 30 operating cycles and estimates its remaining useful life from historical sensor telemetry.",
        "The project uses NASA C-MAPSS simulated engine data and was designed as an exercise in rigorous predictive modeling rather than as a production maintenance system.",
      ],
      sections: [
        {
          title: "What I built",
          body: [
            "I built a reproducible pipeline for feature generation, model training, validation, inference, historical replay, batch scoring, and simulated maintenance alerts.",
            "Time-series features are constructed causally, using only information available at the prediction point.",
          ],
        },
        {
          title: "Evaluation",
          body: [
            "Training, validation, and testing are machine-disjoint rather than randomly split by telemetry row.",
            "Classification models are compared against a prevalence baseline, while remaining-useful-life regression is compared against a median baseline. Model selection and alert thresholding use validation data before final evaluation on held-out engines.",
          ],
        },
        {
          title: "Engineering decisions",
          items: [
            {
              title: "Causal features",
              body: "Rolling and historical features never incorporate future sensor values.",
            },
            {
              title: "Machine-disjoint splits",
              body: "Telemetry from one engine does not leak across training and evaluation partitions.",
            },
            {
              title: "Explicit baselines",
              body: "Performance is evaluated against simple alternatives rather than reported in isolation.",
            },
            {
              title: "Reproducibility",
              body: "Training logic, model artifacts, metrics, and provenance are kept reproducible.",
            },
            {
              title: "Testing",
              body: "Automated tests cover leakage prevention, inference behavior, and application behavior.",
            },
          ],
        },
        {
          title: "Limitations",
          body: [
            "Sentinel is an independent portfolio project built on NASA C-MAPSS simulated turbofan data. It has not been validated on real maintenance operations or production equipment.",
          ],
        },
      ],
    },
  },
  {
    slug: "interceptiq",
    index: "02",
    title: "InterceptIQ",
    category: "Machine learning · Backend systems",
    descriptor: "Shipment risk prediction with an event-driven backend",
    summary:
      "A machine-learning and backend system for identifying simulated packages at risk of moving while under HOLD or REJECT and detecting stop violations as shipment, screening, and brokerage events arrive.",
    metrics: [
      { value: "0.321", label: "Average precision" },
      { value: "0.153", label: "Prevalence baseline" },
      { value: "2,908", label: "Held-out packages" },
      { value: "18,000", label: "Synthetic packages" },
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "RabbitMQ", "Streamlit"],
    proofLine: [
      "Chronological evaluation",
      "Transactional outbox",
      "Idempotent ingestion",
      "Outage recovery",
    ],
    github: "https://github.com/NRao0158/interceptiq-shipment-risk",
    demo: "https://nihal-interceptiq.streamlit.app/",
    demoNote: "The public Streamlit demo shows predictions and simulated replay. The API, PostgreSQL database, and RabbitMQ queue run locally; the demo is disconnected from the service database.",
    disclaimer: "All shipment data and operational scenarios are synthetic.",
    caseStudy: {
      eyebrow: "Machine learning · Backend systems",
      headline: "Prediction is only one part of a reliable decision system.",
      intro: [
        "InterceptIQ predicts which simulated packages placed under HOLD or REJECT may move before clearance and detects confirmed stop violations as shipment, screening, and brokerage events arrive.",
        "All shipment data is synthetic. The project focuses as much on event-driven reliability as on model performance.",
      ],
      sections: [
        {
          title: "System architecture",
          body: [
            "Events enter through FastAPI and are persisted before downstream processing. A PostgreSQL transactional outbox coordinates durable state with RabbitMQ publication, while consumers are designed to tolerate redelivery.",
            "The system also handles duplicate ingestion, late events, recomputation, alert acknowledgement, alert retraction, and broker outages.",
            "The public Streamlit demo is a separate prediction and replay interface. The API, PostgreSQL database, and RabbitMQ queue run locally, and the public demo does not connect to the service database.",
          ],
        },
        {
          title: "Event lifecycle",
          items: [
            { title: "Ingest", body: "Validate and persist source events." },
            { title: "Detect", body: "Apply source-specific stop rules." },
            {
              title: "Score",
              body: "Generate risk predictions from causal hold-time context.",
            },
            {
              title: "Publish",
              body: "Record outbound work transactionally before queue delivery.",
            },
            { title: "Consume", body: "Process messages idempotently." },
            {
              title: "Revise",
              body: "Recompute state when late events change the known history.",
            },
          ],
        },
        {
          title: "Engineering decisions",
          items: [
            {
              title: "Chronological evaluation",
              body: "Training and evaluation respect operational time.",
            },
            {
              title: "Idempotency",
              body: "Repeated events and message redelivery do not create duplicate outcomes.",
            },
            {
              title: "Transactional outbox",
              body: "Database state and publication intent are committed together.",
            },
            {
              title: "Late-event handling",
              body: "New historical information can trigger recomputation and alert retraction.",
            },
            {
              title: "Recovery testing",
              body: "Scenarios cover replay, duplicates, outages, recovery, and persistence.",
            },
          ],
        },
        {
          title: "Limitations",
          body: [
            "InterceptIQ uses synthetic packages, facilities, events, and labels. It is not connected to a real carrier or production logistics operation.",
          ],
        },
      ],
    },
  },
  {
    slug: "focusmate",
    index: "03",
    title: "FocusMate",
    category: "Computer vision · Accessibility",
    descriptor: "Real-time computer vision for cognitive accessibility",
    summary:
      "A full-stack study prototype that uses face presence as a rough proxy for attention. A React client sends webcam images to a Flask-SocketIO backend for OpenCV face detection and displays a dismissible blur overlay when no face is detected.",
    metrics: [
      { value: "90.5%", label: "Face-presence benchmark", detail: "181 of 200 test frames" },
      { value: "~5", label: "Frame submissions / sec", detail: "200 ms client interval; not measured throughput" },
    ],
    stack: ["React", "Python", "OpenCV", "Flask", "Socket.IO", "Figma"],
    proofLine: [
      "Real-time CV",
      "WebSockets",
      "Client/server state",
      "Dismissible overlay",
    ],
    github: "https://github.com/NRao0158/focusmate-ai",
    disclaimer:
      "Portfolio accessibility project; not a clinically validated treatment or medical device.",
    caseStudy: {
      eyebrow: "Computer vision · Accessibility",
      headline: "A webcam-based face-presence prototype with adaptive interface feedback.",
      intro: [
        "FocusMate is a full-stack study prototype that displays a blur overlay when no face is detected in a submitted webcam image. Face presence is only a rough proxy for attention.",
        "The React client attempts one frame submission every 200 ms (approximately five per second). A Flask-SocketIO backend applies an OpenCV Haar-cascade face detector and returns a face-present or face-absent result. The application does not implement gaze tracking or sustained-distraction timing.",
      ],
      sections: [
        {
          title: "System",
          items: [
            { title: "Browser camera", body: "Capture webcam frames in the client." },
            {
              title: "WebSocket connection",
              body: "Stream frames and state over Socket.IO.",
            },
            {
              title: "Flask-SocketIO",
              body: "Receive frames and coordinate real-time state.",
            },
            {
              title: "OpenCV detection",
              body: "Detect whether an image contains a face using an OpenCV Haar cascade.",
            },
            {
              title: "Adaptive response",
              body: "Show a dismissible blur overlay when the backend reports no detected face.",
            },
          ],
        },
        {
          title: "What I focused on",
          items: [
            {
              title: "Frame submission",
              body: "Attempt one webcam image submission every 200 ms. This scheduling rate is not a measured end-to-end processing benchmark.",
            },
            {
              title: "Client/server communication",
              body: "Streaming frames and returning state changes over WebSockets.",
            },
            {
              title: "Dismissible overlay",
              body: "Provide a manual dismiss control for the blur overlay; its accessibility benefits have not been established by this implementation.",
            },
            {
              title: "Iteration",
              body: "Refining frontend components around feedback and usability.",
            },
          ],
        },
        {
          title: "Evidence and limits",
          body: [
            "The repository benchmark report records 181 correct face-present/absent predictions out of 200 test frames (90.5%). This measures face presence, not attention, gaze, ADHD outcomes, or clinical effectiveness. The test-frame dataset is not included in the repository.",
            "No distraction-reduction percentage is claimed here: the analysis script contains eight participant records, but the repository does not establish their collection provenance. FocusMate is not a medical device or clinically validated ADHD treatment.",
          ],
        },
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
