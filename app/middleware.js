import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function middleware(req) {
  const cookieStore = await cookies(); // Use await to get the cookies asynchronously
  const token = cookieStore.get('token'); // Retrieve the token

  const url = req.nextUrl.clone(); // Clone the URL to modify path

  if (!token) {
    // If token is missing and user is trying to access /admin, redirect to login
    if (url.pathname.startsWith('/admin')) {
      url.pathname = '/adminlogin';  // Redirect to login
      return NextResponse.redirect(url);
    }
    return NextResponse.next(); // Allow other paths    
  }

  try {
    // Verify the token using the JWT_SECRET
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();  // Allow access if token is valid
  } catch (error) {
    // If JWT verification fails, redirect to login
    console.error('JWT verification failed:', error);
    url.pathname = '/login';  // Redirect to login
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/admin/:path*'],  // Protect any path under /admin
};


