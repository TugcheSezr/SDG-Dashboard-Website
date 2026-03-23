# 🌍✨ SDG Dashboard - Jouw Project ✨🌍

> Een interactieve webapplicatie voor het volgen en visualiseren van de Duurzame Ontwikkelingsdoelen (SDGs).  
> In dit project leer je stap voor stap hoe je een moderne full-stack webapplicatie bouwt met professionele tools en technieken.

---

## 🎯 Wat ga je leren?

Dit project is ontworpen om je kennis te laten maken met moderne webdevelopment.

### 🖥️ Frontend Development
- Next.js 14: Modern React framework
- React: Component-based development, state en hooks
- TypeScript: Type-veilige code schrijven
- Tailwind CSS: Snel en efficiënt styling

### ⚙️ Backend & Database
- Prisma ORM: Type-safe database queries
- MySQL: Relationele database
- API Development: RESTful endpoints bouwen
- Data validatie: Zod voor input validatie

### 📊 Data Visualisatie
- Chart.js: Interactieve grafieken
- Data processing: Filteren, trends en aggregaties

---

## 🚀 Project opstarten

### 1. Dependencies installeren
```bash
npm install

2. Environment bestand maken
cp .env.example .env

3. Database initialiseren
npm run db:generate
npm run db:push
npm run db:seed

4. Development server starten
npm run dev

🌐 Open: http://localhost:3000

📁 Projectstructuur
template/
├── app/
│   ├── api/
│   ├── overview/
│   ├── sdg/[id]/
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   └── charts/
│
├── lib/
│   ├── prisma.ts
│   ├── types.ts
│   └── data.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
└── data/
    └── sdg-info.json

🎓 Leertraject (6 weken)

📌 Week 1: Basis begrijpen
Codebase verkennen
Next.js routing begrijpen
React componenten leren
Eerste component bouwen (Button)

📌 Week 2: UI componenten
Form, display en interactieve componenten bouwen
Props en TypeScript gebruiken
Responsive design toepassen

📌 Week 3: Data visualisatie
Chart.js leren gebruiken
Line, bar en pie charts maken
Data structureren

📌 Week 4: Pagina’s bouwen
Overview pagina met alle SDGs
Detailpagina per SDG
Layout en structuur verbeteren

📌 Week 5: Data & API’s
Prisma queries gebruiken
API endpoints bouwen
Data filtering met Zod
📌 Week 6: Afwerking
Charts integreren
Filters toevoegen
Bug fixes en styling verbeteren

🗺️ Waar begin je?

🔍 Stap 1: Voorbeelden bekijken
Card component
BarChart component
Header component

📚 Stap 2: README’s lezen
components/ui/README.md
components/charts/README.md
app/overview/README.md
app/sdg/[id]/README.md
app/api/README.md

🧱 Stap 3: Klein beginnen
Start met Button component
Test in browser
Breid stap voor stap uit

💡 Belangrijke concepten

⚡ Next.js App Router
Server components standaard
Client components met 'use client'
Dynamic routes met [id]

⚛️ React hooks
useState: state beheren
useEffect: API calls
useMemo: performance optimalisatie

🧠 TypeScript
Interfaces voor props
Types voor data
Compile-time foutdetectie

🗄️ Prisma
Schema voor database structuur
Type-safe queries
Migrations voor updates

🎨 Tailwind CSS
Utility-first styling
Responsive design (md:, lg:)
Dark mode ondersteuning

🛠️ Nuttige commando’s

💻 Development
npm run dev
npm run build
npm run start
npm run lint

🗃️ Database
npm run db:studio
npm run db:generate
npm run db:push
npm run db:seed

🐛 Problemen oplossen
Prisma errors
npm run db:generate
Project reset
docker-compose down -v
docker-compose up -d
npm run db:push
npm run db:seed

📚 Externe documentatie
Next.js docs
React docs
Tailwind CSS docs
TypeScript handbook
Prisma docs
Chart.js docs
Zod docs

🎯 Tips voor succes
Begin klein
Gebruik voorbeelden
Test vaak
Lees error messages
Google problemen
Gebruik TypeScript warnings
Commit regelmatig

🎉 Klaar om te starten?
Start project met installatie stappen
Open components/ui/README.md
Bouw je eerste component
Werk stap voor stap verder

Veel succes 🚀
