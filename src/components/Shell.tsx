import { Sidebar } from "./Sidebar";

/** Sidebar + light-blue main panel, matching the site layout. */
export function Shell({ active, children }: { active?: string; children: React.ReactNode }) {
  return (
    <div className="max-w-[1180px] mx-auto lg:px-4 lg:grid lg:grid-cols-[220px_1fr] lg:gap-6">
      <Sidebar active={active} />
      <main className="bg-page min-w-0 px-4 sm:px-6 lg:px-8 py-10 lg:py-12">{children}</main>
    </div>
  );
}
