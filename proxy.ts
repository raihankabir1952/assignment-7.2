import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export default function proxy(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);

    // লগইন নেই -> /signin, সাথে মনে রাখা কোথায় যেতে চেয়েছিল
    if (!sessionCookie) {
        const signInUrl = new URL("/signin", request.url);

        signInUrl.searchParams.set(
            "callbackUrl",
            request.nextUrl.pathname + request.nextUrl.search
        );

        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    // শুধু /products/<কিছু> (ডিটেইলস পেজ), /products নিজে নয়
    matcher: ["/products/:path+"],
};