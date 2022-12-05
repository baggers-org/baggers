import { FastifyPluginAsync } from 'fastify';
import { WebSocket } from 'ws';
import { env } from './env';

const polygonWs = new WebSocket('wss://delayed.polygon.io/stocks');

polygonWs.addEventListener('open', () => {
  console.log('market-data-ws connected to polygon websocket');
  console.log('authenticating with polygon');

  polygonWs.send(
    JSON.stringify({
      action: 'auth',
      params: env.POLYGON_API_KEY,
    })
  );
});

polygonWs.addEventListener('message', (e) => {
  const data = JSON.parse(e.data.toString())[0];

  if (data.ev === 'status') {
    console.log(data);
  }
});
export const markteDataWs: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', { websocket: true }, (connection) => {
    connection.socket.on('message', (message) => {
      let data;
      try {
        data = JSON.parse(message.toString());
      } catch (e) {
        connection.socket.send('Invalid message format');
        return;
      }
      console.log('Message received ', data);
      polygonWs.send(message);

      polygonWs.addEventListener('error', (e) => {
        console.error(e);
        connection.socket.send(e.message);
      });
      polygonWs.addEventListener('message', (ev) => {
        connection.socket.send(ev.data);
      });
    });
  });
};
