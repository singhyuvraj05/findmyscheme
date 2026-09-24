"use client";

import React, { createContext, useContext, useState } from "react";
import type { Scheme } from "@/data/schemes";
import type { Partner } from "@/data/partners";

export interface EMIState {
  loanAmount: number;
  tenureMonths: number;
  moratoriumMonths: number;
  interestRate: number;
}

interface AppState {
  selectedScheme: Scheme | null;
  setSelectedScheme: (scheme: Scheme | null) => void;
  emiState: EMIState;
  setEmiState: (state: Partial<EMIState>) => void;
  selectedPartner: Partner | null;
  setSelectedPartner: (partner: Partner | null) => void;
  routingToken: string;
}

const DEFAULT_EMI: EMIState = {
  loanAmount: 500000,
  tenureMonths: 36,
  moratoriumMonths: 6,
  interestRate: 7,
};

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [emiState, setEmiStateRaw] = useState<EMIState>(DEFAULT_EMI);

  // Generate stable routing token once per session
  const [routingToken] = useState<string>(() => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let token = "SMR-";
    for (let i = 0; i < 8; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
  });

  function setEmiState(patch: Partial<EMIState>) {
    setEmiStateRaw((prev) => ({ ...prev, ...patch }));
  }

  return (
    <AppStateContext.Provider
      value={{
        selectedScheme,
        setSelectedScheme,
        emiState,
        setEmiState,
        selectedPartner,
        setSelectedPartner,
        routingToken,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppState {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
