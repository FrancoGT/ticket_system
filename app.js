// Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const path = require('path');

// Inicializar app
const app = express();

// Conectar a base de datos
require('./config/database'); // Solo importa para establecer conexión

// Configurar passport con estrategia local
require('./config/passport')(passport); // ¡Esta línea es clave!

// Configuración general
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sesiones y autenticación
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Variables globales para vistas
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Rutas
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/tickets', require('./routes/tickets'));

// Iniciar servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en puerto ${app.get('port')}`);
});