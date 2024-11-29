const authorize = (roles) => (req, res, next) => {
    //console.log("User role inside authorize middleware:", req.user.role);  // Yeh line add karein
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};

module.exports = authorize;
