// Pré-compila todas as páginas do servidor de desenvolvimento.
// Em `next dev` cada página só compila na primeira visita (1 a vários segundos);
// depois de correr isto, a navegação no browser já não espera por compilação.
// Uso: com `npm run dev` a correr, noutro terminal: `npm run aquecer`
const base = process.env.URL_BASE ?? 'http://localhost:3000'
const rotas = [
  '/', '/sobre-a-basilica', '/basilica-e-convento', '/celebracoes',
  '/donativos', '/blog', '/blog/noticia-1', '/contactos',
]

for (const r of rotas) {
  const t0 = performance.now()
  try {
    const res = await fetch(base + r)
    console.log(`${res.status} ${r} ${Math.round(performance.now() - t0)}ms`)
  } catch (e) {
    console.error(`falhou ${r}: ${e.message} (o servidor está a correr?)`)
    process.exit(1)
  }
}
