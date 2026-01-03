const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


// ========== INDEX - Show all listings with search & filter ==========
module.exports.index = async (req, res) => {
  try {
    const { search, category } = req.query;

    // Build filter object
    let filter = {};

    // Search by title, location, description, country
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Get listings
    const allListings = await Listing.find(filter)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");

    // Render view
    res.render("listings/index.ejs", {
      allListings,
      searchQuery: search || "",
      selectedCategory: category || "",
    });
  } catch (error) {
    console.error("Error in index:", error);
    req.flash("error", "Something went wrong!");
    res.redirect("/listings");
  }
};


// ========== RENDER NEW FORM ==========
module.exports.renderNewForm = (req, res) => {
  try {
    res.render("listings/new.ejs");
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Error loading form!");
    res.redirect("/listings");
  }
};


// ========== CREATE LISTING ==========
module.exports.createListing = async (req, res) => {
  try {
    console.log("========== CREATING LISTING ==========");
    console.log("Request body:", req.body.listing);
    console.log("File info:", req.file);

    // Check if file is uploaded
    if (!req.file) {
      req.flash("error", "❌ Please upload an image!");
      return res.redirect("/listings/new");
    }

    // Check if all required fields are present
    const { title, description, location, country, price, category } =
      req.body.listing;

    if (!title || !description || !location || !country || !price || !category) {
      req.flash("error", "❌ Please fill in all required fields!");
      return res.redirect("/listings/new");
    }

    console.log("All fields are valid");
    console.log("Location for geocoding:", location);

    // Geocode the location
    let response;
    try {
      response = await geocodingClient
        .forwardGeocode({
          query: location,
          limit: 1,
        })
        .send();

      console.log(
        "Geocoding response:",
        JSON.stringify(response.body, null, 2)
      );
    } catch (geoError) {
      console.error("Geocoding error:", geoError);
      req.flash(
        "error",
        "❌ Could not find location. Please check the spelling."
      );
      return res.redirect("/listings/new");
    }

    // Check if geocoding returned results
    if (!response.body.features || response.body.features.length === 0) {
      console.error("No features found from geocoding");
      req.flash(
        "error",
        "❌ Location not found. Please check and try again."
      );
      return res.redirect("/listings/new");
    }

    const features = response.body.features;
    console.log("Geocoding features:", JSON.stringify(features, null, 2));

    // Get geometry from first feature
    const geometry = features[0].geometry;
    console.log("Geometry object:", JSON.stringify(geometry, null, 2));

    // Proper validation for geometry
    if (
      !geometry ||
      geometry.type !== "Point" ||
      !geometry.coordinates ||
      geometry.coordinates.length !== 2
    ) {
      console.error("Invalid geometry object");
      req.flash("error", "❌ Error processing location coordinates.");
      return res.redirect("/listings/new");
    }

    // Validate coordinates are numbers
    if (
      !Array.isArray(geometry.coordinates) ||
      typeof geometry.coordinates[0] !== "number" ||
      typeof geometry.coordinates[1] !== "number"
    ) {
      console.error("Invalid coordinate values");
      req.flash("error", "❌ Error processing location coordinates.");
      return res.redirect("/listings/new");
    }

    // Get file details
    const url = req.file.path;
    const filename = req.file.filename;

    console.log("Image URL:", url);
    console.log("Image filename:", filename);

    // Create listing with correct geometry structure
    const newListing = new Listing({
      title: req.body.listing.title,
      description: req.body.listing.description,
      location: req.body.listing.location,
      country: req.body.listing.country,
      price: req.body.listing.price,
      category: req.body.listing.category,
      owner: req.user._id,
      image: { url, filename },
      geometry: {
        type: "Point",
        coordinates: geometry.coordinates, // [longitude, latitude]
      },
    });

    console.log("New listing object:", JSON.stringify(newListing, null, 2));

    await newListing.save();

    console.log("✅ Listing saved successfully!");

    req.flash("success", "✅ New Listing Created!");
    res.redirect("/listings");
  } catch (error) {
    console.error("========== ERROR CREATING LISTING ==========");
    console.error("Full error object:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    // More specific error messages
    if (error.message && error.message.includes("geometry")) {
      req.flash("error", "❌ Error: Location data is invalid. Please try again.");
    } else if (error.message && error.message.includes("validation")) {
      req.flash("error", `❌ Error: ${error.message}`);
    } else {
      req.flash(
        "error",
        "❌ Error creating listing! Please check all fields are filled correctly."
      );
    }

    res.redirect("/listings/new");
  }
};


// ========== SHOW LISTING ==========
module.exports.showListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");

    if (!listing) {
      req.flash("error", "❌ Listing not found!");
      return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Something went wrong!");
    res.redirect("/listings");
  }
};


// ========== RENDER EDIT FORM ==========
module.exports.renderEditForm = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "❌ Listing not found!");
      return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs", { listing, originalImageUrl });
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Something went wrong!");
    res.redirect("/listings");
  }
};


// ========== UPDATE LISTING ==========
module.exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findByIdAndUpdate(id, {
      ...req.body.listing,
    });

    if (typeof req.file !== "undefined") {
      const url = req.file.path;
      const filename = req.file.filename;
      listing.image = { url, filename };
      await listing.save();
    }

    req.flash("success", "✅ Listing Updated!");
    res.redirect(`/listings/${id}`);
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "❌ Error updating listing!");
    res.redirect(`/listings/${id}`);
  }
};


// ========== DELETE LISTING ==========
module.exports.destroyListing = async (req, res) => {
  try {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "✅ Listing Deleted!");
    res.redirect("/listings");
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "❌ Error deleting listing!");
    res.redirect("/listings");
  }
};


// ========== TOGGLE FAVORITE ==========
module.exports.toggleFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const listing = await Listing.findById(id);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "❌ Listing not found" });
    }

    const isFavorited = listing.favoritedBy.includes(userId);

    if (isFavorited) {
      listing.favoritedBy = listing.favoritedBy.filter(
        (uid) => !uid.equals(userId)
      );
    } else {
      listing.favoritedBy.push(userId);
    }

    await listing.save();

    res.json({
      success: true,
      isFavorited: !isFavorited,
      favoritesCount: listing.favoritedBy.length,
    });
  } catch (error) {
    console.error("Error toggling favorite:", error);
    res
      .status(500)
      .json({ success: false, message: "Error toggling favorite" });
  }
};


// ========== SHOW FAVORITES PAGE ==========
module.exports.showFavorites = async (req, res) => {
  try {
    if (!req.user) {
      req.flash("error", "You must be logged in!");
      return res.redirect("/login");
    }

    const userId = req.user._id;
    const favoriteListings = await Listing.find({ favoritedBy: userId })
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");

    res.render("listings/favorites.ejs", {
      favoriteListings,
      searchQuery: "",
      selectedCategory: "",
    });
  } catch (error) {
    console.error("Error getting favorites:", error);
    req.flash("error", "Something went wrong!");
    res.redirect("/listings");
  }
};
