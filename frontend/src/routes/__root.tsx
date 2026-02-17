import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";
import type { RouterContext } from "../lib/routerContext";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Outlet />
      <Toaster theme="dark" position="top-center" richColors />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
