import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import Model__User from '@/mongoModels/user/Model__User';
import { connectToDB } from '@/mongoConnect/connectToDatabase';
import { I_JwtPayload } from '@/interfaces/Interface_User';

export const GET = async (request: NextRequest) => {
  let my_JWT: string;
  if (request.headers.get('cookie')) {
    const { myJWT } = cookie.parse(request.headers.get('cookie')!);

    console.log(myJWT);
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
      my_JWT = myJWT;
    }
  } else {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Not authorized, no token no cookie',
      }),
      {
        status: 401,
      }
    );
  }

  try {
    await connectToDB();

    const { id } = jwt.verify(my_JWT!, process.env.JWT_SECRET!) as I_JwtPayload;

    const currentUser = await Model__User.findById(id).select('-password');
    return new Response(
      JSON.stringify({
        success: true,
        userInfo: currentUser,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Not authorized',
        error,
      }),
      {
        status: 401,
      }
    );
  }
};
