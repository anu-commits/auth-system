const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.render("register", { error: "All fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.render("register", {
        error: "Invalid email format",
        username,
        email,
      });
    }
    if (password.length < 8) {
      return res.render("register", {
        error: "Password must be of 8 characters",
        username,
        email,
      });
    }
    const usernameExists = await User.usernameExists(username);
    if (usernameExists) {
      return res.render("register", {
        error: "Username already exists",
        email,
      });
    }
    const emailExists = await User.emailExists(email);
    if (emailExists) {
      return res.render("register", {
        error: "Email already exists",
        username,
      });
    }
    await User.create(username, email, password);

    return res.render("login", {
      success: "Registration successful",
      error: null,
      usernameOrEmail: "",
    });
  } catch (error) {
    console.log(error);
    return res.render("register", {
      error: "An error occured ",
      username: "",
      email: "",
    });
  }
};

const login = async (req, res) => {
  try {
    const {
      usernameOrEmail,
      password,
      "g-recaptcha-response": recaptchaToken,
    } = req.body;

    if (!usernameOrEmail || !password) {
      return res.render("login", {
        error: "Username/email and password are required",
        success: null,
        usernameOrEmail,
      });
    }
    const recaptchaVerification = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        },
      }
    );
    if (!recaptchaVerification.data.success) {
      return res.render("login", {
        error: "Invalid reCAPTCHA. Please try again.",
        success: null,
        usernameOrEmail,
      });
    }
    const user = await User.findByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      return res.render("login", {
        error: "Invalid credentials",
        success: null,
        usernameOrEmail,
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.render("login", {
        error: "Invalid credentials",
        success: null,
        usernameOrEmail,
      });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    return res.redirect("/profile");
  } catch (error) {
    console.log(error);
    return res.render("login", {
      error: "An error occurred during login",
      success: null,
      usernameOrEmail: "",
    });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.redirect("/login?error=User not found");
    }
    return res.render("profile", { user });
  } catch (error) {
    console.log(error);
    return res.redirect("/login?error=An error occurred");
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  return res.redirect("/login");
};

module.exports = {
  register,
  login,
  profile,
  logout,
};
