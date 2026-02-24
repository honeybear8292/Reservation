import type { Event } from '../../../src/types';
import { json, readBody, badRequest, notFound } from '../_lib/db';
import type { Env } from '../_lib/db';

interface Params {
  id: string;
}

export const onRequestPut: PagesFunction<Env, Params> = async ({ params, request, env }) => {
  const id = params.id;
  const event = await readBody<Event>(request);
  if (!event || !event.id || event.id !== id) return badRequest('Invalid event payload');

  const existing = await env.DB.prepare('SELECT id FROM events WHERE id = ?').bind(id).first();
  if (!existing) return notFound('Event not found');

  await env.DB.prepare(
    `UPDATE events
      SET slug = ?, status = ?, updated_at = CURRENT_TIMESTAMP, data = ?
      WHERE id = ?`
  )
    .bind(event.slug, event.status, JSON.stringify(event), id)
    .run();

  return json({ ok: true });
};

export const onRequestDelete: PagesFunction<Env, Params> = async ({ params, env }) => {
  const id = params.id;

  await env.DB.prepare('DELETE FROM reservations WHERE event_id = ?').bind(id).run();
  await env.DB.prepare('DELETE FROM events WHERE id = ?').bind(id).run();

  return json({ ok: true });
};
