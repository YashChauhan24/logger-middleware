import jwt from "jsonwebtoken";

export const generateToken = (id, email, expiresIn = "1d") => {
  return jwt.sign(
    {
      id,
      email,
    },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

export const verifyToken = (req, res, next) => {
  try {
    const token = req.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(402).json({
        message: "Invalid token, please login again",
      });
    }
  } catch (err) {
    res.status(200).json(err);
  }
};
