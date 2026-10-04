import { AE, photo } from './photo'

// Camel Yellow on AEBlack neutrals: workshop, safety, energy
export default {
  demo: true,
  theme: {
    heroLayout: 'overlay',
    paper: AE.white300,
    surface: AE.white,
    ink: AE.black900,
    muted: AE.black600,
    line: AE.black100,
    accent: AE.camel400,
    accentInk: AE.black900,
    accentText: AE.camel800,
    soft: AE.camel50,
    star: AE.camel800,
    starOnDark: AE.camel400,
    radius: '6px',
  },
  brand: {
    name: { en: 'Motion Auto', ar: 'موشن أوتو' },
    mark: { en: 'M', ar: 'م' },
  },
  category: { en: 'Car service and repair', ar: 'صيانة وإصلاح السيارات' },
  hero: {
    image: photo('1503376780353-7e6692767b70', 1600),
    title: {
      en: 'Honest car service in Al Quoz, with the price before we start.',
      ar: 'صيانة سيارات بأمانة في القوز، والسعر قبل بدء العمل.',
    },
    text: {
      en: 'Oil changes, AC, brakes and full servicing for all makes. We send photos and the price on WhatsApp before any work begins.',
      ar: 'تغيير الزيت والتكييف والفرامل والصيانة الشاملة لجميع أنواع السيارات. نرسل الصور والسعر عبر واتساب قبل بدء أي عمل.',
    },
  },
  rating: { score: 4.7, count: 530 },
  highlights: [
    { icon: 'car', text: { en: 'Free pick-up and drop-off', ar: 'استلام وتوصيل السيارة مجانًا' } },
    { icon: 'shield', text: { en: 'Genuine parts, 6-month warranty', ar: 'قطع أصلية مع ضمان 6 أشهر' } },
    { icon: 'clock', text: { en: 'Most jobs done the same day', ar: 'إنجاز معظم الأعمال في نفس اليوم' } },
  ],
  services: {
    title: { en: 'Services and prices', ar: 'الخدمات والأسعار' },
    intro: {
      en: 'Prices are for sedans. SUVs and 4x4s may cost more, and we confirm on WhatsApp first.',
      ar: 'الأسعار للسيارات الصالون. قد تختلف أسعار سيارات الدفع الرباعي، ونؤكدها عبر واتساب أولًا.',
    },
    groups: [
      {
        name: { en: 'Maintenance', ar: 'الصيانة' },
        items: [
          {
            name: { en: 'Synthetic oil change', ar: 'تغيير زيت صناعي' },
            note: { en: 'Includes oil filter and 20-point check', ar: 'يشمل فلتر الزيت وفحص 20 نقطة' },
            price: 149,
            from: true,
          },
          { name: { en: 'Full car service', ar: 'صيانة شاملة' }, price: 399, from: true },
          { name: { en: 'AC service and gas refill', ar: 'صيانة التكييف وتعبئة الغاز' }, price: 199 },
        ],
      },
      {
        name: { en: 'Repairs', ar: 'الإصلاحات' },
        items: [
          { name: { en: 'Computer diagnostics', ar: 'فحص بالكمبيوتر' }, price: 99 },
          { name: { en: 'Brake pad replacement', ar: 'تغيير فحمات الفرامل' }, price: 250, from: true },
          {
            name: { en: 'Battery replacement', ar: 'تغيير البطارية' },
            note: { en: 'Including fitting', ar: 'شامل التركيب' },
            price: 299,
            from: true,
          },
        ],
      },
      {
        name: { en: 'Car care', ar: 'العناية بالسيارة' },
        items: [
          { name: { en: 'Wash and vacuum', ar: 'غسيل خارجي وتنظيف داخلي' }, price: 35 },
          { name: { en: 'Interior deep cleaning', ar: 'تنظيف داخلي عميق' }, price: 250 },
          { name: { en: 'Ceramic coating', ar: 'طلاء سيراميك' }, price: 1500, from: true },
        ],
      },
    ],
  },
  gallery: [
    photo('1492144534655-ae79c964c9d7', 700),
    photo('1489824904134-891ab64532f1', 700),
    photo('1618843479313-40f8afb4b4d8', 700),
    photo('1544829099-b9a0c07fad1a', 700),
  ],
  reviews: [
    {
      name: { en: 'Ahmed R.', ar: 'أحمد ر.' },
      text: {
        en: 'They sent photos of the worn brake pads before replacing them. No surprises on the bill.',
        ar: 'أرسلوا صور الفحمات المستهلكة قبل تغييرها، ولا مفاجآت في الفاتورة.',
      },
    },
    {
      name: { en: 'Suresh P.', ar: 'سوريش ب.' },
      text: {
        en: 'They picked up my car from the office and returned it serviced by evening.',
        ar: 'استلموا سيارتي من المكتب وأعادوها بعد الصيانة في المساء.',
      },
    },
    {
      name: { en: 'Yousef T.', ar: 'يوسف ت.' },
      text: {
        en: 'My AC had been blowing warm for weeks. Fixed in two hours at a fair price.',
        ar: 'كان التكييف لا يبرد منذ أسابيع، وتم إصلاحه في ساعتين بسعر مناسب.',
      },
    },
  ],
  faq: [
    {
      q: { en: 'Do you work on all car brands?', ar: 'هل تعملون على جميع أنواع السيارات؟' },
      a: {
        en: 'Yes: Japanese, Korean, American and European cars, including SUVs.',
        ar: 'نعم، السيارات اليابانية والكورية والأمريكية والأوروبية، بما فيها سيارات الدفع الرباعي.',
      },
    },
    {
      q: { en: 'How does pick-up work?', ar: 'كيف تتم خدمة الاستلام؟' },
      a: {
        en: 'Share your location on WhatsApp. Our driver collects the car and brings it back once the work is approved and done.',
        ar: 'شارك موقعك عبر واتساب، ويستلم سائقنا السيارة ويعيدها بعد اعتماد العمل وإنجازه.',
      },
    },
    {
      q: { en: 'Is there a warranty?', ar: 'هل يوجد ضمان؟' },
      a: {
        en: '6 months on parts and labour for repairs, with a written invoice.',
        ar: 'ضمان 6 أشهر على القطع والعمل في الإصلاحات، مع فاتورة مكتوبة.',
      },
    },
  ],
  location: {
    area: { en: 'Al Quoz Industrial Area 3, Dubai', ar: 'منطقة القوز الصناعية 3، دبي' },
    address: {
      en: 'Warehouse 7, 18th Street, Al Quoz Industrial Area 3, Dubai',
      ar: 'مستودع 7، شارع 18، منطقة القوز الصناعية 3، دبي',
    },
    mapQuery: 'Al Quoz Industrial Area 3, Dubai',
    timezone: 'Asia/Dubai',
    hours: { default: ['08:00', '20:00'], 5: null },
  },
  contact: {
    cta: { en: 'Get a quote on WhatsApp', ar: 'اطلب عرض سعر عبر واتساب' },
  },
}
