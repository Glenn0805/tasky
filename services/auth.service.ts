import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export async function login(email: string, password: string) {
  const supabase = createSupabaseBrowserClient();

  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function register(email: string, password: string) {
  const supabase = createSupabaseBrowserClient();

  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

export async function loginWithGoogle() {
  const supabase = createSupabaseBrowserClient();

  return await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

export async function logout() {
  const supabase = createSupabaseBrowserClient();

  return await supabase.auth.signOut();
}
