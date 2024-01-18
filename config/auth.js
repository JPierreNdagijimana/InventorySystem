const auth = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please log in to view this resource");
    res.redirect("/users/login");
  },
  ensureAdmin: function (req, res, next) {
    if (req.isAuthenticated() && req.user.role.name === "admin") {
      return next();
    }
    req.flash("error_msg", "You need to be an admin to complete that action");
    res.redirect("/dashboard");
  },
};

export default auth;
