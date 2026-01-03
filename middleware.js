const ExpressError = require("./utils/ExpressError");
const Listing = require("./models/listing");
const Review = require("./models/review");
const Joi = require("joi");

// ============================================================
// LISTING VALIDATION SCHEMA
// ============================================================
const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Title is required",
      "any.required": "Title is required"
    }),
    description: Joi.string().required().messages({
      "string.empty": "Description is required",
      "any.required": "Description is required"
    }),
    location: Joi.string().required().messages({
      "string.empty": "Location is required",
      "any.required": "Location is required"
    }),
    country: Joi.string().required().messages({
      "string.empty": "Country is required",
      "any.required": "Country is required"
    }),
    price: Joi.number()
      .required()
      .min(0)
      .messages({
        "number.base": "Price must be a number",
        "number.min": "Price must be greater than 0",
        "any.required": "Price is required"
      }),
    category: Joi.string()
      .valid(
        "Trending",
        "Rooms",
        "Iconic cities",
        "Mountains",
        "Castles",
        "Amazing Pools",
        "Camping",
        "Farms",
        "Arctic",
        "Dome"
      )
      .required()
      .messages({
        "any.only": "Please select a valid category",
        "any.required": "Category is required"
      })
  }).required()
}).unknown(true);

// ============================================================
// REVIEW VALIDATION SCHEMA
// ============================================================
const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number()
      .required()
      .min(1)
      .max(5)
      .messages({
        "number.base": "Rating must be a number",
        "number.min": "Rating must be at least 1",
        "number.max": "Rating cannot be more than 5",
        "any.required": "⚠️ Please select a rating"
      }),
    comment: Joi.string()
      .required()
      .trim()
      .min(1)
      .messages({
        "string.empty": "⚠️ Please add a comment",
        "any.required": "⚠️ Please add a comment",
        "string.min": "⚠️ Please add a comment"
      })
  }).required()
}).unknown(true);

// ============================================================
// VALIDATE LISTING MIDDLEWARE
// ============================================================
module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    req.flash("error", msg);
    return res.redirect("back");
  } else {
    next();
  }
};

// ============================================================
// VALIDATE REVIEW MIDDLEWARE
// ============================================================
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    req.flash("error", msg);
    return res.redirect("back");
  } else {
    next();
  }
};

// ============================================================
// CHECK LOGGED IN MIDDLEWARE
// ============================================================
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "⚠️ You must be logged in!");
    return res.redirect("/login");
  }
  next();
};

// ============================================================
// RESTORE REDIRECT URL MIDDLEWARE
// ============================================================
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// ============================================================
// CHECK LISTING OWNER MIDDLEWARE
// ============================================================
module.exports.isListingOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "❌ Listing not found!");
      return res.redirect("/listings");
    }

    if (!listing.owner.equals(req.user._id)) {
      req.flash("error", "⚠️ You are not the owner of this listing!");
      return res.redirect(`/listings/${id}`);
    }

    next();
  } catch (error) {
    console.error("Error in isListingOwner middleware:", error);
    req.flash("error", "❌ Something went wrong!");
    res.redirect("/listings");
  }
};

// ============================================================
// CHECK REVIEW AUTHOR MIDDLEWARE
// ============================================================
module.exports.isReviewAuthor = async (req, res, next) => {
  try {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
      req.flash("error", "❌ Review not found!");
      return res.redirect(`/listings/${id}`);
    }

    if (!review.author.equals(req.user._id)) {
      req.flash("error", "⚠️ You can only delete your own reviews!");
      return res.redirect(`/listings/${id}`);
    }

    next();
  } catch (error) {
    console.error("Error in isReviewAuthor middleware:", error);
    req.flash("error", "❌ Something went wrong!");
    res.redirect("/listings");
  }
};
