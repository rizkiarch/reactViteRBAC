# 📚 Project React + Vite RBAC

Ini adalah project frontend React.js menggunakan Vite, terhubung dengan backend API.  
Project ini memiliki role akun: Superadmin, Admin, dan User.

---

## 🚀 Cara Install Project

Ikuti langkah-langkah di bawah ini untuk menjalankan project:

### 1. Clone Project

```bash
git clone https://github.com/username/nama-project.git
```

Ganti `username/nama-project.git` sesuai alamat repo kamu.

### 2. Masuk ke Folder Project

```bash
cd nama-project
```

### 3. Install Dependency

```bash
npm install
```
atau kalau kamu pakai yarn:

```bash
yarn install
```

### 4. Setup `.env`

Buat file `.env` di root project.  
Isi dengan:

```bash
VITE_API_URL=http://localhost:8000/api
```

> **Catatan:**  
> Pastikan backend Laravel API kamu sudah jalan di `http://localhost:8000`.

### 5. Jalankan Project

```bash
npm run dev
```
atau

```bash
yarn dev
```

Nanti project akan jalan di `http://localhost:5173` (default port Vite).

---

## 🔐 Akun Login

Berikut akun-akun yang bisa digunakan:

| Role        | Email                      | Password    |
|-------------|-----------------------------|-------------|
| Superadmin  | superadmin@example.com       | 123123123   |
| Admin       | admin@example.com            | 123123123   |
| User        | user@example.com             | 123123123   |

> **Pastikan** data akun ini sudah tersedia di backend kamu!

---

## 📦 Struktur Penting

- `src/components/` → Komponen React (seperti tombol, card, dll)
- `src/pages/` → Halaman-halaman seperti Login, Dashboard, dll
- `src/services/` → Tempat request API (axios)
- `src/routes/` → Routing aplikasi

---

## ⚡ Tools & Library yang Digunakan

- React.js
- Vite
- Axios
- React Router DOM
- TailwindCSS (opsional, kalau kamu pakai)
- Lucide React (icon library)

---

## 💬 FAQ

**Q: Kenapa tidak bisa login?**  
A: Pastikan API backend sudah running di `localhost:8000`, dan `.env` sudah diisi dengan `VITE_API_URL`.

**Q: Kalau mau ganti API URL gimana?**  
A: Edit saja file `.env` di root project.

**Q: Saya dapat error CORS?**  
A: Pastikan backend sudah mengaktifkan CORS.

---

## ✨ Tips Tambahan

- Kalau ganti `.env`, **wajib restart** server Vite (`npm run dev`) supaya env baru terbaca.
- Kalau ada error `404`, pastikan endpoint API kamu benar.

---

# Selamat coding! 🚀

---