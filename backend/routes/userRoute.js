import express from "express";
import User from "../models/userModel";

const router = express.Router();

router.get("/createAdmin", async (req, res) => {
  try {
    const user = new User({
      name: "Osman Can",
      email: "osmn.cn87@hotmail.com",
      password: "Osmncn_412",
      isAdmin: true,
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router;
