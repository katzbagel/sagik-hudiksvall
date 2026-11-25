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

## Publicera på Netlify (en gång)

1. **Netlify → Add new project → Import an existing project → GitHub**, välj `sagik-hudiksvall`. Inställningarna läses från `netlify.toml`, klicka bara **Deploy**.
2. **Project configuration → Change project name**: döp till `sagikhudiksvall` (då blir adressen `sagikhudiksvall.netlify.app`, som redan står i `public/admin/config.yml` och `astro.config.mjs`). Väljer du ett annat namn, ändra de två filerna.
3. **Inloggning till /admin (GitHub OAuth):**
   1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
      - Application name: `SAgiK Hudiksvall CMS`
      - Homepage URL: `https://sagikhudiksvall.netlify.app`
      - Authorization callback URL: `https://api.netlify.com/auth/done`
   2. Skapa, klicka **Generate a new client secret** och kopiera Client ID + Client secret.
   3. Netlify → projektet → **Project configuration → Access & security → OAuth → Install provider → GitHub**, klistra in båda.
4. Öppna `https://sagikhudiksvall.netlify.app/admin` och logga in med GitHub.

Egen domän (t.ex. sagikhudiksvall.se) läggs till under **Domain management** i Netlify. Uppdatera då `site` i `astro.config.mjs` och `site_url` i `public/admin/config.yml`.

## Utveckla lokalt

```bash
npm install
npm run dev          # sajten på http://localhost:4321
npx decap-server     # i ett annat fönster: /admin utan inloggning, sparar direkt i filerna
```
