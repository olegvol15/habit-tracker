import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { CircleCheck, Home, User } from "lucide-react";
import { ensureCurrentUser } from "../lib/ensureCurrentUser";
import Dock from "../components/ui/dock";
import { UserMenu } from "../components/ui/user-menu";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ context, location }) => {
    const user = await ensureCurrentUser(context.queryClient);

    if (!user) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href, error: undefined },
      });
    }
  },
  component: AppLayout,
});

function AppLayout() {
  const nav = useNavigate();

  const items = [
    {
      icon: <Home size={18} />,
      label: "Today",
      onClick: () => nav({ to: "/today" }),
    },
    {
      icon: <CircleCheck size={18} />,
      label: "Habits",
      onClick: () => nav({ to: "/habits" }),
    },
    {
      icon: <User size={18} />,
      label: "Profile",
      onClick: () => nav({ to: "/profile" }),
    },
  ];

  return (
    <>
      <header className="flex items-center justify-start px-4 sm:px-10 py-4">
        <UserMenu />
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 pb-24 sm:pb-6">
        <Outlet />
      </main>

      <footer>
        <Dock
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </footer>
    </>
  );
}
