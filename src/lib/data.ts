import { getCollection, getEntry } from 'astro:content';
import { iso } from './datum';

export async function sajt() {
  const e = await getEntry('installningar', 'sajt');
  if (!e) throw new Error('Saknar src/content/installningar/sajt.json');
  return e.data;
}

export async function menySidor() {
  const s = await getCollection('sidor');
  return s.sort((a, b) => a.data.ordning - b.data.ordning);
}

export async function allaHandelser() {
  const h = await getCollection('kalender');
  return h.sort((a, b) => +a.data.datum - +b.data.datum);
}

// Händelser som inte har passerat (byggtidens datum). Sidan byggs om varje natt.
export async function kommandeHandelser(fran: string) {
  return (await allaHandelser()).filter((h) => iso(h.data.slutdatum ?? h.data.datum) >= fran);
}

export async function nyheter() {
  return (await getCollection('nyheter')).sort((a, b) => +b.data.datum - +a.data.datum);
}
