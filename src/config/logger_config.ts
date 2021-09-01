import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const options = {
  file_info: {
    level: 'info',
    filename: '/var/log/avayacdrcollector.log',
    handleExceptions: true,
    json: false,
    // maxsize: 5242880, // 5MB
    // maxFiles: 5,
    // colorize: false,
  },

  file_error: {
    level: 'error',
    filename: '/var/log/avayacdrcollector-error.log',
    handleExceptions: true,
    json: false,
    // maxsize: 5242880, // 5MB
    // maxFiles: 5,
    // colorize: false,
  },

  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const myFormat = printf(info => `${info.timestamp} ${info.level}: ${JSON.stringify(info.message)}`);

export const logger = createLogger({
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), myFormat),
  transports: [
    // new transports.File(options.file_error),
    new transports.File(options.file_info),
    // new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

logger.on('error', err => {
  console.log('Error in logger occured:', err.stack);
});

// module.exports = logger;
