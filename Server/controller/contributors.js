const Contributor = require("../models/Contributor");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const fs = require("fs");
const path = require("path");

// @desc  Get all contributors
// @route GET /api/v1/contributors
// @access Public
exports.getContributors = asyncHandler(async (req, res, next) => {
  const contributors = await Contributor.find().sort("-createdAt");
  res.status(200).json({
    success: true,
    count: contributors.length,
    data: contributors,
  });
});

// @desc   Get single contributor
// @route  GET /api/v1/contributors/:id
// @access Public
exports.getContributor = asyncHandler(async (req, res, next) => {
  const contributor = await Contributor.findById(req.params.id);

  if (!contributor) {
    return next(
      new ErrorResponse(`Contributor not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: contributor,
  });
});

// @desc   Create new contributor
// @route  POST /api/v1/contributors
// @access Private(Admin only)
exports.createContributor = asyncHandler(async (req, res, next) => {
  const {name,email,position,phone}  = req.body;

  let imageUrl=null;

  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/uploads/contributors/${req.file.filename}`;
  }

  const contributor = await Contributor.create({
    name,
    email,
    position,
    phone,
    image:imageUrl || `${req.protocol}://${req.get("host")}/uploads/contributors/no-photo.png`,
});

  res.status(201).json({
    success: true,
    data: contributor,
  });
});

// @desc Update contributor
// @route PUT /api/v1/contributors/:id
// @access Private(Admin only)
exports.updateContributor = asyncHandler(async (req, res, next) => {
  let contributor = await Contributor.findById(req.params.id);

  if (!contributor) {
    return next(
      new ErrorResponse(`Contributor not found with id ${req.params.id}`, 404)
    );
  }

  if (req.file) {
  // Delete old image if exists
  if (contributor.image && contributor.image.includes("/uploads/contributors/")) {
    const oldPath = path.join(__dirname, "..", "uploads", "contributors", path.basename(contributor.image));
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  // Build absolute URL for the new image
  req.body.image = `${req.protocol}://${req.get("host")}/uploads/contributors/${req.file.filename}`;
}


  contributor = await Contributor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: contributor,
  });
});

// @desc Delete contributor
// @route DELETE /api/v1/contributors/:id
exports.deleteContributor = asyncHandler(async (req, res, next) => {
  const contributor = await Contributor.findById(req.params.id);

  if (!contributor) {
    return next(
      new ErrorResponse(`Contributor not found with id ${req.params.id}`, 404)
    );
  }

  // Delete image if exists
  if (contributor.image && contributor.image.startsWith("/uploads")) {
    const imagePath = path.join(__dirname, "..", contributor.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
  }

  await contributor.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
