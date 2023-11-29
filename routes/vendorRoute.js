const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendorController");
const validatonError = require("../utilities/validationError");
const validationScheme = require("../utilities/validationScheme");
const valid = [...validationScheme, validatonError.validateRequestSchema];

router.post("/register", valid, vendorController.signUpVendor);
router.get("/register/:id", vendorController.getSingleVendor);
router.patch("/register/:id", vendorController.updateSingleVendor);
router.post("/login", vendorController.loginVendor);

module.exports = router;
