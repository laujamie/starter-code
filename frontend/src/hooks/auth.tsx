import { useAtom } from "jotai";
import { MagicUserMetadata } from "magic-sdk";
import { SetStateAction } from "react";
import { userAtom, userLoading } from "~/src//stores/auth";

type AuthObject = {
  user: MagicUserMetadata | null;
  loading: boolean;
  setUser(update: SetStateAction<MagicUserMetadata | null>): void;
  setLoading(update: SetStateAction<boolean>): void;
};

export function useAuth(): AuthObject {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useAtom(userLoading);
  return {
    user,
    setUser,
    loading,
    setLoading,
  };
}
