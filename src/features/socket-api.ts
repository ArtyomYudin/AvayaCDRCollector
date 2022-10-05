import { Pool } from 'mariadb';
import { logger } from './logger';
import * as dbInsert from '../shared/db/db_insert';

export function socketParseMessage(dbPool: Pool, msg: Buffer): void {
  const cdrEventValueArray = msg.toString().trim().split(/[ ]+/);
  if (cdrEventValueArray.length > 2) {
    const callDateArray = cdrEventValueArray[0].match(/.{1,2}/g);
    const callTimeArray = cdrEventValueArray[1].match(/.{1,2}/g);

    const convCallDate = `20${callDateArray?.[2]}-${callDateArray?.[1]}-${callDateArray?.[0]} ${callTimeArray?.[0]}:${callTimeArray?.[1]}:00`;

    const cdrEventValue = [convCallDate, cdrEventValueArray[2], cdrEventValueArray[5], cdrEventValueArray[3], cdrEventValueArray[4]];
    logger.info(convCallDate);
    logger.info(`Data received from client: ${cdrEventValue}`);
    try {
      dbPool.query(dbInsert.insertCDREvent, cdrEventValue);
    } catch (error) {
      logger.error(error);
    }
  }
}
