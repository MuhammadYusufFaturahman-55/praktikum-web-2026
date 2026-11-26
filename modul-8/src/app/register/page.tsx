// File: src/app/register/page.tsx
import Link from "next/link";
import { registerAction } from "@/actions/auth";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Registrasi Akun</h1>
        <p className="text-sm text-slate-600 mb-6">
          Buat akun baru untuk mengakses sistem praktikum.
        </p>

        <form action={registerAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Nama Mahasiswa"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              NIM (Nomor Induk Mahasiswa)
            </label>
            <input
              type="text"
              name="nim"
              placeholder="Contoh: 2406002 (Opsional)"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Alamat Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="mahasiswa@itg.ac.id"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              placeholder="Minimal 6 karakter"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg cursor-pointer"
          >
            Daftar Sekarang
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600 space-y-2">
          <p>
            Sudah punya akun?{" "}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">
              Login di sini
            </Link>
          </p>
          <p>
            <Link href="/" className="text-slate-500 hover:underline">
              ← Kembali ke Beranda
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}