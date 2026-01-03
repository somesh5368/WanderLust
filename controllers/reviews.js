const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

// ========== CREATE REVIEW ==========
module.exports.createReview = async (req, res) => {
  try {
    let listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      req.flash("error", "❌ Listing not found");
      return res.redirect("/listings");
    }

    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    
    await newReview.save();
    listing.reviews.push(newReview);
    await listing.save();

    req.flash("success", "✅ Review added successfully!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.error("Error creating review:", err);
    req.flash("error", "❌ Error adding review");
    res.redirect(`/listings/${req.params.id}`);
  }
};

// ========== DELETE REVIEW ==========
module.exports.destroyReview = async (req, res) => {
  try {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "✅ Review deleted successfully!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error("Error deleting review:", err);
    req.flash("error", "❌ Error deleting review");
    res.redirect(`/listings/${id}`);
  }
};
