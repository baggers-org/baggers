import Fastify from 'fastify';
import { markteDataWs } from './market-data-websocket';
const fastify = Fastify({
  logger: true,
});

fastify.register(import('@fastify/websocket'));

fastify.register(markteDataWs);

const start = async () => {
  try {
    await fastify.listen({ port: 5000 });
    console.log(
      `Market data websocket listening on ws://localhost:5000`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
