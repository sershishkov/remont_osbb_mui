import { NextRequest } from 'next/server';
import Model__User from '@/mongoModels/user/Model__User';
import { connectToDB } from '@/mongoConnect/connectToDatabase';

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return new Response(
      JSON.stringify({ success: false, message: 'Please add all fields' }),
      { status: 400 }
    );
  }

  try {
    await connectToDB();
    //Check if user exists
    const user__Exists = await Model__User.findOne({ email });
    if (user__Exists) {
      return new Response(
        JSON.stringify({ success: false, message: 'User already exists' }),
        { status: 400 }
      );
    }

    //Create user
    const user = await Model__User.create({
      name,
      email,
      password,
    });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid user data' }),
        { status: 400 }
      );
    } else {
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

      const expires = new Date(Date.now() + maxAge).toUTCString();

      const cookieHeaderValue = `${token}|${expires}; HttpOnly; Max-Age=${maxAge}; SameSite=Strict; secure=${
        process.env.NODE_ENV === 'production'
      }`;

      return new Response(
        JSON.stringify({ success: true, message: 'Authorized' }),
        {
          status: 201,
          headers: {
            'Set-Cookie': cookieHeaderValue,
          },
        }
      );
    }
  } catch (error) {
    return new Response(`error:${error}`, { status: 500 });
  }
};
