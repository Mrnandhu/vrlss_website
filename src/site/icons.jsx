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
