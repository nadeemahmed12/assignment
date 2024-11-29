const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
   // console.log("Authorization Header:", req.headers.authorization);//checking token coming from header from postman
    const token = req.headers.authorization?.split(' ')[1];
   // console.log("Token inside authenticate middleware:", token);//checking token
    if (!token) {
      return res.status(403).send({
        success: false,
        message: "Access Denied: No Token Provided",
      });
    }

    // console.log("Token received:", token); // Log the token

     const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("Decoded Token:", decoded);  // Decoded token ko log karen
    // Add decoded data (id, role) to request object
    req.user = decoded;
    //console.log(req.user);
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);  // Yeh line add karein
    res.status(401).send({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};


module.exports = authenticate;