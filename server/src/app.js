//npm packages
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

//our packages
import {logger} from './util';
import {auth as authConfig} from '../config';
import setupAuthRoutes from './auth';


const app = express();

//morgan is  middleware used for logging server requests.  The write stream 
//is created in util/logger.js using winston package

app.use(morgan('combined', {stream: logger.stream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));//for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(session({
    secret: authConfig.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Default Route');
});

setupAuthRoutes(app);

//No Path defined - this handler will bne used for all unrouted requests
app.use((req, res, next) => {
    //logger.info(req);
    res.status(404).send(`Not Found ${res}`);
});


//Method signature is used to indicate this handler is for all unhandled exceptions
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send(err.stack);
});

export default app;
