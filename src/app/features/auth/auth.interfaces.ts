export interface LoginResponse {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface TokenPayload {
  iat: number;
  exp: number;
}
