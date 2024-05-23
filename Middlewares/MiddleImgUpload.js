const multer = require("multer");
const upload = require("../config/Multer");
const cloudinary = require("../config/Cloudinary");

exports.imageUpload = (req, res, next) => {
  // Adjusting the multer configuration to handle multiple fields
  const uploadHandler = upload.fields([
    { name: "image", maxCount: 1 },
    { name: "imageDescription", maxCount: 10 },
  ]);

  uploadHandler(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send("Multer error: " + err.message);
    } else if (err) {
      return res.status(500).send("Error: " + err.message);
    }

    // Handle image upload for both fields
    const uploadPromises = [];

    if (req.files && req.files["image"]) {
      const imageFile = req.files["image"][0];
      uploadPromises.push(
        cloudinary.uploader.upload(imageFile.path).then((result) => {
          req.image = result.secure_url;
        })
      );
    }

    if (req.files && req.files["imageDescription"]) {
      const imageDescriptionFiles = req.files["imageDescription"];
      req.imageDescriptions = [];
      imageDescriptionFiles.forEach((file) => {
        uploadPromises.push(
          cloudinary.uploader.upload(file.path).then((result) => {
            req.imageDescriptions.push(result.secure_url);
          })
        );
      });
    }

    // Wait for all uploads to finish
    Promise.all(uploadPromises)
      .then(() => next())
      .catch((error) => {
        console.error(error);
        return res.status(500).send("Error uploading images to Cloudinary");
      });
  });
};

exports.multipleImageUpload = (req, res, next) => {
  upload.array("images", 10)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send("Multer error: " + err.message);
    } else if (err) {
      return res.status(500).send("Error: " + err.message);
    }

    if (!req.files || req.files.length === 0) {
      return next();
    }

    const uploadedImages = [];
    req.files.forEach((file, index, array) => {
      cloudinary.uploader.upload(file.path, (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Error uploading image to Cloudinary");
        }
        uploadedImages.push(result.secure_url);
        if (uploadedImages.length === array.length) {
          req.imageURLs = uploadedImages;
          next();
        }
      });
    });
  });
};
