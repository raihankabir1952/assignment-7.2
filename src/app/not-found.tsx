
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-[70vh] items-center justify-center bg-[#f4f8f5] px-4 py-12">
            <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-50">
                    <span className="text-5xl font-bold text-[#008a45]">
                        404
                    </span>
                </div>

                <h1 className="mt-6 text-2xl font-bold text-gray-900">
                    পেজটি খুঁজে পাওয়া যায়নি!
                </h1>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                    দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
                    URL ভুল হতে পারে অথবা পেজটি সরিয়ে ফেলা হয়েছে।
                </p>

                <Link
                    href="/"
                    className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#008a45] px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                    <span>⌂</span>
                    হোম পেজে ফিরে যান
                </Link>

                <p className="mt-6 text-xs text-gray-400">
                    Ajker Bazar Dor · আপনার প্রতিদিনের বাজারদর
                </p>
            </div>
        </main>
    );
}
