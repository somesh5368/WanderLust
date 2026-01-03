const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isListingOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// ========== INDEX & CREATE ==========
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// ========== NEW FORM ==========
router.get(
  "/new",
  isLoggedIn,
  listingController.renderNewForm
);

// ========== FAVORITES PAGE ==========
router.get(
  "/favorites",
  isLoggedIn,
  wrapAsync(listingController.showFavorites)
);

// ========== TOGGLE FAVORITE ==========
router.post(
  "/:id/favorite",
  isLoggedIn,
  wrapAsync(listingController.toggleFavorite)
);

// ========== SHOW, UPDATE, DELETE ==========
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isListingOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isListingOwner,
    wrapAsync(listingController.destroyListing)
  );

// ========== EDIT FORM ==========
router.get(
  "/:id/edit",
  isLoggedIn,
  isListingOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
