export default function Loading() {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-[#f4f8f5]">
            {/* Loading Spinner */}
            <div className="relative flex h-14 w-14 items-center justify-center">
                <div className="absolute h-14 w-14 animate-spin rounded-full border-4 border-[#d8eee1] border-t-[#008a45]" />

                <div className="h-3 w-3 rounded-full bg-[#008a45]" />
            </div>

            {/* Loading Text */}
            <div className="text-center">
                <p className="text-lg font-semibold text-[#008a45]">
                    Data loading...
                </p>

                <p className="mt-1 text-sm text-gray-500">
                    Please wait while we prepare everything for you.
                </p>
            </div>
        </div>
    );
}
