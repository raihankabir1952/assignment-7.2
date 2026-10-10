"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

interface UserMenuProps {
    name: string;
    email: string;
}

const UserMenu = ({ name, email }: UserMenuProps) => {
    const [open, setOpen] = useState(false);
    const [signingOut, setSigningOut] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const initial = name.charAt(0).toUpperCase() || "U";

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open]);

    const handleSignOut = async () => {
        setSigningOut(true);

        const res = await authClient.signOut();

        if (res.error) {
            setSigningOut(false);
            toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
            return;
        }

        // সরাসরি হোম পেজে (localhost:3000); পুরো রিলোড হয় বলে নেভবারও নতুন অবস্থায় আসে
        window.location.assign("/");
    };

    return (
        <div ref={menuRef} className="relative">
            
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={open}
                className="flex min-w-0 items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-green-50 sm:gap-3 sm:px-3 sm:py-2"
            >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#008a45] text-sm font-bold text-white shadow-sm sm:h-10 sm:w-10 sm:text-base">
                    {initial}
                </span>

                <span className="max-w-28 truncate text-xs font-semibold text-gray-800 sm:max-w-44 sm:text-sm">
                    {name}
                </span>
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    role="menu"
                    className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-lg"
                >
                    <p className="truncate text-sm font-bold text-gray-900">
                        {name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-gray-500">
                        {email}
                    </p>

                    <div className="my-3 border-t border-gray-100" />

                    <Link
                        href="/profile"
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-1 py-2 text-sm text-gray-800 transition-colors hover:bg-gray-50"
                    >
                        <span aria-hidden="true">👤</span>
                        আমার প্রোফাইল
                    </Link>

                    <button
                        type="button"
                        role="menuitem"
                        onClick={handleSignOut}
                        disabled={signingOut}
                        className="mt-1 flex w-full items-center gap-2 rounded-lg px-1 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <span aria-hidden="true">↩</span>
                        {signingOut ? "বের হচ্ছে..." : "সাইন আউট"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;