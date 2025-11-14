```markdown
# POC: Online Design Editor (studiotwaalf)

Korte instructie en deploy-advies.

Repository layout (POC):
- frontend/  -> React app met Editor.jsx (Fabric.js)
- backend/   -> Express export endpoint (SVG -> PNG) met sharp

1) Local quickstart (separate folders)

Frontend:
- cd frontend
- npm install
- Start dev server (dependend van setup / CRA / Vite)

Backend:
- cd backend
- npm install
- node export-server.js

Opmerking: sharp vereist libvips. Voor shared hosting (Hostinger Shared) is het niet betrouwbaar om sharp te draaien; gebruik een externe provider voor het backend (Render, Railway, DigitalOcean App Platform, VPS).

2) Deployment advies (Hostinger Shared)
- Host frontend als statische site (Vercel / Netlify / of public_html op Hostinger).
- Host backend export op Render / Railway / DigitalOcean App Platform / VPS.
- Gebruik S3 voor opslag (recommended) of stel managed storage in.

3) Volgende stappen die ik kan uitvoeren zodra de repo een initial commit heeft:
- Aanmaken van branch feature/poc-editor en push van deze bestanden.
- Openen van PR met installatie- en deploy-instructies.
- Optioneel: toevoegen van CI config en Dockerfile voor backend.

```
