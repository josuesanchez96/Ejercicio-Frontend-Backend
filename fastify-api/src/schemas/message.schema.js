export const createMessageSchema = {
  description: 'Recibe un mensaje',
  body: {
    type: 'object',
    required: ['name', 'email', 'message'],
    properties: {
      name: { type: 'string', minLength: 2, maxLength: 100 },
      email: { type: 'string', format: 'email', maxLength: 200 },
      message: { type: 'string', minLength: 5, maxLength: 1000 }
    },
    additionalProperties: false
  }
};
