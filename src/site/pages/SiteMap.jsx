import { PageHero } from '../components/Bits'
import { Link } from '../router'
import { industries, sectors } from '../demos/industries'
import { demos } from '../demos/demoData'
import { languageGroups } from '../demos/locales'
import { cities, countries, placePath } from '../places'

// A plain list of every public page. Helps visitors and gives every page at least one internal link.
const main = [
  ['/', 'Home'], ['/websites', 'Web development'], ['/digital-marketing', 'Digital marketing'], ['/pricing', 'Pricing'],
  ['/work', 'Work and demos'], ['/start', 'Project planner and cost estimate'], ['/about', 'Studio'], ['/contact', 'Contact'],
]
const legal = [['/privacy', 'Privacy policy'], ['/terms', 'Terms of service'], ['/refunds', 'Refunds and cancellations']]

function Col({ title, items }) {
  return (
    <section className="sm-col">
      <h2>{title}</h2>
      <ul>{items.map(([to, label, lang]) => <li key={to}><Link to={to} lang={lang}>{label}</Link></li>)}</ul>
    </section>
  )
}

export default function SiteMap() {
  return (
    <>
      <PageHero crumb="Site map" title="Site map" lead="Every page on our website in one place." />
      <section className="nx-section sm-wrap">
        <div className="nx-wrap sm-grid">
          <Col title="Main pages" items={main} />
          <Col title="App and software demos" items={demos.map((d) => [d.path, d.name])} />
          <Col title="Countries" items={countries.map((c) => [placePath(c), `Website design in ${c.short}`])} />
          <Col title="India" items={[...cities.map((c) => [placePath(c), `Website design in ${c.name}`]), ['/te', 'తెలుగు (Telugu)', 'te']]} />
          {sectors.map(([k, label]) => {
            const list = industries.filter((x) => x.sector === k)
            return list.length ? <Col key={k} title={`${label} demos`} items={list.map((x) => [x.path, `${x.cat} website`])} /> : null
          })}
          {languageGroups.map((g) => <Col key={g.lang} title={`Demos in ${g.name}`} items={g.items.map((x) => [x.path, `${x.baseCat} (${g.native})`])} />)}
          <Col title="Policies" items={legal} />
        </div>
      </section>
    </>
  )
}
