function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Por favor inicia sesión para continuar');
  res.redirect('/auth/login');
}

module.exports = { ensureAuthenticated };