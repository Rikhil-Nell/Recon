import { create } from "zustand";

interface CursorState {
  variant: "default" | "hover" | "click" | "text";
  setVariant: (variant: "default" | "hover" | "click" | "text") => void;
}

export const useCursorStore = create<CursorState>((set) => ({
  variant: "default",
  setVariant: (variant) => set({ variant }),
}));
