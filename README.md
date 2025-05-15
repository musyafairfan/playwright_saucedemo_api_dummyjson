# 🔍 Playwright Test Automation - UI & API Suite

Selamat datang di project **Playwright Automation**!  
Project ini dirancang untuk menguji dua aspek penting:

- 🌐 **UI Testing** pada website [SauceDemo](https://www.saucedemo.com/)
- 🔗 **API Testing** dengan menggunakan [DummyJSON](https://dummyjson.com/)

---

## ✨ Teknologi yang Digunakan

- 🎭 [Playwright](https://playwright.dev/) - Framework untuk UI & API testing
- 🔢 Faker.js - Untuk generate data dinamis dan acak
- ⚙️ Node.js - Runtime environment
- 📦 NPM - Untuk dependency management
- 📊 HTML Reporter Playwright - Untuk hasil test yang rapi

---

## Installation

### Prerequisites

You need to have Node.js installed. To check, run:

```bash
node -v
```

If you don't have it... no worries, download it from [here](https://nodejs.org/)

## Steps to Install

1. Clone the repo:

```bash
git clone https://github.com/musyafairfan/playwright_saucedemo_api_dummyjson.git
```

2. Install dependencies:

```bash
npm install
```

3. Optional: Install the Playwright browsers:

```bash
npx playwright install
```

---

## 📁 Struktur Direktori

```bash
/project-root
  /tests                    # Test files (with `.spec.js` extensions)
    /api                    
      testcase.api.spec.js  # Test-case API
    /ui
      testcase.ui.spec.js   # Test-case UI
  README.md                 # This file
  package.json              # Skrip & dependencies
  package-lock.json
  playwright.config.js      # Konfigurasi project
  .gitignore                # Git ignore file
```

---

🔹 Jalankan Semua Test (UI + API)
```bash
npx playwright test
```
🔹 Jalankan Hanya Test UI (Multi-Browser)
```bash
npm run test:ui
```
🔹 Jalankan Hanya Test API
```bash
npm run test:api
```
🔹 Tampilkan Laporan (HTML)
```bash
npx playwright show-report
```

---

## 👤 Author
- **Nama:** @Irfan
- **Posisi:** QA Engineer in Progress 🔧🚀
- **Pengalaman:** Manual QA - 2 Tahun

## 🏁 Penutup
“Automation testing bukan sekadar script, tapi jembatan menuju kualitas aplikasi yang lebih baik.”
Selamat menguji, semoga bug selalu bisa ditemukan sebelum user menemukannya! 🐞✨