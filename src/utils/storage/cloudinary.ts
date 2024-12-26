import { v2 as cloudinary } from 'cloudinary';
import { appConfig } from '../appConfig';
import { Readable } from 'stream';

// Cloudinary configuration
const cloudinaryConfig = {
    cloud_name: appConfig.CLOUDINARY_CLOUD_NAME,
    api_key: appConfig.CLOUDINARY_API_KEY,
    api_secret: appConfig.CLOUDINARY_API_SECRET,
};

// Check for Cloudinary credentials
if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
    console.error('Cloudinary configuration is missing or invalid');
    process.exit(1);
}

cloudinary.config(cloudinaryConfig);

// Upload image function
export const uploadImage = async (file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}) => {
    return new Promise((resolve, reject) => {
        // Extract filename and extension from the original filename
        const filename = file.originalname.split('.').slice(0, -1).join('.');
        const extension = file.originalname.split('.').pop();

        // Create a readable stream from the buffer
        const bufferStream = new Readable();
        bufferStream.push(file.buffer);
        bufferStream.push(null); // Indicate the end of the stream

        // Upload directly from the buffer stream to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                public_id: `${filename}.${extension}`, // Set custom file name (optional)
                overwrite: true,  // Overwrite the existing file with the same name
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result?.secure_url);  // Return the URL of the uploaded image
                }
            }
        );

        // Pipe the buffer stream to Cloudinary
        bufferStream.pipe(uploadStream);
    });
};

// Delete image function
export const deleteImage = async (publicId: string) => {
    try {
        await cloudinary.uploader.destroy(publicId);
        console.log(`Image with public ID ${publicId} deleted successfully`);
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }
};
