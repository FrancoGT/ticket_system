const express = require('express');
const router = express.Router();
const passport = require('passport');

// Login
router.get('/login', (req, res) => {
  res.render('login', { title: 'Iniciar Sesión' });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Has cerrado sesión');
  res.redirect('/auth/login');
});

module.exports = router;