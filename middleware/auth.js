function isAdminLoggedIn(req, res, next) {
    if (req.session && req.session.member) {
      console.log(req.session.member,req.session);
      return next();
    }
    res.redirect('/member');
  }
  
  module.exports = { isAdminLoggedIn };
  