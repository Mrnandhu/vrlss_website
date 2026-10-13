// Metadata for the live demos. Used by the Work page, Home page, routes and SEO.
export const demos = [
  {
    slug: 'online-store',
    path: '/work/online-store',
    category: 'Online store',
    name: 'Online store',
    brand: 'Hearth & Co',
    blurb: 'Product catalogue, filters, cart and checkout flow with prices in the visitor’s currency.',
    features: ['Search, filters and sorting', 'Slide-out cart with free-shipping progress', 'Multi-currency prices', 'Ready for Stripe, Razorpay or PayPal'],
    tone: 'blue',
    title: 'Online Store Demo: E-commerce Website Example',
    description:
      'Try a working e-commerce website demo with product filters, cart, checkout flow and multi-currency prices. Built for shops that want to sell online.',
  },
  {
    slug: 'booking-system',
    path: '/work/booking-system',
    category: 'Booking system',
    name: 'Booking system',
    brand: 'Aster Studio',
    blurb: 'Customers choose a service, date and time, then get an instant confirmation and calendar file.',
    features: ['Service, date and time picker', 'No double bookings', 'Instant confirmation + calendar file', 'WhatsApp and email reminders'],
    tone: 'teal',
    title: 'Booking System Demo: Online Appointment Booking Example',
    description:
      'Try an online appointment booking system demo for clinics, salons, studios and service businesses. Pick a service, date and time and get a confirmation.',
  },
  {
    slug: 'sales-dashboard',
    path: '/work/sales-dashboard',
    category: 'Dashboard',
    name: 'Sales dashboard',
    brand: 'Northwind Retail',
    blurb: 'Live-feeling KPIs, charts and an orders table you can filter, sort and export.',
    features: ['KPI cards with trends', 'Interactive charts', 'Filter, sort and CSV export', 'Connects to your real data'],
    tone: 'ink',
    title: 'Sales Dashboard Demo: Analytics Dashboard Example',
    description:
      'Explore an interactive business dashboard demo with KPIs, charts, filters and CSV export. See how your own data could look in a custom dashboard.',
  },
  {
    slug: 'customer-portal',
    path: '/work/customer-portal',
    category: 'Customer portal',
    name: 'Customer portal',
    brand: 'Harbor Services',
    blurb: 'A private area where customers track projects, pay invoices and contact support.',
    features: ['Secure customer sign-in', 'Project progress tracking', 'Invoices and online payment', 'Support tickets'],
    tone: 'sun',
    title: 'Customer Portal Demo: Client Login Area Example',
    description:
      'Try a customer portal demo with project tracking, invoices and support tickets. A private client area that saves you hours of email.',
  },
  {
    slug: 'mobile-app',
    path: '/work/mobile-app',
    category: 'Mobile app',
    name: 'Mobile app',
    brand: 'Brewly',
    blurb: 'An ordering app for iPhone and Android with menu, cart, live order status and rewards.',
    features: ['iPhone and Android', 'Order tracking and push alerts', 'Loyalty rewards', 'Works with your existing systems'],
    tone: 'rose',
    title: 'Mobile App Demo: iPhone and Android App Example',
    description:
      'Tap through a mobile app demo with menu, cart, order tracking and rewards. See what a custom iPhone and Android app could do for your business.',
  },
  {
    slug: 'sales-crm',
    path: '/work/sales-crm',
    category: 'Internal tool',
    name: 'Sales pipeline tool',
    brand: 'PipelineOne',
    blurb: 'An internal CRM board: drag leads between stages, add deals and see pipeline value.',
    features: ['Drag-and-drop pipeline', 'Search and add leads', 'Pipeline value totals', 'Replaces messy spreadsheets'],
    tone: 'violet',
    title: 'Internal Tool Demo: Sales CRM Pipeline Example',
    description:
      'Try an internal business tool demo: a drag-and-drop sales CRM pipeline. See how custom software can replace spreadsheets and speed up your team.',
  },
  {
    slug: 'invoice-generator',
    path: '/work/invoice-generator',
    category: 'Internal tool',
    name: 'Invoice generator',
    brand: 'Your Company',
    blurb: 'Create a professional invoice in seconds: add items, taxes and print or save it as a PDF.',
    features: ['Live invoice preview', 'Automatic totals and tax', 'Save as PDF', 'Can connect to your accounting software'],
    tone: 'teal',
    title: 'Invoice Generator Demo: Custom Business Tool Example',
    description:
      'Try an invoice generator demo, an example of a custom internal business tool. Add items, tax and totals, then print or save as PDF.',
  },
]

export const demoByPath = Object.fromEntries(demos.map((d) => [d.path, d]))
