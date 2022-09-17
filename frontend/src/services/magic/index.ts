import { Magic, MagicUserMetadata } from "magic-sdk";

export const magic = new Magic(process.env.MAGIC_API_KEY ?? "", {
  testMode: process.env.NODE_ENV == "development",
});

export async function handleLoginWithEmail(
  email: string
): Promise<MagicUserMetadata | null> {
  const didToken = await magic.auth.loginWithMagicLink({
    email,
    redirectURI: new URL("/callback", window.location.origin).href,
  });

  const res = await fetch(`${process.env.SERVER_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${didToken}`,
    },
  });

  if (res.status === 200) {
    const userMetadata = await magic.user.getMetadata();
    return userMetadata;
  }
  return null;
}

export async function handleLogout(): Promise<boolean> {
  return magic.user.logout();
}
