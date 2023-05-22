import { NextRequest } from 'next/server';
import User from '@/mongoModels/user/Model__User';
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
    const user = await User.findOne({ email }).select('+password');

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

      return new Response(
        JSON.stringify({ success: true, message: 'Authorized', token }),
        {
          status: 201,
        }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid user data' }),
        { status: 400 }
      );
    }
  } catch (error) {
    return new Response(`error:${error}`, { status: 500 });
  }
};
