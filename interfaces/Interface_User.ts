export interface I_Auth {
  name?: string;
  email: string;
  password?: string;
  getSignedJwtToken?: () => string;
  matchPassword?: (enteredPassword: string) => boolean;
}

export interface I_User extends I_Auth {
  role?: string;
}

export interface I_JwtPayload {
  id: string;
}
