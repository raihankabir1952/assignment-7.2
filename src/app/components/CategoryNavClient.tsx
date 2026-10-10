
"use client";

import { useState } from "react";
import Link from "next/link";

interface Category {
    id: string | number;
    nameBn: string;
    slug: string;
    icon?: string;
    categoryIcon?: string;
}

export default function CategoryNavClient({
    categories,
}: {
    categories: Category[];
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav
            aria-label="পণ্যের ক্যাটাগরি"
            className="w-full border-b border-gray-100 bg-white"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Mobile hamburger button */}
                <div className="flex items-center justify-between py-3 lg:hidden">
                    <span className="text-sm font-semibold text-gray-800">
                        পণ্যের ক্যাটাগরি
                    </span>

                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label={
                            isOpen
                                ? "ক্যাটাগরি মেনু বন্ধ করুন"
                                : "ক্যাটাগরি মেনু খুলুন"
                        }
                        aria-expanded={isOpen}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-2xl text-[#008a45] transition hover:bg-green-50"
                    >
                        {isOpen ? "×" : "☰"}
                    </button>
                </div>

                {/* Desktop category links */}
                <div className="hidden overflow-x-auto lg:block">
                    {categories.length > 0 ? (
                        <ul className="flex min-w-max items-center gap-6">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        href={`/category/${category.slug || category.id}`}
                                        className="flex items-center gap-2 border-b-2 border-transparent py-4 text-sm font-medium text-gray-600 transition-colors hover:border-[#008a45] hover:text-[#008a45]"
                                    >
                                        <span aria-hidden="true" className="text-lg">
                                            {category.categoryIcon ||
                                                category.icon ||
                                                "🛒"}
                                        </span>

                                        <span>{category.nameBn}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="py-4 text-sm text-gray-500">
                            ক্যাটাগরি লোড করা যাচ্ছে না।
                        </p>
                    )}
                </div>

                {/* Mobile dropdown menu */}
                {isOpen && (
                    <div className="border-t border-gray-100 py-3 lg:hidden">
                        {categories.length > 0 ? (
                            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <Link
                                            href={`/category/${category.slug || category.id}`}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-[#008a45]"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="text-lg"
                                            >
                                                {category.categoryIcon ||
                                                    category.icon ||
                                                    "🛒"}
                                            </span>

                                            <span>{category.nameBn}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="py-4 text-sm text-gray-500">
                                ক্যাটাগরি লোড করা যাচ্ছে না।
                            </p>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
