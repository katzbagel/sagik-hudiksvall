import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Vanliga sidor (Om, Träna hos oss, Hundhall ...)
const sidor = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/sidor' }),
  schema: z.object({
    title: z.string(),
    menytext: z.string().optional(),
    ingress: z.string().optional(),
    bild: z.string().optional(),
    bildtext: z.string().optional(),
    ordning: z.number().default(99),
  }),
});

// Nyheter som visas på startsidan
const nyheter = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/nyheter' }),
  schema: z.object({
    title: z.string(),
    datum: z.coerce.date(),
    bild: z.string().optional(),
    sammanfattning: z.string().optional(),
    utvald: z.boolean().default(false),
  }),
});

// Kalenderhändelser: träningar, kurser, tävlingar m.m.
const kalender = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/kalender' }),
  schema: z.object({
    title: z.string(),
    datum: z.coerce.date(),
    // Tomt fält från redigeringsläget blir "" – tolka det som inget slutdatum
    slutdatum: z.preprocess((v) => (v === '' || v == null ? undefined : v), z.coerce.date().optional()),
    tid: z.string().optional().nullable(),
    plats: z.string().optional().nullable(),
    typ: z.enum(['Träning', 'Kurs', 'Tävling', 'Hallen', 'Övrigt']).default('Övrigt'),
    anmalan: z.string().optional().nullable(),
  }),
});

const installningar = defineCollection({
  loader: file('./src/content/installningar/sajt.json', {
    parser: (text) => ({ sajt: JSON.parse(text) }),
  }),
  schema: z.object({
    namn: z.string(),
    slogan: z.string(),
    sedan: z.string().optional(),
    meddelande: z.string().optional(),
    meddelandelank: z.string().optional(),
    startbild: z.string().optional(),
    startbildtext: z.string().optional(),
    epost: z.string(),
    telefon: z.array(z.object({ namn: z.string(), nummer: z.string() })).default([]),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    betalning: z.object({
      bankgiro: z.string().optional(),
      swish: z.string().optional(),
      clearing: z.string().optional(),
      konto: z.string().optional(),
    }),
    sponsorer: z
      .array(z.object({ namn: z.string(), lank: z.string().optional(), logga: z.string().optional(), text: z.string().optional() }))
      .default([]),
  }),
});

export const collections = { sidor, nyheter, kalender, installningar };
