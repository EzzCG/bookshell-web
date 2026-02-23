import { LoginResponse, MeResponse } from '../../features/auth/models/auth-responses';

export function normalizeLoginResponse(raw: any): LoginResponse {
  return {
    accessToken: raw?.access_token ?? null,
    refreshToken: raw?.refresh_token ?? null,
    user: raw?.user ?? null,
  } as LoginResponse;
}

export function normalizeMeResponse(raw: any): MeResponse {
  return {
    user: {
      id: raw?.userId ?? null,
      email: raw?.email ?? null,
      name: raw?.name ?? null,
      roles: raw?.roles ?? [],
    },
  } as MeResponse;
}
