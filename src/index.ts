import net from 'net';
// import { config } from 'dotenv';
import 'dotenv/config';
import { logger } from './config/logger_config';

// config();

const server = net.createServer(socket => {
  socket.setEncoding('binary');
  // socket.setKeepAlive(true);
  // const body: any = [];
  logger.info('client connected');
  // socket.write('Ok.');

  socket.on('end', () => {
    logger.info('client disconnected');
    // logger.info(`Data received from client: ${body}`);
  });
  socket.on('data', chunk => {
    // body.push(chunk);
    // logger.info(`Data received from client: ${Buffer.from(chunk).toString()}`);
    logger.info(`Data received from client: ${chunk}`);

    // echo data
    // const isKernelBufferFull = socket.write(body);
    // if (isKernelBufferFull) {
    //  console.log('Data was flushed successfully from kernel buffer i.e written successfully!');
    // } else {
    //  socket.pause();
    // }
  });
});
server.on('error', (err: any) => {
  throw err;
});
server.listen({ port: process.env.NET_SOCKET_PORT }, () => {
  logger.info(`Avaya collector server started on port ${process.env.NET_SOCKET_PORT}`);
  console.log(`Avaya collector server started on port ${process.env.NET_SOCKET_PORT}`);
});
