# SAgiK Hudiksvall – webbplats

Webbplatsen för SAgiK Hudiksvall, byggd med [Astro](https://astro.build) och med redigeringsläge via [Decap CMS](https://decapcms.org) på `/admin`.

- **Redaktörsguide:** se [REDIGERA.md](REDIGERA.md)
- **Innehåll:** allt ligger i `src/content/` (sidor, nyheter, kalender, inställningar)
- **Bilder:** `public/bilder/` (uppladdade via /admin hamnar i `public/bilder/uppladdat/`)
- **Utseende:** `src/styles/global.css` och `src/layouts/Bas.astro`

## Sidor

| Adress | Innehåll |
|---|---|
| `/` | Startsida med meddelande, nyheter och kommande händelser |
| `/om/`, `/trana-hos-oss/`, `/hundhall/`, `/traningar-tavlingar/`, `/kontakt/` | Fasta sidor |
| `/kalender/` | Månadsvy + lista över kommande händelser |
| `/kalender.ics` | Kalenderflöde att prenumerera på i mobilen |
| `/nyheter/` | Alla nyheter |
| `/admin/` | Redigeringsläget |

Gamla WordPress-adresser (`/tavling/`, `/kurser-och-traningar/`) skickas vidare via `public/_redirects`.

## Publicering (Cloudflare Workers)

Sajten byggs och publiceras automatiskt av Cloudflare vid varje ändring i `main`. Inställningarna finns i `wrangler.jsonc`.

1. **Cloudflare → Workers & Pages → Create → Import a repository**, välj `sagik-hudiksvall`.
2. Projektnamn `sagik-hudiksvall`, build command `npm run build`, deploy command `npx wrangler deploy`. Node-version styrs av `.node-version`.
3. Adressen blir `https://sagikhudiksvall.se`, som står i `astro.config.mjs` och `public/admin/config.yml`. Byter ni adress, ändra de två filerna.

Gamla WordPress-adresser skickas vidare via `public/_redirects`.

## Inloggning till /admin (DecapBridge)

Redaktörer loggar in med e-post och lösenord (eller Google) via [DecapBridge](https://decapbridge-web.pages.dev).

1. Skapa konto på DecapBridge och välj **Add site**: GitHub, repo `katzbagel/sagik-hudiksvall`, en fine-grained GitHub-token med **Contents: Read and write** för bara det här repot, och login URL `https://sagikhudiksvall.se/admin/index.html`.
2. Kopiera `backend:`-delen från den genererade config.yml till `public/admin/config.yml`.
3. Bjud in redaktörer under **Manage collaborators**.

Egen domän (t.ex. sagikhudiksvall.se) läggs till under **Settings → Domains & Routes** på workern i Cloudflare. Uppdatera då `site` i `astro.config.mjs`, `site_url` i `public/admin/config.yml` och login URL i DecapBridge.

## Utveckla lokalt

```bash
npm install
npm run dev          # sajten på http://localhost:4321
npx decap-server     # i ett annat fönster: /admin utan inloggning, sparar direkt i filerna
```
