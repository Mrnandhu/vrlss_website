// Unsplash helper: photo('1519494026892-80bbd2d6fd0d', 800)
export const photo = (id, w = 1100) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`

// UAE Design System palettes used by the demos
// https://designsystem.gov.ae/guidelines/colour-system
export const AE = {
  white: '#FFFFFF',
  white100: '#FCFCFC',
  white300: '#F2F2F2',
  black50: '#F7F7F7',
  black100: '#E1E3E5',
  black200: '#C3C6CB',
  black600: '#4B4F58',
  black700: '#3E4046',
  black800: '#232528',
  black900: '#1B1D21',
  slate50: '#F8FAFC',
  slate200: '#E2E8F0',
  gold50: '#F9F7ED',
  gold300: '#D7BC6D',
  gold400: '#CBA344',
  gold600: '#92722A',
  gold700: '#7C5E24',
  sea50: '#EFFAFF',
  sea700: '#0073AB',
  sea800: '#00608D',
  fuchsia50: '#FDF4FF',
  fuchsia700: '#A21CAF',
  fuchsia800: '#86198F',
  camel50: '#FFFBEB',
  camel400: '#F8C027',
  camel800: '#904110',
  tech50: '#E7F5FF',
  tech700: '#003CFF',
  tech800: '#002DC2',
}
