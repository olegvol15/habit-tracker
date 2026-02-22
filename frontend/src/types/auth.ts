export type PublicUser = {
  id: number;
  name: string | null;
  email: string;
  timezone: string;
  avatarUrl: string | null;
};

export type AuthResponse = {
  user: PublicUser;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  email: string;
  password: string;
  name?: string | null;
  timezone?: string;
};

export type LogoutResponse = { ok: true };

export type ProfileResponse = {
  user: PublicUser;
  highestStreak: number;
};

export type UpdateProfileInput = {
  name?: string | null;
  email?: string;
  timezone?: string;
  avatarUrl?: string | null;
};
