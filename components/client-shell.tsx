"use client";

import type { ReactNode } from "react";
import { ResultsProvider } from "@/lib/results-context";
import Navbar from "@/components/navbar";

interface ClientShellProps {
  apiConfigured: boolean;
  children: ReactNode;
}

/**
 * Client boundary that wraps Navbar and page content inside
 * the ResultsProvider, enabling cross-component result state sharing.
 */
export default function ClientShell({ apiConfigured, children }: ClientShellProps) {
  return (
    <ResultsProvider>
      <Navbar apiConfigured={apiConfigured} />
      {children}
    </ResultsProvider>
  );
}
