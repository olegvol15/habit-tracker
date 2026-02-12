import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import {CircleCheck, Home, Settings, User} from "lucide-react"
import { ensureCurrentUser } from "../lib/ensureCurrentUser";
import Dock from "../components/ui/dock";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ context, location }) => {
    const user = await ensureCurrentUser(context.queryClient);

    if (!user) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
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
      onClick: () => nav({to: "/today"}),
    },
    {
      icon: <CircleCheck size={18} />,
      label: "Habits",
      onClick: () => nav({to: "/habits"})
    },
    {
      icon: <User size={18} />,
      label: "Profile",
      onClick: () => nav({to: "/profile"}),
    },
    {
      icon: <Settings size={18} />,
      label: "Settings",
      onClick: () => nav({to: "/settings"}),
    },
  ];
  return (
    <>
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
