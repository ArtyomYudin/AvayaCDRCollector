/**
 * Модуль настройки логирования
 */

import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;
let transport = null;
if (process.env.NODE_ENV !== 'production') {
  transport = new transports.Console({
    format: format.combine(
      format.colorize({
        all: true,
      }),
    ),
  });
} else {
  transport = [
    new transports.File({ filename: '/var/log/avayacdr/error.log', level: 'error' }),
    new transports.File({ filename: '/var/log/avayacdr/combined.log' }),
    // new transports.File(options.file_info),
  ];
}
export const logger = createLogger({
  // format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), myFormat),
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    // colorize({ all: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
  defaultMeta: { service: 'avayacdr' },

  transports: transport,
  exitOnError: false,
});
