const mysql = require('mysql');

// Crear conexión con datos desde .env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

// Conectar
connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err.message);
    process.exit(1); // Detiene la app si falla la conexión
  }
  console.log('✅ Conectado a la base de datos MySQL');
});

module.exports = connection;