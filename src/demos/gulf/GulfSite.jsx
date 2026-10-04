import { useEffect, useMemo, useState } from 'react'
import './GulfSite.css'

/* ------------------------------------------------------------------
   Shared bilingual (English / Arabic) template for Gulf business demos.
   Each demo is just a config file in ./configs. To make a preview for
   a real client, copy a config, change the text, photos, phone and map.
------------------------------------------------------------------- */

const VRLS_WHATSAPP = '919515294733'

const UI = {
  en: {
    services: 'Services',
    reviews: 'Reviews',
    visit: 'Visit us',
    openNow: 'Open now',
    closedNow: 'Closed now',
    closesAt: 'closes at',
    opensToday: 'opens today at',
    opensTomorrow: 'opens tomorrow at',
    opensOn: (day) => `opens ${day} at`,
    today: 'Today',
    closed: 'Closed',
    directions: 'Get directions',
    call: 'Call',
    whatsapp: 'WhatsApp',
    googleReviews: (n) => `${n} Google reviews`,
    hours: 'Opening hours',
    address: 'Address',
    from: 'from',
    reviewsTitle: 'What customers say',
    faqTitle: 'Good to know',
    galleryLabel: 'Photos',
    mapTitle: (name) => `Map showing ${name}`,
    conceptNote:
      'This is a sample website designed by VRLS Solutions. Prices, reviews and contact details are for demonstration only.',
    conceptCta: 'Get a website like this',
    back: 'Back to VRLS Solutions',
    demoMessage: (name) =>
      `Hi VRLS, I saw the ${name} sample website. I would like a website like this for my business.`,
    langButton: 'عربي',
    langLabel: 'اعرض الموقع بالعربية',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    am: 'am',
    pm: 'pm',
    sep: ', ',
  },
  ar: {
    services: 'الخدمات',
    reviews: 'التقييمات',
    visit: 'زورونا',
    openNow: 'مفتوح الآن',
    closedNow: 'مغلق الآن',
    closesAt: 'يغلق الساعة',
    opensToday: 'يفتح اليوم الساعة',
    opensTomorrow: 'يفتح غدًا الساعة',
    opensOn: (day) => `يفتح يوم ${day} الساعة`,
    today: 'اليوم',
    closed: 'مغلق',
    directions: 'الاتجاهات',
    call: 'اتصال',
    whatsapp: 'واتساب',
    googleReviews: (n) => `${n} تقييم على Google`,
    hours: 'ساعات العمل',
    address: 'العنوان',
    from: 'يبدأ من',
    reviewsTitle: 'آراء العملاء',
    faqTitle: 'معلومات تهمك',
    galleryLabel: 'صور',
    mapTitle: (name) => `خريطة موقع ${name}`,
    conceptNote:
      'هذا موقع تجريبي من تصميم VRLS Solutions. الأسعار والتقييمات وبيانات التواصل للعرض فقط.',
    conceptCta: 'احصل على موقع مثل هذا',
    back: 'العودة إلى VRLS Solutions',
    demoMessage: (name) =>
      `مرحبًا VRLS، شاهدت الموقع التجريبي لـ ${name}. أرغب في موقع مشابه لنشاطي التجاري.`,
    langButton: 'English',
    langLabel: 'View the site in English',
    days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    am: 'ص',
    pm: 'م',
    sep: '، ',
  },
}

const ICONS = {
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  shield: <><path d="M12 3l7 3v6c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" /></>,
  card: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 15h4" /></>,
  truck: <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="17.5" r="1.5" /><circle cx="17" cy="17.5" r="1.5" /></>,
  users: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5a3 3 0 0 1 0 6M21 20c0-2.6-1.6-4.8-4-5.6" /></>,
  home: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10M10 20v-5h4v5" /></>,
  spark: <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" /></>,
  car: <><path d="M4 16l1.6-5.2A2 2 0 0 1 7.5 9.3h9a2 2 0 0 1 1.9 1.5L20 16v3H4z" /><circle cx="7.5" cy="16" r="1" /><circle cx="16.5" cy="16" r="1" /></>,
  chat: <><path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z" /><path d="M9 10.5h6M9 13.5h4" /></>,
  route: <><path d="M3 11l18-8-8 18-2-8z" /></>,
  phone: <><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
}

function Icon({ name, size = 20 }) {
  return (
    <svg
      className="gs-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  )
}

function Stars({ value = 5 }) {
  return (
    <span className="gs-stars" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" className={i < Math.round(value) ? 'on' : ''}>
          <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  )
}

/* ---------------- time helpers (opening hours) ---------------- */

const toMin = (s) => {
  const [h, m] = s.split(':').map(Number)
  return h * 60 + m
}

const span = (h) => {
  if (!h) return null
  const o = toMin(h[0])
  let c = toMin(h[1])
  if (c <= o) c += 1440
  return [o, c]
}

function buildWeek(hours) {
  return [0, 1, 2, 3, 4, 5, 6].map((d) => (d in hours ? hours[d] : hours.default))
}

function nowIn(tz) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value]),
  )
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday)
  return { day, min: (Number(parts.hour) % 24) * 60 + Number(parts.minute) }
}

function getStatus(week, tz) {
  const { day, min } = nowIn(tz)
  const y = span(week[(day + 6) % 7])
  if (y && y[1] > 1440 && min < y[1] - 1440) return { open: true, close: y[1] - 1440, day }
  const t = span(week[day])
  if (t && min >= t[0] && min < t[1]) return { open: true, close: t[1] % 1440, day }
  if (t && min < t[0]) return { open: false, inDays: 0, at: t[0], day }
  for (let i = 1; i <= 7; i += 1) {
    const s = span(week[(day + i) % 7])
    if (s) return { open: false, inDays: i, at: s[0], nextDay: (day + i) % 7, day }
  }
  return null
}

function fmtTime(mins, ui) {
  const h24 = Math.floor(mins / 60) % 24
  const m = String(mins % 60).padStart(2, '0')
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  return `${h12}:${m} ${h24 < 12 ? ui.am : ui.pm}`
}

/* ---------------- misc helpers ---------------- */

const pick = (value, lang) =>
  value && typeof value === 'object' && !Array.isArray(value) ? value[lang] ?? value.en : value

function srcSetFor(url) {
  if (!url || !url.includes('images.unsplash.com')) return undefined
  return [700, 1100, 1600].map((w) => `${url.replace(/w=\d+/, `w=${w}`)} ${w}w`).join(', ')
}

function initialLang() {
  try {
    const q = new URLSearchParams(window.location.search).get('lang')
    if (q === 'ar' || q === 'en') return q
    const saved = window.localStorage.getItem('vrls-demo-lang')
    if (saved === 'ar' || saved === 'en') return saved
  } catch {
    /* storage unavailable */
  }
  return 'en'
}

function useFonts(displayFont) {
  useEffect(() => {
    const families = ['family=Readex+Pro:wght@300..700']
    if (displayFont === 'Reem Kufi') families.push('family=Reem+Kufi:wght@400..700')
    const href = `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      document.head.appendChild(link)
    }
  }, [displayFont])
}

/* ---------------- component ---------------- */

export default function GulfSite({ config }) {
  const [lang, setLang] = useState(initialLang)
  const [anim, setAnim] = useState(null)
  const [, setTick] = useState(0)

  const ui = UI[lang]
  const t = (v) => pick(v, lang)
  const { theme, brand, hero, location, contact } = config
  const name = t(brand.name)
  const week = useMemo(() => buildWeek(location.hours), [location.hours])
  const tz = location.timezone || 'Asia/Dubai'
  const status = getStatus(week, tz)

  useFonts(theme.displayFont)

  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), 60000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const prev = { lang: root.lang, dir: root.dir, title: document.title }
    root.lang = lang
    root.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.title = `${name} | ${t(config.category)}`
    return () => {
      root.lang = prev.lang
      root.dir = prev.dir
      document.title = prev.title
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  const switchLang = () => {
    const next = lang === 'en' ? 'ar' : 'en'
    setLang(next)
    setAnim((a) => (a === 'a' ? 'b' : 'a'))
    try {
      window.localStorage.setItem('vrls-demo-lang', next)
      const url = new URL(window.location.href)
      url.searchParams.set('lang', next)
      window.history.replaceState(null, '', url)
    } catch {
      /* ignore */
    }
  }

  const waNumber = contact.whatsapp || VRLS_WHATSAPP
  const waText = config.demo ? ui.demoMessage(name) : t(contact.message)
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`
  const vrlsLink = `https://wa.me/${VRLS_WHATSAPP}?text=${encodeURIComponent(ui.demoMessage(name))}`
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapQuery)}`
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(location.mapQuery)}&hl=${lang}&z=14&output=embed`
  const currency = t(config.currency || { en: 'AED', ar: 'درهم' })

  const price = (item) => {
    if (item.price == null) return null
    const n = Number(item.price).toLocaleString('en-US')
    const amount = lang === 'ar' ? `${n} ${currency}` : `${currency} ${n}`
    const unit = item.unit ? ` ${t(item.unit)}` : ''
    return item.from ? `${ui.from} ${amount}${unit}` : `${amount}${unit}`
  }

  let statusText = null
  if (status) {
    statusText = status.open
      ? `${ui.openNow}${ui.sep}${ui.closesAt} ${fmtTime(status.close, ui)}`
      : `${ui.closedNow}${ui.sep}${
          status.inDays === 0
            ? ui.opensToday
            : status.inDays === 1
              ? ui.opensTomorrow
              : ui.opensOn(ui.days[status.nextDay])
        } ${fmtTime(status.at, ui)}`
  }

  const themeVars = {
    '--paper': theme.paper,
    '--surface': theme.surface,
    '--ink': theme.ink,
    '--muted': theme.muted,
    '--line': theme.line,
    '--accent': theme.accent,
    '--accent-ink': theme.accentInk,
    '--accent-text': theme.accentText || theme.accent,
    '--soft': theme.soft,
    '--star': theme.star || '#B68A35',
    '--shade': theme.shade || (theme.mode === 'dark' ? theme.paper : theme.ink),
    '--star-on-dark': theme.starOnDark || '#CBA344',
    '--radius': theme.radius || '16px',
    '--display': `${theme.displayFont ? `'${theme.displayFont}', ` : ''}'Readex Pro', 'Segoe UI', Tahoma, Arial, sans-serif`,
  }

  const servicesLabel = t(config.services.navLabel) || ui.services
  const heroLayout = theme.heroLayout || 'split'

  const rating = config.rating && (
    <p className="gs-rating">
      <Stars value={config.rating.score} />
      <strong>{config.rating.score.toFixed(1)}</strong>
      <span>{ui.googleReviews(config.rating.count.toLocaleString('en-US'))}</span>
    </p>
  )

  const actions = (
    <div className="gs-actions">
      <a className="gs-btn gs-btn-primary" href={waLink} target="_blank" rel="noreferrer">
        <Icon name="chat" /> {t(contact.cta)}
      </a>
      <a className="gs-btn gs-btn-ghost" href={directions} target="_blank" rel="noreferrer">
        <Icon name="route" /> {ui.directions}
      </a>
    </div>
  )

  return (
    <div
      className={`gs gs-theme-${theme.mode || 'light'}`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      lang={lang}
      style={themeVars}
      data-anim={anim || undefined}
    >
      <header className="gs-top">
        <div className="gs-wrap gs-top-inner">
          <a href="#top" className="gs-brand">
            <span className="gs-mark" aria-hidden="true">{t(brand.mark)}</span>
            <span className="gs-brand-name">{name}</span>
          </a>

          <nav className="gs-nav" aria-label={name}>
            <a href="#services">{servicesLabel}</a>
            <a href="#reviews">{ui.reviews}</a>
            <a href="#visit">{ui.visit}</a>
          </nav>

          <button
            type="button"
            className="gs-lang"
            onClick={switchLang}
            aria-label={ui.langLabel}
            lang={lang === 'en' ? 'ar' : 'en'}
          >
            {ui.langButton}
          </button>
        </div>
      </header>

      <main className="gs-main" id="top">
        <section className={`gs-hero gs-hero-${heroLayout}`}>
          {heroLayout === 'overlay' && (
            <img
              className="gs-hero-bg"
              src={hero.image}
              srcSet={srcSetFor(hero.image)}
              sizes="100vw"
              alt=""
              fetchPriority="high"
            />
          )}

          <div className="gs-wrap gs-hero-grid">
            <div className="gs-hero-copy">
              {statusText && (
                <p className={`gs-status ${status.open ? 'is-open' : 'is-closed'}`}>
                  <span className="gs-dot" aria-hidden="true" />
                  {statusText}
                </p>
              )}
              <h1>{t(hero.title)}</h1>
              <p className="gs-hero-text">{t(hero.text)}</p>
              {actions}
              {rating}
            </div>

            {heroLayout !== 'overlay' && (
              <div className="gs-hero-media">
                <img
                  src={hero.image}
                  srcSet={srcSetFor(hero.image)}
                  sizes="(max-width: 860px) 100vw, 50vw"
                  alt={t(hero.alt) || ''}
                  fetchPriority="high"
                  width="1100"
                  height="1300"
                />
              </div>
            )}
          </div>
        </section>

        <section className="gs-highlights" aria-label={t(config.category)}>
          <ul className="gs-wrap">
            {config.highlights.map((h) => (
              <li key={h.icon + t(h.text)}>
                <span className="gs-hl-icon"><Icon name={h.icon} size={22} /></span>
                <span>{t(h.text)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="gs-section gs-services" id="services">
          <div className="gs-wrap gs-services-grid">
            <div className="gs-services-head">
              <h2>{t(config.services.title)}</h2>
              <p>{t(config.services.intro)}</p>
            </div>

            <div className="gs-groups">
              {config.services.groups.map((group) => (
                <div className="gs-group" key={t(group.name)}>
                  <h3>{t(group.name)}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li className="gs-item" key={t(item.name)}>
                        <div className="gs-item-copy">
                          <span className="gs-item-name">{t(item.name)}</span>
                          {item.note && <span className="gs-item-note">{t(item.note)}</span>}
                        </div>
                        {price(item) && <span className="gs-item-price">{price(item)}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {config.gallery?.length > 0 && (
          <section className="gs-gallery-section" aria-label={ui.galleryLabel}>
            <div className="gs-gallery" tabIndex={0}>
              {config.gallery.map((src) => (
                <img key={src} src={src} alt="" loading="lazy" decoding="async" width="600" height="750" />
              ))}
            </div>
          </section>
        )}

        <section className="gs-section gs-reviews" id="reviews">
          <div className="gs-wrap">
            <div className="gs-reviews-head">
              <h2>{ui.reviewsTitle}</h2>
              {rating}
            </div>
            <div className="gs-review-list">
              {config.reviews.map((r) => (
                <figure className="gs-review" key={r.name}>
                  <Stars value={r.stars || 5} />
                  <blockquote>{t(r.text)}</blockquote>
                  <figcaption>{t(r.name)}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="gs-section gs-visit" id="visit">
          <div className="gs-wrap gs-visit-grid">
            <div className="gs-visit-info">
              <h2>{ui.visit}</h2>

              <div className="gs-visit-block">
                <h3>{ui.address}</h3>
                <p className="gs-address">
                  <Icon name="pin" /> <span>{t(location.address)}</span>
                </p>
              </div>

              <div className="gs-visit-block">
                <h3>{ui.hours}</h3>
                <table className="gs-hours">
                  <tbody>
                    {[1, 2, 3, 4, 5, 6, 0].map((d) => {
                      const h = week[d]
                      const isToday = status && status.day === d
                      return (
                        <tr key={d} className={isToday ? 'is-today' : undefined}>
                          <th scope="row">
                            {ui.days[d]}
                            {isToday && <span className="gs-today">{ui.today}</span>}
                          </th>
                          <td>
                            {h ? `${fmtTime(toMin(h[0]), ui)} – ${fmtTime(toMin(h[1]), ui)}` : ui.closed}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {actions}
            </div>

            <div className="gs-map">
              <iframe
                title={ui.mapTitle(name)}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {config.faq?.length > 0 && (
          <section className="gs-section gs-faq">
            <div className="gs-wrap gs-faq-grid">
              <h2>{ui.faqTitle}</h2>
              <div className="gs-faq-list">
                {config.faq.map((f) => (
                  <details key={t(f.q)}>
                    <summary>
                      <span>{t(f.q)}</span>
                      <Icon name="plus" />
                    </summary>
                    <p>{t(f.a)}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="gs-footer">
        <div className="gs-wrap">
          <div className="gs-footer-brand">
            <span className="gs-mark" aria-hidden="true">{t(brand.mark)}</span>
            <div>
              <strong>{name}</strong>
              <span>{t(location.area)}</span>
            </div>
          </div>

          {config.demo && (
            <div className="gs-concept">
              <p>{ui.conceptNote}</p>
              <div className="gs-concept-actions">
                <a className="gs-btn gs-btn-primary" href={vrlsLink} target="_blank" rel="noreferrer">
                  <Icon name="chat" /> {ui.conceptCta}
                </a>
                <a className="gs-back" href="/">{ui.back}</a>
              </div>
            </div>
          )}
        </div>
      </footer>

      <a className="gs-fab" href={waLink} target="_blank" rel="noreferrer" aria-label={t(contact.cta)}>
        <Icon name="chat" size={26} />
      </a>

      <div className="gs-mobilebar">
        <a className="gs-btn gs-btn-primary" href={waLink} target="_blank" rel="noreferrer">
          <Icon name="chat" /> {ui.whatsapp}
        </a>
        {contact.phone ? (
          <a className="gs-btn gs-btn-ghost" href={`tel:${contact.phone.replace(/\s/g, '')}`}>
            <Icon name="phone" /> {ui.call}
          </a>
        ) : (
          <a className="gs-btn gs-btn-ghost" href={directions} target="_blank" rel="noreferrer">
            <Icon name="route" /> {ui.directions}
          </a>
        )}
      </div>
    </div>
  )
}
