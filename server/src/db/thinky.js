import initThinky from 'thinky';
import logger from '../util';

import {dbConfig} from '../../config';

const thinky = initThinky(dbConfig);


logger.info("Initing thinky")
logger.info(dbConfig);


const {r} = thinky;

export {thinky, r};
