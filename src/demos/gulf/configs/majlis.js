import { AE, photo } from './photo'

// AEGold on AEBlack: warm, traditional, evening dining
export default {
  demo: true,
  theme: {
    mode: 'dark',
    heroLayout: 'overlay',
    displayFont: 'Reem Kufi',
    paper: AE.black900,
    surface: AE.black800,
    ink: AE.white100,
    muted: AE.black200,
    line: AE.black700,
    accent: AE.gold600,
    accentInk: AE.white,
    accentText: AE.gold300,
    soft: AE.black700,
    star: AE.gold400,
    starOnDark: AE.gold400,
    radius: '8px',
  },
  brand: {
    name: { en: 'Majlis Kitchen', ar: 'مطبخ المجلس' },
    mark: { en: 'M', ar: 'م' },
  },
  category: { en: 'Arabic and Indian restaurant', ar: 'مطعم عربي وهندي' },
  hero: {
    image: photo('1517248135467-4c7edcad34c4', 1600),
    title: {
      en: 'Mandi, grills and biryani, fresh from our kitchen in Al Majaz.',
      ar: 'مندي ومشاوي وبرياني، طازجة من مطبخنا في المجاز.',
    },
    text: {
      en: 'Family dining with a private majlis, breakfast from 7 am, and delivery across Sharjah until 1 am.',
      ar: 'جلسات عائلية ومجلس خاص، فطور من الساعة 7 صباحًا، وتوصيل في الشارقة حتى الساعة 1 بعد منتصف الليل.',
    },
  },
  rating: { score: 4.6, count: 1280 },
  highlights: [
    { icon: 'truck', text: { en: 'Free delivery within 3 km', ar: 'توصيل مجاني ضمن 3 كم' } },
    { icon: 'users', text: { en: 'Family section and private majlis', ar: 'قسم للعائلات ومجلس خاص' } },
    { icon: 'clock', text: { en: 'Open daily until 1 am', ar: 'مفتوح يوميًا حتى 1 بعد منتصف الليل' } },
  ],
  services: {
    navLabel: { en: 'Menu', ar: 'القائمة' },
    title: { en: 'Menu', ar: 'قائمة الطعام' },
    intro: {
      en: 'Prices include VAT. Ask about family platters for 4 to 10 people.',
      ar: 'الأسعار شاملة ضريبة القيمة المضافة. اسألوا عن صواني العائلة من 4 إلى 10 أشخاص.',
    },
    groups: [
      {
        name: { en: 'Breakfast', ar: 'الفطور' },
        items: [
          { name: { en: 'Shakshuka with fresh bread', ar: 'شكشوكة مع خبز طازج' }, price: 28 },
          { name: { en: 'Foul medames', ar: 'فول مدمس' }, price: 18 },
          { name: { en: 'Masala omelette with paratha', ar: 'أومليت ماسالا مع براتا' }, price: 16 },
        ],
      },
      {
        name: { en: 'Grills and mains', ar: 'المشاوي والأطباق الرئيسية' },
        items: [
          {
            name: { en: 'Chicken mandi', ar: 'مندي دجاج' },
            note: { en: 'Half chicken, mandi rice, salad and sauce', ar: 'نصف دجاجة مع رز مندي وسلطة وصلصة' },
            price: 38,
          },
          {
            name: { en: 'Mixed grill platter', ar: 'صحن مشاوي مشكلة' },
            note: {
              en: 'Kebab, shish tawook and lamb chops for two',
              ar: 'كباب وشيش طاووق وريش غنم لشخصين',
            },
            price: 75,
          },
          { name: { en: 'Chicken biryani', ar: 'برياني دجاج' }, price: 32 },
          { name: { en: 'Lamb ouzi', ar: 'قوزي لحم' }, price: 65 },
        ],
      },
      {
        name: { en: 'Desserts and drinks', ar: 'الحلويات والمشروبات' },
        items: [
          { name: { en: 'Kunafa', ar: 'كنافة' }, price: 22 },
          { name: { en: 'Umm Ali', ar: 'أم علي' }, price: 20 },
          { name: { en: 'Karak chai', ar: 'شاي كرك' }, price: 5 },
          { name: { en: 'Fresh lime and mint', ar: 'ليمون بالنعناع' }, price: 14 },
        ],
      },
    ],
  },
  gallery: [
    photo('1414235077428-338989a2e8c0', 700),
    photo('1559339352-11d035aa65de', 700),
    photo('1544148103-0773bf10d330', 700),
    photo('1498654896293-37aacf113fd9', 700),
    photo('1515003197210-e0cd71810b5f', 700),
  ],
  reviews: [
    {
      name: { en: 'Khalid S.', ar: 'خالد س.' },
      text: {
        en: 'The best mandi we have had in Sharjah, and the majlis is perfect for family dinners.',
        ar: 'أفضل مندي جربناه في الشارقة، والمجلس مثالي لعشاء العائلة.',
      },
    },
    {
      name: { en: 'Anjali R.', ar: 'أنجلي ر.' },
      text: {
        en: 'Ordered biryani on WhatsApp at midnight and it arrived hot in 25 minutes.',
        ar: 'طلبت برياني عبر واتساب في منتصف الليل ووصل ساخنًا خلال 25 دقيقة.',
      },
    },
    {
      name: { en: 'Mariam H.', ar: 'مريم ح.' },
      text: {
        en: 'Generous portions, and the karak is excellent.',
        ar: 'كميات سخية، والكرك ممتاز.',
      },
    },
  ],
  faq: [
    {
      q: { en: 'Can I book the private majlis?', ar: 'هل يمكن حجز المجلس الخاص؟' },
      a: {
        en: 'Yes, for groups of 8 to 20. Send the date and number of guests on WhatsApp.',
        ar: 'نعم، للمجموعات من 8 إلى 20 شخصًا. أرسلوا التاريخ وعدد الضيوف عبر واتساب.',
      },
    },
    {
      q: { en: 'Do you cater for events?', ar: 'هل تقدمون خدمة الضيافة للمناسبات؟' },
      a: {
        en: 'We prepare mandi and biryani platters for gatherings, with 24 hours notice.',
        ar: 'نجهز صواني المندي والبرياني للمناسبات بطلب مسبق قبل 24 ساعة.',
      },
    },
    {
      q: { en: 'Where do you deliver?', ar: 'إلى أين توصلون؟' },
      a: {
        en: 'Free within 3 km of Al Majaz, and across Sharjah for a small fee.',
        ar: 'مجانًا ضمن 3 كم من المجاز، وإلى جميع مناطق الشارقة برسوم بسيطة.',
      },
    },
  ],
  location: {
    area: { en: 'Al Majaz 2, Sharjah', ar: 'المجاز 2، الشارقة' },
    address: { en: 'Corniche Street, Al Majaz 2, Sharjah', ar: 'شارع الكورنيش، المجاز 2، الشارقة' },
    mapQuery: 'Al Majaz 2, Sharjah',
    timezone: 'Asia/Dubai',
    hours: { default: ['07:00', '01:00'] },
  },
  contact: {
    cta: { en: 'Order on WhatsApp', ar: 'اطلب عبر واتساب' },
  },
}
