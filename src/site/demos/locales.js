// Translated versions of selected demos, grouped by language and the markets that speak it.
// Brand names stay in Latin script (as most real businesses do). Prices are written in ₹ and
// converted to the visitor's chosen currency on screen.
import { industries } from './industries'

export const LANGS = {
  en: { name: 'English', native: 'English', dir: 'ltr', regions: 'Worldwide' },
  ar: { name: 'Arabic', native: 'العربية', dir: 'rtl', regions: 'UAE · Saudi Arabia · Qatar · Oman · Kuwait · Bahrain' },
  hi: { name: 'Hindi', native: 'हिन्दी', dir: 'ltr', regions: 'North and Central India' },
  te: { name: 'Telugu', native: 'తెలుగు', dir: 'ltr', regions: 'Andhra Pradesh · Telangana' },
  ta: { name: 'Tamil', native: 'தமிழ்', dir: 'ltr', regions: 'Tamil Nadu · Singapore · Malaysia · Sri Lanka' },
  fr: { name: 'French', native: 'Français', dir: 'ltr', regions: 'France · Canada · Belgium · Switzerland' },
  de: { name: 'German', native: 'Deutsch', dir: 'ltr', regions: 'Germany · Austria · Switzerland' },
}

// Interface text of the demo template
export const UI = {
  en: { services: 'Services', offerHead: 'What we offer', prices: 'Prices', contact: 'Contact', why: (n) => `Why choose ${n}`, explore: 'Explore', sample: 'Sample prices for this demo.', leave: 'Leave your details and we will call or WhatsApp you back.', hours: 'Hours', address: 'Address', name: 'Your name', phone: 'Phone or WhatsApp', send: 'Send', thanks: 'Thank you!', thanksNote: 'On a real website, this message reaches the owner’s WhatsApp instantly.', by: 'Demo website by VRLS Solutions', highlights: 'Highlights', addr: '12 Main Road, Your City' },
  ar: { services: 'الخدمات', offerHead: 'ما نقدّمه', prices: 'الأسعار', contact: 'تواصل معنا', why: (n) => `لماذا ${n}؟`, explore: 'اكتشف المزيد', sample: 'أسعار تجريبية لهذا العرض.', leave: 'اترك بياناتك وسنتصل بك أو نراسلك عبر واتساب.', hours: 'ساعات العمل', address: 'العنوان', name: 'اسمك', phone: 'الهاتف أو واتساب', send: 'إرسال', thanks: 'شكرًا لك!', thanksNote: 'في الموقع الحقيقي تصل هذه الرسالة إلى واتساب صاحب العمل فورًا.', by: 'موقع تجريبي من VRLS Solutions', highlights: 'أبرز المعلومات', addr: '12 الشارع الرئيسي، مدينتك' },
  hi: { services: 'सेवाएँ', offerHead: 'हम क्या देते हैं', prices: 'कीमतें', contact: 'संपर्क', why: (n) => `${n} ही क्यों`, explore: 'और देखें', sample: 'इस डेमो के लिए नमूना कीमतें।', leave: 'अपनी जानकारी दें, हम कॉल या WhatsApp करेंगे।', hours: 'समय', address: 'पता', name: 'आपका नाम', phone: 'फ़ोन या WhatsApp', send: 'भेजें', thanks: 'धन्यवाद!', thanksNote: 'असली वेबसाइट पर यह संदेश तुरंत मालिक के WhatsApp पर पहुँचता है।', by: 'VRLS Solutions द्वारा डेमो वेबसाइट', highlights: 'मुख्य बातें', addr: '12 मेन रोड, आपका शहर' },
  te: { services: 'సేవలు', offerHead: 'మేము అందించేవి', prices: 'ధరలు', contact: 'సంప్రదించండి', why: (n) => `${n} నే ఎందుకు`, explore: 'మరిన్ని చూడండి', sample: 'ఈ డెమో కోసం నమూనా ధరలు.', leave: 'మీ వివరాలు ఇవ్వండి, మేము కాల్ లేదా WhatsApp చేస్తాం.', hours: 'సమయం', address: 'చిరునామా', name: 'మీ పేరు', phone: 'ఫోన్ లేదా WhatsApp', send: 'పంపండి', thanks: 'ధన్యవాదాలు!', thanksNote: 'నిజమైన వెబ్‌సైట్‌లో ఈ సందేశం వెంటనే యజమాని WhatsApp కు చేరుతుంది.', by: 'VRLS Solutions రూపొందించిన డెమో వెబ్‌సైట్', highlights: 'ముఖ్యాంశాలు', addr: '12 మెయిన్ రోడ్, మీ నగరం' },
  ta: { services: 'சேவைகள்', offerHead: 'நாங்கள் வழங்குவது', prices: 'விலைகள்', contact: 'தொடர்புக்கு', why: (n) => `ஏன் ${n}?`, explore: 'மேலும் அறிய', sample: 'இந்த டெமோவுக்கான மாதிரி விலைகள்.', leave: 'உங்கள் விவரங்களைத் தாருங்கள், நாங்கள் அழைப்போம் அல்லது WhatsApp செய்வோம்.', hours: 'நேரம்', address: 'முகவரி', name: 'உங்கள் பெயர்', phone: 'தொலைபேசி அல்லது WhatsApp', send: 'அனுப்பு', thanks: 'நன்றி!', thanksNote: 'உண்மையான இணையதளத்தில் இந்த செய்தி உடனே உரிமையாளரின் WhatsApp க்குச் செல்லும்.', by: 'VRLS Solutions உருவாக்கிய டெமோ இணையதளம்', highlights: 'சிறப்பம்சங்கள்', addr: '12 மெயின் ரோடு, உங்கள் நகரம்' },
  fr: { services: 'Services', offerHead: 'Ce que nous proposons', prices: 'Tarifs', contact: 'Contact', why: (n) => `Pourquoi choisir ${n}`, explore: 'Découvrir', sample: 'Tarifs d’exemple pour cette démo.', leave: 'Laissez vos coordonnées : nous vous rappelons ou vous écrivons sur WhatsApp.', hours: 'Horaires', address: 'Adresse', name: 'Votre nom', phone: 'Téléphone ou WhatsApp', send: 'Envoyer', thanks: 'Merci !', thanksNote: 'Sur un vrai site, ce message arrive instantanément sur le WhatsApp du propriétaire.', by: 'Site de démonstration par VRLS Solutions', highlights: 'Points forts', addr: '12 rue Principale, Votre ville' },
  de: { services: 'Leistungen', offerHead: 'Unser Angebot', prices: 'Preise', contact: 'Kontakt', why: (n) => `Warum ${n}`, explore: 'Mehr erfahren', sample: 'Beispielpreise für diese Demo.', leave: 'Hinterlassen Sie Ihre Daten – wir rufen zurück oder schreiben per WhatsApp.', hours: 'Öffnungszeiten', address: 'Adresse', name: 'Ihr Name', phone: 'Telefon oder WhatsApp', send: 'Senden', thanks: 'Vielen Dank!', thanksNote: 'Auf einer echten Website erreicht diese Nachricht sofort das WhatsApp des Inhabers.', by: 'Demo-Website von VRLS Solutions', highlights: 'Highlights', addr: 'Hauptstraße 12, Ihre Stadt' },
}

// Shared "why choose us" blocks per language
const WHY = {
  ar: {
    food: [['طازج كل يوم', 'يُطهى بكميات صغيرة ولا يُعاد تسخينه.'], ['طلب سهل', 'احجز أو اطلب عبر واتساب في دقيقة.'], ['محبوب محليًا', 'مئات الزبائن الدائمين كل أسبوع.']],
    health: [['فريق متمرّس', 'أخصائيون مؤهلون تثق بهم.'], ['أسعار واضحة', 'اعرف التكلفة قبل العلاج.'], ['احجز عبر الإنترنت', 'اختر الوقت الذي يناسبك.']],
    beauty: [['فريق ماهر', 'مدرّب ويتعلم باستمرار.'], ['مكان نظيف تمامًا', 'نظافة تلاحظينها.'], ['احجزي في ثوانٍ', 'مواعيد متاحة وتأكيد فوري.']],
    retail: [['أسعار عادلة', 'تسعير صادق لكل قطعة.'], ['خدمة شخصية', 'مستشارون يساعدونك في الاختيار.'], ['استبدال سهل', 'استبدال دون متاعب.']],
    property: [['تفاصيل موثّقة', 'كل عرض وموقع تم التحقق منه.'], ['إجراءات شفافة', 'تحديثات في كل مرحلة.'], ['خبرة محلية', 'نعرف كل حي.']],
    stay: [['إطلالات خلابة', 'غرف تطل على البحر والحديقة.'], ['خدمة على مدار الساعة', 'فريق جاهز لمساعدتك دائمًا.'], ['حجز مباشر', 'أفضل سعر عند الحجز معنا.']],
  },
  hi: {
    health: [['अनुभवी टीम', 'योग्य विशेषज्ञ जिन पर आप भरोसा कर सकें।'], ['साफ़ कीमतें', 'इलाज से पहले ख़र्च जानें।'], ['ऑनलाइन बुकिंग', 'अपनी सुविधा का समय चुनें।']],
    education: [['सिद्ध पढ़ाई', 'छोटे बैच और व्यक्तिगत ध्यान।'], ['नियमित फ़ीडबैक', 'माता-पिता हर महीने प्रगति देखें।'], ['टिकाऊ परिणाम', 'सिर्फ़ परीक्षा नहीं, पहले कॉन्सेप्ट।']],
    retail: [['सही दाम', 'हर सामान पर ईमानदार कीमत।'], ['तेज़ डिलीवरी', 'शहर में उसी दिन डिलीवरी।'], ['आसान वापसी', 'बिना झंझट बदलाव।']],
    property: [['सत्यापित जानकारी', 'हर लिस्टिंग और साइट की जाँच।'], ['पारदर्शी प्रक्रिया', 'हर चरण पर अपडेट।'], ['स्थानीय जानकारी', 'हम हर इलाक़ा जानते हैं।']],
  },
  te: {
    food: [['ప్రతిరోజూ తాజాగా', 'చిన్న మోతాదుల్లో వండుతాం, మళ్లీ వేడి చేయం.'], ['సులభంగా ఆర్డర్', 'WhatsApp లో నిమిషంలో బుక్ లేదా ఆర్డర్.'], ['స్థానికుల అభిమానం', 'ప్రతి వారం వందల మంది రెగ్యులర్ కస్టమర్లు.']],
    health: [['అనుభవజ్ఞులైన బృందం', 'మీరు నమ్మగలిగే అర్హత కలిగిన నిపుణులు.'], ['స్పష్టమైన ధరలు', 'చికిత్సకు ముందే ఖర్చు తెలుసుకోండి.'], ['ఆన్‌లైన్ బుకింగ్', 'మీకు అనుకూలమైన సమయం ఎంచుకోండి.']],
    education: [['నిరూపితమైన బోధన', 'చిన్న బ్యాచ్‌లు, వ్యక్తిగత శ్రద్ధ.'], ['క్రమమైన ఫీడ్‌బ్యాక్', 'ప్రతి నెలా తల్లిదండ్రులకు ప్రగతి నివేదిక.'], ['నిలిచే ఫలితాలు', 'పరీక్షలకే కాదు, ముందు భావనలు.']],
    hall: [['అనుకూలమైన ప్రదేశం', 'నగరం నడిబొడ్డున, సులభంగా చేరుకోవచ్చు.'], ['అన్నీ ఒకే చోట', 'డెకరేషన్, భోజనం, పార్కింగ్.'], ['పారదర్శక ధరలు', 'దాచిన ఛార్జీలు లేవు.']],
    agri: [['మూలం తెలిసిన పంట', 'పొలం నుండి మీ వరకు ప్రతిదీ నమోదు.'], ['నాణ్యత', 'గ్రేడ్ చేసి జాగ్రత్తగా ప్యాక్ చేస్తాం.'], ['నిరంతర సరఫరా', 'ఏడాది పొడవునా అందుబాటులో.']],
  },
  ta: {
    food: [['தினமும் புதிது', 'சிறு அளவில் சமைக்கிறோம், மீண்டும் சூடாக்குவதில்லை.'], ['எளிதான ஆர்டர்', 'WhatsApp இல் ஒரு நிமிடத்தில் முன்பதிவு.'], ['உள்ளூர் மக்களின் விருப்பம்', 'வாரந்தோறும் நூற்றுக்கணக்கான வாடிக்கையாளர்கள்.']],
    health: [['அனுபவமிக்க குழு', 'நீங்கள் நம்பக்கூடிய தகுதியான நிபுணர்கள்.'], ['தெளிவான கட்டணம்', 'சிகிச்சைக்கு முன் செலவை அறியுங்கள்.'], ['ஆன்லைன் முன்பதிவு', 'உங்களுக்கு ஏற்ற நேரத்தைத் தேர்ந்தெடுங்கள்.']],
    industry: [['தரச் சான்று', 'ஆவணப்படுத்தப்பட்ட செயல்முறைகள், சோதனைகள்.'], ['சரியான நேரத்தில் டெலிவரி', 'நம்பகமான விநியோக காலம்.'], ['பெரிய அளவுக்குத் தயார்', 'மாதிரி முதல் முழு உற்பத்தி வரை.']],
    travel: [['முழுமையான திட்டமிடல்', 'முதல் அழைப்பு முதல் கடைசி நாள் வரை ஒரே குழு.'], ['நேர்மையான விலை', 'மறைமுகக் கட்டணங்கள் இல்லை.'], ['எப்போதும் தொடர்பில்', 'தேவைப்படும்போதெல்லாம் உதவி.']],
  },
  fr: {
    food: [['Frais chaque jour', 'Cuisiné en petites quantités, jamais réchauffé.'], ['Commande facile', 'Réservez ou commandez sur WhatsApp en une minute.'], ['Apprécié du quartier', 'Des centaines d’habitués chaque semaine.']],
    health: [['Équipe expérimentée', 'Des spécialistes qualifiés de confiance.'], ['Tarifs clairs', 'Connaissez le coût avant le soin.'], ['Rendez-vous en ligne', 'Choisissez le créneau qui vous convient.']],
    pro: [['Attention senior', 'Votre dossier suivi par des avocats expérimentés.'], ['Honoraires clairs', 'Convenus par écrit avant de commencer.'], ['Confidentialité', 'Vos informations restent privées.']],
  },
  de: {
    food: [['Täglich frisch', 'In kleinen Mengen gekocht, nie aufgewärmt.'], ['Einfach bestellen', 'Per WhatsApp in einer Minute reservieren oder bestellen.'], ['Beliebt im Viertel', 'Hunderte Stammgäste jede Woche.']],
    health: [['Erfahrenes Team', 'Qualifizierte Spezialisten, denen Sie vertrauen.'], ['Klare Preise', 'Kosten vor der Behandlung kennen.'], ['Online buchen', 'Wählen Sie den passenden Termin.']],
    home: [['Geprüfte Fachleute', 'Überprüfte, qualifizierte Techniker.'], ['Pünktlicher Service', 'Wir kommen, wann wir es sagen.'], ['Garantierte Arbeit', 'Kostenlose Nachbesserung, falls nötig.']],
    industry: [['Zertifizierte Qualität', 'Dokumentierte Prozesse und Prüfungen.'], ['Termintreue', 'Verlässliche Lieferzeiten.'], ['Skalierbar', 'Vom Muster bis zur Serie.']],
  },
}

// Translations keyed by language, then by demo slug
const T = {
  ar: {
    restaurant: {
      why: WHY.ar.food, cat: 'مطعم', tagline: 'مطبخ هندي عصري', head: 'نكهات مطهوّة على مهل، تُقدَّم بعناية', sub: 'أجواء دافئة، وقائمة موسمية، وطاولة بانتظارك.', cta: 'احجز طاولة',
      stats: [['4.8', 'متوسط التقييم'], ['120', 'مقعدًا'], ['15 دقيقة', 'لتأكيد الحجز']],
      services: [['تناول الطعام في المطعم', 'أمسيات هادئة للعائلات والأصدقاء.'], ['غرفة طعام خاصة', 'غرفة هادئة تتسع لـ 24 ضيفًا.'], ['طلبات خارجية', 'اطلب مسبقًا واستلم طعامك ساخنًا.'], ['تموين الحفلات', 'قائمتنا في مناسبتك.']],
      offer: ['القائمة المميزة', [['باذنجان مدخّن', '₹320', 'لبن، رمان، نعناع'], ['ساق ضأن مطهوّة ببطء', '₹780', 'أرز بالزعفران وخضار مشوية'], ['ثالي الحديقة', '₹450', 'تشكيلة نباتية موسمية'], ['كُلفي بالهيل', '₹180', 'فستق وورد']]],
      hours: 'يوميًا 12:00 – 00:00',
    },
    'dental-clinic': {
      why: WHY.ar.health, cat: 'عيادة أسنان', tagline: 'طب أسنان لطيف للعائلة', head: 'ابتسامة أكثر صحة، دون قلق', sub: 'فحوصات وتبييض وتقويم شفاف وزراعة أسنان على يد فريق لطيف وودود.', cta: 'احجز فحصًا',
      stats: [['12 عامًا', 'من الخبرة'], ['+8,000', 'مريض'], ['في اليوم نفسه', 'تخفيف الألم']],
      services: [['فحص وتنظيف', 'عالج المشكلات وهي صغيرة.'], ['تبييض الأسنان', 'أسنان أكثر إشراقًا في زيارة واحدة.'], ['تقويم شفاف وتقليدي', 'أسنان مستقيمة في أي عمر.'], ['زراعة الأسنان', 'بدائل تبدو طبيعية.']],
      offer: ['العلاجات', [['فحص مع أشعة', '₹499', 'يشمل خطة العلاج'], ['تنظيف وتلميع', '₹1,200', 'انتعاش ونظافة'], ['تبييض', '₹6,500', 'أفتح حتى 8 درجات'], ['استشارة التقويم الشفاف', 'مجانًا', 'تعرّف على خياراتك']]],
      hours: 'السبت – الخميس 09:00 – 21:00',
    },
    'salon-spa': {
      why: WHY.ar.beauty, cat: 'صالون وسبا', tagline: 'شعر وجمال وهدوء', head: 'وقت لكِ، بلمسة جميلة', sub: 'علاجات للشعر والبشرة والسبا مع حجز سهل عبر الإنترنت.', cta: 'احجزي موعدًا',
      stats: [['4.9', 'تقييم العملاء'], ['12', 'خبيرة تجميل'], ['60 ثانية', 'للحجز عبر الإنترنت']],
      services: [['الشعر', 'قص وصبغ وتصفيف.'], ['البشرة', 'جلسات عناية مصممة لكِ.'], ['السبا', 'تدليك وعناية بالجسم.'], ['العرائس', 'يومك المميز دون توتر.']],
      offer: ['قائمة الخدمات', [['قص وتصفيف', '₹600', 'غسيل وقص وتصفيف'], ['جلسة الوجه المميزة', '₹1,800', '60 دقيقة'], ['صبغ كامل', 'من ₹2,500', 'يشمل التونر'], ['باقة العروس', 'من ₹15,000', 'تشمل التجربة']]],
      hours: 'السبت – الخميس 10:00 – 22:00',
    },
    'real-estate': {
      why: WHY.ar.property, cat: 'عقارات', tagline: 'منازل واستثمارات', head: 'اعثر على المكان الذي ستحب أن تسميه منزلك', sub: 'شقق وفلل وأراضٍ موثّقة، مع زيارات للموقع ومساعدة في التمويل.', cta: 'تصفح العقارات',
      stats: [['+900', 'منزل مُباع'], ['100%', 'عروض موثّقة'], ['مجانًا', 'زيارات الموقع']],
      services: [['شراء', 'شقق وفلل وأراضٍ.'], ['بيع', 'أفضل قيمة بأقل عناء.'], ['إيجار', 'مستأجرون ومنازل مميزة.'], ['تمويل عقاري', 'شراكات مع كبرى البنوك.']],
      offer: ['عقارات مميزة', [['شقة بغرفتي نوم', '₹58,00,000', 'جاهزة للسكن'], ['فيلا بثلاث غرف', '₹1,40,00,000', 'مجمّع مسوّر'], ['أرض سكنية', '₹32,00,000', '200 ياردة مربعة'], ['زيارة الموقع', 'مجانًا', 'مع التوصيل']]],
      hours: 'السبت – الخميس 10:00 – 19:00',
    },
    jewellery: {
      why: WHY.ar.retail, cat: 'متجر مجوهرات', tagline: 'منذ 1987', head: 'مجوهرات صُنعت لتتوارثها الأجيال', sub: 'ذهب مختوم، وألماس معتمد، وأطقم زفاف حسب الطلب.', cta: 'احجز زيارة للمعرض',
      stats: [['1987', 'سنة التأسيس'], ['100%', 'ذهب مختوم'], ['مدى الحياة', 'تلميع مجاني']],
      services: [['الذهب', 'مجموعات عيار 22 مختومة.'], ['الألماس', 'معتمد وبسعر عادل.'], ['أطقم الزفاف', 'نصممها معك.'], ['خطة ادخار الذهب', 'ادفع شهريًا واشترِ لاحقًا.']],
      offer: ['المجموعات', [['سلاسل ذهب', 'من ₹38,000', 'عيار 22 مختوم'], ['أقراط ألماس', 'من ₹24,000', 'شهادة IGI'], ['طقم زفاف', 'سعر حسب الطلب', 'استشارة تصميم'], ['خطة الادخار', '11 + 1', 'شهر مجاني']]],
      hours: 'يوميًا 10:00 – 22:00',
    },
    'hotel-resort': {
      why: WHY.ar.stay, cat: 'فندق ومنتجع', tagline: 'إقامة على البحر', head: 'استيقظ على صوت البحر', sub: 'غرف مطلة على البحر، ومسبح على السطح، ومطبخ يطهو صيد اليوم.', cta: 'تحقق من التوفر',
      stats: [['48', 'غرفة وجناحًا'], ['4.7', 'تقييم النزلاء'], ['24/7', 'مكتب الاستقبال']],
      services: [['الغرف والأجنحة', 'إطلالة على الحديقة أو البحر وخيارات عائلية.'], ['مسبح السطح', 'مفتوح من الشروق حتى 10 مساءً.'], ['المطعم', 'أطباق ساحلية طوال اليوم.'], ['المناسبات', 'حفلات زفاف وملتقيات حتى 300 ضيف.']],
      offer: ['الغرف', [['غرفة الحديقة', '₹4,200 / ليلة', 'الإفطار مشمول'], ['غرفة بإطلالة بحرية', '₹5,800 / ليلة', 'شرفة خاصة'], ['جناح عائلي', '₹8,500 / ليلة', 'يتسع لأربعة'], ['باقة شهر العسل', '₹21,000', 'ليلتان مع عشاء وسبا']]],
      hours: 'الاستقبال على مدار الساعة',
    },
  },
  hi: {
    hospital: {
      why: WHY.hi.health, cat: 'मल्टीस्पेशलिटी अस्पताल', tagline: 'भरोसेमंद देखभाल', head: 'घर के पास, विशेषज्ञ देखभाल', sub: '24 घंटे इमरजेंसी, 18 विशेषज्ञताएँ और वरिष्ठ डॉक्टरों से ऑनलाइन अपॉइंटमेंट।', cta: 'अपॉइंटमेंट बुक करें',
      stats: [['24/7', 'इमरजेंसी'], ['18', 'विशेषज्ञताएँ'], ['150', 'बेड']],
      services: [['इमरजेंसी और ट्रॉमा', 'चौबीसों घंटे गंभीर देखभाल।'], ['कार्डियोलॉजी', 'हृदय जाँच, ECG और कैथ लैब।'], ['ऑर्थोपेडिक्स', 'जोड़ों की देखभाल और खेल की चोटें।'], ['माँ और शिशु', 'प्रसूति, NICU और बाल रोग।']],
      offer: ['हेल्थ पैकेज', [['बेसिक हेल्थ चेक', '₹1,499', '30 जाँचें'], ['हार्ट चेक', '₹3,999', 'ECG, इको, लिपिड प्रोफ़ाइल'], ['महिला स्वास्थ्य', '₹2,999', 'परामर्श सहित'], ['वरिष्ठ नागरिक प्लान', '₹4,499', '60+ जाँचें']]],
      hours: 'सोम–शनि 09:00 – 20:00',
    },
    'coaching-institute': {
      why: WHY.hi.education, cat: 'कोचिंग संस्थान', tagline: 'IIT-JEE, NEET और फ़ाउंडेशन', head: 'आत्मविश्वास के साथ परीक्षा पास करें', sub: 'विशेषज्ञ शिक्षक, छोटे बैच, साप्ताहिक टेस्ट और रोज़ डाउट सेशन।', cta: 'डेमो क्लास बुक करें',
      stats: [['420', '2025 में चयन'], ['30', 'प्रति बैच'], ['रोज़', 'डाउट क्लियरिंग']],
      services: [['IIT-JEE', 'मेन और एडवांस्ड।'], ['NEET', 'बायोलॉजी, फ़िज़िक्स और केमिस्ट्री।'], ['फ़ाउंडेशन', 'कक्षा 8 से 10।'], ['टेस्ट सीरीज़', 'ऑनलाइन, रैंक विश्लेषण के साथ।']],
      offer: ['कोर्स', [['दो वर्षीय JEE', '₹1,40,000', 'कक्षा 11 और 12'], ['एक वर्षीय NEET', '₹85,000', 'टेस्ट सीरीज़ सहित'], ['फ़ाउंडेशन', '₹45,000 / वर्ष', 'गणित और विज्ञान'], ['स्कॉलरशिप टेस्ट', 'मुफ़्त', 'फ़ीस में 90% तक छूट']]],
      hours: 'सोम–शनि 08:00 – 19:00',
    },
    supermarket: {
      why: WHY.hi.retail, cat: 'सुपरमार्केट और किराना', tagline: 'एक घंटे में किराना डिलीवरी', head: '60 मिनट में ताज़ा किराना आपके दरवाज़े पर', sub: 'फल, सब्ज़ियाँ, राशन और घरेलू सामान, रोज़ कम दाम पर।', cta: 'WhatsApp पर ऑर्डर करें',
      stats: [['60 मिनट', 'डिलीवरी'], ['5,000+', 'उत्पाद'], ['मुफ़्त', '₹499 से ऊपर डिलीवरी']],
      services: [['ताज़ी उपज', 'रोज़ सीधे खेतों से।'], ['राशन', 'चावल, दाल, तेल और बहुत कुछ।'], ['घरेलू सामान', 'सफ़ाई और पर्सनल केयर।'], ['मासिक बास्केट', 'एक बार सेट करें, हर महीने डिलीवरी।']],
      offer: ['इस हफ़्ते', [['बासमती चावल (5 किलो)', '₹549', '₹100 की बचत'], ['कोल्ड-प्रेस्ड तेल (1 लीटर)', '₹245', 'मूँगफली'], ['फलों की टोकरी', '₹399', 'मौसमी मिक्स'], ['मासिक बास्केट', '5% छूट', 'हर ऑर्डर पर']]],
      hours: 'रोज़ 09:30 – 21:30',
    },
    jewellery: {
      why: WHY.hi.retail, cat: 'ज्वेलरी स्टोर', tagline: '1987 से', head: 'पीढ़ियों तक सौंपे जाने वाले गहने', sub: 'BIS हॉलमार्क सोना, प्रमाणित हीरे और कस्टम दुल्हन सेट।', cta: 'शोरूम विज़िट बुक करें',
      stats: [['1987', 'स्थापना'], ['100%', 'BIS हॉलमार्क'], ['आजीवन', 'मुफ़्त पॉलिश']],
      services: [['सोना', '22K हॉलमार्क कलेक्शन।'], ['हीरे', 'प्रमाणित और सही दाम पर।'], ['दुल्हन सेट', 'आपके साथ मिलकर डिज़ाइन।'], ['गोल्ड सेविंग प्लान', 'हर महीने जमा करें, बाद में ख़रीदें।']],
      offer: ['कलेक्शन', [['सोने की चेन', '₹38,000 से', '22K हॉलमार्क'], ['डायमंड टॉप्स', '₹24,000 से', 'IGI प्रमाणित'], ['दुल्हन सेट', 'कस्टम कोटेशन', 'डिज़ाइन परामर्श'], ['सेविंग प्लान', '11 + 1', 'एक महीना मुफ़्त']]],
      hours: 'रोज़ 10:30 – 21:00',
    },
    'real-estate': {
      why: WHY.hi.property, cat: 'रियल एस्टेट', tagline: 'घर और निवेश', head: 'वह घर ढूँढें जिसे आप अपना कहना पसंद करेंगे', sub: 'सत्यापित फ़्लैट, विला और प्लॉट, साइट विज़िट और लोन सहायता के साथ।', cta: 'प्रॉपर्टी देखें',
      stats: [['900+', 'घर बिके'], ['100%', 'सत्यापित लिस्टिंग'], ['मुफ़्त', 'साइट विज़िट']],
      services: [['ख़रीदें', 'फ़्लैट, विला और प्लॉट।'], ['बेचें', 'सही कीमत, कम तनाव।'], ['किराया', 'अच्छे किरायेदार और घर।'], ['होम लोन', 'प्रमुख बैंकों के साथ टाई-अप।']],
      offer: ['ख़ास प्रॉपर्टी', [['2 BHK अपार्टमेंट', '₹58,00,000', 'रहने के लिए तैयार'], ['3 BHK विला', '₹1,40,00,000', 'गेटेड कम्युनिटी'], ['आवासीय प्लॉट', '₹32,00,000', '200 वर्ग गज़'], ['साइट विज़िट', 'मुफ़्त', 'पिक-अप सहित']]],
      hours: 'सोम–शनि 10:00 – 19:00',
    },
  },
  te: {
    restaurant: {
      why: WHY.te.food, cat: 'రెస్టారెంట్', tagline: 'ఆధునిక భారతీయ వంటకాలు', head: 'నెమ్మదిగా వండిన రుచులు, ప్రేమతో వడ్డించాం', sub: 'ఆహ్లాదకరమైన వాతావరణం, సీజనల్ మెనూ, మీ కోసం ఎదురుచూస్తున్న టేబుల్.', cta: 'టేబుల్ బుక్ చేయండి',
      stats: [['4.8', 'సగటు రేటింగ్'], ['120', 'సీట్లు'], ['15 నిమిషాలు', 'బుకింగ్ నిర్ధారణ']],
      services: [['డైన్-ఇన్', 'కుటుంబం, స్నేహితులతో ప్రశాంతమైన సాయంత్రాలు.'], ['ప్రైవేట్ డైనింగ్', '24 మంది వరకు ప్రత్యేక గది.'], ['టేక్‌అవే', 'ముందే ఆర్డర్ చేసి వేడిగా తీసుకెళ్లండి.'], ['క్యాటరింగ్', 'మీ వేడుకకు మా మెనూ.']],
      offer: ['ప్రత్యేక మెనూ', [['పొగబెట్టిన వంకాయ', '₹320', 'పెరుగు, దానిమ్మ, పుదీనా'], ['మటన్ షాంక్', '₹780', 'కుంకుమపువ్వు అన్నం, కాల్చిన కూరగాయలు'], ['గార్డెన్ థాలీ', '₹450', 'సీజనల్ శాకాహార భోజనం'], ['యాలకుల కుల్ఫీ', '₹180', 'పిస్తా, గులాబీ']]],
      hours: 'ప్రతిరోజూ 11:00 – 23:00',
    },
    hospital: {
      why: WHY.te.health, cat: 'మల్టీస్పెషాలిటీ ఆసుపత్రి', tagline: 'మీరు నమ్మగలిగే వైద్యం', head: 'ఇంటికి దగ్గరలో నిపుణుల వైద్యం', sub: '24 గంటల అత్యవసర సేవ, 18 విభాగాలు, సీనియర్ డాక్టర్లతో ఆన్‌లైన్ అపాయింట్‌మెంట్.', cta: 'అపాయింట్‌మెంట్ బుక్ చేయండి',
      stats: [['24/7', 'అత్యవసర సేవ'], ['18', 'విభాగాలు'], ['150', 'పడకలు']],
      services: [['అత్యవసర, ట్రామా', 'రోజంతా క్రిటికల్ కేర్.'], ['కార్డియాలజీ', 'గుండె పరీక్షలు, ECG, క్యాథ్ ల్యాబ్.'], ['ఆర్థోపెడిక్స్', 'కీళ్ల సంరక్షణ, క్రీడా గాయాలు.'], ['తల్లి, బిడ్డ', 'ప్రసూతి, NICU, పిల్లల వైద్యం.']],
      offer: ['హెల్త్ ప్యాకేజీలు', [['బేసిక్ హెల్త్ చెకప్', '₹1,499', '30 పరీక్షలు'], ['గుండె పరీక్ష', '₹3,999', 'ECG, ఎకో, లిపిడ్ ప్రొఫైల్'], ['మహిళల ఆరోగ్యం', '₹2,999', 'కన్సల్టేషన్‌తో'], ['వృద్ధుల ప్లాన్', '₹4,499', '60+ పరీక్షలు']]],
      hours: 'సోమ–శని 09:00 – 20:00',
    },
    school: {
      why: WHY.te.education, cat: 'పాఠశాల', tagline: 'గుర్తుండిపోయే చదువు', head: 'ఆసక్తిగల మనసులు ఎదిగే పాఠశాల', sub: 'నర్సరీ నుండి 10వ తరగతి వరకు CBSE సిలబస్, క్రీడలు, కళలు, సురక్షిత రవాణా.', cta: 'అడ్మిషన్‌కు దరఖాస్తు చేయండి',
      stats: [['1,200', 'విద్యార్థులు'], ['1 : 20', 'టీచర్ నిష్పత్తి'], ['98%', 'బోర్డు ఫలితాలు']],
      services: [['ప్రీ-ప్రైమరీ', 'ఆటల ద్వారా నేర్చుకోవడం.'], ['ప్రైమరీ', 'ప్రతి సబ్జెక్టులో బలమైన పునాది.'], ['సెకండరీ', 'శ్రద్ధతో బోర్డు పరీక్షల సన్నద్ధత.'], ['క్రీడలు, కళలు', 'సంగీతం, నృత్యం, అథ్లెటిక్స్.']],
      offer: ['అడ్మిషన్లు', [['నర్సరీ నుండి UKG', 'ప్రారంభం', 'ఇంటరాక్షన్ ఆధారంగా'], ['1 నుండి 9 తరగతులు', 'పరిమిత సీట్లు', 'ప్రవేశ పరీక్ష'], ['స్కూల్ బస్', 'అన్ని రూట్లు', 'GPS ట్రాకింగ్'], ['క్యాంపస్ టూర్', 'శనివారాలు', 'ఆన్‌లైన్‌లో బుక్ చేయండి']]],
      hours: 'సోమ–శని 08:00 – 19:00',
    },
    'function-hall': {
      why: WHY.te.hall, cat: 'ఫంక్షన్ హాల్', tagline: 'పెళ్లిళ్లు, వేడుకలు', head: 'మీ జీవితంలో ముఖ్యమైన రోజుకు అందమైన హాల్', sub: '100 నుండి 1,500 మంది అతిథులకు AC హాళ్లు, డెకరేషన్, క్యాటరింగ్, పార్కింగ్‌తో.', cta: 'తేదీలు చూడండి',
      stats: [['1,500', 'అతిథులు'], ['3', 'హాళ్లు'], ['200', 'కార్ పార్కింగ్']],
      services: [['పెళ్లిళ్లు', 'మండపం, స్టేజ్, డెకరేషన్ ప్యాకేజీలు.'], ['రిసెప్షన్లు', 'లైటింగ్, సౌండ్, సీటింగ్.'], ['కార్పొరేట్ ఈవెంట్లు', 'ప్రొజెక్టర్లు, స్టేజ్ ఏర్పాటు.'], ['ఇన్-హౌస్ క్యాటరింగ్', 'శాకాహార, మాంసాహార మెనూలు.']],
      offer: ['హాళ్లు', [['ఆర్కిడ్ హాల్', '₹1,20,000 / రోజు', '1,500 మంది వరకు'], ['లోటస్ హాల్', '₹65,000 / రోజు', '600 మంది వరకు'], ['మినీ హాల్', '₹25,000 / రోజు', '150 మంది వరకు'], ['డెకరేషన్ ప్యాకేజీ', '₹40,000 నుండి', 'పూలు, లైట్లు, స్టేజ్']]],
      hours: 'ప్రతిరోజూ 09:00 – 21:00',
    },
    'organic-farm': {
      why: WHY.te.agri, cat: 'సేంద్రీయ వ్యవసాయ క్షేత్రం', tagline: 'రసాయనాలు లేకుండా పండించినవి', head: 'మా పొలాల నుండి నేరుగా సేంద్రీయ ఆహారం', sub: 'ధృవీకరించిన సేంద్రీయ కూరగాయలు, బియ్యం, చిరుధాన్యాలు, గానుగ నూనెలు, ప్రతి వారం ఇంటికి.', cta: 'వారపు బాక్స్ ప్రారంభించండి',
      stats: [['120 ఎకరాలు', 'పొలాలు'], ['ధృవీకరించిన', 'సేంద్రీయం'], ['ప్రతి వారం', 'హోమ్ డెలివరీ']],
      services: [['కూరగాయల బాక్సులు', 'సీజనల్, తాజావి.'], ['బియ్యం, చిరుధాన్యాలు', 'సంప్రదాయ రకాలు.'], ['గానుగ నూనెలు', 'చెక్క గానుగ.'], ['పొలం సందర్శన', 'ఆహారం ఎలా పండుతుందో చూడండి.']],
      offer: ['బాక్సులు', [['చిన్న కూరగాయల బాక్స్', '₹499 / వారం', 'ఇద్దరికి'], ['ఫ్యామిలీ బాక్స్', '₹899 / వారం', 'నలుగురికి'], ['చిరుధాన్యాల ప్యాక్', '₹650', '5 రకాలు'], ['పొలం సందర్శన', '₹300', 'భోజనంతో']]],
      hours: 'సోమ–శని 09:00 – 18:00',
    },
  },
  ta: {
    restaurant: {
      why: WHY.ta.food, cat: 'உணவகம்', tagline: 'நவீன இந்திய உணவு', head: 'மெதுவாக சமைத்த சுவைகள், அக்கறையுடன் பரிமாறப்படுகின்றன', sub: 'இதமான சூழல், பருவகால மெனு, உங்களுக்காகக் காத்திருக்கும் மேசை.', cta: 'மேசையை முன்பதிவு செய்யுங்கள்',
      stats: [['4.8', 'சராசரி மதிப்பீடு'], ['120', 'இருக்கைகள்'], ['15 நிமிடம்', 'முன்பதிவு உறுதி']],
      services: [['உணவகத்தில் உணவு', 'குடும்பம், நண்பர்களுடன் இனிய மாலைகள்.'], ['தனி உணவறை', '24 விருந்தினர் வரை அமைதியான அறை.'], ['டேக்அவே', 'முன்கூட்டியே ஆர்டர் செய்து சூடாகப் பெறுங்கள்.'], ['கேட்டரிங்', 'உங்கள் நிகழ்வில் எங்கள் மெனு.']],
      offer: ['சிறப்பு மெனு', [['புகையூட்டிய கத்தரிக்காய்', '₹320', 'தயிர், மாதுளை, புதினா'], ['மட்டன் ஷாங்க்', '₹780', 'குங்குமப்பூ சாதம், வறுத்த காய்கறிகள்'], ['கார்டன் தாலி', '₹450', 'பருவகால சைவ உணவு'], ['ஏலக்காய் குல்ஃபி', '₹180', 'பிஸ்தா, ரோஜா']]],
      hours: 'தினமும் 11:00 – 23:00',
    },
    hospital: {
      why: WHY.ta.health, cat: 'பல்நோக்கு மருத்துவமனை', tagline: 'நம்பிக்கையான சிகிச்சை', head: 'வீட்டுக்கு அருகில் நிபுணர் சிகிச்சை', sub: '24 மணி நேர அவசர சிகிச்சை, 18 சிறப்புப் பிரிவுகள், மூத்த மருத்துவர்களுடன் ஆன்லைன் சந்திப்பு.', cta: 'சந்திப்பை முன்பதிவு செய்யுங்கள்',
      stats: [['24/7', 'அவசர சிகிச்சை'], ['18', 'சிறப்புப் பிரிவுகள்'], ['150', 'படுக்கைகள்']],
      services: [['அவசர சிகிச்சை', 'இரவு பகல் தீவிர சிகிச்சை.'], ['இதயவியல்', 'இதய பரிசோதனை, ECG, கேத் லேப்.'], ['எலும்பியல்', 'மூட்டு பராமரிப்பு, விளையாட்டுக் காயங்கள்.'], ['தாய் சேய் நலம்', 'மகப்பேறு, NICU, குழந்தை நலம்.']],
      offer: ['சுகாதார தொகுப்புகள்', [['அடிப்படை பரிசோதனை', '₹1,499', '30 சோதனைகள்'], ['இதய பரிசோதனை', '₹3,999', 'ECG, எக்கோ, லிப்பிட்'], ['பெண்கள் நலம்', '₹2,999', 'ஆலோசனையுடன்'], ['மூத்த குடிமக்கள் திட்டம்', '₹4,499', '60+ சோதனைகள்']]],
      hours: 'திங்கள்–சனி 09:00 – 20:00',
    },
    textile: {
      why: WHY.ta.industry, cat: 'ஜவுளி உற்பத்தியாளர்', tagline: 'உலகத்துக்கான துணிகள்', head: 'உலகெங்கும் உள்ள பிராண்டுகளுக்காக நெய்யப்பட்ட துணிகள்', sub: 'பருத்தி, லினன், கலப்புத் துணிகள், உங்கள் தேவைக்கேற்ப சாயமிட்டு முடிக்கப்படுகின்றன.', cta: 'மாதிரிகளைக் கோருங்கள்',
      stats: [['20 லட்சம் மீ', 'மாதாந்திர திறன்'], ['GOTS', 'ஆர்கானிக் சான்று'], ['22', 'ஏற்றுமதி சந்தைகள்']],
      services: [['நெசவு', 'பருத்தி, லினன், கலப்பு.'], ['சாயமிடுதல்', 'உங்கள் லேப் டிப்புக்கு ஏற்ற நிறம்.'], ['அச்சிடுதல்', 'டிஜிட்டல், ரோட்டரி.'], ['ஆடை தயாரிப்பு', 'வெட்டுதல், தைத்தல், முடித்தல்.']],
      offer: ['ஆர்டர் விவரம்', [['மாதிரி கிட்', 'இலவசம்', 'உலகெங்கும் அனுப்பப்படும்'], ['குறைந்தபட்ச ஆர்டர்', '1,000 மீ', 'ஒரு நிறத்துக்கு'], ['உற்பத்தி காலம்', '30–45 நாட்கள்', 'மொத்த உற்பத்தி'], ['லேப் டிப்', '5 நாட்கள்', 'நிற ஒப்புதல்']]],
      hours: 'திங்கள்–சனி 09:00 – 18:00',
    },
    'travel-agency': {
      why: WHY.ta.travel, cat: 'பயண நிறுவனம்', tagline: 'உங்களுக்காகத் திட்டமிட்ட விடுமுறைகள்', head: 'நீங்கள் பெட்டியைக் கட்டினால் போதும்', sub: 'இந்தியா மற்றும் வெளிநாடுகளுக்கான தனிப்பயன் பயணங்கள், விமானம், தங்குமிடம், விசா, வழிகாட்டிகளுடன்.', cta: 'என் பயணத்தைத் திட்டமிடுங்கள்',
      stats: [['8,000+', 'மகிழ்ச்சியான பயணிகள்'], ['40+', 'இடங்கள்'], ['24/7', 'பயண உதவி']],
      services: [['உள்நாட்டு சுற்றுலா', 'கேரளா, காஷ்மீர், கோவா மற்றும் பல.'], ['வெளிநாட்டு சுற்றுலா', 'துபாய், பாலி, ஐரோப்பா, தாய்லாந்து.'], ['விசா', 'ஆவணங்களை நாங்கள் கவனிக்கிறோம்.'], ['நிறுவனப் பயணம்', 'ஆஃப்சைட், ஊக்கப் பயணங்கள்.']],
      offer: ['தொகுப்புகள்', [['கேரளா, 5 நாட்கள்', '₹24,999', 'ஒருவருக்கு'], ['துபாய், 5 நாட்கள்', '₹54,999', 'விமானத்துடன்'], ['பாலி, 6 நாட்கள்', '₹62,999', 'விமானத்துடன்'], ['தனிப்பயன் பயணம்', 'இலவச திட்டம்', '24 மணி நேரத்தில்']]],
      hours: 'திங்கள்–சனி 10:00 – 19:00',
    },
  },
  fr: {
    restaurant: {
      why: WHY.fr.food, cat: 'Restaurant', tagline: 'Cuisine indienne moderne', head: 'Des saveurs mijotées, servies avec soin', sub: 'Une salle chaleureuse, une carte de saison et une table qui vous attend.', cta: 'Réserver une table',
      stats: [['4,8', 'note moyenne'], ['120', 'couverts'], ['15 min', 'confirmation']],
      services: [['Sur place', 'Des soirées détendues en famille ou entre amis.'], ['Salon privé', 'Une salle au calme jusqu’à 24 convives.'], ['À emporter', 'Commandez à l’avance, récupérez chaud.'], ['Traiteur', 'Notre carte pour vos événements.']],
      offer: ['Carte signature', [['Aubergine fumée', '₹320', 'Yaourt, grenade, menthe'], ['Souris d’agneau confite', '₹780', 'Riz au safran, légumes grillés'], ['Thali du jardin', '₹450', 'Sélection végétarienne de saison'], ['Kulfi à la cardamome', '₹180', 'Pistache et rose']]],
      hours: 'Tous les jours 11h – 23h',
    },
    'cafe-bakery': {
      why: WHY.fr.food, cat: 'Café et boulangerie', tagline: 'Cuit chaque matin', head: 'Bon café, pain chaud, matins tranquilles', sub: 'Pain au levain, viennoiseries et gâteaux sur mesure, cuits sur place dès 6 h.', cta: 'Commander un gâteau',
      stats: [['6 h', 'première fournée'], ['30+', 'fournées par jour'], ['24 h', 'délai gâteau sur mesure']],
      services: [['Café', 'Café, petit-déjeuner et assiettes toute la journée.'], ['Gâteaux sur mesure', 'Anniversaires, mariages, fêtes.'], ['Abonnement pain', 'Pains frais livrés chaque semaine.'], ['Commandes bureau', 'Boîtes gourmandes pour les équipes.']],
      offer: ['Au comptoir', [['Pain au levain', '₹220', 'Fermentation sur deux jours'], ['Croissant au beurre', '₹110', 'Feuilletage maison'], ['Gâteau de fête (1 kg)', '₹1,400', 'Parfum au choix'], ['Café filtre', '₹90', 'À la mode d’Inde du Sud']]],
      hours: 'Tous les jours 6h – 20h',
    },
    'dental-clinic': {
      why: WHY.fr.health, cat: 'Cabinet dentaire', tagline: 'Dentisterie familiale en douceur', head: 'Un sourire plus sain, sans inquiétude', sub: 'Contrôles, blanchiment, aligneurs et implants par une équipe douce et attentionnée.', cta: 'Prendre rendez-vous',
      stats: [['12 ans', 'd’expérience'], ['8 000+', 'patients'], ['Le jour même', 'soulagement de la douleur']],
      services: [['Contrôle et détartrage', 'Traiter les petits soucis avant qu’ils grandissent.'], ['Blanchiment', 'Plus éclatant en une séance.'], ['Aligneurs et appareils', 'Des dents alignées à tout âge.'], ['Implants', 'Un résultat naturel.']],
      offer: ['Soins', [['Contrôle avec radio', '₹499', 'Plan de traitement inclus'], ['Détartrage et polissage', '₹1,200', 'Propre et frais'], ['Blanchiment', '₹6,500', 'Jusqu’à 8 teintes plus clair'], ['Consultation aligneurs', 'Gratuit', 'Découvrez vos options']]],
      hours: 'Lun–Sam 9h – 20h',
    },
    'law-firm': {
      why: WHY.fr.pro, cat: 'Cabinet d’avocats', tagline: 'Avocats et conseils juridiques', head: 'Des réponses claires. Une défense solide.', sub: 'Droit civil, des sociétés, immobilier et de la famille, avec des conseils clairs et des forfaits.', cta: 'Prendre une consultation',
      stats: [['30 ans', 'de pratique cumulée'], ['Cour d’appel', 'et tribunaux'], ['Forfaits', 'disponibles']],
      services: [['Droit immobilier', 'Vérifications de titres et litiges.'], ['Droit des sociétés', 'Contrats et conformité.'], ['Droit de la famille', 'Traité avec discrétion.'], ['Contentieux civil', 'De la mise en demeure au jugement.']],
      offer: ['Honoraires', [['Consultation', '₹2,000', '45 minutes'], ['Vérification de titre', 'dès ₹7,500', 'Rapport écrit'], ['Rédaction de contrat', 'dès ₹5,000', 'Deux révisions'], ['Mise en demeure', 'dès ₹3,500', 'Rédigée et envoyée']]],
      hours: 'Lun–Ven 9h30 – 18h30',
    },
  },
  de: {
    restaurant: {
      why: WHY.de.food, cat: 'Restaurant', tagline: 'Moderne indische Küche', head: 'Langsam gegarte Aromen, mit Sorgfalt serviert', sub: 'Ein warmer Raum, eine saisonale Karte und ein Tisch, der auf Sie wartet.', cta: 'Tisch reservieren',
      stats: [['4,8', 'Durchschnittsbewertung'], ['120', 'Plätze'], ['15 Min.', 'Bestätigung']],
      services: [['Im Restaurant', 'Entspannte Abende mit Familie und Freunden.'], ['Privater Raum', 'Ein ruhiger Raum für bis zu 24 Gäste.'], ['Zum Mitnehmen', 'Vorbestellen und heiß abholen.'], ['Catering', 'Unsere Küche auf Ihrer Feier.']],
      offer: ['Signature-Karte', [['Geräucherte Aubergine', '₹320', 'Joghurt, Granatapfel, Minze'], ['Geschmorte Lammhaxe', '₹780', 'Safranreis, gegrilltes Gemüse'], ['Garten-Thali', '₹450', 'Saisonale vegetarische Auswahl'], ['Kardamom-Kulfi', '₹180', 'Pistazie und Rose']]],
      hours: 'Täglich 11:00 – 23:00',
    },
    'dental-clinic': {
      why: WHY.de.health, cat: 'Zahnarztpraxis', tagline: 'Sanfte Zahnmedizin für die ganze Familie', head: 'Ein gesünderes Lächeln, ganz ohne Sorgen', sub: 'Kontrollen, Bleaching, Aligner und Implantate von einem einfühlsamen Team.', cta: 'Termin vereinbaren',
      stats: [['12 Jahre', 'Praxiserfahrung'], ['8.000+', 'Patienten'], ['Am selben Tag', 'Schmerzbehandlung']],
      services: [['Kontrolle und Reinigung', 'Kleine Probleme früh erkennen.'], ['Bleaching', 'Strahlender in einer Sitzung.'], ['Aligner und Zahnspangen', 'Gerade Zähne in jedem Alter.'], ['Implantate', 'Natürlich aussehender Zahnersatz.']],
      offer: ['Behandlungen', [['Kontrolle mit Röntgen', '₹499', 'Inklusive Behandlungsplan'], ['Professionelle Zahnreinigung', '₹1,200', 'Sauber und frisch'], ['Bleaching', '₹6,500', 'Bis zu 8 Stufen heller'], ['Aligner-Beratung', 'Kostenlos', 'Ihre Möglichkeiten']]],
      hours: 'Mo–Sa 09:00 – 20:00',
    },
    'electrician-plumber': {
      why: WHY.de.home, cat: 'Elektriker und Installateur', tagline: 'Reparaturen in 60 Minuten', head: 'Zuverlässige Elektriker und Installateure, in einer Stunde vor Ort', sub: 'Geprüfte Techniker, feste Anfahrtspauschale und 30 Tage Garantie.', cta: 'Techniker buchen',
      stats: [['60 Min.', 'Anfahrt'], ['₹199', 'Anfahrtspauschale'], ['30 Tage', 'Garantie']],
      services: [['Elektroreparaturen', 'Schalter, Leitungen und Ventilatoren.'], ['Sanitär', 'Lecks, Armaturen und Verstopfungen.'], ['Installationen', 'Boiler, Leuchten und Wechselrichter.'], ['Wartungsverträge', 'Vorrangiger Service für Haushalte.']],
      offer: ['Preise', [['Anfahrt und Diagnose', '₹199', 'Wird verrechnet'], ['Ventilator-Montage', '₹349', 'Decke oder Wand'], ['Armatur tauschen', '₹299', 'Nur Arbeitszeit'], ['Jahresvertrag', '₹2,999', 'Unbegrenzte Einsätze']]],
      hours: 'Täglich 08:00 – 20:00',
    },
    manufacturing: {
      why: WHY.de.industry, cat: 'Fertigungsunternehmen', tagline: 'ISO 9001 zertifiziert', head: 'Präzisionsteile, pünktlich geliefert', sub: 'CNC-Bearbeitung, Blechbearbeitung und Montage für Automobil-, Pharma- und Maschinenbaukunden.', cta: 'Angebot anfordern',
      stats: [['ISO 9001', 'zertifiziert'], ['40+', 'CNC-Maschinen'], ['18', 'Exportländer']],
      services: [['CNC-Bearbeitung', 'Toleranzen bis 5 Mikrometer.'], ['Blechbearbeitung', 'Laserschneiden und Kanten.'], ['Montage', 'Von Baugruppen bis zum Fertigprodukt.'], ['Qualitätsprüfung', 'KMG- und Materialberichte.']],
      offer: ['Leistungen', [['Prototyp', '7 Tage', 'Nach Ihrer Zeichnung'], ['Serienfertigung', '2–4 Wochen', 'Los- oder Auftragsfertigung'], ['Export', 'FOB / CIF', 'Dokumente inklusive'], ['Angebot', '48 Stunden', 'Zeichnung senden']]],
      hours: 'Mo–Sa 09:00 – 18:00',
    },
  },
}

const bySlug = Object.fromEntries(industries.map((x) => [x.slug, x]))

// One merged site object per translated demo
export const localized = Object.entries(T).flatMap(([lang, demos]) =>
  Object.entries(demos)
    .filter(([slug]) => bySlug[slug])
    .map(([slug, t]) => {
      const base = bySlug[slug]
      return {
        ...base,
        ...t,
        addr: UI[lang].addr,
        lang,
        baseSlug: slug,
        baseCat: base.cat,
        slug: `${slug}-${lang}`,
        path: `${base.path}/${lang}`,
      }
    }),
)

export const localizedByPath = Object.fromEntries(localized.map((x) => [x.path, x]))

// All language versions of a demo, English first
export function versionsOf(baseSlug) {
  const base = bySlug[baseSlug]
  if (!base) return []
  return [{ lang: 'en', path: base.path }, ...localized.filter((x) => x.baseSlug === baseSlug).map((x) => ({ lang: x.lang, path: x.path }))]
}

export const languageGroups = Object.keys(T).map((lang) => ({ lang, ...LANGS[lang], items: localized.filter((x) => x.lang === lang) }))
