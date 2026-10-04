#!/usr/bin/env bash
# VRLS website - PageSpeed fixes
# Run from the project root:  bash fix-performance.sh
set -euo pipefail

if [ ! -f package.json ] || [ ! -d src ]; then
  echo "Run this from inside the vrlss_website folder." >&2
  exit 1
fi

echo "==> Backing up src, public and index.html to ../vrlss_backup_$(date +%H%M)"
BK="../vrlss_backup_$(date +%H%M)"
mkdir -p "$BK"
cp -r src public index.html "$BK"/

# ---------------------------------------------------------------
# FIX 1: Logo 1.3 MB PNG (1983px) shown at 150px -> 400px WebP
# ---------------------------------------------------------------
echo "==> Fix 1: compressing logo"
python3 - <<'PY'
import sys
try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow missing. Run: sudo apt install python3-pil   then re-run this script.")
im = Image.open("public/vrls-logo.png").convert("RGBA")
w = 400
h = round(im.height * w / im.width)
im = im.resize((w, h), Image.LANCZOS)
im.save("public/vrls-logo.webp", "WEBP", quality=90, method=6)
im.save("public/vrls-logo-small.png", "PNG", optimize=True)
print(f"   logo -> {w}x{h}")
PY

perl -0pi -e 's#<img\s+src="/vrls-logo\.png"\s+alt="VRLS Solutions"\s+className="navbar-logo-image"\s*/>#<img\n          src="/vrls-logo.webp"\n          alt="VRLS Solutions"\n          className="navbar-logo-image"\n          width="150"\n          height="60"\n          decoding="async"\n        />#' src/components/Navbar.jsx
grep -q 'vrls-logo.webp' src/components/Navbar.jsx && echo "   Navbar now uses vrls-logo.webp"

# ---------------------------------------------------------------
# FIX 2: Showcase carousel loads 30 Unsplash images at 2200px q90
#        -> 800px q70 + responsive srcset (phones get 500px)
# ---------------------------------------------------------------
echo "==> Fix 2: showcase images"
sed -i 's/auto=format&fit=crop&w=2200&q=90/auto=format\&fit=crop\&w=800\&q=70/g' src/components/SolutionShowcase.jsx

python3 - <<'PY'
p = "src/components/SolutionShowcase.jsx"
s = open(p).read()
old = """                    <img
                      src={solution.image}
                      alt={`${solution.title} concept`}
                      loading="lazy"
                    />"""
new = """                    <img
                      src={solution.image}
                      srcSet={`${solution.image.replace('w=800', 'w=500')} 500w, ${solution.image} 800w`}
                      sizes="(max-width: 760px) 82vw, 410px"
                      width="800"
                      height="500"
                      alt={`${solution.title} concept`}
                      loading="lazy"
                      decoding="async"
                    />"""
if old in s:
    s = s.replace(old, new)
    open(p, "w").write(s)
    print("   srcset added to showcase images")
else:
    print("   WARNING: showcase <img> block not found, skipped srcset")
PY

# ---------------------------------------------------------------
# FIX 3: Demo pages - cap Unsplash images at 1400px, quality 70
# ---------------------------------------------------------------
echo "==> Fix 3: demo page images"
find src/demos -type f \( -name '*.jsx' -o -name '*.css' \) -print0 | xargs -0 perl -pi -e \
  's/(images\.unsplash\.com\/[^\x27"\)\s]*?)w=(\d+)&q=(\d+)/$1 . "w=" . ($2 > 1400 ? 1400 : $2) . "&q=70"/ge'
echo "   done"

# ---------------------------------------------------------------
# FIX 4: index.html preloads hero.avif / hero-mobile.avif which the
#        page never shows. Preload the real hero image instead.
# ---------------------------------------------------------------
echo "==> Fix 4: hero preload"
python3 - <<'PY'
import re
p = "index.html"
s = open(p).read()
s = re.sub(r'\s*<link\s+rel="preload"\s+as="image"\s+type="image/avif"[^>]*?/>', '', s, flags=re.S)
if 'hero-redesign.webp' not in s:
    s = s.replace("</head>",
      '    <link rel="preload" as="image" type="image/webp" href="/assets/hero-redesign.webp" fetchpriority="high" />\n  </head>')
open(p, "w").write(s)
print("   preload now points at /assets/hero-redesign.webp")
PY

# ---------------------------------------------------------------
# FIX 5: 2.4 MB hero video downloads on phones.
#        Phones (<=760px) and data-saver users get the poster only.
# ---------------------------------------------------------------
echo "==> Fix 5: no hero video on mobile"
python3 - <<'PY'
p = "src/components/HomePage.jsx"
s = open(p).read()
a_old = "  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches\n"
a_new = (a_old +
  "  const isSmallScreen = window.matchMedia('(max-width: 760px)').matches\n"
  "  const saveData = Boolean(navigator.connection && navigator.connection.saveData)\n"
  "  const playHeroVideo = !prefersReducedMotion && !isSmallScreen && !saveData\n")
b_old = """              <video
                autoPlay={!prefersReducedMotion}
                muted
                loop
                playsInline
                preload={prefersReducedMotion ? 'none' : 'metadata'}
                poster="/assets/hero-redesign.webp"
                aria-hidden="true"
                tabIndex={-1}
              >
                <source src="/assets/hero.mp4" type="video/mp4" />
              </video>"""
b_new = """              <video
                autoPlay={playHeroVideo}
                muted
                loop
                playsInline
                preload={playHeroVideo ? 'metadata' : 'none'}
                poster="/assets/hero-redesign.webp"
                aria-hidden="true"
                tabIndex={-1}
              >
                {playHeroVideo && <source src="/assets/hero.mp4" type="video/mp4" />}
              </video>"""
ok = a_old in s and b_old in s
if ok:
    s = s.replace(a_old, a_new).replace(b_old, b_new)
    open(p, "w").write(s)
    print("   hero video now desktop-only")
else:
    print("   WARNING: hero block not found, skipped")
PY

# ---------------------------------------------------------------
# FIX 6: All 10 demos (JS + CSS) load on the homepage.
#        Lazy-load each demo only when its URL is opened.
# ---------------------------------------------------------------
echo "==> Fix 6: lazy-load demo pages"
cat > src/App.jsx <<'EOF'
import { lazy, Suspense } from 'react'
import SEO from './components/SEO'
import HomePage from './components/HomePage'

import './royal-theme.css'

const demos = {
  '/demos/nova-developments': lazy(() => import('./demos/NovaDevelopments/NovaDevelopments')),
  '/demos/atlas-interiors': lazy(() => import('./demos/AtlasInteriors/AtlasInteriors')),
  '/demos/alpha-contracting': lazy(() => import('./demos/AlphaContracting/AlphaContracting')),
  '/demos/medora-clinic': lazy(() => import('./demos/MedoraClinic/MedoraClinic')),
  '/demos/majlis-hospitality': lazy(() => import('./demos/MajlisHospitality/MajlisHospitality')),
  '/demos/lumi-events': lazy(() => import('./demos/LumiEvents/LumiEvents')),
  '/demos/motion-auto': lazy(() => import('./demos/MotionAuto/MotionAuto')),
  '/demos/orbit-beauty-studio': lazy(() => import('./demos/OrbitBusiness/OrbitBusiness')),
  '/demos/gulfcore-trading': lazy(() => import('./demos/GulfCoreTrading/GulfCoreTrading')),
  '/demos/sands-tourism': lazy(() => import('./demos/SandsTourism/SandsTourism')),
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const Demo = demos[path]

  if (Demo) {
    return (
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <Demo />
      </Suspense>
    )
  }

  return (
    <>
      <SEO />
      <HomePage />
    </>
  )
}

export default App
EOF
echo "   App.jsx rewritten with lazy demos"

# ---------------------------------------------------------------
# FIX 7: Cache headers for root images (logo, og image, favicon)
# ---------------------------------------------------------------
echo "==> Fix 7: cache headers"
if ! grep -q '/vrls-logo.webp' public/_headers; then
cat >> public/_headers <<'EOF'

/vrls-logo.webp
  Cache-Control: public, max-age=2592000

/favicon.svg
  Cache-Control: public, max-age=2592000

/og-image.jpg
  Cache-Control: public, max-age=2592000
EOF
fi
echo "   done"

# ---------------------------------------------------------------
# Cleanup: unused heavy files and old backups (not served, but bloat the repo)
# ---------------------------------------------------------------
echo "==> Cleanup"
rm -f public/vrls-logo-backup.png public/assets/hero.png asset/hero.png
rmdir asset 2>/dev/null || true
find src -type f \( -name '*.backup' -o -name '*.before-*' -o -name '*.nova-backup' \) -print -delete

echo
echo "All done. Now run:"
echo "  npm run build && npm run preview"
echo "Open the preview URL, check the site, then commit and push."
