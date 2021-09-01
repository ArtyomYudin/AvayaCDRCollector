import { Pool } from 'mysql2';
import { logger } from '../config/logger_config';
// import * as dbInsert from '../db/db_insert';

export function socketParseMessage(dbPool: Pool, msg: Buffer): void {
  logger.info(`Data received from client: ${msg.toString().split(/[ ]+/)}`);
}
