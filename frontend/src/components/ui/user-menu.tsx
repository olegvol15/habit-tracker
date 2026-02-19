import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { LogOut, User } from "lucide-react";
import { useCurrentUser, useLogout } from "../../hooks/auth";
import { Button } from "./button";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { data: me } = useCurrentUser();
  const logout = useLogout();
  const navigate = useNavigate();

  const avatarUrl = me?.user?.avatarUrl;
  const name = me?.user?.name;
  const email = me?.user?.email;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleLogout = async () => {
    await logout.mutateAsync();
    navigate({ to: "/login" });
  };

  return (
    <div ref={menuRef} className="relative z-50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-zinc-700 bg-zinc-800 transition-colors hover:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name ?? "Avatar"}
            className="h-full w-full object-cover"
          />
        ) : (
          <User size={20} className="text-zinc-400" />
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-lg p-3 shadow-xl">
          {(name || email) && (
            <div className="mb-3 border-b border-zinc-800 pb-3">
              {name && (
                <p className="truncate text-sm font-medium text-white">
                  {name}
                </p>
              )}
              {email && (
                <p className="truncate text-xs text-zinc-400">{email}</p>
              )}
            </div>
          )}

          <Button
            variant="danger"
            size="sm"
            className="flex w-full items-center justify-center gap-2"
            onClick={handleLogout}
            disabled={logout.isPending}
          >
            <LogOut size={14} />
            {logout.isPending ? "Signing out..." : "Sign out"}
          </Button>
        </div>
      )}
    </div>
  );
}
