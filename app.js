// IMPORTS
import express from 'express';
import session from 'express-session';
import path from 'path'; // Solución para utilizar "__dirname" con "import"
import { fileURLToPath } from 'url'; // Solución para utilizar "__dirname" con "import"
import viewsRoutes from './routes/views.routes.js'; // RUTAS de vistas
import usersRoutes from './routes/users.routes.js' // Ruta de formulario de contacto
import contactRoutes from './routes/contact.routes.js' // Ruta de formulario de contacto


// INICIALIZACIONES
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Solución para utilizar "__dirname" con "import"


// CONFIGURACIONES
app.set("port", 3000);
app.set('view engine', 'ejs'); // EJS configuración
app.set('views', __dirname + '/views'); // EJS configuración

// MIDDLEWARES

app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true
    })
);
// Los datos de sesión que serán accesibles en cualquier plantilla
app.use((req, res, next) => {
    res.locals.idUsuario = req.session.idUsuario;
    res.locals.nombreUsuario = req.session.nombreUsuario;
    res.locals.EmailUsuario = req.session.EmailUsuario;
    next();
});


app.use(express.static(__dirname + '/public')); // Static files
app.use(express.json());
app.use(viewsRoutes, usersRoutes, contactRoutes);

app.use((req, res) => {
    res.status(404).render('404');
})

export default app;