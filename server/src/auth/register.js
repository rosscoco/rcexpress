import {User} from '../db';
import {asyncRequest, hash, logger} from '../util';

export default (app) => {
    app.post('/api/register', (req, res) => {
        const {login, password, passwordRepeat} = req.body;
        logger.info('Registering user');
        const hashedPassword = hash(password);

        if (password !== passwordRepeat) {
            res.status(400).send({error: 'Passwords do not match!'});
            return;
        }

        // const user = new User({
        //     login,
        //     password: hashedPassword
        // });

        User.save({
            login,
            password: hashedPassword
        }).then((result) => {
            res.status(201).send();
        }).error((err) => {
            logger.error('Error saving user', err);
            res.status(400).send({error: `DB Create User error: ${err}`});
        });
    });
};
