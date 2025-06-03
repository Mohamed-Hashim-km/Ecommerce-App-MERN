import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      algorithm: "HS256",
      expiresIn: "1d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
       secure: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      // path: "/",
    });

    return token; // Optional: return token for further use
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};

export default generateToken;