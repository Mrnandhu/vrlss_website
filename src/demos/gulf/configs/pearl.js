import { AE, photo } from './photo'

// Free preview for Pearl of Muscat Ladies Beauty Salon (Al Ghubrah, Muscat)
// Prices are placeholders until the salon sends its real price list.
export default {
  preview: true,
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
    name: { en: 'Pearl of Muscat', ar: 'لؤلؤة مسقط' },
    mark: { en: 'P', ar: 'ل' },
  },
  category: { en: 'Ladies beauty salon', ar: 'صالون تجميل نسائي' },
  currency: { en: 'OMR', ar: 'ر.ع.' },
  hero: {
    image: photo('1560066984-138dadb4c035'),
    alt: { en: 'Pearl of Muscat Ladies Beauty Salon', ar: 'صالون لؤلؤة مسقط للسيدات' },
    title: {
      en: 'The final destination of beauty, in Al Ghubrah.',
      ar: 'وجهتك الأولى للجمال في الغبرة.',
    },
    text: {
      en: 'A ladies-only salon with a hair specialist, open every day from 10 am to 10 pm. We work by appointment, so book your time on WhatsApp.',
      ar: 'صالون للسيدات فقط مع أخصائية شعر، مفتوح يوميًا من 10 صباحًا حتى 10 مساءً. نعمل بالحجز المسبق، فاحجزي موعدك عبر واتساب.',
    },
  },
  highlights: [
    { icon: 'users', text: { en: 'Ladies only', ar: 'للسيدات فقط' } },
    { icon: 'spark', text: { en: 'Hair specialist available', ar: 'أخصائية شعر متوفرة' } },
    { icon: 'clock', text: { en: 'Open daily, by appointment', ar: 'مفتوح يوميًا بالحجز المسبق' } },
  ],
  services: {
    title: { en: 'Services and prices', ar: 'الخدمات والأسعار' },
    intro: {
      en: 'Book ahead on WhatsApp. Final prices depend on hair length and are confirmed before we start.',
      ar: 'احجزي مسبقًا عبر واتساب. السعر النهائي يعتمد على طول الشعر ونؤكده قبل البدء.',
    },
    groups: [
      {
        name: { en: 'Hair', ar: 'الشعر' },
        items: [
          { name: { en: 'Haircut and blow-dry', ar: 'قص وتصفيف الشعر' }, price: 8, from: true },
          { name: { en: 'Hair colour', ar: 'صبغة الشعر' }, price: 15, from: true },
          { name: { en: 'Keratin and protein treatment', ar: 'علاج الكيراتين والبروتين' }, price: 35, from: true },
          { name: { en: 'Hair spa', ar: 'حمام زيت للشعر' }, price: 10, from: true },
        ],
      },
      {
        name: { en: 'Nails', ar: 'الأظافر' },
        items: [
          { name: { en: 'Manicure', ar: 'مانيكير' }, price: 5 },
          { name: { en: 'Pedicure', ar: 'باديكير' }, price: 7 },
          { name: { en: 'Gel polish', ar: 'طلاء جل' }, price: 8 },
        ],
      },
      {
        name: { en: 'Beauty', ar: 'التجميل' },
        items: [
          { name: { en: 'Eyebrow threading', ar: 'تشذيب الحواجب بالخيط' }, price: 2 },
          { name: { en: 'Facial', ar: 'تنظيف البشرة' }, price: 12, from: true },
          { name: { en: 'Henna', ar: 'حناء' }, price: 5, from: true },
          { name: { en: 'Bridal makeup', ar: 'مكياج العروس' }, price: 60, from: true },
        ],
      },
    ],
  },
  gallery: [
    photo('1522337360788-8b13dee7a37e', 700),
    photo('1521590832167-7bcbfaa6381f', 700),
    photo('1580618672591-eb180b1a973f', 700),
    photo('1562322140-8baeececf3df', 700),
  ],
  reviews: [],
  faq: [
    {
      q: { en: 'Do I need to book in advance?', ar: 'هل أحتاج إلى حجز مسبق؟' },
      a: {
        en: 'Yes, we work by appointment only. Message us on WhatsApp with the service and time you prefer.',
        ar: 'نعم، نعمل بالحجز المسبق فقط. راسلينا عبر واتساب بالخدمة والوقت المناسب لك.',
      },
    },
    {
      q: { en: 'Is the salon for ladies only?', ar: 'هل الصالون للسيدات فقط؟' },
      a: { en: 'Yes, Pearl of Muscat is a ladies-only salon.', ar: 'نعم، صالون لؤلؤة مسقط للسيدات فقط.' },
    },
    {
      q: { en: 'Where are you located?', ar: 'أين يقع الصالون؟' },
      a: {
        en: 'First floor, Flat No. 16, Dukanah Cafe Building, Al Ghubrah, Muscat.',
        ar: 'الطابق الأول، شقة رقم 16، مبنى مقهى دكانة، الغبرة، مسقط.',
      },
    },
  ],
  location: {
    area: { en: 'Al Ghubrah, Muscat', ar: 'الغبرة، مسقط' },
    address: {
      en: 'Dukanah Cafe Building, First Floor, Flat No. 16, Al Ghubrah, Muscat',
      ar: 'مبنى مقهى دكانة، الطابق الأول، شقة رقم 16، الغبرة، مسقط',
    },
    mapQuery: 'Pearl of Muscat Ladies Beauty Salon, Al Ghubrah, Muscat',
    timezone: 'Asia/Muscat',
    hours: { default: ['10:00', '22:00'] },
  },
  contact: {
    cta: { en: 'Book on WhatsApp', ar: 'احجزي عبر واتساب' },
  },
}
