const jwt=require("jsonwebtoken");




const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'Authorization required' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.userId = decoded.userId;
      req.userRole = decoded.role;
      // console.logg(req.userId);
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };


module.exports=authMiddleware;