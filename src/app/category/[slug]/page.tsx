import React, { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cacheLife } from "next/cache";

const CATEGORIES_URL =
    "https://openapi.programming-hero.com/api/bazardor/categories";

const PRODUCTS_URL =
    "https://openapi.programming-hero.com/api/bazardor/products";

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ sort?: string }>;
}

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

interface Change {
    dir: "up" | "down" | "flat";
    pct: number;
}

interface Product {
    id: string | number;
    slug: string;
    image: string;
    nameBn: string;
    today: number;
    unit: string;
    change: Change;
    category: string;
}

type SortKey = "default" | "priceAsc" | "priceDesc" | "change";

const sortOptions: { value: SortKey; label: string }[] = [
    { value: "default", label: "ডিফল্ট" },
    { value: "priceAsc", label: "দাম: কম থেকে বেশি" },
    { value: "priceDesc", label: "দাম: বেশি থেকে কম" },
    { value: "change", label: "বেশি পরিবর্তন" },
];

const unitBn: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
};

const toBn = (n: number) => n.toLocaleString("bn-BD");

const pctBn = (n: number) =>
    Math.abs(n).toLocaleString("bn-BD", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });


    async function getJson<T>(url: string): Promise<T> {
    "use cache";
    cacheLife("hours");

    let lastStatus = 0;

    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const res = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    "User-Agent": "Mozilla/5.0 (compatible; BazarDor/1.0)",
                },
            });

            if (res.ok) {
                const json = await res.json();
                return (Array.isArray(json) ? json : (json.data ?? [])) as T;
            }

            lastStatus = res.status;
        } catch (err) {
            console.warn("API fetch attempt failed:", err);
        }

        await new Promise((resolve) =>
            setTimeout(resolve, 400 * (attempt + 1))
        );
    }

    throw new Error(`API request failed (status ${lastStatus}): ${url}`);
}

const CategoryContent = async ({ params, searchParams }: PageProps) => {
    const { slug } = await params;
    const { sort } = await searchParams;

    let categories: Category[];
    let products: Product[];

    try {
        [categories, products] = await Promise.all([
            getJson<Category[]>(CATEGORIES_URL),
            getJson<Product[]>(PRODUCTS_URL),
        ]);
    } catch (error) {
        console.warn("Bazar Dor API error:", error);

        return (
            <section className="w-full bg-[#f4f8f5] py-16">
                <div className="mx-auto max-w-5xl px-4 text-center">
                    <h1 className="text-xl font-bold text-gray-800">
                        তথ্য লোড করা যাচ্ছে না
                    </h1>
                    <p className="mt-3 text-sm text-gray-500">
                        কিছুক্ষণ পর আবার চেষ্টা করুন।
                    </p>
                    <Link
                        href="/"
                        className="mt-6 inline-block rounded-xl bg-[#008a45] px-5 py-3 text-sm font-semibold text-white hover:bg-[#007339]"
                    >
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            </section>
        );
    }


    const category = categories.find((item) => item.slug === slug);

    if (!category) notFound();

    const sortKey: SortKey = sortOptions.some((o) => o.value === sort)
        ? (sort as SortKey)
        : "default";

    const categoryProducts = products
        .filter((product) => product.category === category.slug)
        .sort((a, b) => {
            if (sortKey === "priceAsc") return a.today - b.today;
            if (sortKey === "priceDesc") return b.today - a.today;
            if (sortKey === "change")
                return Math.abs(b.change.pct) - Math.abs(a.change.pct);
            return 0;
        });

    const currentLabel =
        sortOptions.find((o) => o.value === sortKey)?.label ?? "ডিফল্ট";

    return (
        <section className="w-full bg-[#f4f8f5] py-8">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">

                {/* Category header card */}
                <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white/80 p-5">
                    <span className="text-4xl leading-none">
                        {category.icon}
                    </span>

                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            {category.nameBn}
                        </h1>
                        <p className="text-xs text-gray-500">
                            {toBn(categoryProducts.length)}টি পণ্যের আজকের দাম ও
                            পরিবর্তন
                        </p>
                    </div>
                </div>

                {/* Sort bar */}
                <div className="mt-4 flex items-center justify-end gap-2 rounded-2xl border border-gray-200 bg-white/80 px-4 py-3">
                    <span className="text-xs text-gray-600">সাজান</span>

                    {/* key={sortKey} দিলে অপশন ক্লিকের পর মেনু বন্ধ হয়ে যায় */}
                    <details key={sortKey} className="relative">
                        <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-800 [&::-webkit-details-marker]:hidden">
                            {currentLabel}
                            <span className="text-[10px]">⌄</span>
                        </summary>

                        <ul className="absolute right-0 z-10 mt-1 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
                            {sortOptions.map((o) => (
                                <li key={o.value}>
                                    <Link
                                        href={
                                            o.value === "default"
                                                ? `/category/${slug}`
                                                : `/category/${slug}?sort=${o.value}`
                                        }
                                        scroll={false}
                                        className={`block px-3 py-2 text-xs hover:bg-gray-50 ${
                                            o.value === sortKey
                                                ? "font-bold text-[#008a45]"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {o.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </details>
                </div>

                {/* Count */}
                <p className="mb-3 mt-4 text-xs text-gray-600">
                    মোট <strong>{toBn(categoryProducts.length)}</strong>টি পণ্য
                    দেখানো হচ্ছে
                </p>

                {categoryProducts.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white/80 px-5 py-14 text-center">
                        <span className="text-4xl">{category.icon}</span>
                        <p className="mt-3 text-sm font-semibold text-gray-800">
                            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
                        </p>
                    </div>
                )}

                {/* Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {categoryProducts.map((product) => {
                        const { dir, pct } = product.change;

                        const badgeClass =
                            dir === "up"
                                ? "bg-red-50 text-red-600"
                                : dir === "down"
                                ? "bg-green-50 text-green-600"
                                : "bg-gray-100 text-gray-600";

                        const arrow =
                            dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

                        return (
                            <Link
                                key={product.id}
                                href={`/products/${product.slug}`}
                                className="rounded-2xl border border-gray-200 bg-white/80 p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                                        {product.image}
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="truncate font-bold text-gray-900">
                                            {product.nameBn}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            প্রতি{" "}
                                            {unitBn[product.unit] ??
                                                product.unit}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <p className="text-xs text-gray-700">
                                        আজকের দাম
                                    </p>

                                    <div className="mt-1 flex items-center justify-between">
                                        <p className="text-gray-900">
                                            <span className="text-lg font-bold">
                                                {toBn(product.today)}
                                            </span>{" "}
                                            <span className="text-sm">
                                                টাকা
                                            </span>
                                        </p>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
                                        >
                                            {arrow} {pctBn(pct)}%
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

const CategoryPage = ({ params, searchParams }: PageProps) => {
    return (
        <main>
            <Suspense
                fallback={
                    <section className="w-full bg-[#f4f8f5] py-8">
                        <div className="mx-auto max-w-5xl px-4 sm:px-6">
                            <div className="h-20 animate-pulse rounded-2xl bg-gray-100" />
                        </div>
                    </section>
                }
            >
                <CategoryContent
                    params={params}
                    searchParams={searchParams}
                />
            </Suspense>
        </main>
    );
};

export default CategoryPage;