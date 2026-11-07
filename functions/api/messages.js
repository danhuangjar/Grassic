export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'GET') {
    const { results } = await env.DB.prepare(
      'SELECT * FROM messages ORDER BY id DESC'
    ).all();
    return json({ list: results });
  }

  if (request.method === 'POST') {
    const { content } = await request.json();
    if (!content) return json({ error: '内容不能为空' }, 400);
    
    await env.DB.prepare(
      'INSERT INTO messages (content) VALUES (?)'
    ).bind(content).run();
    
    return json({ ok: true });
  }

  return json({ error: '不支持的请求方法' }, 405);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}