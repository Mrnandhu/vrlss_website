const additionalTechnologies = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Tailwind CSS',
  'Vite',
  'Node.js',
  'Express',
  'Python',
  'FastAPI',
  'Flutter',
  'React Native',
  'Electron',
  'Java',
  'PostgreSQL',
  'MongoDB',
  'Firebase',
  'Supabase',
  'Git',
  'Docker',
  'AWS',
  'Vercel',
  'MySQL',
  'Redis',
  'REST API',
  'GraphQL',
  'GitHub',
  'Figma',
  'Linux',
  'Nginx',
  'Cloudflare',
  'Prisma',
  'JWT',
  'OAuth',
  'Postman',
  'GitHub Actions',
  'Razorpay',
  'Stripe',
  'Google Maps API',
  'WhatsApp API',
  'OpenAI API',
  'WebSockets',
  'PWA',
  'CI/CD',
]

function Technologies() {
  return (
    <section id="technologies" className="technologies-section technologies-minimal">
      <div className="technologies-container">
        <div className="technologies-heading">
          <div>
            <div className="technologies-eyebrow">
              <span />
              TECHNOLOGY
            </div>

            <h2>
              Built with
              <br />
              <em>the right stack.</em>
            </h2>
          </div>

          <p>
            A flexible technology stack for websites, applications, business
            software, APIs and digital products.
          </p>
        </div>

        <div className="technology-marquee technology-marquee-large" aria-label="Technology stack">
          <div className="technology-marquee-track">
            {[...additionalTechnologies, ...additionalTechnologies].map((technology, index) => (
              <span key={`${technology}-${index}`}>
                <i />
                {technology}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Technologies
