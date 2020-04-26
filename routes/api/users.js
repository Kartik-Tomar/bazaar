const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Load User Model
const User = require("../../models/User");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Multer config
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

// Cloudinary config
cloudinary.config({
  cloud_name: keys.cloudinaryKey.cloud_name,
  api_key: keys.cloudinaryKey.api_key,
  api_secret: keys.cloudinaryKey.api_secret,
});

// @route     GET api/users/test
// @desc      Test user route
// @access    Public
router.get("/test", (req, res) => res.json({ msg: "User Route Works" }));

// @route     POST api/users/register
// @desc      Register User
// @access    Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ "local.email": req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email Already Exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        method: "local",
        name: req.body.name,
        image: "https://www.gravatar.com/avatar/anything?s=200&d=mm",
        local: {
          email: req.body.email,
          password: req.body.password,
        },
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.local.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.local.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route     POST api/users/login
// @desc      Login User / Return JWT Token
// @access    Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find the user by email
  User.findOne({ "local.email": email }).then((user) => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.local.password).then((isMatch) => {
      if (isMatch) {
        // User Matched

        const payload = {
          id: user.id,
          method: user.method,
          name: user.name,
          email: user.local.email,
          image: user.image,
          city: user.city,
          contactNo: user.contactNo,
          facebook: user.facebook,
          youtube: user.youtube,
          instagram: user.instagram,
        }; // Create JWT payload

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3000000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        res.status(400).json(errors);
      }
    });
  });
});

// @route     POST api/users/oauth
// @desc      Logion User using oauth / Return JWT Token
// @access    Public
router.post("/oauth", async (req, res) => {
  let payId;

  const existingUser = await User.findOne({ "google.id": req.body.id });

  if (!existingUser) {
    console.log("Adding new user to the data base");

    // Adding new user to DB
    const newGoogleUser = new User({
      method: "google",
      name: req.body.name,
      image: req.body.image,
      google: {
        id: req.body.id,
        email: req.body.email,
      },
    });
    await newGoogleUser
      .save()
      .then((user) => (payId = user))
      .catch((err) => console.log(err));
  } else {
    console.log("User already exists in database");
    payId = existingUser;
  }

  // JWT payload
  const jwtPayload = {
    id: payId.id,
    method: payId.method,
    name: payId.name,
    email: payId.google.email,
    image: payId.image,
    city: payId.city,
    contactNo: payId.contactNo,
    facebook: payId.facebook,
    youtube: payId.youtube,
    instagram: payId.instagram,
  };
  //Sign Token
  jwt.sign(
    jwtPayload,
    keys.secretOrKey,
    { expiresIn: 3000000 },
    (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token,
      });
    }
  );
});

// @route     POST api/users/editprofile
// @desc      Edit user collection
// @access    Private
router.post(
  "/editprofile",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  async (req, res) => {
    // Get fields
    const userField = {};
    if (req.body.name) userField.name = req.body.name;
    if (req.body.city) userField.city = req.body.city;
    if (req.body.contactNo) userField.contactNo = req.body.contactNo;
    if (req.body.facebook) userField.facebook = req.body.facebook;
    if (req.body.youtube) userField.youtube = req.body.youtube;
    if (req.body.instagram) userField.instagram = req.body.instagram;
    if (req.file) {
      let wait = await cloudinary.uploader.upload(req.file.path, function (
        error,
        response
      ) {
        if (error) {
          response.send("err", error);
        }
      });
      userField.image = wait.url;
    }

    User.findByIdAndUpdate(
      { _id: req.body.id },
      { $set: userField },
      { new: true }
    ).then((user) => {
      // JWT payload
      const jwtPayload = {
        id: user.id,
        method: user.method,
        name: user.name,
        email: user.google.email,
        image: user.image,
        city: user.city,
        contactNo: user.contactNo,
        facebook: user.facebook,
        youtube: user.youtube,
        instagram: user.instagram,
      };
      //Sign Token
      jwt.sign(
        jwtPayload,
        keys.secretOrKey,
        { expiresIn: 3000000 },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    });
  }
);

// @route     GET api/users/current/:id
// @desc      Return User
// @access    Private
router.get(
  "/current/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.params.id)
      .then((user) => res.json(user))
      .catch((err) => console.log(err));
  }
);

// @route     POST api/users/addtowishlist
// @desc      Add Product to WishList
// @access    Private
router.post(
  "/addtowishlist",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.body.id)
      .then((user) => {
        if (user.myWishlist.includes(req.body.proId)) {
          res.json(user);
        } else {
          User.findByIdAndUpdate(
            { _id: req.body.id },
            { $push: { myWishlist: req.body.proId } },
            { new: true }
          )
            .then((user) => res.json(user))
            .catch((error) => console.log(error));
        }
      })
      .catch((err) => console.log(err));
  }
);

// @route     POST api/users/deleteproductfromwishlist
// @desc      Delete Product from Wishlist
// @access    Private
router.post(
  "/deleteproductfromwishlist",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    User.updateOne(
      { _id: req.body.id },
      { $pullAll: { myWishlist: [req.body.proId] } }
    )
      .then((user) => res.json({ msg: "done" }))
      .catch((err) => console.log(err));
  }
);

module.exports = router;
