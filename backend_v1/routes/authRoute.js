import express from "express";
import passport from "../configs/passport.js";
import { generateToken } from "../configs/jwt.js";

const router = express.Router();

router.post("/login", (req, res) => {
  passport.authenticate("local-login", (err, user, info) => {
    if (err) {
      return res.status(500).json({
        message: err.message || "An error occurred during authentication.",
      });
    }

    if (!user) {
      return res.status(401).json(info);
    }
    /* 
    req.logIn(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: err.message || "An error occurred during login." });
      }
      const token = generateToken(user);
      return res.json({ message: "Logged in successfully", user, token });
    });
    */
   const token = generateToken(user)
   return res.status(200).cookie('token', token).json({message : 'Logged in successfully', token})
  })(req, res);
});

router.post("/register", (req, res) => {
  passport.authenticate("local-register", (err, user, info) => {
    if (err) {
      return res.status(500).json({
        message: err.message || "An error occurred during authentication.",
      });
    } else if (!user) {
      return res.status(401).json(info);
    } else {
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({
            message: err.message || "An error occurred during register",
          });
        } else {
          return res.json({ message: "Registered successfully", user });
        }
      });
    }
  })(req, res);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// http://localhost:3000/api/auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/register",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173");
  }
);

export default router;
