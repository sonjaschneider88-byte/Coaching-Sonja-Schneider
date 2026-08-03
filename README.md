# Sonja Schneider – Systemisches Coaching (One-Pager)

Statische One-Page-Website für **Sonja Schneider**, angehende systemische Coach
(Schwerpunkt: berufliche & persönliche Orientierung, Entscheidungsfindung) –
tätig in Heidelberg & online. Aufgebaut so, dass sie später problemlos zum
Multi-Pager erweitert werden kann.

Kein Build-Schritt, kein CMS – reines HTML/CSS/JS. Einfach die Dateien auf einen
beliebigen Webspace (oder GitHub Pages / Netlify / Vercel) legen.

---

## Projektstruktur

```
.
├── index.html            One-Pager (Hero, Anlässe, Über mich, Ablauf, Kontakt)
├── impressum.html        Rechtsseite (Platzhalter – Inhalte von Kundin nötig)
├── datenschutz.html      Rechtsseite (Entwurf – an finale Tools anpassen)
├── css/styles.css        Design-System + Layout
├── js/main.js            Navigation, Scroll-Spy, Reveal, Formular
└── assets/
    ├── fonts/            selbst gehostete Schriften (Inter, Fraunces) – DSGVO-konform
    └── img/              Portrait (webp + jpg), OG-Bild, Favicon
```

Lokale Vorschau (ein statischer Server genügt):

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

---

## Design-Empfehlung (zur Freigabe durch die Kundin)

Die Kundin hatte drei Farbwelten offen gelassen. **Empfehlung: Salbeigrün +
warme Sandtöne** – umgesetzt ist bereits diese Variante.

Begründung:
- Das **Salbeigrün** harmoniert ruhig mit dem **dunkelblauen Hemd** und den
  warmen Hauttönen im Portraitfoto, ohne mit ihnen zu konkurrieren.
- Die **warmen Sandtöne** und der hohe Weißraum-Anteil erzeugen die gewünschte
  vertrauensvolle, warme (nicht „startup-kühle") Anmutung.
- Ein sehr dezenter **Terrakotta-Akzent** setzt sparsam Wärme-Punkte
  (Kachel-Nummern, kleine Linien) – bewusst zurückhaltend.

| Rolle              | Farbe      |
|--------------------|------------|
| Hintergrund/Papier | `#fbf9f5`  |
| Sandflächen        | `#f3efe7`  |
| Salbeigrün         | `#6e8b74`  |
| Salbei (Button)    | `#52735a`  |
| Salbei (Text)      | `#46614d`  |
| Terrakotta (Deko)  | `#b87a55`  |
| Terrakotta (Text)  | `#8a4f2c`  |
| Text/Ink           | `#2b2d2a`  |

Typografie: **Fraunces** (warme, editoriale Serife) für Headlines,
**Inter** (humanistische Sans) für Fließtext – beide selbst gehostet.

> Alternativen (sanftes Blau / warme Erdtöne) lassen sich über die
> CSS-Variablen in `css/styles.css` (`:root`) mit wenigen Zeilen umstellen.

---

## Kontaktformular scharf schalten

Das Formular funktioniert **ohne eigenes Backend**. Aktuell läuft es im
**Fallback-Modus**: Ein Klick auf „Anfrage senden" öffnet das E-Mail-Programm
mit vorausgefüllter Nachricht (`mailto:`).

Für echten Versand (empfohlen, mit Erfolgsmeldung auf der Seite):

1. Kostenloses Konto bei **[Formspree](https://formspree.io)** anlegen und ein
   Formular erstellen → man erhält eine Endpoint-URL wie
   `https://formspree.io/f/abcdwxyz`.
2. In `index.html` beim `<form>` das Attribut `action="https://formspree.io/f/your-form-id"`
   durch die echte URL ersetzen.
3. Fertig – `js/main.js` erkennt automatisch die gültige ID, sendet per `fetch`
   und zeigt das Erfolgs-Panel. Kein weiterer Code nötig.

> Wird die Seite bei **Netlify** gehostet, kann alternativ Netlify Forms genutzt
> werden (`data-netlify="true"` am Formular). Die finale Wahl hängt vom Hosting ab
> (siehe offene Punkte).

Spamschutz: Ein verstecktes Honeypot-Feld (`_gotcha`) ist bereits eingebaut.

---

## Offene Punkte – mit der Kundin (Sonja) klären

> **Wichtig:** Die Seite darf erst live gehen, wenn die rechtlich und inhaltlich
> nötigen Punkte geklärt sind.

1. **Foto** – hochauflösendes Original des Portraitfotos liefern. Das gelieferte
   Flyer-Bild ist nur **604×774 px** und dient aktuell als Platzhalter (für Hero
   & OG-Vorschau ideal wäre ≥ 1200 px Breite).
2. **Farbwelt** – Empfehlung Salbeigrün (siehe oben) freigeben oder Alternative
   wählen.
3. **E-Mail-Adresse** – welche ist offiziell?
   `kontakt@sonja-schneider.coach` (aktuell hinterlegt) oder
   `sonja.schneider.88@gmail.com`? Betrifft `index.html`, `js/main.js`,
   `impressum.html`, `datenschutz.html`.
4. **Domain & Hosting** – ist `sonja-schneider.coach` reserviert? Wo wird
   gehostet? Bestimmt auch die finale Formular-Lösung.
5. **Impressum & Datenschutz** – vollständige Pflichtangaben (ladungsfähige
   Anschrift, ggf. USt-ID, eingesetzte Tools) ergänzen. Aktuell Platzhalter.
6. **Logo** – vorhanden, oder bleibt es bei der typografischen Wortmarke
   (aktuell umgesetzt)?

Ein zweites, persönlicheres Foto für „Über mich" ist optional – der Platz dafür
ist bereits eingeplant (Platzhalter in `index.html`).

---

## Testprotokoll

Stand: 03.08.2026 · lokal geprüft (`python3 -m http.server`, Chromium-Engine im
Vorschau-Browser). Cross-Browser auf echten Geräten (Firefox/Safari/Edge) sowie
ein Lighthouse-Lauf auf der Zielumgebung stehen zur Endabnahme noch an.

| Bereich | Prüfung | Ergebnis |
|---|---|---|
| Layout Desktop (1280px) | Hero, alle 6 Sektionen, Footer | ✅ sauber, editorial, dominantes Portrait |
| Layout Mobile (375px) | Hero-Cropping, Stapelung, Lesbarkeit | ✅ Gesicht voll sichtbar, kein Layout-Bruch |
| Kein horizontaler Overflow | `scrollWidth === innerWidth` | ✅ (391 = 391) |
| Sticky-Nav + Scroll-Spy | aktiver Zustand beim Scrollen | ✅ funktioniert |
| Mobile-Menü | Öffnen/Schließen, Burger→X, ESC | ✅ funktioniert |
| Scroll-Reveal | dezente Einblend-Übergänge | ✅ (mit `prefers-reduced-motion`-Fallback) |
| Formular – Pflichtfelder | leeres Absenden | ✅ Name + E-Mail werden markiert |
| Formular – E-Mail-Format | ungültige Eingabe | ✅ wird abgefangen |
| Formular – Erfolgs-Panel | Anzeige nach Versand | ✅ ersetzt Formular sichtbar |
| Formular – Fallback | ohne Formspree-ID | ✅ sauberer `mailto:`-Fallback |
| Anker-Links | alle `#`-Ziele existieren | ✅ keine toten Anker |
| tel:/mailto:-Links | korrekt formatiert | ✅ `+491773458129`, mailto gesetzt |
| Impressum/Datenschutz-Links | im Footer & Formularhinweis | ✅ verlinkt |
| Bilder-`alt` | Barrierefreiheit | ✅ alle Bilder mit `alt` |
| Semantik | 1× `<h1>`, `lang="de"`, Landmarks | ✅ header/nav/main/section/footer |
| Konsole | JS-Fehler | ✅ keine |
| **Kontrast (WCAG AA)** | siehe unten | ✅ alle Textfarben ≥ 4.5:1 |

**Kontrastwerte (Verhältnis, AA = ≥ 4.5:1):**
Ink/Papier 13.2 · Muted/Papier 6.5 · Muted/Sand 5.9 · Salbei-Text/Papier 6.5 ·
Weiß/Button 5.3 · Terrakotta-Text/Papier 6.2 · Footer-Text/Ink 9.6 ·
Footer-Muted/Ink 5.8.

### Noch zur Endabnahme (auf Zielumgebung)
- [ ] Cross-Browser auf echten Geräten: Firefox, Safari (macOS/iOS), Edge
- [ ] Lighthouse-Lauf (Ziel > 90 in allen vier Kategorien) auf dem finalen Hosting
- [ ] Formular-Live-Test mit echter Formspree-ID (Zustellung an Postfach)
- [ ] Rechtstexte final einsetzen und Platzhalter-Boxen entfernen

---

## Erweiterung zum Multi-Pager

Header, Footer und das Design-System (`css/styles.css`) sind wiederverwendbar –
`impressum.html`/`datenschutz.html` zeigen das Muster bereits. Für weitere Seiten
einfach eine neue HTML-Datei nach demselben Schema anlegen und aus den
Anker-Links absolute Seiten-Links machen.
