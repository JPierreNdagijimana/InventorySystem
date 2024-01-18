import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export default function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      (username, password, done) => {
        //Match user
        User.findOne({
          where: { username: username },
        })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: "That username is not registered",
              });
            }
            //Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Password incorrect" });
              }
            });
          })
          .catch((err) => console.log(err));
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.username);
  });
  passport.deserializeUser(function (username, done) {
    User.findOne({
      include: "role",
      where: { username: username },
    })
      .then((user) => {
        done(null, user);
      })
      .catch((err) => console.log(err));
  });
}
