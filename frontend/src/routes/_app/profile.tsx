import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useGetProfile, useUpdateProfile, useDeleteAccount, useUploadAvatar } from "../../hooks/users";
import { Button } from "../../components/ui/button";
import { Modal } from "../../components/ui/modal";

export const Route = createFileRoute("/_app/profile")({
  component: ProfilePage,
});

function getInitials(name: string | null, email: string) {
  if (name) {
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0][0].toUpperCase();
  }
  return email[0].toUpperCase();
}

function ProfilePage() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetProfile();
  const updateProfile = useUpdateProfile();
  const deleteAccount = useDeleteAccount();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timezone, setTimezone] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadAvatar = useUploadAvatar();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");

  useEffect(() => {
    if (data?.user) {
      setName(data.user.name ?? "");
      setEmail(data.user.email);
      setTimezone(data.user.timezone);
    }
  }, [data?.user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile.mutateAsync({
        name: name.trim() || null,
        email,
        timezone,
      });
      toast.success("Profile updated");
    } catch {
      // global interceptor already toasts the error
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount.mutateAsync();
      navigate({ to: "/login", search: { redirect: undefined, error: undefined } });
    } catch {
      // global interceptor already toasts the error
    }
  };

  if (isLoading) return <div className="text-zinc-400">Loading...</div>;
  if (!data) return null;

  const { user, highestStreak } = data;
  const initials = getInitials(user.name, user.email);

  return (
    <div className="mx-auto max-w-lg space-y-6">

      {/* Avatar header */}
      <div className="flex flex-col items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadAvatar.isPending}
          className="group relative h-20 w-20 rounded-full focus:outline-none"
          aria-label="Change avatar"
        >
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name ?? user.email}
              className="h-20 w-20 rounded-full object-cover ring-2 ring-zinc-700"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800 ring-2 ring-zinc-700 text-2xl font-semibold text-white">
              {uploadAvatar.isPending ? "…" : initials}
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 group-disabled:opacity-100">
            <span className="text-xs font-medium text-white">
              {uploadAvatar.isPending ? "Uploading…" : "Change"}
            </span>
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            e.target.value = "";
            if (file.size > 2 * 1024 * 1024) {
              toast.error("Image must be smaller than 2 MB");
              return;
            }
            try {
              await uploadAvatar.mutateAsync(file);
              toast.success("Avatar updated");
            } catch {
              // global interceptor already toasts the error
            }
          }}
        />
        <div className="text-center">
          <p className="text-lg font-semibold text-white">{user.name ?? "—"}</p>
          <p className="text-sm text-zinc-400">{user.email}</p>
        </div>
      </div>

      {/* Edit form */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-400">Edit profile</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-3 sm:py-2.5 text-base sm:text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-3 sm:py-2.5 text-base sm:text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400">Timezone</span>
            <input
              type="text"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              placeholder="Europe/London"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-3 sm:py-2.5 text-base sm:text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />
          </label>

          <Button type="submit" className="w-full" disabled={updateProfile.isPending}>
            {updateProfile.isPending ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </div>

      {/* Stats */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-400">Stats</h2>
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔥</span>
          <div>
            <p className="text-2xl font-bold text-white">{highestStreak}</p>
            <p className="text-sm text-zinc-400">Highest streak</p>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="rounded-xl border border-red-900/50 bg-zinc-900/50 p-5">
        <h2 className="mb-1 text-sm font-medium uppercase tracking-wider text-red-400">Danger zone</h2>
        <p className="mb-4 text-sm text-zinc-400">Permanently delete your account and all your data.</p>
        <Button variant="danger" onClick={() => setDeleteModalOpen(true)}>
          Delete account
        </Button>
      </div>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setDeleteConfirm(""); }}
        title="Delete account"
      >
        <p className="mb-4 text-sm text-zinc-300">
          This will permanently delete your account and all your habits and checkins. Type{" "}
          <span className="font-mono font-semibold text-white">DELETE</span> to confirm.
        </p>
        <input
          type="text"
          value={deleteConfirm}
          onChange={(e) => setDeleteConfirm(e.target.value)}
          placeholder="DELETE"
          className="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
        />
        <Button
          variant="danger"
          className="w-full"
          disabled={deleteConfirm !== "DELETE" || deleteAccount.isPending}
          onClick={handleDelete}
        >
          {deleteAccount.isPending ? "Deleting..." : "Delete my account"}
        </Button>
      </Modal>

    </div>
  );
}
