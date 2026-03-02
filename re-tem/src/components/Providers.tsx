"use client";

import { FlowProvider } from "@/src/context/FlowContext";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <FlowProvider>{children}</FlowProvider>;
}
