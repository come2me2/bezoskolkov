import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/section";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main id="main" className="pb-20 pt-10 md:pb-28 md:pt-14">
      <Container className="max-w-3xl">
        <Link href="/" className="text-sm text-mute transition-colors hover:text-bone">
          ← На главную
        </Link>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-bone md:text-4xl">
          {title}
        </h1>
        <div className="prose-legal mt-8 space-y-5 text-sm leading-relaxed text-mute md:text-base">
          {children}
        </div>
      </Container>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2 font-display text-lg font-semibold text-bone">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
