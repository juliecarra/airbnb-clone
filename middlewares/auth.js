exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else
    return res
      .status(403)
      .json({ message: "You need to be logged in to see this page." });
};
