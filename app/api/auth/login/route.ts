import { NextRequest } from 'next/server';
import cookie from 'cookie';
import Model__User from '@/mongoModels/user/Model__User';
import { connectToDB } from '@/mongoConnect/connectToDatabase';

export const POST = async (request: NextRequest) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ success: false, message: 'Please add all fields' }),
      { status: 400 }
    );
  }

  try {
    await connectToDB();
    const user = await Model__User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      const token = user.getSignedJwtToken();

      if (!token) {
        return new Response(
          JSON.stringify({ success: false, message: 'Unauthorized' }),
          {
            status: 401,
          }
        );
      }

      const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

      const expires = new Date(Date.now() + maxAge);

      const serialised = cookie.serialize('myJWT', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge,
        path: '/',
        expires,
      });

      return new Response(
        JSON.stringify({ success: true, message: 'Authorized' }),
        {
          status: 201,
          headers: {
            'Set-Cookie': serialised,
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'You have not registered yet',
        }),
        { status: 400 }
      );
    }
  } catch (error) {
    return new Response(`error:${error}`, { status: 500 });
  }
};
