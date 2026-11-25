import type { APIRoute } from 'astro';
import { allaHandelser, sajt } from '../lib/data';
import { iso } from '../lib/datum';

const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
const fold = (line: string) => {
  const out: string[] = [];
  let rest = line;
  while (rest.length > 74) { out.push(rest.slice(0, 74)); rest = ' ' + rest.slice(74); }
  out.push(rest);
  return out.join('\r\n');
};
const kompakt = (d: Date) => iso(d).replace(/-/g, '');

export const GET: APIRoute = async ({ site }) => {
  const s = await sajt();
  const handelser = await allaHandelser();
  const nu = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
  const rader = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SAgiK Hudiksvall//Kalender//SV',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${esc(s.namn)}`,
    'X-WR-TIMEZONE:Europe/Stockholm',
  ];
  for (const h of handelser) {
    const d = h.data;
    const slut = new Date((d.slutdatum ?? d.datum).getTime() + 86400000); // heldag: slutdatum är exklusivt
    const beskr = [d.tid ? `Tid: ${d.tid}` : '', h.body?.trim() ?? ''].filter(Boolean).join('\n\n');
    rader.push(
      'BEGIN:VEVENT',
      `UID:${h.id}@sagikhudiksvall`,
      `DTSTAMP:${nu}`,
      `DTSTART;VALUE=DATE:${kompakt(d.datum)}`,
      `DTEND;VALUE=DATE:${kompakt(slut)}`,
      `SUMMARY:${esc(`${d.title}${d.tid && /^\d/.test(d.tid) ? ` kl ${d.tid}` : ''}`)}`,
      ...(d.plats ? [`LOCATION:${esc(d.plats)}`] : []),
      ...(beskr ? [`DESCRIPTION:${esc(beskr)}`] : []),
      `URL:${new URL(`/kalender/#${h.id}`, site).href}`,
      'END:VEVENT',
    );
  }
  rader.push('END:VCALENDAR');
  return new Response(rader.map(fold).join('\r\n') + '\r\n', {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
};
