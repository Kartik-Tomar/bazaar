const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const passport = require("passport");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Load Product Model
const Product = require("../../models/Product");
const User = require("../../models/User");

// Load Input Validation
const validateProductInput = require("../../validation/add-product");

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

// @route     GET api/products/test
// @desc      Test user route
// @access    Public
router.get("/test", (req, res) => res.json({ msg: "Product Route Works" }));

// @route     GET api/products/
// @desc      Render all products from date
// @access    Public
router.get("/allproducts/:page", (req, res) => {
  const page = req.params.page;
  const startIndex = (page - 1) * 12;
  const endIndex = page * 12;
  Product.find()
    .sort({ date: -1 })
    .then((products) => {
      const tenProducts = products.slice(startIndex, endIndex);
      res.json(tenProducts);
    })
    .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route   GET api/products/:id
// @desc    Get products by id
// @access  Public
router.get("/singleproduct/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ nopostfound: "No post found with that ID" });
      }
    })
    .catch((err) =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

// @route     POST api/products/addproduct
// @desc      Add new product
// @access    Private
router.post(
  "/addproduct",
  passport.authenticate("jwt", { session: false }),
  upload.array("image"),
  async (req, res) => {
    let { errors, isValid } = validateProductInput(req);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Get Fields
    const newProduct = {
      user: req.body.id,
      title: req.body.title,
      category: req.body.category,
      city: req.body.city,
      price: req.body.price,
      description: req.body.description,
    };
    // Save Product
    const saveProduct = (product) => {
      let newPro = new Product(product);
      newPro
        .save()
        .then((savedProduct) => {
          User.findByIdAndUpdate(
            { _id: savedProduct.user },
            { $push: { myProducts: savedProduct._id } },
            { new: true }
          )
            .then((user) => res.json(user))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    };

    if (req.files.length > 0) {
      let images = [];
      req.files.map(async (val, ind) => {
        let wait = await cloudinary.uploader.upload(val.path, function (
          error,
          response
        ) {
          if (error) {
            console.log("err", error);
          }
        });
        images.push(wait.url);
        if (images.length === req.files.length) {
          newProduct.photos = images;
          saveProduct(newProduct);
        }
      });
    } else {
      saveProduct(newProduct);
    }
  }
);

// @route     POST api/products/editproduct
// @desc      Edit Product
// @access    Private
router.post(
  "/editproduct",
  passport.authenticate("jwt", { session: false }),
  upload.array("image"),
  async (req, res) => {
    let { errors, isValid } = validateProductInput(req);
    if (errors.image1) {
      delete errors.image1;
      if (Object.keys(errors).length === 0) {
        isValid = true;
      }
    }
    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Get Fields
    const editProduct = {
      title: req.body.title,
      category: req.body.category,
      city: req.body.city,
      price: req.body.price,
      description: req.body.description,
    };
    // save product
    const newEditProduct = (product) => {
      Product.findByIdAndUpdate(
        { _id: req.body.id },
        { $set: product },
        { new: true }
      )
        .then((product) => res.json(product))
        .catch((err) => console.log(err));
    };
    if (req.files[0] !== "") {
      let images = [];
      req.files.map(async (val, ind) => {
        let wait = await cloudinary.uploader.upload(val.path, function (
          error,
          response
        ) {
          if (error) {
            console.log("err", error);
          }
        });
        images.push(wait.url);
        if (images.length === req.files.length) {
          editProduct.photos = images;
          newEditProduct(editProduct);
        }
      });
    } else {
      newEditProduct(editProduct);
    }
  }
);

// @route     POST api/products/deleteproduct
// @desc      Delete Product
// @access    Private
router.post(
  "/deleteproduct",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    Product.remove({ _id: req.body.id }, (err) => {
      if (!err) {
        User.updateOne(
          { _id: req.body.userId },
          { $pullAll: { myProducts: [req.body.id] } }
        ).then((user) => res.json({ msg: "done" }));
      } else {
        console.log(err);
      }
    });
  }
);

// @route     GET api/products/results/:city/:category/:page
// @desc      Sort and Render products from date
// @access    Public
router.get("/results/", (req, res) => {
  const page = req.query.page;
  const city = req.query.city;
  const category = req.query.category;
  const title = req.query.title;
  const startIndex = (page - 1) * 12;
  const endIndex = page * 12;
  let sort = {};
  if (city !== "undefined") sort.city = city;
  if (category !== "undefined") sort.category = category;
  if (title !== "undefined") sort.title = new RegExp(title, "g");
  Product.find(sort)
    .sort({ price: 0, date: -1 })
    .then((products) => {
      const tenProducts = products.slice(startIndex, endIndex);
      res.json(tenProducts);
    })
    .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
});

module.exports = router;
