// Alla datum lagras som "YYYY-MM-DD" och tolkas som UTC för att undvika tidszonsfel.
const opt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('sv-SE', { timeZone: 'UTC', ...o });

export const datumLang = (d: Date) => opt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(d);
export const datumKort = (d: Date) => opt({ day: 'numeric', month: 'short' }).format(d);
export const datumMedAr = (d: Date) => opt({ day: 'numeric', month: 'long', year: 'numeric' }).format(d);
export const dag = (d: Date) => opt({ day: 'numeric' }).format(d);
export const manad = (d: Date) => opt({ month: 'short' }).format(d).replace('.', '');
export const veckodag = (d: Date) => opt({ weekday: 'short' }).format(d).replace('.', '');
export const iso = (d: Date) => d.toISOString().slice(0, 10);

export function idagISO() {
  // Dagens datum i svensk tid
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Stockholm' }).format(new Date());
}

export function intervall(start: Date, slut?: Date | null) {
  if (!slut || iso(slut) === iso(start)) return datumLang(start);
  return `${datumKort(start)} – ${datumMedAr(slut)}`;
}
