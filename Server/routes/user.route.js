const express = require("express");
const {
  login,
  logout,
  register,
  updateProfile,
} = require("../controllers/user.controller");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
// GET user by ID
router.get("/detail/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE user by ID
router.put("/detail/:id", updateProfile);
module.exports = router;
