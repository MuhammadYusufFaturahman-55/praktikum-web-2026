// File: src/app/login/page.tsx
import Link from "next/link";
import { loginAction } from "@/actions/auth";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Login Sistem</h1>
        <p className="text-sm text-slate-600 mb-6">
          Masuk menggunakan akun yang sudah terdaftar.
        </p>

        <form action={loginAction} className="space-y-4">
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
              placeholder="Masukkan password"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg cursor-pointer"
          >
            Masuk (Login)
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600 space-y-2">
          <p>
            Belum punya akun?{" "}
            <Link href="/register" className="text-emerald-600 font-semibold hover:underline">
              Daftar di sini
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