import { requireAdmin } from "@/lib/auth/guard";
import { AdminShell } from "@/components/admin/admin-shell";
import { Icon } from "@/components/icon";
import { signOut } from "./actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <AdminShell
      signOut={
        <form action={signOut}>
          <button type="submit">
            <Icon name="logout" />
            Sign out
          </button>
        </form>
      }
    >
      {children}
    </AdminShell>
  );
}
