import MarqueeText from "react-fast-marquee";

interface Change {
    dir: "up" | "down";
    pct: number;
}

interface Product {
    id: string | number;
    nameBn: string;
    today: number;
    unit: string;
    categoryIcon?: string;
    image?: string;
    change: Change;
}

const toBn = (number: number) =>
    number.toLocaleString("bn-BD");

async function getProducts(): Promise<Product[]> {
    "use cache";

    try {
        const res = await fetch(
            "https://openapi.programming-hero.com/api/bazardor/products"
        );

        if (!res.ok) {
            console.error("Products API error:", res.status);
            return [];
        }

        const response = await res.json();

        const products = Array.isArray(response)
            ? response
            : Array.isArray(response.products)
              ? response.products
              : Array.isArray(response.data)
                ? response.data
                : [];

        return products;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

export default async function Marquee() {
    const products = await getProducts();

    if (products.length === 0) {
        return null;
    }

    return (
        <div className="w-full overflow-hidden bg-white text-black">
            <MarqueeText
                direction="left"
                speed={60}
                pauseOnHover
                gradient={false}
                className="py-3"
            >
                {products.map((product) => (
                    <span
                        key={product.id}
                        className="mx-5 inline-flex items-center gap-2 whitespace-nowrap text-sm"
                    >
                        <span className="text-lg">
                            {product.categoryIcon || product.image || "🛒"}
                        </span>

                        <span className="font-medium">
                            {product.nameBn}
                        </span>

                        <span>
                            {toBn(product.today)} টাকা/
                            {product.unit === "kg"
                                ? "কেজি"
                                : product.unit}
                        </span>

                        <span
                            className={`font-bold ${
                                product.change.dir === "up"
                                    ? "text-red-500"
                                    : "text-green-600"
                            }`}
                        >
                            {product.change.dir === "up" ? "▲" : "▼"}{" "}
                            {toBn(product.change.pct)}%
                        </span>

                        <span className="ml-4 text-gray-300">•</span>
                    </span>
                ))}
            </MarqueeText>
        </div>
    );
}
