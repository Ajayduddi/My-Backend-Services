import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Employee } from '../mongoose/medilab/employee.mjs';
import passport from 'passport';

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await Employee.findOne({ id: jwt_payload.id });
        console.log(jwt_payload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
       return done(error, false);
    }
}));