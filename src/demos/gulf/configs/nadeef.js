import { AE, photo } from './photo'

// Tech Blue palette: fresh, hygienic, dependable
export default {
  demo: true,
  theme: {
    heroLayout: 'split',
    paper: AE.slate50,
    surface: AE.white,
    ink: AE.black800,
    muted: AE.black600,
    line: AE.slate200,
    accent: AE.tech700,
    accentInk: AE.white,
    accentText: AE.tech800,
    soft: AE.tech50,
    radius: '14px',
  },
  brand: {
    name: { en: 'Nadeef Home Services', ar: 'نظيف لخدمات المنازل' },
    mark: { en: 'N', ar: 'ن' },
  },
  category: { en: 'Cleaning and maintenance', ar: 'التنظيف والصيانة' },
  hero: {
    image: photo('1600566753190-17f0baa2a6c3'),
    alt: { en: 'A freshly cleaned living room', ar: 'غرفة معيشة نظيفة ومرتبة' },
    title: {
      en: 'A cleaner, cooler home in Abu Dhabi, booked in one message.',
      ar: 'منزل أنظف وأبرد في أبوظبي، احجز برسالة واحدة.',
    },
    text: {
      en: 'Trained cleaners, AC technicians and handymen for apartments and villas. Tell us what you need on WhatsApp and we confirm a time within minutes.',
      ar: 'عمال نظافة مدربون وفنيو تكييف وصيانة للشقق والفلل. أخبرنا بما تحتاجه عبر واتساب ونؤكد لك الموعد خلال دقائق.',
    },
  },
  rating: { score: 4.8, count: 640 },
  highlights: [
    { icon: 'shield', text: { en: 'Trained, background-checked staff', ar: 'طاقم مدرب وتم التحقق منه' } },
    { icon: 'spark', text: { en: 'Cleaning materials included', ar: 'مواد التنظيف مشمولة' } },
    { icon: 'clock', text: { en: 'Same-day booking available', ar: 'الحجز في نفس اليوم متاح' } },
  ],
  services: {
    title: { en: 'Services and prices', ar: 'الخدمات والأسعار' },
    intro: {
      en: 'No hidden charges. Prices include VAT.',
      ar: 'بدون رسوم خفية. الأسعار شاملة ضريبة القيمة المضافة.',
    },
    groups: [
      {
        name: { en: 'Cleaning', ar: 'التنظيف' },
        items: [
          {
            name: { en: 'Hourly home cleaning', ar: 'تنظيف المنزل بالساعة' },
            note: { en: 'Minimum 3 hours, materials included', ar: 'حد أدنى 3 ساعات، شامل المواد' },
            price: 40,
            unit: { en: 'per hour', ar: 'للساعة' },
          },
          {
            name: { en: 'Deep cleaning, 1-bedroom apartment', ar: 'تنظيف عميق لشقة غرفة نوم واحدة' },
            price: 450,
            from: true,
          },
          { name: { en: 'Move-in or move-out cleaning', ar: 'تنظيف عند الانتقال' }, price: 700, from: true },
          { name: { en: 'Sofa and carpet shampoo', ar: 'تنظيف الكنب والسجاد بالشامبو' }, price: 120, from: true },
        ],
      },
      {
        name: { en: 'Maintenance', ar: 'الصيانة' },
        items: [
          {
            name: { en: 'AC service, per unit', ar: 'صيانة المكيف، للوحدة' },
            note: { en: 'Filter, coil and drain cleaning', ar: 'تنظيف الفلتر والملف ومجرى التصريف' },
            price: 99,
          },
          {
            name: { en: 'Handyman visit', ar: 'زيارة فني صيانة' },
            note: {
              en: 'First hour, for plumbing, electrical or fitting work',
              ar: 'الساعة الأولى، لأعمال السباكة أو الكهرباء أو التركيب',
            },
            price: 120,
          },
          { name: { en: 'Pest control, apartment', ar: 'مكافحة الحشرات، شقة' }, price: 250, from: true },
        ],
      },
    ],
  },
  gallery: [
    photo('1600585154340-be6161a56a0c', 700),
    photo('1600607687920-4e2a09cf159d', 700),
    photo('1600607688969-a5bfcd646154', 700),
    photo('1600607687939-ce8a6c25118c', 700),
  ],
  reviews: [
    {
      name: { en: 'Sara M.', ar: 'سارة م.' },
      text: {
        en: 'The deep clean before we moved in was spotless, even inside the kitchen cabinets.',
        ar: 'التنظيف العميق قبل انتقالنا كان مثاليًا، حتى داخل خزائن المطبخ.',
      },
    },
    {
      name: { en: 'Abdullah F.', ar: 'عبدالله ف.' },
      text: {
        en: 'They serviced four AC units in one visit and the difference was immediate.',
        ar: 'صانوا أربعة مكيفات في زيارة واحدة والفرق كان واضحًا فورًا.',
      },
    },
    {
      name: { en: 'Deepa N.', ar: 'ديبا ن.' },
      text: {
        en: 'The same cleaner every week, always on time. Booking on WhatsApp is so easy.',
        ar: 'نفس العاملة كل أسبوع، وفي الموعد دائمًا. والحجز عبر واتساب سهل جدًا.',
      },
    },
  ],
  faq: [
    {
      q: { en: 'Do I need to provide cleaning materials?', ar: 'هل أحتاج إلى توفير مواد التنظيف؟' },
      a: {
        en: 'No. Our team brings all materials and equipment.',
        ar: 'لا، يحضر فريقنا جميع المواد والمعدات.',
      },
    },
    {
      q: { en: 'Which areas do you cover?', ar: 'ما المناطق التي تغطونها؟' },
      a: {
        en: 'Abu Dhabi city, Khalifa City, Al Reem Island and Yas Island.',
        ar: 'مدينة أبوظبي ومدينة خليفة وجزيرة الريم وجزيرة ياس.',
      },
    },
    {
      q: { en: 'Can I book a weekly cleaner?', ar: 'هل يمكن حجز عاملة أسبوعيًا؟' },
      a: {
        en: 'Yes. Weekly bookings get the same cleaner and a lower hourly rate.',
        ar: 'نعم، الحجز الأسبوعي يضمن نفس العاملة وسعرًا أقل للساعة.',
      },
    },
  ],
  location: {
    area: { en: 'Khalifa City, Abu Dhabi', ar: 'مدينة خليفة، أبوظبي' },
    address: { en: 'Office 12, Khalifa City Market, Abu Dhabi', ar: 'مكتب 12، سوق مدينة خليفة، أبوظبي' },
    mapQuery: 'Khalifa City, Abu Dhabi',
    timezone: 'Asia/Dubai',
    hours: { default: ['08:00', '21:00'] },
  },
  contact: {
    cta: { en: 'Book on WhatsApp', ar: 'احجز عبر واتساب' },
  },
}
