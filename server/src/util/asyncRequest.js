import logger from './logger';

const asyncRequest = handler =>
    (req, res) =>
        handler(req, res).catch(e => logger.error('Error during async request:', e));

export {asyncRequest};
