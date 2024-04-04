import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decodedData?.id;
    next();
  } catch (error) {
    res.status(404).json("invalid credentials");
  }
};

export default auth;
