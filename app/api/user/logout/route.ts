import { NextRequest } from 'next/server';
import cookie from 'cookie';

export const GET = async (request: NextRequest) => {
  const { myJWT } = cookie.parse(request.headers.get('cookie')!);
  //   console.log(myJWT);

  if (!myJWT) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Bro you are already not logged in...',
      })
    );
  } else {
    const serialised = cookie.serialize('myJWT', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
      expires: new Date(0),
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Logout successfully' }),
      {
        status: 201,
        headers: {
          'Set-Cookie': serialised,
        },
      }
    );
  }
};
