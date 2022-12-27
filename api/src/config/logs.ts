import fs from 'fs';
import path from 'path';
import winston from 'winston';

const dir = path.join(__dirname, '../../logs');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logs = {
  dir,
  winston: {
    transports: [
      new winston.transports.File({
        level: 'error',
        filename: path.join(dir, 'errors.log'),
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 10,
      }),
      new winston.transports.File({
        level: 'info',
        filename: path.join(dir, 'all.log'),
        handleExceptions: false,
        maxsize: 5242880,
        maxFiles: 10,
      }),
      new winston.transports.Console({
        level: 'info',
        handleExceptions: true,
      }),
    ],
    exitOnError: false,
  },
};

export { logs };
