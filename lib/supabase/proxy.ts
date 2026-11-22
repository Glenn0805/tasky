import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
const isMatch = (pathname: string, paths: string[]) =>
  paths.some((p) =>
    p === "/"
      ? pathname === "/"
      : pathname === p || pathname.startsWith(`${p}/`),
  );
const AUTH_PAGES = ["/login", "/signup"]; // logged-in users get bounced away from these
const PUBLIC_PATHS = ["/", "/auth"];
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });

          Object.entries(headers).forEach(([key, value]) => {
            response.headers.set(key, value);
          });
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();
  const isAuthed = !!data?.claims;
  const { pathname } = request.nextUrl;

  // Redirect while preserving refreshed session cookies
  const redirectTo = (path: string, search = "") => {
    const url = request.nextUrl.clone();
    url.pathname = path;
    url.search = search;
    const res = NextResponse.redirect(url);
    response.cookies.getAll().forEach((c) => res.cookies.set(c));
    return res;
  };

  // Not logged in, hitting a protected route -> /login (remember where they were going)
  if (!isAuthed && !isMatch(pathname, [...AUTH_PAGES, ...PUBLIC_PATHS])) {
    return redirectTo("/login");
  }

  // Logged in, hitting /login or /signup -> send them in
  if (isAuthed && isMatch(pathname, AUTH_PAGES)) {
    return redirectTo("/boards");
  }

  return response;
}
