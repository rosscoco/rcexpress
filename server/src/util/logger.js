import winston from 'winston';


let level;

if (process.env.NODE_ENV === 'testing') {
    level = 'error';
} else if (process.env.NODE_ENV === 'production') {
    level = 'error';
} else {
    level = 'debug';
}

const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level,
            colorize: true,
            timestamp: true,
            prettyPrint: true,
            label: 'experts-server'
        })
    ]
});

logger.stream = {
    write: message => logger.info(message)
};

logger.info(process.env.NODE_ENV);

export {logger as default};

