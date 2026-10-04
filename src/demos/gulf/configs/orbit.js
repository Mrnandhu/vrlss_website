import { AE, photo } from './photo'

// Fuchsia palette: bright, feminine, modern
export default {
  demo: true,
  theme: {
    heroLayout: 'split-reverse',
    paper: AE.white100,
    surface: AE.white,
    ink: AE.black800,
    muted: AE.black600,
    line: AE.black100,
    accent: AE.fuchsia700,
    accentInk: AE.white,
    accentText: AE.fuchsia800,
    soft: AE.fuchsia50,
    radius: '28px',
  },
  brand: {
    name: { en: 'Orbit Beauty Studio', ar: 'أوربت بيوتي ستوديو' },
    mark: { en: 'O', ar: 'أ' },
  },
  category: { en: 'Ladies salon', ar: 'صالون نسائي' },
  hero: {
    image: photo('1560066984-138dadb4c035'),
    alt: { en: 'Orbit Beauty Studio salon', ar: 'صالون أوربت بيوتي ستوديو' },
    title: {
      en: 'Hair, nails and beauty in Al Barsha, by women for women.',
      ar: 'العناية بالشعر والأظافر والجمال في البرشاء، بأيدٍ نسائية.',
    },
    text: {
      en: 'A private ladies-only studio with experienced stylists. Book your time on WhatsApp, or ask for our home service.',
      ar: 'استوديو خاص للسيدات فقط مع خبيرات تجميل محترفات. احجزي موعدك عبر واتساب أو اطلبي خدمة المنزل.',
    },
  },
  rating: { score: 4.9, count: 268 },
  highlights: [
    { icon: 'users', text: { en: 'Ladies only, all-female team', ar: 'للسيدات فقط، طاقم نسائي بالكامل' } },
    { icon: 'home', text: { en: 'Home service available', ar: 'خدمة منزلية متوفرة' } },
    { icon: 'card', text: { en: 'Card payments accepted', ar: 'نقبل الدفع بالبطاقة' } },
  ],
  services: {
    title: { en: 'Services and prices', ar: 'الخدمات والأسعار' },
    intro: {
      en: 'Final prices depend on hair length. We confirm before we start.',
      ar: 'السعر النهائي يعتمد على طول الشعر، ونؤكده قبل البدء.',
    },
    groups: [
      {
        name: { en: 'Hair', ar: 'الشعر' },
        items: [
          { name: { en: 'Haircut and blow-dry', ar: 'قص وتصفيف الشعر' }, price: 120 },
          { name: { en: 'Hair colour', ar: 'صبغة الشعر' }, price: 250, from: true },
          { name: { en: 'Keratin treatment', ar: 'علاج الكيراتين' }, price: 600, from: true },
        ],
      },
      {
        name: { en: 'Nails', ar: 'الأظافر' },
        items: [
          { name: { en: 'Classic manicure', ar: 'مانيكير كلاسيك' }, price: 60 },
          { name: { en: 'Classic pedicure', ar: 'باديكير كلاسيك' }, price: 80 },
          { name: { en: 'Gel polish', ar: 'طلاء جل' }, price: 90 },
        ],
      },
      {
        name: { en: 'Beauty', ar: 'التجميل' },
        items: [
          { name: { en: 'Eyebrow threading', ar: 'تشذيب الحواجب بالخيط' }, price: 25 },
          { name: { en: 'Moroccan bath', ar: 'حمام مغربي' }, price: 180 },
          {
            name: { en: 'Bridal makeup', ar: 'مكياج العروس' },
            note: { en: 'Includes a trial session', ar: 'يشمل جلسة تجريبية' },
            price: 1200,
            from: true,
          },
        ],
      },
    ],
  },
  gallery: [
    photo('1522337360788-8b13dee7a37e', 700),
    photo('1521590832167-7bcbfaa6381f', 700),
    photo('1580618672591-eb180b1a973f', 700),
    photo('1562322140-8baeececf3df', 700),
    photo('1595476108010-b4d1f102b1b1', 700),
  ],
  reviews: [
    {
      name: { en: 'Noura A.', ar: 'نورة أ.' },
      text: {
        en: 'A lovely team and a calm, private space. My colour came out exactly as I wanted.',
        ar: 'فريق رائع ومكان هادئ وخاص. صبغتي كانت كما أردت تمامًا.',
      },
    },
    {
      name: { en: 'Priya S.', ar: 'بريا س.' },
      text: {
        en: 'Booked a home manicure on WhatsApp and they arrived right on time.',
        ar: 'حجزت مانيكير في المنزل عبر واتساب ووصلن في الموعد تمامًا.',
      },
    },
    {
      name: { en: 'Hessa M.', ar: 'حصة م.' },
      text: {
        en: 'They did my bridal makeup and everyone asked who my artist was.',
        ar: 'جهزن مكياج زفافي والجميع سألني عن خبيرة التجميل.',
      },
    },
  ],
  faq: [
    {
      q: { en: 'Is the salon for ladies only?', ar: 'هل الصالون للسيدات فقط؟' },
      a: {
        en: 'Yes. Our whole team is female and the studio is fully private.',
        ar: 'نعم، فريقنا بالكامل من السيدات والاستوديو خاص تمامًا.',
      },
    },
    {
      q: { en: 'Which areas does home service cover?', ar: 'ما المناطق التي تشملها خدمة المنزل؟' },
      a: {
        en: 'Al Barsha, Jumeirah, Dubai Marina and nearby areas, with a minimum booking of AED 200.',
        ar: 'البرشاء وجميرا ودبي مارينا والمناطق القريبة، بحد أدنى للحجز 200 درهم.',
      },
    },
    {
      q: { en: 'Can I book for a group?', ar: 'هل يمكن الحجز لمجموعة؟' },
      a: {
        en: 'Yes, for brides and events. Message us with the date and number of guests.',
        ar: 'نعم، للعرائس والمناسبات. راسلينا بالتاريخ وعدد الحاضرات.',
      },
    },
  ],
  location: {
    area: { en: 'Al Barsha 1, Dubai', ar: 'البرشاء 1، دبي' },
    address: { en: 'Villa 14, Street 23, Al Barsha 1, Dubai', ar: 'فيلا 14، شارع 23، البرشاء 1، دبي' },
    mapQuery: 'Al Barsha 1, Dubai',
    timezone: 'Asia/Dubai',
    hours: { default: ['10:00', '22:00'], 5: ['14:00', '22:00'] },
  },
  contact: {
    cta: { en: 'Book on WhatsApp', ar: 'احجزي عبر واتساب' },
  },
}
