import { Button, PageHero } from '../components/Bits'

export default function NotFound() {
  return (
    <>
      <PageHero title="Page not found" lead="The page you are looking for does not exist or has moved." />
      <div className="nx-wrap nx-nf">
        <Button to="/">Back to the homepage</Button>
      </div>
    </>
  )
}
