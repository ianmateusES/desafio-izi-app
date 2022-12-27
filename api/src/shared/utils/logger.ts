import { logs } from '@config/logs';
import Winston from 'winston';

const logger = Winston.createLogger(logs.winston);

export { logger };
