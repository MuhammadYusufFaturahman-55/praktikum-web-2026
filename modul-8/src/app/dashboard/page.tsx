// File: src/app/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logoutAction } from "@/actions/auth";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("praktikum_session");

  if (!sessionCookie) {
    redirect("/login");
  }

  const user = JSON.parse(sessionCookie.value);

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
              HALAMAN TERPROTEKSI (MYSQL LARAGON SESSION)
            </span>
            <h1 className="text-2xl font-bold text-slate-900">
              Selamat Datang, {user.name}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/profile"
              className="px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg"
            >
              Lihat Profil
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer"
              >
                Keluar (Logout)
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 bg-slate-50 rounded-lg border border-slate-200 p-6 space-y-2 text-sm text-slate-700">
          <h2 className="text-base font-bold text-slate-900 mb-3">
            Informasi Sesi Aktif:
          </h2>
          <p>
            <strong>ID Pengguna (MySQL):</strong> #{user.id}
          </p>
          <p>
            <strong>Nama Lengkap:</strong> {user.name}
          </p>
          <p>
            <strong>NIM:</strong> {user.nim || "-"}
          </p>
          <p>
            <strong>Email Terdaftar:</strong> {user.email}
          </p>
          <p>
            <strong>Hak Akses:</strong> {user.role}
          </p>
          <p>
            <strong>Waktu Login:</strong>{" "}
            {new Date(user.loginAt).toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </main>
  );
}