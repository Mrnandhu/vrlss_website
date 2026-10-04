const technologiesRowOne = [
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
]

const technologiesRowTwo = [
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

function TechnologyRow({ technologies, reverse = false }) {
  const repeated = [...technologies, ...technologies]

  return (
    <div
      className={`vrls-tech-row ${
        reverse ? 'vrls-tech-row-reverse' : ''
      }`}
    >
      <div className="vrls-tech-track">
        {repeated.map((technology, index) => (
          <span
            className="vrls-tech-item"
            key={`${technology}-${index}`}
          >
            <span className="vrls-tech-dot" />
            {technology}
          </span>
        ))}
      </div>
    </div>
  )
}

function Technologies() {
  return (
    <section
      id="technology"
      className="vrls-technology-section"
    >
      <div className="vrls-technology-intro">
        <span className="vrls-technology-eyebrow">
          TECHNOLOGY
        </span>

        <h2>
          Built with modern
          <br />
          <em>technology.</em>
        </h2>

        <p>
          The technologies and tools used across websites,
          web applications, mobile apps, business software,
          APIs, databases and digital products.
        </p>
      </div>

      <div
        className="vrls-technology-marquee"
        aria-label="Technologies used by VRLS Solutions"
      >
        <TechnologyRow technologies={technologiesRowOne} />
        <TechnologyRow
          technologies={technologiesRowTwo}
          reverse
        />
      </div>
    </section>
  )
}

export default Technologies
