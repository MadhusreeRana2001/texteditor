import passport from 'passport';
import dotenv from 'dotenv';
import GoogleStrategy from 'passport-google-oauth20';
import User from './models/User.js';

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    const reqType = req.query.state;
    req.session.tokens = { access_token: accessToken, refresh_token: refreshToken };
    let user = await User.findOne({ googleId: profile.id });

    if (reqType === "signup") {
      if (user) {
        return done(null, false);
      } else {
        user = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value
        });
        await user.save();
        return done(null, user);
      }
    }

    else {
      if (!user) {
        return done(err, null);
      }
      return done(null, user);
    }

    return done(null, false);

  } catch (err) {
    return done(err, null);
  }
}));


passport.serializeUser((user, done) => {
  done(null, user.googleId);
});


passport.deserializeUser(async (googleId, done) => {
  const user = await User.findOne({ googleId });
  done(null, user);
});