"use client";

import { useState } from "react";
import Link from "next/link";

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("Raihan Kabir");
    const [newName, setNewName] = useState(name);

    const initial = name.trim().charAt(0).toUpperCase() || "U";

    return (
        <main className="min-h-[70vh] w-full bg-[#f4f8f5] py-10">
            <div className="mx-auto max-w-2xl px-4 sm:px-6">
                <Link
                    href="/"
                    className="text-sm text-gray-600 hover:text-[#008a45]"
                >
                    ← হোমে ফিরে যান
                </Link>

                <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    {/* Profile Header */}
                    <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-5">
                        <div className="flex min-w-0 items-center gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#008a45] text-2xl font-bold text-white">
                                {initial}
                            </div>

                            <div className="min-w-0">
                                <h1 className="text-xl font-bold text-gray-900">
                                    আমার প্রোফাইল
                                </h1>

                                <p className="mt-1 break-all text-xs text-gray-500 sm:text-sm">
                                    raihan@example.com
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled
                            title="Sign out functionality পরে যোগ করা হবে"
                            className="flex shrink-0 items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 opacity-60 sm:px-4"
                        >
                            <span aria-hidden="true">↪</span>
                            <span className="hidden sm:inline">
                                সাইন আউট
                            </span>
                            <span className="sm:hidden">বের হন</span>
                        </button>
                    </div>

                    {/* Personal Information */}
                    <div className="mt-6 space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                নাম
                            </label>

                            {!isEditing ? (
                                <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                                    <span className="break-words text-sm text-gray-900">
                                        {name || "নাম দেওয়া নেই"}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setNewName(name);
                                            setIsEditing(true);
                                        }}
                                        className="shrink-0 text-sm font-semibold text-[#008a45] hover:text-[#007339]"
                                    >
                                        Edit
                                    </button>
                                </div>
                            ) : (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();

                                        const trimmedName = newName.trim();

                                        if (!trimmedName) return;

                                        setName(trimmedName);
                                        setIsEditing(false);
                                    }}
                                    className="space-y-3"
                                >
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) =>
                                            setNewName(e.target.value)
                                        }
                                        maxLength={100}
                                        autoFocus
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#008a45] focus:ring-1 focus:ring-[#008a45]"
                                        placeholder="আপনার নাম লিখুন"
                                    />

                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            type="submit"
                                            disabled={!newName.trim()}
                                            className="rounded-xl bg-[#008a45] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#007339] disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            Update Information
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setNewName(name);
                                                setIsEditing(false);
                                            }}
                                            className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
