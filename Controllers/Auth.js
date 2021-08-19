const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

exports.Signup = async (req, res) => {
  try {
    console.log("Comming", req.body);
    const { email, password } = req.body;
    const hashpassword = await bcrypt.hashSync(password, 12);
    const user = await User.create({
      email,
      password: hashpassword,
    });

    console.log("sening", user);

    res.status(200).json({
      status: "sucess",
      data: {
        user,
      },
    });
  } catch (e) {
    if (e.code === 11000) {
      console.log(e);
      res.status(401).json({
        status: "User Already Exixts",
        data: {
          error: e,
          msg: "User Already Exixts",
        },
      });
    } else {
      res.status(500).json({
        status: "fail",
        data: {
          error: e,
        },
      });
    }
  }
};

exports.login = async (req, res) => {
  let token;

  try {
    const { email, password } = req.body;
    console.log(password);
    const user = await User.findOne({ email: email }).select("-createdAt -__v");
    console.log("user Get");
    if (!user) {
      return res.status(404).json({
        status: "fails",
        msg: "User Not found",
      });
    }
    console.log(user.password);

    const isCorrectPass = bcrypt.compareSync(password, user.password);
    console.log("password check");
    if (isCorrectPass) {
      try {
        token = await jwt.sign({ data: user }, "Secert", {
          expiresIn: 60 * 60 * 60,
        });
        res.status(200).json({
          status: "sucess",
          msg: "Login Status",
          data: {
            user,
            token,
          },
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({ msg: "Token Error" });
      }
    } else {
      res.status(401).json({
        status: "fails",
        msg: "password wrong",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fails",
    });
  }
};
