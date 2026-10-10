
import CategoryNavClient from "./CategoryNavClient";

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

    return <CategoryNavClient categories={categories} />;
}
