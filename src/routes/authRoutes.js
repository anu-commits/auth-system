const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");
const rateLimit = require("express-rate-limit");

const loginlimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Please try again later.",
});


router.get("/register", (req, res) => {
  res.render("register", { error: null, username: "", email: "" });
});
router.post("/register", authController.register);

router.get("/login", (req, res) => {
  const error = req.query.error || null;
  const success = req.query.success || null;
  res.render("login.ejs", {
    error,
    success,
    usernameOrEmail: "",
  });
});
router.post("/login", authController.login);

router.get("/profile", authenticateToken, authController.profile);

router.get("/logout", authController.logout);

router.get("/", (req, res) => {
  res.redirect("/login");
});

module.exports = router;
