import { NextResponse, NextRequest } from "next/server";

const guestroutes = ["/login", "/schema/share"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token =
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("__Secure-next-auth.session-token");
  console.log(path);

  const url = new URL(request.url);
  const origin = url.origin;
  const pathname = url.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  requestHeaders.set("x-origin", origin);
  requestHeaders.set("x-pathname", pathname);
  if (path.includes("/schema/share")) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  if (!guestroutes.includes(path) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (guestroutes.includes(path) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/dashboard/:path*", "/schema/:path*"],
};
