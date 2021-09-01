import net from 'net';
import 'dotenv/config';
import { logger } from './config/logger_config';
import { dbPool } from './db/db_pool';
import { socketParseMessage } from './modules/socket-api';

const server = net.createServer(socket => {
  socket.setEncoding('binary');
  // socket.setKeepAlive(true);

  logger.info('client connected');

  socket.on('end', () => {
    logger.info('client disconnected');
  });
  socket.on('data', chunk => {
    socketParseMessage(dbPool, chunk);
  });
});
server.on('error', (err: any) => {
  throw err;
});
server.listen({ port: process.env.NET_SOCKET_PORT }, () => {
  logger.info(`Avaya collector server started on port ${process.env.NET_SOCKET_PORT}`);
});
