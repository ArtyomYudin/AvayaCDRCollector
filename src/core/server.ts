import * as net from 'node:net';
import { logger } from '../features/logger';
import { dbPool } from '../shared/db/db_pool';
import { socketParseMessage } from '../features/socket-api';

// Отлов событий uncaughtException и закрытие процесса. Далее pm2 перезапускает службу
process.on('uncaughtException', err => {
  logger.error('Uncaught Exception, Restart service !!!');
  logger.error(err.stack);
  process.exit(1);
});

(async () => {
  const server = net.createServer(socket => {
    socket.setEncoding('binary');
    // socket.setKeepAlive(true);

    logger.info('Client connected');

    socket.on('end', () => {
      logger.info('Client disconnected');
    });
    socket.on('data', chunk => {
      socketParseMessage(dbPool, chunk);
    });
  });
  server.on('error', (err: any) => {
    throw err;
  });
  server.listen({ host: process.env.NET_SOCKET_ADDR, port: process.env.NET_SOCKET_PORT }, () => {
    logger.info(`Avaya collector server started on ${process.env.NET_SOCKET_ADDR}:${process.env.NET_SOCKET_PORT}`);
  });
})();
