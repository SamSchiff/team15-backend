import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config({ silent: true });

const localOptions = { usernameField: 'username' };

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.AUTH_SECRET,
};

// username + password authentication strategy
const localLogin = new LocalStrategy(localOptions, (username, password, done) => {
  const sql = 'select * from DatabaseUsers where Username = ?;';
  global.connection.query(sql, [payload.sub], (err, response) => {
    if (err) {
      done(err);
    } else {
      console.log(respone);
      bcrypt.compare(username, response[0].Password, (err, res) => {
        if (res === true) {
          done(null, response);
        } else {
          done(null, false);
        }
      });
    }
  });
});

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  const sql = 'select * from DatabaseUsers where Username = ?;';
  global.connection.query(sql, [payload.sub], (err, response) => {
    if (err) {
      done(err, false);
    } else {
      done(null, response);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);


export const requireAuth = passport.authenticate('jwt', { session: false });
export const requireSignin = passport.authenticate('local', { session: false });
