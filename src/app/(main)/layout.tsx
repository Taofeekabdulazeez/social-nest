import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { SessionProvider } from "./session-provider";
import NavBar from "./nav-bar";
import MenuBar from "./menu-bar";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
          <MenuBar className="xl:w-75 sticky top-[5.2.5rem] hidden h-fit flex-none rounded-2xl bg-card px-3 py-5 sm:block lg:w-72" />
          {children}
        </div>
        <MenuBar className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card sm:hidden" />
      </div>
    </SessionProvider>
  );
}
