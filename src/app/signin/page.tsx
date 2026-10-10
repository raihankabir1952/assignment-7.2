"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignInForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // শুধু নিজের সাইটের পাথ গ্রহণ করা হয় (অন্য সাইটে পাঠানো ঠেকাতে)
    const rawCallback = searchParams.get("callbackUrl") ?? "/";
    const callbackUrl =
        rawCallback.startsWith("/") && !rawCallback.startsWith("//")
            ? rawCallback
            : "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const result = await authClient.signIn.email({
                email: email.trim(),
                password,
            });

            if (result.error) {
                toast.error("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
                setError("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।");
                return;
            }

            toast.success("সফলভাবে সাইন ইন হয়েছে!");
            router.push(callbackUrl);
            router.refresh();
        } catch {
            setError("লগইন করা যায়নি। আবার চেষ্টা করুন।");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialSignIn = async (provider: "google" | "github") => {
        setError("");
        setSocialLoading(provider);

        try {
            const result = await authClient.signIn.social({
                provider,
                callbackURL: callbackUrl,
            });

            if (result.error) {
                setError("সোশ্যাল লগইন শুরু করা যায়নি।");
                setSocialLoading("");
            }
        } catch {
            setError("সোশ্যাল লগইনে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
            setSocialLoading("");
        }
    };

    return (
        <div className="min-h-screen bg-[#f3f6f3] flex flex-col items-center justify-center p-4">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    সাইন ইন
                </h1>
                <p className="text-gray-500 text-sm">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            <div className="w-full max-w-md bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
                            ইমেইল
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 bg-[#f9fafb] border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008a45] focus:bg-white transition-all text-sm"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                            পাসওয়ার্ড
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            minLength={8}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="w-full px-4 py-2.5 bg-[#f9fafb] border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008a45] focus:bg-white transition-all text-sm"
                        />
                    </div>

                    {error && (
                        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || !!socialLoading}
                        className="w-full py-2.5 px-4 bg-[#008a45] hover:bg-[#007339] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-md shadow-green-900/10 transition-all text-sm"
                    >
                        {isLoading ? "লগইন হচ্ছে..." : "সাইন ইন"}
                    </button>
                </form>

                <div className="relative my-6 flex items-center justify-center">
                    <div className="border-t border-gray-200 w-full" />
                    <span className="bg-white px-3 text-xs text-gray-400 font-medium absolute">
                        অথবা
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <button
                        type="button"
                        disabled={isLoading || !!socialLoading}
                        onClick={() => handleSocialSignIn("google")}
                        className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 disabled:opacity-60 text-xs font-semibold text-gray-700 transition-colors"
                    >
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        {socialLoading === "google" ? "অপেক্ষা করুন..." : "Google দিয়ে চালিয়ে যান"}
                    </button>

                    <button
                        type="button"
                        disabled={isLoading || !!socialLoading}
                        onClick={() => handleSocialSignIn("github")}
                        className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 disabled:opacity-60 text-xs font-semibold text-gray-700 transition-colors"
                    >
                        <svg className="w-4 h-4 shrink-0 fill-current text-gray-900" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        {socialLoading === "github" ? "অপেক্ষা করুন..." : "GitHub দিয়ে চালিয়ে যান"}
                    </button>
                </div>

                <div className="text-center text-xs text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link href="/signup" className="text-[#008a45] hover:underline font-semibold">
                        সাইন আপ করুন
                    </Link>
                </div>
            </div>

            <div className="mt-8 text-center">
                <Link href="/" className="text-gray-500 hover:text-gray-700 text-xs font-medium flex items-center gap-1 justify-center transition-colors">
                    <span>←</span> হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
};

// useSearchParams ব্যবহার করলে Suspense লাগে, নাহলে build এরর আসে
const SignInPage = () => (
    <Suspense>
        <SignInForm />
    </Suspense>
);

export default SignInPage;