// fastify-api/migrations/000002_add_index_on_messages_email.cjs
/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
exports.up = (pgm) => {
  pgm.sql(`CREATE INDEX IF NOT EXISTS idx_messages_email ON messages(email);`);
};

/** @param {import('node-pg-migrate').MigrationBuilder} pgm */
exports.down = (pgm) => {
  pgm.sql(`DROP INDEX IF EXISTS idx_messages_email;`);
};
