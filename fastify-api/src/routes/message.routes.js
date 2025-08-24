import { createMessage } from '../controllers/message.controller.js';
import { createMessageSchema } from '../schemas/message.schema.js';

export default async function messageRoutes(fastify) {
  fastify.post('/messages', { schema: createMessageSchema, handler: createMessage });
}
