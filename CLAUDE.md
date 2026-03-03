# CLAUDE.md — web-portfolio

## Project Overview
Portfolio website for Phoomtanet Intayung (Porsche), built with Next.js 14 App Router and Tailwind CSS.
Supports Thai/English bilingual UI, JWT authentication (member or guest), and connects to `api-portfolio` backend.

---

## Tech Stack
| Tool | Version |
|---|---|
| Next.js | 14 (App Router) |
| React | 18 |
| TypeScript | 5 |
| Tailwind CSS | 3 |
| lucide-react | icons |

---

## Commands
```bash
npm run dev      # start dev server (port 3001 by default, api is on 3000)
npm run build    # production build
npm run lint     # ESLint check
```

---

## Project Structure
```
web-portfolio/
├── app/
│   ├── layout.tsx                   # Root layout — wraps LangProvider > ErrorProvider > AuthProvider
│   ├── page.tsx                     # Redirects to /login
│   └── (public)/                    # Route group — URL has no /public/ prefix
│       ├── login/page.tsx           # /login
│       ├── home/page.tsx            # /home
│       └── project/page.tsx         # /project
├── components/
│   ├── AuthModal.tsx                # Login/Register modal (tab-based)
│   ├── ErrorModal.tsx               # Global error modal
│   ├── TopNav.tsx                   # Navigation bar
│   ├── BorderBox.tsx                # Reusable card/box UI
│   ├── ResumeSection.tsx            # Resume/profile section
│   └── project/
│       ├── ProjectChatTab.tsx       # Project chat tab
│       ├── ProjectPdfTab.tsx        # Project PDF tab
│       └── projectData.ts           # Static project data
├── context/
│   ├── AuthContext.tsx              # Auth state — username, token, openLogin, logout, setSession
│   └── ErrorContext.tsx             # Global error state — showError(message)
├── i18n/
│   ├── LangContext.tsx              # Language context — lang ('th'|'en'), setLang
│   └── translations.ts             # TH/EN string map
├── lib/
│   ├── api.ts                       # Base fetch utility — apiFetch<T>()
│   └── auth.ts                      # Auth API calls — apiLogin, apiRegister
├── public/                          # Static assets (images)
├── .env                             # NEXT_PUBLIC_API_URL=http://localhost:3000
├── tailwind.config.ts
└── tsconfig.json
```

---

## Path Alias
`@/` maps to project root (not `app/`):
```json
"paths": { "@/*": ["./*"] }
```
Example: `import { useAuth } from '@/context/AuthContext'`

---

## Routing
- `app/page.tsx` — redirects to `/login` via `redirect('/login')`
- Route group `(public)` — groups pages without affecting the URL
- `/login` → `app/(public)/login/page.tsx`
- `/home` → `app/(public)/home/page.tsx`
- `/project` → `app/(public)/project/page.tsx`
- `(admin)` folder exists but is empty — reserved for future admin pages

**Note (Windows):** The `app/public` folder cannot be renamed directly on Windows because `public` is reserved. Always use `(public)` (with parentheses) as the route group name.

---

## Authentication
JWT stored in `localStorage` under key `token`.

**Context API: `context/AuthContext.tsx`**
```ts
const { username, token, openLogin, logout, setSession } = useAuth();
```
- `openLogin()` — opens `AuthModal` overlay
- `setSession(username, token)` — use on inline login pages (e.g., `/login`) that don't use the modal
- `logout()` — clears state and localStorage
- On mount, restores session from `localStorage` by decoding JWT payload (`atob`) and checking `exp`

**Flow:**
- Login page (`/login`) → calls `apiLogin`, then `setSession`, then `router.push('/home')`
- TopNav "Login" button → calls `openLogin()` → shows `AuthModal`
- Guest access → link to `/home` directly, no token required

---

## Error Handling
Centralized via `context/ErrorContext.tsx`.

```ts
const { showError } = useError();
showError('ข้อความ error');
```

- `showError(message)` triggers a full-screen modal (`components/ErrorModal.tsx`) with `z-[200]`
- Always use `showError` for API/network errors
- Use local state (e.g., `validationError`) for form validation errors — displayed inline, not modal
- `lib/api.ts` throws Thai-language error messages for network failures and non-JSON responses

**Error messages from `lib/api.ts`:**
- Network error → `'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่อ'`
- Non-JSON response → `'เซิร์ฟเวอร์ไม่ตอบสนอง กรุณาลองใหม่ภายหลัง'`
- API error (non-2xx) → uses `data.message` from response body

---

## API Integration
Backend is `api-portfolio` running at `http://localhost:3000`.

Base utility: `lib/api.ts`
```ts
apiFetch<T>(path, options?)   // prepends BASE + /api/v1 + path
```
- Automatically attaches `Authorization: Bearer <token>` from localStorage if available
- `Content-Type: application/json` always set

Auth calls: `lib/auth.ts`
```ts
apiLogin(identifier, password)       // identifier = username or email
apiRegister(username, password, email?)
```

Login response shape (flat, not nested under `data`):
```json
{ "status": "success", "token": "...", "user": { "id": 1, "username": "..." } }
```

Register response shape (nested under `data`):
```json
{ "status": "success", "data": { "id": 1, "username": "..." } }
```

---

## i18n (Bilingual TH/EN)
```ts
const { lang, setLang } = useLang();   // 'th' | 'en'
```
- All UI strings are in `i18n/translations.ts`
- Language toggle in TopNav (both desktop and mobile)
- Default language: `th`

---

## Styling Conventions
- **Tailwind CSS only** — no CSS modules or styled-components
- Color palette: `indigo`, `cyan`, `slate`, `emerald` — avoid hardcoding hex
- Rounded cards: `rounded-3xl`, `rounded-2xl`
- Gradient buttons: `bg-gradient-to-r from-indigo-500 to-cyan-400`
- Subtle shadows: `shadow-xl shadow-indigo-200/60`, `ring-1 ring-indigo-100/60`
- Radial gradient decorative backgrounds: inline `style` or Tailwind arbitrary values
- Font: `Sarabun` (Thai + Latin) from Google Fonts via `next/font/google`

---

## Provider Order (in `app/layout.tsx`)
```
LangProvider
  └── ErrorProvider
        └── AuthProvider
              └── {children}
```
`ErrorProvider` must be outside `AuthProvider` so that `AuthModal` can call `showError`.

---

## Known Gaps / TODO
- `/register` route — login page links to it but the page doesn't exist yet
- `/blog`, `/contact` — linked in TopNav but pages not created yet
- `(admin)` route group — empty, no admin pages yet
- `ProjectChatTab` — messages are local state only, no API integration
