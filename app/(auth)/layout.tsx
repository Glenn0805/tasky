import { cacheLife } from "next/cache";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const getCurrentYear = async () => {
    "use cache";
    cacheLife("max");
    return new Date().getFullYear();
  };
  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      <main className="flex items-center justify-center px-6 py-12 sm:px-12">
        {children}
      </main>
      <aside className="hidden bg-slate-900 p-12 text-slate-100 lg:flex lg:flex-col lg:justify-between">
        <span className="text-lg font-semibold">TASKY</span>
        <div className="max-w-md">
          <p className="text-3xl leading-snug font-semibold">
            Simple task management for teams and individuals
          </p>
          <p className="mt-4 text-slate-300">
            Tasky is a simple task management app that helps you organize your
            tasks and projects. It is built with Next.js, Supabase, and Tailwind
            CSS.
          </p>
        </div>
        <span className="text-sm text-slate-400">
          © {await getCurrentYear()} Tasky
        </span>
      </aside>
    </div>
  );
};

export default AuthLayout;
