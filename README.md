# Green Light Driving School

A static Next.js website for a fictitious Bristol driving school, built for the Jamstacks gallery.
Use Node 24 or later and npm.

```sh
npm ci
npm run dev
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Featured lesson prices, instructor availability, the route to test day and Bristol pick-up areas |
| `/lessons/` | All lesson packages, hourly rates and lesson policies |
| `/instructors/` | Instructor profiles and filters for pick-up area and transmission |
| `/test-prep/` | Eight lesson stages, private readiness checks, practice questions and a test-day checklist |
| `/contact/` | Enquiries, email and phone, Bristol phone hours and pick-up areas |
| `/404.html` | Wrong Turn page with directions back |

## Edit the website

| File | Owns |
| --- | --- |
| `app/page.tsx`, `app/<route>/page.tsx`, `app/not-found.tsx` | Page copy, section order and calls to action |
| `content/business.ts` | Shared business name, email, phone, city, description and weekly phone hours |
| `content/lessons.ts` | Hourly rates, lesson packages, hours, prices, availability, Home selection, inclusions and sign colours |
| `content/instructors.ts` | Profile names, optional pronouns, car and transmission, area and package references, languages, specialties, teaching years, availability, quotes and badge numbers |
| `content/areas.ts` | Pick-up neighbourhoods by side of Bristol and test centre names |
| `content/test-prep.ts` | Eight numbered stages, typical hours, practice questions and hints, fault fixes and the test-day checklist |
| `lib/validate-content.ts`, `lib/structured-data.ts` | Build-time validation and content-derived JSON-LD |
| `app/tailwind.input.css`, `components/road-art.tsx` | Themes, shared visual styles and inline road artwork |
| `site.config.json` | Public site name, description, domain, time zone and Jamstacks configuration |

Edit copy where it appears in the route file. For example, change `<Hero.Heading>…</Hero.Heading>`
in `app/page.tsx` to change the home headline. When renaming the school, update `business.name`,
`site.config.json.name`, the wordmark in the header and footer, and `public/og.png`. Keep business
data in `content/` because the provisioner can replace the public configuration file.

To try the two most common edits, find `starter-ten` in `content/lessons.ts` and change
`priceManual` from `400` to `410`. Find `tom-reilly` in `content/instructors.ts` and change
`availability` from `'waitlist'` to `'taking-pupils'`. Refresh the preview. The new manual price
appears on Home, Lessons and the manual instructors’ package lists. Tom’s update appears on Home,
his profile and the Instructors call to action. Home JSON-LD reflects both edits.

Prices are positive whole pounds, at most the package hours multiplied by the matching hourly rate.
Use `null` for a transmission you do not offer and remove that package reference from instructors
who teach that transmission. Set package availability to `open`, `limited` or `paused`, and
keep exactly four packages marked `featured`. Instructor availability accepts `taking-pupils`,
`waitlist` or `full`. Keep IDs unique and URL-safe, instructor plate numbers unique and two digits
long, and junctions numbered 1 through 8. Changing a stage ID resets that stage’s saved readiness.

## Appearance and browser behavior

Lilita One, Inclusive Sans and Gochi Hand are self-hosted using their Fontsource packages under the
SIL Open Font License. The theme starts from the visitor’s light or dark preference. The theme button
can override it. The traffic light stays green immediately under reduced motion. Print styles keep
lesson prices for both transmissions and the test-prep checklists visible.

Use `site.config.json.timeZone` and `phoneHours` in `content/business.ts` to set phone availability.
The site uses inclusive opening times and exclusive closing times in the configured zone. Omit both
times for a closed day. Phone status is computed locally and updates every minute. Lessons run
07:00–21:00 by arrangement. Only the phone hours affect the status display.

Both prices and the full instructor list are available without JavaScript. Readiness choices stay in
browser storage. With JavaScript disabled the stage radio groups still work for the current visit
and the summary lamps stay unlit.

## Public configuration

```json
{
  "name": "Green Light Driving School",
  "description": "Friendly L-plate driving lessons across Bristol.",
  "domain": "next-driving-school.jamstacks.net",
  "timeZone": "Europe/London",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

Replace the demo domain with your own when creating a customer site. The public time zone controls
phone status. Canonical URLs and social images use the Pages URL when it is supplied.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config timeZone |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

Copy .env.example to .env.local for Next.js local work. All listed values are public. Never add tokens,
SMTP credentials or publishing keys. Newer dependencies should stay within reviewed majors; update
package.json and package-lock.json together, then run the full checks.

## Contact contract

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap appear only
on Contact when configured. Without a site ID there is no embed host/request. Email remains visible
in either case. The hosted runtime owns name/email/message fields, validation, submission and results.
Never register the element locally, substitute a form or intercept submission. Contact navigation uses
full document loads via SiteLink because the runtime has no remount API. Copy must describe an enquiry,
not a confirmed booking/order/payment; no attachments or extra input fields.

For local Jamstacks development, configure an explicit local CDN URL and
`JAMSTACKS_ALLOW_LOCAL_CDN=1`; remote builds reject localhost. A locally loaded component does not prove
real message delivery. Test delivery separately against a configured site/backend.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Tests cover config/provisioner compatibility, embed state, content rules, Bristol phone hours and readiness,
and structured-data escaping. Typecheck uses Next's generated route types.
When changing the Contact integration, base paths or canonical URLs, check the exported HTML and
sitemap. Verify both configured and unconfigured Contact with the corresponding build settings.
Test light/dark at desktop and mobile widths, keyboard navigation, unknown routes, repeated Contact
navigation and any added browser interactions. Return to a normal build before capturing final assets.

## GitHub Pages deployment

`.github/workflows/pages.yml` uses npm ci, tests, typecheck and static export. It preserves Jamstacks'
`provisioning_id` dispatch input
and correlated run name. It builds pull requests without deploying, and publishes main/manual runs.
Configure Pages to use GitHub Actions. GitHub ignores a CNAME file for Actions deployments, so do not
add public/CNAME; the custom domain is a repository setting. The workflow sets it before building
when a `PAGES_ADMIN_TOKEN` secret is available (a fine-grained token with Administration and Pages
write access to the repository, e.g. as an organisation secret). The domain is the `SITE_DOMAIN`
variable, else site.config.json's `domain`, else `<repo-name>.jamstacks.net` for JamstackTemplates
repositories. Once the domain is set and its certificate is issued, a later deploy also enforces HTTPS.
Without the secret the step only prints a notice; set the custom domain and HTTPS in Settings → Pages.
DNS is managed separately; for template demos the CNAME targets `jamstacktemplates.github.io`.

## Content Security Policy

A host-level CSP must permit same-origin Next.js scripts/assets, the inline theme bootstrap (using an
appropriate hash/nonce policy), the configured Jamstacks CDN scripts/assets and the published form's
API connection origin. Derive actual directives from the deployed component. Apply CSP at the host; static export cannot set response headers
through a running Next.js server. Do not put private credentials into CSP or relax policies blindly.

## Publishing assets and structure

`app/`, `components/`, `content/`, `lib/` and `types/` are the website. `scripts/` includes static
preview and verification, `tests/` covers customer behavior, and `.github/` supplies deployment.
`jamstacks/` is removable gallery-only source metadata. Ordinary builds, tests and Pages work after
it is deleted. To publish a gallery template, create [its manifest](jamstacks/README.md) and capture
genuine screenshots before running its separate publishing test:

```sh
node /home/mythz/src/mythz/jamstacks.net/tools/template-screenshots/capture.mjs \
  --template . --modes light,dark --width 1440 --height 900 --executable /usr/bin/chromium
node --test jamstacks/config.test.mjs
```

Keep `plan/` and `.claude/skills/` through design review. Remove them before publishing the gallery
template. The customer site works without those folders.

The test-prep guide refers to [DVSA vehicle safety questions](https://www.gov.uk/government/publications/car-show-me-tell-me-vehicle-safety-questions/car-show-me-tell-me-vehicle-safety-questions),
[driving-test requirements](https://www.gov.uk/driving-test) and
[provisional licence guidance](https://www.gov.uk/driving-lessons-learning-to-drive).
