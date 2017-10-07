import passport from 'passport';

export default (app) => {
    app.use('/api/login', passport.authenticate('local'), (req, res) => {
        res.send(req.user);
    });
};
