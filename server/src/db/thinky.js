import initThinky from 'thinky';
import {logger} from '../util';

import {dbConfig} from '../../config';

const thinky = initThinky(dbConfig);

const {r} = thinky;

export {thinky, r};
