import { AE, photo } from './photo'

// Sea Blue palette: calm, clinical, trustworthy
export default {
  demo: true,
  theme: {
    heroLayout: 'split',
    paper: AE.slate50,
    surface: AE.white,
    ink: AE.black800,
    muted: AE.black600,
    line: AE.slate200,
    accent: AE.sea700,
    accentInk: AE.white,
    accentText: AE.sea800,
    soft: AE.sea50,
    radius: '18px',
  },
  brand: {
    name: { en: 'Medora Clinic', ar: 'عيادة ميدورا' },
    mark: { en: 'M', ar: 'م' },
  },
  category: { en: 'Family medical centre', ar: 'مركز طبي للعائلة' },
  hero: {
    image: photo('1519494026892-80bbd2d6fd0d'),
    alt: { en: 'Inside Medora Clinic', ar: 'داخل عيادة ميدورا' },
    title: {
      en: 'Family doctors in Al Nahda, open every day.',
      ar: 'أطباء للعائلة في النهدة، نستقبلكم يوميًا.',
    },
    text: {
      en: 'General practice, children’s care, dental and lab tests under one roof. Walk in or book on WhatsApp. Most insurance cards accepted.',
      ar: 'طب عام ورعاية الأطفال وطب الأسنان والتحاليل المخبرية في مكان واحد. احضر مباشرة أو احجز عبر واتساب، ونقبل معظم بطاقات التأمين.',
    },
  },
  rating: { score: 4.8, count: 412 },
  highlights: [
    { icon: 'shield', text: { en: 'Most insurance cards accepted', ar: 'نقبل معظم بطاقات التأمين' } },
    { icon: 'clock', text: { en: 'Same-day appointments', ar: 'مواعيد في نفس اليوم' } },
    {
      icon: 'users',
      text: {
        en: 'Doctors speak Arabic, English, Hindi and Malayalam',
        ar: 'أطباؤنا يتحدثون العربية والإنجليزية والهندية والمالايالامية',
      },
    },
  ],
  services: {
    title: { en: 'Services and prices', ar: 'الخدمات والأسعار' },
    intro: {
      en: 'Clear prices before you visit. Insurance patients pay only their co-payment.',
      ar: 'أسعار واضحة قبل زيارتك. مرضى التأمين يدفعون نسبة المشاركة فقط.',
    },
    groups: [
      {
        name: { en: 'General and family medicine', ar: 'الطب العام وطب الأسرة' },
        items: [
          {
            name: { en: 'GP consultation', ar: 'استشارة طبيب عام' },
            note: { en: 'Includes a follow-up within 7 days', ar: 'تشمل مراجعة خلال 7 أيام' },
            price: 150,
          },
          {
            name: { en: 'Children’s consultation', ar: 'استشارة طب الأطفال' },
            note: { en: 'Paediatrician, newborn to 14 years', ar: 'طبيب أطفال، من حديثي الولادة حتى 14 عامًا' },
            price: 200,
          },
          {
            name: { en: 'Specialist consultation', ar: 'استشارة أخصائي' },
            note: {
              en: 'Internal medicine, gynaecology, dermatology',
              ar: 'الباطنية، النساء والولادة، الجلدية',
            },
            price: 300,
            from: true,
          },
        ],
      },
      {
        name: { en: 'Lab tests', ar: 'التحاليل المخبرية' },
        items: [
          {
            name: { en: 'Full body check-up', ar: 'فحص شامل للجسم' },
            note: { en: '60+ blood tests, results in 24 hours', ar: 'أكثر من 60 تحليلًا للدم، والنتائج خلال 24 ساعة' },
            price: 299,
          },
          { name: { en: 'Vitamin D test', ar: 'تحليل فيتامين د' }, price: 99 },
          { name: { en: 'ECG', ar: 'تخطيط القلب' }, price: 150 },
        ],
      },
      {
        name: { en: 'Dental', ar: 'طب الأسنان' },
        items: [
          { name: { en: 'Check-up and cleaning', ar: 'فحص وتنظيف الأسنان' }, price: 199 },
          {
            name: { en: 'Teeth whitening', ar: 'تبييض الأسنان' },
            note: { en: 'In-clinic, single session', ar: 'في العيادة، جلسة واحدة' },
            price: 999,
          },
        ],
      },
    ],
  },
  gallery: [
    photo('1586773860418-d37222d8fce3', 700),
    photo('1576091160399-112ba8d25d1d', 700),
    photo('1516549655169-df83a0774514', 700),
    photo('1505751172876-fa1923c5c528', 700),
  ],
  reviews: [
    {
      name: { en: 'Fatima A.', ar: 'فاطمة أ.' },
      text: {
        en: 'The doctor took time to explain everything, and I was in and out in 40 minutes.',
        ar: 'شرح الطبيب كل شيء بهدوء، وانتهت زيارتي خلال 40 دقيقة.',
      },
    },
    {
      name: { en: 'Rahul M.', ar: 'راهول م.' },
      text: {
        en: 'Booked on WhatsApp in the morning and saw the paediatrician the same afternoon.',
        ar: 'حجزت عبر واتساب صباحًا وقابلنا طبيب الأطفال في نفس اليوم.',
      },
    },
    {
      name: { en: 'Omar K.', ar: 'عمر ك.' },
      text: {
        en: 'Clean clinic, friendly reception, and they handled my insurance directly.',
        ar: 'عيادة نظيفة واستقبال لطيف، وتعاملوا مع التأمين مباشرة.',
      },
    },
  ],
  faq: [
    {
      q: { en: 'Which insurance cards do you accept?', ar: 'ما بطاقات التأمين التي تقبلونها؟' },
      a: {
        en: 'We accept most major insurance networks in the UAE. Send a photo of your card on WhatsApp and we will confirm before your visit.',
        ar: 'نقبل معظم شبكات التأمين الرئيسية في الإمارات. أرسل صورة بطاقتك عبر واتساب وسنؤكد لك قبل زيارتك.',
      },
    },
    {
      q: { en: 'Do I need an appointment?', ar: 'هل أحتاج إلى موعد؟' },
      a: {
        en: 'Walk-ins are welcome. Booking on WhatsApp means a shorter wait.',
        ar: 'نستقبل المراجعين بدون موعد، والحجز عبر واتساب يقلل وقت الانتظار.',
      },
    },
    {
      q: { en: 'Is there parking?', ar: 'هل يتوفر موقف للسيارات؟' },
      a: {
        en: 'Yes, free parking is available in front of the building.',
        ar: 'نعم، يتوفر موقف مجاني أمام المبنى.',
      },
    },
  ],
  location: {
    area: { en: 'Al Nahda 2, Dubai', ar: 'النهدة 2، دبي' },
    address: {
      en: 'Ground floor, Al Nahda Plaza, Al Nahda 2, Dubai',
      ar: 'الطابق الأرضي، النهدة بلازا، النهدة 2، دبي',
    },
    mapQuery: 'Al Nahda 2, Dubai',
    timezone: 'Asia/Dubai',
    hours: { default: ['09:00', '22:00'], 5: ['14:00', '22:00'] },
  },
  contact: {
    cta: { en: 'Book on WhatsApp', ar: 'احجز عبر واتساب' },
  },
}
