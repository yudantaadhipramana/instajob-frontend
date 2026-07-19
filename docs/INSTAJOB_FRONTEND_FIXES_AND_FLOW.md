# InstaJob Frontend — Complete Fix & Flow Documentation
> Last updated: 20 Jul 2026 | Commit: c117b74

---

## 1. Tech Stack

- **Next.js 16** (Turbopack), React 19, TypeScript
- **motion/react** — BUKAN framer-motion (peer conflict React 19)
- **Inline styles** only — Tailwind JIT tidak reliable di affiliate pages
- **Port dev**: 3000 (default Next.js), build: `npm run build`
- **Deploy**: Vercel (auto dari master branch)
- **Backend**: Railway — https://instajob-backend-production.up.railway.app
- **Repo frontend**: yudantaadhipramana/instajob-frontend

---

## 2. Design System

### Color Palette
```css
--color-primary: #1E40FF        /* logo electric blue — ANCHOR */
--color-primary-dark: #1E3A8A   /* navy */
--color-primary-light: #3B82F6  /* bright blue */
--color-accent: #F59E0B         /* amber — sparingly, CTA hover only */
--color-foreground: #111827     /* text primary */
--color-foreground-secondary: #6B7280
--color-foreground-tertiary: #9CA3AF
--color-background: #FFFFFF
--color-muted: #F9FAFB          /* subtle bg */
--color-border: #E5E7EB
```
DEPRECATED (jangan pakai lagi): `#0051FF`

Gradient card: `linear-gradient(135deg, #1E3A8A 0%, #1E40FF 50%, #3B82F6 100%)`

### Typography
- Font: **Plus Jakarta Sans** untuk heading + body. JANGAN Space Grotesk/DM Sans.
- Body font-weight: **600** (set di globals.css)
- H1-H6 font-weight: **800**
- **Logo.tsx JANGAN diubah** — ini reference point warna

### Component Standards
| Element | Style |
|---------|-------|
| Button primary | `linear-gradient(135deg, #1E3A8A, #1E40FF)`, `border-radius: 8px` |
| Card | `border-radius: 16px`, `border: 1px solid var(--color-border)` |
| Input focus | `border-color: #0051FF` |
| Transition | `all 0.2s ease` |
| Section padding | `100px 48px` desktop, `60px 20px` mobile |

---

## 3. CSS Pitfalls & Rules

### 3.1 @media prefers-reduced-motion — JANGAN hapus selector

```css
/* BENAR */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Menghapus `*, *::before, *::after {` = CSS parse error = **build crash Vercel**.
`npm run build` WAJIB setelah setiap patch globals.css.

### 3.2 Mobile Responsive — Pakai className globals.css

Jangan `<style jsx>` structural selector — sangat fragile, inline style menang.

Named classes tersedia di globals.css:
```
.landing-two-col-grid          → 2-col → 1-col mobile
.landing-two-col-grid-reverse  → reverse order kanan ke atas
.grid-col-left / .grid-col-right → order control
.affiliate-card-inner          → 2-col → 1-col, border-radius fix
.affiliate-left-panel          → border-right → border-bottom mobile
.affiliate-right-panel         → border-radius fix
.section-h2                    → font-size 40px → 28px mobile
.section-subtitle              → font-size 18px → 15px mobile
.testimonials-grid             → auto-fill → 1-col mobile
.testimonials-tabs             → flex-wrap, gap mobile
.faq-section                   → padding override mobile
.footer-grid                   → 4-col → 1-col mobile
.footer-bottom                 → flex-direction column mobile
```

Pattern eksekusi:
1. Tambah `className="namaClass"` ke element TSX
2. Override di `globals.css` `@media (max-width: 768px)`

### 3.3 Glow Effects — position: absolute BUKAN fixed

```tsx
// SALAH — glow nempel ke viewport semua halaman
<div style={{ position: 'fixed', ... }} />

// BENAR
<section style={{ position: 'relative', overflow: 'hidden' }}>
  <div style={{ position: 'absolute', ... }} />
</section>
```

### 3.4 Subscription — Viewport Fit (no scroll)

```tsx
<div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
  <header style={{ flexShrink: 0, height: '64px' }} />
  <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px 48px 24px', minHeight: 0 }} />
</div>
```

### 3.5 Price Anchoring

Harga CORET tampil di ATAS, harga aktif di BAWAH + badge "Hemat X%":
```tsx
<span style={{ textDecoration: 'line-through', color: '#CBD5E1' }}>
  Rp {originalPrice}
</span>
<span style={{ color: '#059669' }}>Hemat {Math.round((1 - price/originalPrice)*100)}%</span>
<span style={{ fontSize: '36px', color: 'var(--color-primary)' }}>
  Rp {price}
</span>
```

---

## 4. Bug Fixes

### 4.1 Bearer Token Corruption (KRITIS)

Scrubber mengganti `Bearer ${token}` → `*** ${token}`. Semua fetch 401/400.

**Scan wajib sebelum deploy:**
```bash
grep -rn "Authorization: \*\*\*" src/
# harus return 0 hasil
```

**Fix:**
```tsx
// SALAH (corrupt)
headers: { Authorization: *** ${token}` }

// BENAR
headers: { Authorization: `Bearer ${token}` }
```

File yang pernah corrupt: `referral/page.tsx` line 66, `profile/page.tsx` lines 59/128/170.

### 4.2 Single-Quote fetch() URL

```tsx
// SALAH — literal string, env var tidak resolve
fetch('${process.env.NEXT_PUBLIC_API_URL}/api/...')

// BENAR
fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/...`)
```

Scan: `grep -rn "fetch('\${process" src/`

### 4.3 Turbopack Cache Corruption

Gejala: HTTP 500, `TurbopackInternalError: Failed to restore task data`

```bash
# Level 1
rm -rf .next/dev/cache

# Level 2 (lebih parah)
# kill dev server → rm -rf .next → npm run build → npm run dev

# Level 3 (nuclear)
rm -rf .next node_modules/.cache
```

### 4.4 patch Tool — Uniqueness Required

`old_string` match >1 tempat → error `Found N matches`.

Fix: tambah 2-3 baris context unik sebelum/sesudah target.
Diagnose: `grep -c "fragment" file.tsx` harus return `1`.

### 4.5 Closing Tag Hilang Saat Patch

patch menghapus `</div>` closing → JSX corrupt.
Rule: sertakan closing tag di BOTH `old_string` dan `new_string`.

### 4.6 ScrollAnimation Fire-Once

```ts
// SALAH — re-entrant, reset tiap leave viewport
// BENAR — disconnect setelah trigger pertama
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    timerRef.current = window.setTimeout(() => setIsVisible(true), delay);
    observer.disconnect(); // fire-once
  }
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
```

---

## 5. Landing Page Sections

### NavigationBar
- Desktop: Logo | nav links | lang toggle (ID/EN pill) | login/register
- Mobile: hamburger, lang toggle row di atas navItems
- **JANGAN** tambah notif bell di landing page
- Active section via `IntersectionObserver` (`rootMargin: '-20% 0px -60% 0px'`)
- Nav link IDs: `cara-kerja`, `fitur`, `harga`, `affiliate`, `faq`
- Hero badge EN: `"World's First AI Job Hunter"` (mirror ID: "AI Job Hunter Pertama di Dunia")

### HowItWorks.tsx + FeaturesSection.tsx
- Mobile reverse: `landing-two-col-grid landing-two-col-grid-reverse`
- Visual kanan naik ke atas via `grid-col-right { order: 1 }`
- Animasi tab: `AnimatePresence mode="wait"`

### AffiliateSection.tsx
- `affiliate-card-inner` class (2-col → 1-col mobile)
- `affiliate-left-panel` + `affiliate-right-panel` classes
- HAPUS `position: fixed` glow — pakai `absolute`
- Padding section: `56px 48px`

### TestimonialsSection.tsx
- Grid: `minmax(280px, 1fr)` — BUKAN 400px
- Classes: `section-h2`, `section-subtitle`, `testimonials-tabs`

### Footer.tsx
- Class: `footer-grid` (4-col → 1-col)
- HAPUS `<style jsx>` selector — pakai class
- Background: `#FFFFFF`, `borderTop: 1px solid var(--color-border)`

### FAQSection.tsx
- Class: `faq-section`, `section-h2`, `section-subtitle`
- Padding mobile override via class

---

## 6. I18n Rules

- Setiap key: tambah di ID dict + EN dict sekaligus
- Hero badge EN HARUS mirror concept ID
- Subscription page title key: `pricing.page.title` / `pricing.page.subtitle`
- Pattern tambah key di EN section (bukan ID):

```tsx
// Cari unique context di EN section lalu patch
'pricing.feat.support': '24/7 Priority Support',
// tambah di bawahnya:
'pricing.page.title': 'Choose the Best Plan for You',
```

---

## 7. Halaman Baru (Sesi 20 Jul 2026)

### /subscription
- Viewport-fit: `height: '100vh'`, `overflow: 'hidden'`, flex column
- Header: `flexShrink: 0`, `height: 64px`
- Main: `flex: 1`, `justifyContent: 'center'`, `padding: '16px 48px 24px'`, `minHeight: 0`
- Cards: `maxWidth: 920px`, price 36px, h1 32px
- Price anchoring: coret ATAS, aktif BAWAH + badge "Hemat X%"
- CTA → `/checkout?plan=pro|premium&period=monthly|quarterly`

### /checkout
- **Wajib** `<Suspense>` wrapper (`useSearchParams` butuh Suspense di Next.js)
- 2-col layout: order summary kiri, voucher+CTA kanan
- Voucher: `POST /api/vouchers/validate`
- CTA: `POST /api/payments/create-invoice` → `invoiceUrl` (Xendit)

### /add-ons
- Grid: `minmax(340px, 1fr)`
- CV Booster + Portfolio Booster: harga **Rp 60.000**
- DatePicker TIDAK di card list — ada di `/add-ons/[id]`
- CTA "Lihat Detail" → `/add-ons/[id]`
- Token banner jika `tokens > 0`

### /add-ons/[id]
- Props: `params: Promise<{ id: string }>` + `use(params)` (React 19)
- Long desc, highlights, curriculum, date picker, token redeem, voucher
- Token redeem: `useToken = true` → `POST /api/addons/[id]/activate`
- Bayar: `POST /api/payments/create-addon-invoice` → `invoiceUrl`

### /inbox
- Fetch `GET /api/inbox` on mount
- Mark read: `PATCH /api/inbox/[id]/read`
- Modal detail saat klik message

### /withdrawal
- Saldo 3-card: siap ditarik, pending (30 hari), total dibayar
- Bank account multi-confirm 2-step:
  - Step 1: tampil data untuk konfirmasi
  - Step 2: user ketik `KONFIRMASI` sebelum save
- Save: `PUT /api/withdrawal/bank-account`
- History: `GET /api/withdrawal/history`

---

## 8. HeaderActions Component (Post-Login)

`src/components/HeaderActions.tsx` — **shared**, pakai di semua halaman post-login.

Layout kanan: `[🔔 Notif Bell] [📬 Inbox] [👤 Profile Dropdown]`

- Notif bell: fetch `GET /api/notifications` → unread count badge merah
- Notif dropdown: klik bell → list 10 notif terbaru, mark read via `PATCH /api/notifications/[id]/read`
- Inbox badge: fetch `GET /api/inbox` → unread count
- Profile Dropdown: includes /withdrawal, /affiliate/dashboard, /referral, /settings, /subscription, sign out

**Halaman yang sudah inject HeaderActions:**
dashboard, settings, jobs, applications, auto-apply, monitor, withdrawal, inbox, add-ons/[id], add-ons, extension, preferences, profile

**Pattern inject:**
```tsx
// Import
import HeaderActions from '@/components/HeaderActions';

// Usage di header/nav
<HeaderActions user={user || undefined} />
// atau tanpa user prop jika state tidak tersedia
<HeaderActions />
```

---

## 9. ProfileDropdown Links

`src/components/ProfileDropdown.tsx` — dropdown items:
1. View profile → `/profile`
2. Subscriptions → `/subscription`
3. Penarikan Dana → `/withdrawal` ← BARU
4. Dashboard Affiliate → `/affiliate/dashboard` ← BARU
5. Referral → `/referral`
6. Settings → `/settings`
7. Sign out

---

## 10. Dashboard Completeness Widget

```tsx
const FIELD_MAP = {
  fullName:       { label: 'Nama',          href: '/profile#fullName' },
  bio:            { label: 'Bio',           href: '/profile#bio' },
  skills:         { label: 'Skills',        href: '/profile#skills' },
  experience:     { label: 'Pengalaman',    href: '/profile#experience' },
  education:      { label: 'Pendidikan',    href: '/profile#education' },
  location:       { label: 'Lokasi',        href: '/profile#location' },
  resumeUrl:      { label: 'CV',            href: '/profile#resumeUrl' },
  phone:          { label: 'Telepon',       href: '/profile#phone' },
  jobPreferences: { label: 'Preferensi',    href: '/preferences' },
};
```

Redirect URL pattern: `/profile#fieldName?highlight=fieldName`
Badge merah per field missing ditampilkan sebagai `<a>` tag.

---

## 11. Referral Tiers (User Member Biasa)

| Tier | Konversi | Komisi |
|------|----------|--------|
| 🥉 Bronze | 1–4 | 10% |
| 🥈 Silver | 5–14 | 13% |
| 🥇 Gold | 15–29 | 16% |
| 💎 Platinum | 30+ | 20% |

Transfer: setiap **Jumat** oleh admin ke rekening terdaftar.
Komisi dihitung dari harga paket yang dibeli referral.

---

## 12. Pre-Deploy Checklist

```bash
# 1. Bearer corruption scan
grep -rn "Authorization: \*\*\*" src/
# → harus 0 hasil

# 2. Single-quote fetch scan
grep -rn "fetch('\${process" src/
# → harus 0 hasil

# 3. Build
cd C:/Users/OMNIBOOK/instajob-frontend
npm run build
# → exit 0, 0 errors

# 4. Push
git add -A
git commit -m "feat/fix: [description]"
git push origin master
```

---

## 13. Auto-Save Protocol (Setiap Task Selesai)

```
1. Logseq: tambah entry di D:/JINN OS/pages/instajob_progress.md
   Format:
   ## [YYYY-MM-DD] — [TASK SINGKAT]
   - [apa dikerjakan]
   - [file diubah]
   - [status: done/partial]

2. Memory tool: jika ada fakta durable baru (endpoint, bug pattern, env var)

3. uteke:
   powershell.exe -Command "& 'C:\Users\OMNIBOOK\.local\bin\uteke.exe' remember '[ringkasan]' --tags instajob,[phase]"

   Jika index lock:
   rm ~/.uteke/uteke_index.usearch ~/.uteke/uteke_index.keys
   lalu retry
```

---

## 14. API Endpoints Frontend → Backend

| Endpoint | Method | Fungsi |
|----------|--------|--------|
| /api/user/profile | GET | Fetch profil user |
| /api/user/profile | PUT | Update profil |
| /api/user/completeness | GET | Skor kelengkapan profil |
| /api/user/tokens | GET | Career Booster token count |
| /api/user/resume/parse | POST | Parse CV upload |
| /api/notifications | GET | Fetch notifikasi |
| /api/notifications/[id]/read | PATCH | Mark notif read |
| /api/inbox | GET | Fetch inbox messages |
| /api/inbox/[id]/read | PATCH | Mark inbox read |
| /api/referral/my-code | GET | Referral code + stats |
| /api/referral/leaderboard | GET | Top referrers |
| /api/referral/rewards | GET | Reward program |
| /api/vouchers/validate | POST | Validasi voucher code |
| /api/payments/create-invoice | POST | Buat invoice Xendit (subscription) |
| /api/payments/create-addon-invoice | POST | Buat invoice Xendit (add-on) |
| /api/addons | GET | Fetch published add-ons |
| /api/addons/[id]/activate | POST | Aktivasi add-on via token |
| /api/withdrawal/bank-account | GET/PUT | Bank account |
| /api/withdrawal/history | GET | Riwayat transfer |

---

*Dokumen ini auto-generated dari sesi development 20 Jul 2026.*
*Untuk history commit: `git log --oneline` di repo frontend.*
