import { AdminAdd, AdminItem } from "@/components/admin/admin-item";
import { ConfirmDelete } from "@/components/admin/confirm-delete";
import { PageHead } from "@/components/admin/page-head";
import { listAdminAccess } from "@/lib/auth/admin-access";
import { requireAdmin } from "@/lib/auth/guard";
import { AddAdminForm } from "./add-admin-form";
import { removeAdmin } from "./actions";

export default async function AdminsPage() {
  const currentUser = await requireAdmin();
  const admins = await listAdminAccess();

  return (
    <>
      <PageHead
        icon="key"
        kicker="Security"
        title="Admin Access"
        subtitle="Choose who can request a one-click sign-in link and edit the website."
      />

      <div className="admin-list">
        <AdminAdd label="Add an admin">
          <AddAdminForm />
        </AdminAdd>

        {admins.map((admin) => {
          const isCurrent = currentUser.email?.toLowerCase() === admin.email;
          const removable =
            admin.managed && !admin.bootstrap && !isCurrent && admin.userId;

          return (
            <AdminItem
              key={admin.email}
              icon="key"
              title={admin.email}
              meta={
                isCurrent
                  ? "You are signed in with this address"
                  : "Can edit the website"
              }
              badge={admin.bootstrap ? "Recovery admin" : "Admin"}
              badgeTone={admin.bootstrap ? "gold" : ""}
            >
              <p className="hint">
                {admin.bootstrap
                  ? "This address is protected by the Vercel recovery list. Change ADMIN_EMAILS in Vercel to remove it."
                  : "This access is managed here and can be removed without deleting the person's Supabase account."}
              </p>

              {removable && (
                <form action={removeAdmin}>
                  <input type="hidden" name="user_id" value={admin.userId} />
                  <input type="hidden" name="email" value={admin.email} />
                  <div className="admin-rowbar">
                    <ConfirmDelete itemName={admin.email}>
                      <button className="btn btn-danger" type="submit">
                        Yes, remove access
                      </button>
                    </ConfirmDelete>
                  </div>
                </form>
              )}
            </AdminItem>
          );
        })}
      </div>

      <section className="admin-section" style={{ marginTop: 22 }}>
        <h3>Keep the recovery list</h3>
        <p className="hint">
          The addresses in Vercel&apos;s ADMIN_EMAILS setting remain permanent
          recovery admins. Keep at least two trusted addresses there in case an
          account is removed accidentally.
        </p>
      </section>
    </>
  );
}
