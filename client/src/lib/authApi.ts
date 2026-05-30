export type AuthMode = "login" | "register";

export type AuthPayload = {
  email: string;
  password: string;
  name?: string;
};

export async function submitAuth(mode: AuthMode, payload: AuthPayload) {
  const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Authentication failed");
  }

  return data as { success: true; name?: string };
}

export async function loginWithGoogle(credential: string) {
  const response = await fetch("/api/auth/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ credential }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Google login failed");
  }

  return data as { success: true; name?: string };
}
