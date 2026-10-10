import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import NavLink from "./NavLink";
import Marquee from "./Marquee";

const CurrentDate = async () => {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
    });

    return <>{date}</>;
};

const AuthSection = async () => {
    await connection(); // <- added: marks this part dynamic before the session code reads the time

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
        return (
            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                <Link
                    href="/signin"
                    className="px-2 py-2 text-xs font-semibold text-gray-800 transition-colors hover:text-[#008a45] sm:px-3 sm:text-sm"
                >
                    সাইন ইন
                </Link>

                <Link
                    href="/signup"
                    className="rounded-xl bg-[#008a45] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-green-900/10 transition-all hover:bg-[#007339] sm:px-6 sm:py-2.5 sm:text-sm"
                >
                    সাইন আপ
                </Link>
            </div>
        );
    }

    const userName = user.name?.trim() || "User";
    const initial = userName.charAt(0).toUpperCase();

    return (
        <Link
            href="/profile"
            aria-label={`${userName} - প্রোফাইল`}
            title="প্রোফাইল দেখুন"
            className="flex min-w-0 items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-green-50 sm:gap-3 sm:px-3 sm:py-2"
        >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#008a45] text-sm font-bold text-white shadow-sm sm:h-10 sm:w-10 sm:text-base">
                {initial}
            </span>

            <span className="max-w-28 truncate text-xs font-semibold text-gray-800 sm:max-w-44 sm:text-sm">
                {userName}
            </span>
        </Link>
    );
};

const Navbar = () => {
    return (
        <header className="relative z-40 w-full bg-[#f8faf8]">
            {/* Top Navbar */}
            <div className="border-b border-gray-100">
                <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
                    {/* Logo and Website Name */}
                    <Link
                        href="/"
                        className="flex min-w-0 items-center gap-2 select-none sm:gap-3"
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#008a45] shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl">
                            <Image
                                src="/logo-icon.png"
                                alt="বাজার দর Logo"
                                width={30}
                                height={30}
                                className="h-6 w-6 object-contain brightness-0 invert sm:h-7 sm:w-7"
                                priority
                            />
                        </div>

                        <div className="flex min-w-0 flex-col justify-center">
                            <h1 className="text-lg font-bold leading-tight text-black sm:text-xl">
                                বাজার দর
                            </h1>

                            <small className="mt-1 hidden text-xs font-medium text-gray-500 sm:block">
                                <Suspense
                                    fallback={
                                        <span className="inline-block h-3 w-28 animate-pulse rounded bg-gray-100" />
                                    }
                                >
                                    <CurrentDate />
                                </Suspense>
                            </small>
                        </div>
                    </Link>

                    {/* Authentication Section */}
                    <Suspense
                        fallback={
                            <div className="h-10 w-28 shrink-0 animate-pulse rounded-xl bg-gray-100 sm:w-36" />
                        }
                    >
                        <AuthSection />
                    </Suspense>
                </div>
            </div>

            {/* Category Navigation */}
            <div className="mx-auto hidden max-w-7xl px-4 sm:px-6 lg:block lg:px-8">
                <NavLink />
            </div>

            {/* Market Price Marquee */}
            <div>
                <Marquee />
            </div>
        </header>
    );
};

export default Navbar;