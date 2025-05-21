const http = require('http');
const url = require('url');
const querystring = require('querystring');

// Función que determina si un nombre es elegante
function esNombreElegante(nombre) {
    if (typeof nombre !== 'string' || nombre.length === 0) {
        return false;
    }
    
    const nombreMinusculas = nombre.toLowerCase();
    return nombreMinusculas.startsWith('a') && nombreMinusculas.endsWith('a');
}

// Crear servidor HTTP
const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url);
    const params = querystring.parse(query);

    if (pathname === '/') {
        // Mostrar formulario
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Nombre Elegante</title>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; }
                    h1 { color: #333; }
                    form { display: flex; flex-direction: column; gap: 10px; }
                    input, button { padding: 8px; font-size: 16px; }
                    button { background-color: #4CAF50; color: white; border: none; cursor: pointer; }
                    .result { margin-top: 20px; padding: 10px; border: 1px solid #ddd; }
                </style>
            </head>
            <body>
                <h1>Verificar Nombre Elegante</h1>
                <form action="/check" method="GET">
                    <label for="nombre">Ingrese un nombre (solo letras minusculas):</label>
                    <input type="text" id="nombre" name="nombre" required pattern="[a-z]+" title="Solo letras minusculas">
                    <button type="submit">Verificar</button>
                </form>
                ${params.nombre ? `
                    <div class="result">
                        <p>Nombre evaluado: <strong>${params.nombre}</strong></p>
                        <p>Es elegante? <strong>${esNombreElegante(params.nombre)}</strong></p>
                    </div>
                ` : ''}
            </body>
            </html>
        `);
    } else if (pathname === '/check' && params.nombre) {
        // Redirigir a la página principal con el resultado
        res.writeHead(302, { 'Location': `/?nombre=${encodeURIComponent(params.nombre)}` });
        res.end();
    } else {
        // Página no encontrada
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Iniciar servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});