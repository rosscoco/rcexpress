import initThinky from 'thinky';
import {logger} from '../util';

import {dbConfig} from '../../config';

const thinky = initThinky(dbConfig);

logger.info(dbConfig);


const {r} = thinky;

export {r};
