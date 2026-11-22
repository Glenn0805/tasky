"use client";
import { Button } from "@/components/tailgrids/core/button";
import { FieldError, FieldSeparator } from "@/components/tailgrids/core/field";
import { Input } from "@/components/tailgrids/core/input";
import { Label } from "@/components/tailgrids/core/label";
import { SocialButton } from "@/components/tailgrids/core/social-button";
import { TextField } from "@/components/tailgrids/core/text-field";
import { Toast } from "@/components/tailgrids/core/toast";
import { login } from "@/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { SubmitEvent, useState } from "react";
import { FaGoogle } from "react-icons/fa";

type FormErrors = Partial<Record<"name" | "email" | "password", string>>;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(email))
      next.email = "Enter a valid email address.";
    if (password.length < 8) next.password = "Use at least 8 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const run = async (fn: () => Promise<void> | void, fallback: string) => {
    setFormError("");
    setLoading(true);
    try {
      await fn();
    } catch (err) {
      setFormError(
        err instanceof Error && err.message ? err.message : fallback,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    void run(async () => {
      const { error } = await login(email, password);

      if (error) {
        setFormError(error.message);
        setLoading(false);
        return;
      }

      router.refresh();
    }, "Something went wrong. Try again.");
  };

  const handleGoogle = () => {
    void run(() => {}, "Google sign-in failed. Try again.");
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        Welcome back
      </h1>
      <p className="mt-2 text-slate-600">Log in with Google or your email.</p>

      <div className="mt-8">
        <SocialButton
          onPress={handleGoogle}
          disabled={loading}
          className="w-full"
        >
          <FaGoogle />
          Log in with Google
        </SocialButton>
      </div>

      <FieldSeparator className="my-6">or use email</FieldSeparator>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <TextField
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          disabled={loading}
          invalid={!!errors.email}
          validationBehavior="aria"
        >
          <Label>Email</Label>
          <Input placeholder="you@example.com" />
          <FieldError>{errors.email}</FieldError>
        </TextField>

        <TextField
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          disabled={loading}
          invalid={!!errors.password}
          validationBehavior="aria"
        >
          <Label>Password</Label>
          <Input placeholder="••••••••" />
          <FieldError>{errors.password}</FieldError>
        </TextField>

        <div className="text-right">
          <a
            href="/forgot-password"
            className="text-sm font-medium text-slate-700 underline-offset-4 hover:underline"
          >
            Forgot password?
          </a>
        </div>

        {formError && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
          >
            {formError}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          pending={loading}
          className="w-full"
        >
          {loading ? "Please wait…" : "Log in"}
        </Button>
      </form>

      <p className="mt-8 text-sm text-slate-600">
        New here?
        <Link
          href="/signup"
          className="font-semibold text-slate-900 underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
