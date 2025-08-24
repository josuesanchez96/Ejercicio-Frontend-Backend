import { pool } from '../config/db.js';

export async function createMessage(request, reply) {
  const { name, email, message } = request.body;

  try {
    const { rows } = await pool.query(
      `INSERT INTO messages (name, email, message)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [
        String(name ?? '').trim(),
        String(email ?? '').trim().toLowerCase(),
        String(message ?? '').trim()
      ]
    );

    return reply.code(201).send({
      ok: true,
      data: rows[0],
      msg: 'Mensaje guardado'
    });
  } catch (err) {
    request.log.error(err);
    return reply.code(500).send({ ok: false, msg: 'Error al guardar en DB' });
  }
}
