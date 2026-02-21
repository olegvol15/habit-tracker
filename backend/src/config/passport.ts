import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { findOrCreateGoogleUser } from "../modules/auth/auth.service";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.APP_BASE_URL}/api/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const user = await findOrCreateGoogleUser({
          id: profile.id,
          email: profile.emails?.[0]?.value,
          name: profile.displayName ?? null,
          avatarUrl: profile.photos?.[0]?.value ?? null,
        });
        done(null, user);
      } catch (err) {
        done(err as Error);
      }
    },
  ),
);

export default passport;
