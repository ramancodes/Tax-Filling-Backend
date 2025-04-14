const { v4: uuidv4 } = require("uuid");
const fs = require('fs');
const path = require('path');
const { s3Client } = require("../config/connectS3.js");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

module.exports = {
  generate: () => uuidv4(),
  getCurrentFees: () => {return 1100},
  calculateAge: (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
  
    // Adjust age if birthday hasn't occurred yet this year
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  },
  handleS3Upload: async (file, prefix) => {
    try {
      const originalName = file.filename.replace(" ", "_");
      const nameOnly = path.basename(originalName, path.extname(originalName));
      const newFileName = `${prefix}_${nameOnly}${path.extname(originalName)}`;

      console.log("Hello");

      // Upload file to S3
      const fileStream = fs.createReadStream(file.path);
      const fileKey = `etaxUploads/${newFileName}`;
      const contentType = file.mimetype;

      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: fileKey,
        Body: fileStream,
        ContentType: contentType,
      };
      await s3Client.send(new PutObjectCommand(uploadParams));

      const fileUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error("Error deleting local file:", err);
        } else {
          console.log("Local file deleted:", file.path);
        }
      });
      return {
        status: 200,
        message: "File Uploaded Successfully",
        data: fileUrl,
      };
    } catch (error) {
      return { status: 400, message: error };
    }
  },
};
