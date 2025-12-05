import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const url= new URL(request.url);

    const isLoggedIn = true

if(!isLoggedIn && url.pathname.startsWith('/dashboard')){
    return NextResponse.redirect(new URL('/auth/login', request.url));
}
return NextResponse.next();
}