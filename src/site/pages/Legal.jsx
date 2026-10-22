import { Section, PageHero } from '../components/Bits'
import { Link } from '../router'
import { brand } from '../brand'

export const LEGAL_UPDATED = '22 October 2026'

const who = `${brand.name} is a ${brand.legalForm} run by ${brand.founder} in ${brand.location}`

const pages = {
  '/privacy': {
    crumb: 'Privacy policy',
    title: 'Privacy policy',
    lead: 'What information we collect, why, and what you can ask us to do with it.',
    body: (
      <>
        <p>
          {who}. In this policy, “we” means {brand.name} and “you” means anyone who visits {brand.url.replace('https://', '')} or
          contacts us.
        </p>
        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Messages you send us.</strong> The contact form does not store anything on this website. It opens
            WhatsApp or your email app with your message filled in, and you choose whether to send it. We then receive
            your name, phone number or email, and whatever you write.
          </li>
          <li>
            <strong>Project material.</strong> If you hire us, we receive the text, photos, logins and other material
            you share for your project.
          </li>
          <li>
            <strong>Your currency choice.</strong> The site remembers the currency you pick in your own browser
            (local storage). It is not sent to us.
          </li>
          <li>
            <strong>Visit statistics.</strong> We use Google Analytics 4 and Microsoft Clarity to see how people use
            this site: pages visited, approximate city and country, device type, how you arrived (for example from
            Google or Instagram), and clicks on buttons such as WhatsApp or Call. Clarity also records anonymised
            screen sessions and heatmaps so we can fix confusing pages; text you type into forms is masked.
          </li>
        </ul>
        <p>
          These tools use cookies. We do not use advertising cookies or ad pixels, and we never try to identify you
          personally from these statistics. If you visit from Europe or the UK, statistics cookies are used only if
          you accept them in the banner. You can also block them with your browser settings or an ad blocker.
        </p>
        <h2>How we use it</h2>
        <ul>
          <li>To reply to you, prepare a demo or quote, and deliver work you have paid for.</li>
          <li>To send invoices and keep the records the law requires.</li>
          <li>To see which pages help visitors and fix the ones that confuse them (visit statistics).</li>
        </ul>
        <p>We never sell your information or share it for anyone else’s marketing.</p>
        <h2>Who else handles it</h2>
        <p>
          Messages pass through the services you choose to use: WhatsApp (Meta) or email (Google Gmail). Website
          fonts load from Google Fonts. Visit statistics are processed by Google (Analytics) and Microsoft (Clarity). During a project we may use hosting, domain and design tools; we share only
          what each one needs to do its job.
        </p>
        <h2>How long we keep it</h2>
        <p>
          Enquiries that do not become projects are deleted within 12 months. Client project records and invoices are
          kept for as long as Indian tax and accounting rules require.
        </p>
        <h2>Your choices</h2>
        <p>
          You can ask us to show, correct or delete the information we hold about you, as provided under India’s
          Digital Personal Data Protection Act, 2023. Send the request by WhatsApp or email and we will act on it
          within 30 days.
        </p>
        <h2>Contact</h2>
        <p>
          {brand.founder}, {brand.location}. WhatsApp {brand.whatsappDisplay}, phone {brand.phoneDisplay}, email{' '}
          <a href={`mailto:${brand.email}`}>{brand.email}</a>.
        </p>
      </>
    ),
  },
  '/terms': {
    crumb: 'Terms of service',
    title: 'Terms of service',
    lead: 'The plain-language rules for working together. Your written quote adds the details for your project.',
    body: (
      <>
        <p>
          {who}. These terms apply to every website project and marketing plan. If your written quote says something
          different, the quote wins for that project.
        </p>
        <h2>Free demos</h2>
        <p>
          A free demo is a sample homepage we build to show what your site could look like. It costs nothing and does
          not commit you to anything. Until you hire us, the demo design remains ours and may not be published by
          anyone else.
        </p>
        <h2>Quotes and prices</h2>
        <ul>
          <li>Every project starts with a written scope and a fixed price.</li>
          <li>Work outside that scope is quoted separately before we do it.</li>
          <li>
            Domain names, hosting, paid plugins and advertising budgets are paid at cost, directly or through us, and
            are not part of our fee.
          </li>
          <li>
            We are not currently registered for GST, so no GST is added to our invoices. If that changes, we will say so
            on new quotes.
          </li>
        </ul>
        <h2>Payment</h2>
        <ul>
          <li>Website projects: 50% to start, 50% before the site goes live.</li>
          <li>Marketing plans: billed monthly in advance. You can stop at the end of any month.</li>
          <li>Payment is by UPI or bank transfer, or by an international transfer method agreed in your quote.</li>
        </ul>
        <h2>What you provide</h2>
        <p>
          You provide the text, photos and logins we need, and confirm you have the right to use them. Timelines start
          once we have this material.
        </p>
        <h2>Revisions</h2>
        <p>
          Each package includes the number of revision rounds shown on the pricing page. Further rounds or new features
          are quoted separately.
        </p>
        <h2>Ownership</h2>
        <p>
          When the final payment is made, you own the design, code and content of your website, and every account is
          in your name. We may show the finished site in our portfolio unless you ask us not to.
        </p>
        <h2>Results</h2>
        <p>
          We guarantee the work we control: a working, fast, search-ready site and the marketing tasks listed in your
          plan. We cannot guarantee search rankings, enquiries or sales, because those also depend on your market,
          competitors and search engines.
        </p>
        <h2>Support after launch</h2>
        <p>
          We fix bugs in our own work for 30 days after launch at no cost. After that, changes are covered by the
          Website care plan or quoted separately.
        </p>
        <h2>Ending a project</h2>
        <p>
          Either side can end a project in writing. You pay for work done up to that point, and we hand over everything
          that has been paid for. See <Link to="/refunds">Refunds and cancellations</Link>.
        </p>
        <h2>Law</h2>
        <p>These terms are governed by the laws of India. Courts in Andhra Pradesh have jurisdiction.</p>
      </>
    ),
  },
  '/refunds': {
    crumb: 'Refunds and cancellations',
    title: 'Refunds and cancellations',
    lead: 'What happens to your money if you change your mind or something goes wrong.',
    body: (
      <>
        <p>{who}.</p>
        <h2>Free demos</h2>
        <p>Demos are free, so there is nothing to refund. You can say no at any point.</p>
        <h2>Website projects</h2>
        <ul>
          <li>
            <strong>Before design work starts:</strong> cancel in writing within 48 hours of paying the deposit and we
            refund it in full.
          </li>
          <li>
            <strong>After design work starts:</strong> the 50% deposit covers work already done and is not refunded.
            We hand over the designs completed so far.
          </li>
          <li>
            <strong>If we cannot deliver:</strong> if we miss the agreed scope and cannot fix it, we refund the money
            paid for the parts not delivered.
          </li>
        </ul>
        <h2>Marketing plans</h2>
        <ul>
          <li>Cancel any time by message; the plan stops at the end of the month you have paid for.</li>
          <li>We do not refund part-months.</li>
          <li>
            Ad budgets are paid directly to Google or Meta. Any unspent budget stays in your own ad account.
          </li>
        </ul>
        <h2>Third-party costs</h2>
        <p>
          Domains, hosting and paid tools bought for you are charged by those companies and follow their refund rules.
        </p>
        <h2>How refunds are paid</h2>
        <p>
          Approved refunds are paid within 7 working days to the account you paid from. Ask by WhatsApp on{' '}
          {brand.whatsappDisplay}, call {brand.phoneDisplay} or email <a href={`mailto:${brand.email}`}>{brand.email}</a>.
        </p>
      </>
    ),
  },
}

export const legalPaths = Object.keys(pages)
export const legalMeta = Object.fromEntries(Object.entries(pages).map(([k, v]) => [k, { crumb: v.crumb, title: v.title, lead: v.lead }]))

export default function Legal({ path }) {
  const page = pages[path]
  return (
    <>
      <PageHero crumb={page.crumb} title={page.title} lead={page.lead} />
      <Section tone="white">
        <article className="nx-legal">
          <p className="nx-legal-date">Last updated {LEGAL_UPDATED}</p>
          {page.body}
        </article>
      </Section>
    </>
  )
}
