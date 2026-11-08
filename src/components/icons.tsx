import type { ReactNode } from "react";

type IconName =
  | "search"
  | "pin"
  | "heart"
  | "bed"
  | "bath"
  | "area"
  | "chevron"
  | "close"
  | "sliders"
  | "calendar"
  | "clock"
  | "school"
  | "trend"
  | "home"
  | "menu"
  | "arrow"
  | "arrow-up"
  | "map"
  | "list"
  | "phone"
  | "mail"
  | "check"
  | "sparkle"
  | "shield"
  | "building"
  | "share"
  | "info"
  | "chevron-right";

const shapes: Record<IconName, ReactNode> = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  heart: <path className="heart-shape" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />,
  bed: <><path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7" /><path d="M3 14h18M5 9V6h5a2 2 0 0 1 2 2v3M3 18v2m18-2v2" /></>,
  bath: <><path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3ZM5 12V6a2 2 0 0 1 4 0v1" /><path d="M7 19v2m10-2v2" /></>,
  area: <><path d="M4 7V4h3M17 4h3v3M20 17v3h-3M7 20H4v-3" /><path d="M8 16 16 8M9 8h7v7" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  sliders: <><path d="M4 7h9m4 0h3M4 17h3m4 0h9" /><circle cx="15" cy="7" r="2" /><circle cx="9" cy="17" r="2" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  school: <><path d="m2 10 10-6 10 6-10 6-10-6Z" /><path d="M6 12.4V17c3.5 2.7 8.5 2.7 12 0v-4.6M22 10v6" /></>,
  trend: <><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
  home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  "arrow-up": <><path d="M7 17 17 7M7 7h10v10" /></>,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" /><path d="M9 3v15m6-12v15" /></>,
  list: <><path d="M8 6h13M8 12h13M8 18h13" /><path d="M3 6h.01M3 12h.01M3 18h.01" /></>,
  phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.8a2 2 0 0 1-.45 2.11L8.07 9.93a16 16 0 0 0 6 6l1.3-1.27a2 2 0 0 1 2.11-.45c.9.32 1.84.55 2.8.68a2 2 0 0 1 1.72 2.03Z" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  sparkle: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" /></>,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  building: <><path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M15 9h.01M9 13h.01M15 13h.01M10 21v-4h4v4" /></>,
  share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 10.5 6.8-4m-6.8 7 6.8 4" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5m0-8h.01" /></>,
  "chevron-right": <path d="m9 18 6-6-6-6" />,
};

export default function Icon({
  name,
  size = 20,
  className = "",
  strokeWidth = 1.8,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shapes[name]}
    </svg>
  );
}
