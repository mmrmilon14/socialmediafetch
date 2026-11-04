import { Shell } from "./Shell";

export function ProsePage({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <Shell>
      <article className="max-w-[720px]">
        <h1 className="font-bold text-[30px] sm:text-[36px] leading-tight mb-3">{title}</h1>
        {intro && <p className="text-[16px] leading-relaxed mb-8">{intro}</p>}
        <div className="space-y-6 text-[15px] leading-relaxed [&_h2]:font-bold [&_h2]:text-[20px] [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-brand [&_a:hover]:underline">
          {children}
        </div>
      </article>
    </Shell>
  );
}
