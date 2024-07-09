const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const AdminModel = require("./Model/admin");

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "312524714549-tcbgc8g4ifb316vgdm445t1mqf7p0r70.apps.googleusercontent.com", // Your Credentials here.
      clientSecret: "GOCSPX-UseVcLbAVQQ9Bi6JnXgWI3iLmlc", // Your Credentials here.
      callbackURL: "http://localhost:4000/admin/dashboard",
      passReqToCallback: true,
      scope: ["profile", "email"]
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let user = await AdminModel.findOne({googleID: profile.id});
        if (!user) {
          user = new AdminModel({
            googleId: profile.id,
            name: profile.name,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(null, error);
      }
    }
  )
);

module.exports = passport;
