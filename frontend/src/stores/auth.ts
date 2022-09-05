import { atom } from "jotai";
import type { MagicUserMetadata } from "magic-sdk";

export type UserData = {
  user: MagicUserMetadata | null;
  loading: boolean;
};

export const userAtom = atom<MagicUserMetadata | null>(null);
export const userLoading = atom(false);
