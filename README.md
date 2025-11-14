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

Opmerking: sharp vereist libvips. Voor shared hosting (Hostinger Shared) is het niet betrouwbaar om sharp te draaien; gebruik een externe provider voor de backend (Render, Railway, DigitalOcean App Platform, VPS).

2) Deployment advies (Hostinger Shared)
- Host frontend als statische site (Vercel / Netlify / of public_html op Hostinger).
- Host backend export op Render / Railway / DigitalOcean App Platform / VPS.
- Gebruik S3 voor opslag (recommended) of stel managed storage in.

3) Volgende stappen die ik kan uitvoeren zodra de repo een initial commit heeft:
- Volledige POC push naar branch feature/poc-editor en open PR met instructies.
- Optioneel: toevoegen van CI config en Dockerfile voor backend.

---
