import net from 'net';
import 'dotenv/config';
import { logger } from './config/logger_config';
import { dbPool } from './db/db_pool';
import { socketParseMessage } from './modules/socket-api';

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
