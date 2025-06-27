/* const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./database');

function initialize(passport) {
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return done(err);
        if (results.length === 0) {
          return done(null, false, { message: 'Correo no encontrado' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }

        return done(null, user);
      });
    }
  ));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
      if (err) return done(err);
      return done(null, results[0]);
    });
  });
}

module.exports = initialize;
*/
const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt'); ← ya no lo necesitás
const db = require('./database');

function initialize(passport) {
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return done(err);
        if (results.length === 0) {
          return done(null, false, { message: 'Correo no encontrado' });
        }

        const user = results[0];

        // ⚠️ Comparación sin encriptación (solo para pruebas)
        if (user.password !== password) {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }

        return done(null, user);
      });
    }
  ));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
      if (err) return done(err);
      return done(null, results[0]);
    });
  });
}

module.exports = initialize;