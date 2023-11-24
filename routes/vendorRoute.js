const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendorController");

router.post("/register", vendorController.signUpVendor);
router.get("/register/:id", vendorController.getSingleVendor);
router.patch("/register/:id", vendorController.updateSingleVendor);
router.post("/login", vendorController.loginVendor);

module.exports = router;
