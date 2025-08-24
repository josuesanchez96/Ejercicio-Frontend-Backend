import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import messageRoutes from './routes/message.routes.js';

const app = Fastify({ logger: true });

await app.register(fastifyCors, { origin: true, methods: ['GET', 'POST'] });
await app.register(messageRoutes, { prefix: '/api' });

const PORT = Number(process.env.PORT || 3000);
try {
  await app.listen({ port: PORT, host: '0.0.0.0' });
  app.log.info(`API http://localhost:${PORT}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
