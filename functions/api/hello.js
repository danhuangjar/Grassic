export async function onRequest() {
  return new Response(JSON.stringify({ msg: '后端跑通了' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}