const base = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
}
const I = (children) =>
  function Icon(props) {
    return (
      <svg {...base} {...props}>
        {children}
      </svg>
    )
  }

export const IconCheck = I(<path d="M5 12.5l4.5 4.5L19 7.5" />)
export const IconArrow = I(<path d="M5 12h14M13 6l6 6-6 6" />)
export const IconMenu = I(<path d="M4 7h16M4 12h16M4 17h16" />)
export const IconClose = I(<path d="M6 6l12 12M18 6L6 18" />)
export const IconGlobe = I(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
  </>,
)
export const IconPhone = I(
  <>
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="M11 18.5h2" />
  </>,
)
export const IconBolt = I(<path d="M13 2.5L5 13.5h6l-1 8 8-11h-6l1-8z" />)
export const IconSearch = I(
  <>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </>,
)
export const IconPin = I(
  <>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </>,
)
export const IconChat = I(<path d="M4 5.5h16v10H9.5L5 19.5v-4H4z" />)
export const IconChart = I(
  <>
    <path d="M4 20V4" />
    <path d="M4 20h16" />
    <path d="M8 15l4-4 3 3 5-6" />
  </>,
)
export const IconMegaphone = I(
  <>
    <path d="M4 10v4h3l8 4V6L7 10H4z" />
    <path d="M18.5 9.5a4 4 0 0 1 0 5" />
  </>,
)
export const IconCode = I(<path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5M13.5 5l-3 14" />)
export const IconShield = I(<path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6L12 3z" />)
export const IconMail = I(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </>,
)
export const IconWhatsApp = (props) => (
  <svg {...base} {...props} strokeWidth="1.7">
    <path d="M4 20l1.2-4.1A8 8 0 1 1 8.2 19L4 20z" />
    <path d="M9.2 8.6c.2 2.6 3.1 5.6 5.9 6.1.6.1 1.4-.6 1.5-1.2l-1.7-.9-.9.6c-1-.4-2-1.4-2.4-2.4l.6-.9-.9-1.7c-.6.1-1.2.9-1.1 1.4z" />
  </svg>
)

// ---------- Studio icon set (2026 rebrand) ----------
export const IconCart = I(<><path d="M3 4h2.5l2.2 11h10.6l2-8H6.6" /><circle cx="9.5" cy="19.5" r="1.4" /><circle cx="17" cy="19.5" r="1.4" /></>)
export const IconLayers = I(<><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></>)
export const IconLayout = I(<><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18M9 9v11" /></>)
export const IconPalette = I(<><path d="M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.9 1.8-1.8 0-1.3-1-1.6-1-2.7 0-1 .8-1.6 1.8-1.6H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z" /><circle cx="7.5" cy="11" r="1" /><circle cx="10" cy="7" r="1" /><circle cx="15" cy="7" r="1" /></>)
export const IconRocket = I(<><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" /><path d="M9 15l-3-3c1.5-5 6-9 13-9 0 7-4 11.5-9 13l-1-1z" /><circle cx="14.5" cy="9.5" r="1.8" /></>)
export const IconSpark = I(<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />)
export const IconLock = I(<><rect x="4.5" y="10.5" width="15" height="10" rx="2.5" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /></>)
export const IconGauge = I(<><path d="M4 17a8 8 0 1 1 16 0" /><path d="M12 17l4-5" /><path d="M7 17h0M17 17h0" /></>)
export const IconLanguage = I(<><path d="M3 5h10M8 3v2M5.5 5c.8 3.5 3.3 6.3 6.5 7.5M10.5 5c-.8 3.5-3.3 6.3-6.5 7.5" /><path d="M13 21l4-9 4 9M14.5 18h5" /></>)
export const IconCoins = I(<><ellipse cx="9" cy="7" rx="6" ry="3" /><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7" /><path d="M9 15v2c0 1.7 2.7 3 6 3s6-1.3 6-3v-5c0-1.6-2.4-2.9-5.5-3" /></>)
export const IconUsers = I(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5" /><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c2 .7 3.2 2.4 3.5 5.2" /></>)
export const IconCompass = I(<><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" /></>)
export const IconWrench = I(<path d="M14.5 6.5a4 4 0 0 0 5 5L21 13l-8 8-3-3 6.5-6.5M14.5 6.5L13 5a4 4 0 0 0-5 5L3 15l3 3 5-5" />)
export const IconClock = I(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>)
export const IconKey = I(<><circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M17 6l2 2M15 8l2 2" /></>)
export const IconGift = I(<><rect x="3.5" y="8" width="17" height="4" rx="1" /><path d="M5 12v8h14v-8M12 8v12" /><path d="M12 8c-1-3-5.5-4-5.5-1.5S10 8 12 8zM12 8c1-3 5.5-4 5.5-1.5S14 8 12 8z" /></>)
export const IconDevices = I(<><rect x="2.5" y="5" width="14" height="10" rx="1.5" /><path d="M1.5 18h13" /><rect x="17.5" y="8" width="5" height="11" rx="1.2" /></>)
export const IconTarget = I(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></>)
export const IconPlay = I(<path d="M7 4.5v15l12-7.5z" />)
export const IconBuilding = I(<><path d="M4 21V5l8-2v18M12 8l8 2v11M2.5 21h19" /><path d="M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2" /></>)
export const IconHeart = I(<path d="M12 20s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6.2-8 11-8 11z" />)
export const IconFood = I(<><path d="M5 3v8a2 2 0 0 0 4 0V3M7 11v10" /><path d="M17 21V3c-2.5 1.5-3.5 4-3.5 7.5 0 2 1.5 3 3.5 3" /></>)
export const IconCap = I(<><path d="M2 9l10-5 10 5-10 5-10-5z" /><path d="M6 11v5c3.5 2.5 8.5 2.5 12 0v-5M22 9v6" /></>)
export const IconBag = I(<><path d="M5 8h14l-1 13H6L5 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>)
export const IconHome = I(<><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10M10 20v-6h4v6" /></>)
export const IconBriefcase = I(<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5h6v2M3 12h18" /></>)
export const IconPlane = I(<path d="M10.5 13.5L3 11l1.5-1.5 8 1L17 6c1-1 3-1.5 3.5-1s0 2.5-1 3.5L15 13l1 8-1.5 1.5-2.5-7.5-3 3V21l-1.5 1L6 18l-3.5-1.5 1-1.5H6l3-3" />)
export const IconCar = I(<><path d="M4 16v-4l2-5h12l2 5v4z" /><path d="M4 12h16" /><circle cx="7.5" cy="16.5" r="1.8" /><circle cx="16.5" cy="16.5" r="1.8" /></>)
export const IconFactory = I(<><path d="M3 21V10l6 3V10l6 3V6h6v15z" /><path d="M7 17h2M12 17h2M17 17h1" /></>)
export const IconLeaf = I(<><path d="M5 19c0-9 5-14 15-15 0 10-5 15-14 15z" /><path d="M5 19l8-8" /></>)
export const IconSparkle = I(<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />)
export const IconHand = I(<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11m0-1V4a1.5 1.5 0 0 1 3 0v6m0-1V5.5a1.5 1.5 0 0 1 3 0V14c0 4-2.5 7-6.5 7-2.6 0-4.3-1.3-5.5-3.4L3.3 13.6a1.5 1.5 0 0 1 2.6-1.5L8 15" />)
export const IconEye = I(<><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></>)
export const IconPrint = I(<><path d="M7 9V3.5h10V9" /><rect x="3.5" y="9" width="17" height="8" rx="2" /><path d="M7 14h10v6.5H7z" /></>)
export const IconLink = I(<><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>)
export const IconEdit = I(<path d="M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4" />)
export const IconPlus = I(<path d="M12 5v14M5 12h14" />)
export const IconTrash = I(<><path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13" /></>)
export const IconFile = I(<><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>)
export const IconCopy = I(<><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" /></>)
