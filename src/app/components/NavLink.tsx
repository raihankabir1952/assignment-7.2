import Link from "next/link";

interface Category {
    id: string | number;
    nameBn: string;
    slug: string;
    icon?: string;
    categoryIcon?: string;
}

async function getCategories(): Promise<Category[]> {
    "use cache";

    try {
        const res = await fetch(
            "https://openapi.programming-hero.com/api/bazardor/categories"
        );

        if (!res.ok) {
            console.error("Category API error:", res.status);
            return [];
        }

        const data = await res.json();

        const categories = Array.isArray(data)
            ? data
            : Array.isArray(data.categories)
                ? data.categories
                : Array.isArray(data.data)
                    ? data.data
                    : [];

        return categories;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
}

export default async function NavLink() {
    const categories = await getCategories();

    return (
        <nav
            aria-label="পণ্যের ক্যাটাগরি"
            className="w-full bg-white"
        >
            <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
                {categories.length > 0 ? (
                    <ul className="flex min-w-max items-center gap-6 border-b border-gray-100">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <Link
                                    href={`/category/${category.slug || category.id}`}
                                    className="flex items-center gap-2 border-b-2 border-transparent py-4 text-sm font-medium text-gray-600 transition-colors hover:border-[#008a45] hover:text-[#008a45]"
                                >
                                    <span
                                        className="text-lg"
                                        aria-hidden="true"
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
        </nav>
    );
}
