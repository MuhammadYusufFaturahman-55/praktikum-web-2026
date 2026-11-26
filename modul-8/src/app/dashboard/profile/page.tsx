import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logoutAction } from "@/actions/auth";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("praktikum_session");

  if (!sessionCookie) {
    redirect("/login");
  }

  const user = JSON.parse(sessionCookie.value);

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
              HALAMAN PROFIL TERPROTEKSI
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Profil Pengguna</h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              Dashboard
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="px-3 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer"
              >
                Keluar
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-3 text-sm text-slate-700 bg-slate-50 p-5 rounded-lg border border-slate-200">
          <p>
            <strong>ID Pengguna:</strong> #{user.id}
          </p>
          <p>
            <strong>Nama Lengkap:</strong> {user.name}
          </p>
          <p>
            <strong>NIM:</strong> {user.nim || "-"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Hak Akses:</strong> {user.role}
          </p>
        </div>
      </div>
    </main>
  );
}