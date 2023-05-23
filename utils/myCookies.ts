// Set JWT token in a cookie
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, ServerResponse } from 'http';
import jwt from 'jsonwebtoken';
// import { parseCookies, setCookie } from 'next-cookies';
import cookie from 'cookie';

// Set JWT token in a cookie
export function setTokenCookie(
  res: NextApiResponse | ServerResponse,
  token: string
): void {
  const cookieValue = cookie.serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600, // Set the cookie expiration time (in seconds) as needed
    path: '/', // Set the cookie path as needed
  });
  res.setHeader('Set-Cookie', cookieValue);
}

// Verify JWT token from cookie
export function verifyToken(
  req: NextApiRequest | IncomingMessage
): object | null {
  const cookies = cookie.parse(req.headers.cookie || '');
  const { token } = cookies;
  if (!token) {
    return null;
  }
  try {
    const id = jwt.verify(token, process.env.JWT_SECRET!);
    return { id };
  } catch (error) {
    return null;
  }
}
