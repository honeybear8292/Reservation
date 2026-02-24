export interface Env {
  DB: D1Database;
}

export const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

export const badRequest = (message: string): Response =>
  json({ error: message }, 400);

export const notFound = (message: string): Response =>
  json({ error: message }, 404);

export const readBody = async <T>(request: Request): Promise<T | null> => {
  try {
    return await request.json<T>();
  } catch {
    return null;
  }
};
