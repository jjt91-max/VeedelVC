# 🥗 Veedel Vital – Frische Salatbar am Chlodwigplatz

Website für die frische Salatbar **Veedel Vital** in der Kölner Südstadt, direkt am Chlodwigplatz.

## Tech-Stack

- **React 19** – UI Framework
- **Vite 8** – Build-Tool & Dev-Server
- **Tailwind CSS 4** – Utility-first CSS Framework
- **Lucide React** – Icons

## Features

- 🏠 **Hero-Section** mit Öffnungszeiten (Mo–Fr, 10–15 Uhr)
- 🥗 **Interaktive Speisekarte** mit Filter nach Getränken, Salaten & Pasta
- 🏢 **B2B Catering Portal** mit:
  - Bundle-Konfigurator (Pauschalpreise pro Person 18,50€ – 24,90€)
  - Mix & Match – individuell zusammenstellbare Team-Lunches
  - Lieferlogik (15€ Pauschale unter 150€, gratis ab 150€)
  - Checkout mit Bestellformular
- 📱 **Responsive Design** – für Desktop & Mobile

## Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Dev-Server starten
npm run dev

# Production-Build
npm run build

# Vorschau des Builds
npm run preview
```

## Deployment

Das Projekt kann als statische Website deployt werden (z. B. Vercel, Netlify, GitHub Pages).
Der Build-Output liegt im `dist/`-Verzeichnis und wird mit `npm run build` erzeugt.

## Projekt-Struktur

```
veedel-vital/
├── public/          # Statische Assets (favicon, icons)
├── src/             # React-Quellcode
│   ├── main.jsx     # Einstiegspunkt
│   └── App.jsx      # Hauptkomponente
├── dist/            # Build-Output (generiert)
├── index.html       # HTML-Template
├── vite.config.js   # Vite-Konfiguration
└── package.json     # Abhängigkeiten & Scripts
```