"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface FlowState {
  apartmentSizes: number[];
}

interface FlowContextValue {
  flow: FlowState;
  toggleApartmentSize: (size: number) => void;
  setApartmentSizes: (sizes: number[]) => void;
}

const defaultFlow: FlowState = {
  apartmentSizes: [],
};

const STORAGE_KEY = "re-tem-flow";

const FlowContext = createContext<FlowContextValue | null>(null);

export function FlowProvider({ children }: { children: ReactNode }) {
  const [flow, setFlow] = useState<FlowState>(defaultFlow);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFlow(JSON.parse(stored));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flow));
  }, [flow, hydrated]);

  function toggleApartmentSize(size: number) {
    setFlow((prev) => ({
      ...prev,
      apartmentSizes: prev.apartmentSizes.includes(size)
        ? prev.apartmentSizes.filter((s) => s !== size)
        : [...prev.apartmentSizes, size],
    }));
  }

  function setApartmentSizes(sizes: number[]) {
    setFlow((prev) => ({ ...prev, apartmentSizes: sizes }));
  }

  return (
    <FlowContext.Provider value={{ flow, toggleApartmentSize, setApartmentSizes }}>
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error("useFlow must be used inside FlowProvider");
  return ctx;
}
