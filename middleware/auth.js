function isAdminLoggedIn(req, res, next) {
    if (req.session && req.session.member) {
      return next();
    }
    res.redirect('/member');
  }
  
  module.exports = { isAdminLoggedIn };
  