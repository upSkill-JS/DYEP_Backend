import jwt from "jsonwebtoken";

// Verify Token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("JW Token is not valid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not logged in!");
  }
};

// Verify Token Authorization next()
export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed!");
    }
  });
};

// Verify Token Authorization and Admin
export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed!");
    }
  });
};
