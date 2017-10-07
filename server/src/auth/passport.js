import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

import {User} from '../db';
import {hash} from '../util';

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    try {
        User.get(id).run().then((user) => {
            done(null, user);
        });
    } catch (e) {
        done(e, false);
        return;
    }

    done(null, false);
});


passport.use(new LocalStrategy((login, password, done) => {
    User.filter({login}).limit(1).run().then((userArr) => {
        const user = userArr[0];

        if (!user) {
            return done(null, false);
        }

        if (user.password !== hash(password)) {
            return done(null, false);
        }

        return done(null, false);
    });
}));
