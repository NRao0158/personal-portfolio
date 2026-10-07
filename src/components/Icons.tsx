import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ArrowRight(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

export function ExternalLink(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M14 5h5v5M19 5l-8 8" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export function Github(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.477 2 2 6.589 2 12.253c0 4.53 2.865 8.373 6.839 9.73.5.095.682-.222.682-.493 0-.244-.009-.889-.014-1.744-2.782.619-3.369-1.373-3.369-1.373-.455-1.183-1.11-1.498-1.11-1.498-.908-.636.069-.623.069-.623 1.003.073 1.531 1.057 1.531 1.057.892 1.566 2.341 1.114 2.91.852.091-.662.35-1.114.635-1.37-2.221-.259-4.555-1.14-4.555-5.069 0-1.12.39-2.035 1.029-2.753-.103-.26-.446-1.303.098-2.716 0 0 .84-.275 2.75 1.051A9.303 9.303 0 0 1 12 6.965a9.31 9.31 0 0 1 2.504.346c1.909-1.326 2.747-1.051 2.747-1.051.546 1.413.203 2.456.1 2.716.64.718 1.028 1.633 1.028 2.753 0 3.94-2.337 4.807-4.565 5.061.359.317.679.943.679 1.901 0 1.372-.013 2.479-.013 2.816 0 .274.18.593.688.492C19.138 20.622 22 16.78 22 12.253 22 6.59 17.523 2 12 2Z" />
    </svg>
  );
}

export function Linkedin(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M5.337 3.5A2.337 2.337 0 1 1 5.34 8.174 2.337 2.337 0 0 1 5.337 3.5ZM3.32 9.94h4.035V21H3.32V9.94Zm6.42 0h3.87v1.512h.055c.539-1.021 1.855-2.098 3.82-2.098 4.086 0 4.84 2.69 4.84 6.188V21h-4.033v-4.84c0-1.155-.023-2.64-1.61-2.64-1.612 0-1.86 1.259-1.86 2.556V21H9.74V9.94Z" />
    </svg>
  );
}

export function Mail(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function FileText(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  );
}

export function Menu(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Close(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
