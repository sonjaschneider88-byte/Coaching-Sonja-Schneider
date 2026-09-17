# Sonja Schneider – Systemisches Coaching (One-Pager)

Statische One-Page-Website für **Sonja Schneider**, angehende systemische Coachin
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

## Intro-Animation

Beim ersten Laden läuft ein ruhiges Intro (nachempfunden der Referenz
danielstoopendaal.nl, aber als schlanke Eigenumsetzung **ohne** GSAP/Lenis/Webflow):

1. Vollflächiges Loader-Overlay in Papierfarbe; die Wortmarke „Sonja Schneider"
   läuft per Masken-Reveal ein, darunter Rolle + Salbei-Linie.
2. Das Overlay zieht nach oben weg (Quintic-Easing, wie in der Referenz gemessen).
3. Die Hero-Elemente enthüllen sich gestaffelt: Headline wortweise von unten,
   Eyebrow/Subline/Buttons/Meta gleiten ein, das Portrait wird per Clip-Path +
   leichtem Zoom aufgedeckt.

Details:
- **Easing** exakt aus der Referenz übernommen: `outQuint` / `inOutQuint`.
- Läuft **einmal pro Browser-Session** (`sessionStorage`) – kein erneutes Abspielen
  beim Zurücknavigieren von Impressum/Datenschutz.
- Respektiert `prefers-reduced-motion`: Intro wird dann übersprungen, Inhalte sind
  sofort sichtbar.
- Ohne JavaScript wird das Overlay gar nicht erst angezeigt (Inhalte bleiben
  vollständig zugänglich).

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

## Deployment auf GitHub Pages (Zwischenlösung)

Die Seite geht als Zwischenstand („im Aufbau") öffentlich auf GitHub Pages; das
finale Hosting folgt später auf **IONOS**.

1. Im Repo: **Settings → Pages → Build and deployment → Source: „Deploy from a
   branch"**, Branch **`main`**, Ordner **`/ (root)`**, speichern.
2. Nach ~1 Minute erreichbar unter
   `https://sonjaschneider88-byte.github.io/Coaching-Sonja-Schneider/`.
3. Eine leere `.nojekyll`-Datei liegt bereits im Repo (verhindert Jekyll-
   Verarbeitung). Alle Pfade sind relativ – die Seite funktioniert auch im
   Unterordner-URL von GitHub Pages.

> Hinweis: Die `og:`- und `canonical`-URLs im `<head>` zeigen bereits auf die
> geplante Domain `sonja-schneider.coach`. Für die reine GitHub-Vorschau ist das
> unkritisch; beim IONOS-Live-Gang bleiben sie korrekt.

---

## Offene Punkte

> **Wichtig:** Für einen öffentlich **beworbenen** Betrieb müssen die rechtlichen
> Punkte (v. a. Impressum-Anschrift) ergänzt werden. Ein dezenter „im Aufbau"-
> Hinweis steht im Footer.

**Erledigt / entschieden:**
- E-Mail: vorläufig **`sonja.schneider.88@gmail.com`** (überall eingesetzt).
- Hosting: **GitHub Pages** als Zwischenlösung, **IONOS** später.
- Logo: bleibt vorerst **typografische Wortmarke**.
- Farbwelt: **Salbeigrün** umgesetzt (weiterhin zur finalen Freigabe durch Sonja).

**Noch offen / von Sonja nötig:**
1. **Foto** – hochauflösendes Original (aktuell nur **604×774 px** Platzhalter;
   für Hero & OG ideal ≥ 1200 px). Ein optionales zweites Foto für „Über mich"
   ist eingeplant.
2. **Impressum-Anschrift** – ladungsfähige Anschrift, ggf. USt-IdNr. ergänzen und
   die Platzhalter-Boxen in `impressum.html` / `datenschutz.html` entfernen.
3. **Formspree-ID** – eintragen, sobald gewünscht (bis dahin `mailto`-Fallback).
4. **Domain** – `sonja-schneider.coach` reservieren, sobald IONOS-Umzug ansteht.

---

## Testprotokoll

Stand: 03.08.2026 · lokal geprüft (`python3 -m http.server`, Chromium-Engine im
Vorschau-Browser). Cross-Browser auf echten Geräten (Firefox/Safari/Edge) sowie
ein Lighthouse-Lauf auf der Zielumgebung stehen zur Endabnahme noch an.

| Bereich | Prüfung | Ergebnis |
|---|---|---|
| Intro-Animation | Loader-Reveal → Overlay-Lift → Hero-Stagger | ✅ läuft durch, Wortmarke zentriert, nichts bleibt hängen |
| Intro – reduced motion | `prefers-reduced-motion` | ✅ Intro übersprungen, Inhalt sofort da |
| Intro – ohne JS | Overlay darf nicht blockieren | ✅ Overlay nur bei aktivem JS sichtbar |
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
