# Web Portfolio — Phoomtanet Intayung

Personal portfolio website built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**.

---

## Design System & Theme

### Color Palette

| Role | Color | Tailwind |
|---|---|---|
| Primary | Indigo | `indigo-500` / `indigo-600` |
| Accent | Cyan | `cyan-400` / `cyan-500` |
| Gradient | Indigo → Cyan | `from-indigo-500 to-cyan-400` |
| Background | Slate 50 | `bg-slate-50` |
| Surface | White | `bg-white` |
| Border | Indigo 100 | `border-indigo-100` |
| Text (body) | Slate 600–800 | `text-slate-600` |
| Text (label) | Indigo 500 | `text-indigo-500` |
| Text (muted) | Slate 400–500 | `text-slate-400` |

### Typography

- **Font**: [Sarabun](https://fonts.google.com/specimen/Sarabun) — รองรับภาษาไทยและอังกฤษ
- **Subsets**: `thai`, `latin`
- **Weights**: 300, 400, 500, 600, 700
- **CSS Variable**: `--font-sarabun`
- **Tailwind**: `font-sans` → `var(--font-sarabun)`

### Shadows & Elevation

```
Card     : shadow-lg shadow-indigo-200/60
NavBar   : shadow-lg shadow-indigo-100/60
Avatar   : shadow-md shadow-indigo-200/60
Button   : shadow-md shadow-indigo-200/60
```

### Border Radius

| Element | Radius |
|---|---|
| Card (BorderBox) | `rounded-3xl` |
| Section card | `rounded-2xl` |
| Button / Tag | `rounded-xl` |
| Nav item / Toggle | `rounded-full` |
| Avatar | `rounded-full` |

---

## i18n (ระบบภาษา)

ใช้ **React Context** สำหรับจัดการภาษาทั้งระบบ — ไม่มี library เพิ่มเติม

| ไฟล์ | หน้าที่ |
|---|---|
| `app/i18n/LangContext.tsx` | Context + `LangProvider` + `useLang()` hook |
| `app/i18n/translations.ts` | ข้อความ EN / TH ทั้งหมด |

**การใช้งาน:**
```tsx
const { lang, setLang } = useLang();
const t = translations[lang].resume;
```

ภาษาถูกบันทึกใน `localStorage` ด้วย key `lang` (`'en'` | `'th'`)

---

## Components

| Component | ไฟล์ | คำอธิบาย |
|---|---|---|
| `TopNav` | `app/components/TopNav.tsx` | Navbar พร้อม active tab + language toggle |
| `ResumeSection` | `app/components/ResumeSection.tsx` | ส่วน CV/Resume ครบทั้งหมด |
| `BorderBox` | `app/components/BorderBox.tsx` | Card wrapper มุมมนพร้อม border indigo |

---

## Project Structure

```
app/
├── assets/
│   ├── images/profie.jpg       # รูปโปรไฟล์
│   └── index.ts                # re-export รูปภาพ
├── components/
│   ├── TopNav.tsx
│   ├── ResumeSection.tsx
│   └── BorderBox.tsx
├── constants/
│   └── images.ts               # re-export จาก assets
├── i18n/
│   ├── LangContext.tsx          # ระบบภาษา
│   └── translations.ts         # ข้อความ EN/TH
├── home/
│   └── page.tsx                # หน้าหลัก (Resume)
└── layout.tsx                  # Root layout + LangProvider + Sarabun font
```

---

## Getting Started

```bash
npm install
npm run dev
```

เปิดที่ [http://localhost:3000/home](http://localhost:3000/home)
