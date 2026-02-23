export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
    name?: string;
    roles?: string[];
  };
}

export interface MeResponse {
  user: {
    id: string;
    email: string;
    name?: string;
    roles?: string[];
  };
}
