import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import { I_JwtPayload } from '@/interfaces/Interface_User';

export async function middleware(request: NextRequest) {
  const { myJWT } = cookie.parse(request.headers.get('cookie')!);
  // console.log(myJWT);

  if (!myJWT) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Not authorized, no token',
      }),
      {
        status: 401,
      }
    );
  } else {
    try {
      //verify token
      const { id } = jwt.verify(myJWT, process.env.JWT_SECRET!) as I_JwtPayload;
      console.log(id);

      if (!id) {
        return new Response(
          JSON.stringify({
            success: false,
            message: `Not authorized**`,
          }),
          {
            status: 401,
          }
        );
      }
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('userID', `${id}`);

      const response = NextResponse.next({
        request: {
          // New request headers
          headers: requestHeaders,
        },
      });

      return response;
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Not authorized//',
          error,
        }),
        {
          status: 401,
        }
      );
    }
  }
}
export const config = {
  matcher: ['/api/xxx/:path*'],
};
/////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

//   // Get a cookie
//   request.cookies.get('myCookieName')?.value;

//   // Get all cookies
//   request.cookies.getAll();

//   // To change a cookie, first create a response
//   const response = NextResponse.next();

//   // Set a cookie
//   response.cookies.set('myCookieName', 'some-value');

//   // Setting a cookie with additional options
//   response.cookies.set({
//     name: 'myCookieName',
//     value: 'some-value',
//     httpOnly: true,
//   });

//   // Delete a cookie
//   response.cookies.delete('myCookieName');

//   return NextResponse.next();
//////////////////////////////////////////
// const allowedOrigins =
//   process.env.NODE_ENV === 'production'
//     ? ['https://www.yoursite.com', 'https://yoursite.com']
//     : ['http://localhost:3000'];
// const origin = request.headers.get('origin');
// console.log(origin);

//   if (origin && !allowedOrigins.includes(origin)) {
//     return new NextResponse(null, {
//       status: 400,
//       statusText: 'Bad Request',
//       headers: {
//         'Content-Type': 'text/plain',
//       },
//     });
//   }
