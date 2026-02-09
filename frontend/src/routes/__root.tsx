import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { RouterContext } from "../lib/routerContext";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div className="font-semibold">Habit Tracker</div>

          <nav className="flex gap-2 text-sm">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-md hover:bg-zinc-900"
              activeProps={{ className: "bg-zinc-900" }}
            >
              Home
            </Link>
            <Link
              to="/today"
              className="px-3 py-1.5 rounded-md hover:bg-zinc-900"
              activeProps={{ className: "bg-zinc-900" }}
            >
              Today
            </Link>
            <Link
              to="/habits"
              className="px-3 py-1.5 rounded-md hover:bg-zinc-900"
              activeProps={{ className: "bg-zinc-900" }}
            >
              Habits
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>

      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
