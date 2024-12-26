"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
const appConfig_1 = require("../appConfig");
const stream_1 = require("stream");
// Cloudinary configuration
const cloudinaryConfig = {
    cloud_name: appConfig_1.appConfig.CLOUDINARY_CLOUD_NAME,
    api_key: appConfig_1.appConfig.CLOUDINARY_API_KEY,
    api_secret: appConfig_1.appConfig.CLOUDINARY_API_SECRET,
};
// Check for Cloudinary credentials
if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
    console.error('Cloudinary configuration is missing or invalid');
    process.exit(1);
}
cloudinary_1.v2.config(cloudinaryConfig);
// Upload image function
const uploadImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        // Extract filename and extension from the original filename
        const filename = file.originalname.split('.').slice(0, -1).join('.');
        const extension = file.originalname.split('.').pop();
        // Create a readable stream from the buffer
        const bufferStream = new stream_1.Readable();
        bufferStream.push(file.buffer);
        bufferStream.push(null); // Indicate the end of the stream
        // Upload directly from the buffer stream to Cloudinary
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            public_id: `${filename}.${extension}`, // Set custom file name (optional)
            overwrite: true, // Overwrite the existing file with the same name
        }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result === null || result === void 0 ? void 0 : result.secure_url); // Return the URL of the uploaded image
            }
        });
        // Pipe the buffer stream to Cloudinary
        bufferStream.pipe(uploadStream);
    });
});
exports.uploadImage = uploadImage;
// Delete image function
const deleteImage = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cloudinary_1.v2.uploader.destroy(publicId);
        console.log(`Image with public ID ${publicId} deleted successfully`);
    }
    catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }
});
exports.deleteImage = deleteImage;
