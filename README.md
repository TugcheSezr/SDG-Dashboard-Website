<div align="center">

# 🌍✨ SDG DASHBOARD ✨🌍

> Een interactieve webapplicatie voor het volgen en visualiseren van de Duurzame Ontwikkelingsdoelen (SDGs).  
> In dit project leer je stap voor stap hoe je een moderne full-stack webapplicatie bouwt met professionele tools en technieken.

</div>

---

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql)

</div>

---

## 🎯 Wat ga je leren?

✨ **Frontend Development**
- Next.js 14: Modern React framework  
- React: Component-based development, state & hooks  
- TypeScript: Type-veilige code schrijven  
- Tailwind CSS: Snel, responsive & stijlvol  

⚙️ **Backend & Database**
- Prisma ORM: Type-safe database queries  
- MySQL: Relationele database  
- API Development: RESTful endpoints  
- Zod: Input validatie  

📊 **Data Visualisatie**
- Chart.js: Interactieve grafieken  
- Data processing: Filteren, trends & aggregaties  

---

## 🚀 Project opstarten

<div align="center">

```bash
# Dependencies installeren
npm install

# Environment bestand maken
cp .env.example .env

# Database initialiseren
npm run db:generate
npm run db:push
npm run db:seed

# Development server starten
npm run dev

🌐 Open in browser: http://localhost:3000

</div>

📁 Projectstructuur

template/
├── app/
│   ├── api/
│   ├── overview/
│   ├── sdg/[id]/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   └── charts/
├── lib/
│   ├── prisma.ts
│   ├── types.ts
│   └── data.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── data/
    └── sdg-info.json

🎓 Leertraject (6 weken)
<div align="center">
Week	Focus
1	Basis begrijpen & eerste component bouwen (Button)
2	UI componenten bouwen (Form, Display, Interactief)
3	Data visualisatie (Chart.js)
4	Pagina’s bouwen (Overview + Detail)
5	Data & API’s integreren
6	Afwerking: Charts, Filters, Styling & Bug fixes
</div>

🗺️ Waar begin je?
Voorbeelden bekijken: Card.tsx, BarChart.tsx, Header.tsx
README’s lezen: components/ui/README.md, components/charts/README.md, app/overview/README.md, app/sdg/[id]/README.md, app/api/README.md
Klein beginnen: Start met één component, test, bouw verder

💡 Belangrijke concepten

⚡ Next.js App Router
Server components: standaard
Client components: 'use client'
Dynamic routes: [id]

⚛️ React Hooks
useState, useEffect, useMemo

🧠 TypeScript
Interfaces voor props, types voor data

🗄️ Prisma
Schema, type-safe queries, migrations

🎨 Tailwind CSS
Utility-first styling, responsive (md:, lg:), dark mode

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
Prisma errors: npm run db:generate
Project reset:
docker-compose down -v
docker-compose up -d
npm run db:push
npm run db:seed

📚 Externe documentatie
Next.js
React
Tailwind CSS
TypeScript Handbook
Prisma
Chart.js
Zod

🎯 Tips voor succes
Begin klein
Gebruik voorbeelden
Test vaak
Lees error messages
Google is je vriend
Gebruik TypeScript warnings
Commit regelmatig
<div align="center">

🎉 Klaar om te starten?

Start project met installatie stappen, open components/ui/README.md, bouw je eerste component en werk stap voor stap verder 🚀

💫 Veel succes!

</div> ```
