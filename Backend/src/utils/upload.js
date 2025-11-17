import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dh5lmvfvq', 
    api_key: process.env.CLOUDINARY_API_KEY || '678393964668636', 
    api_secret: process.env.CLOUDINARY_API_SECRET || 'ADhDNS8d6rJiUej5vrRrPR0HHVQ'
});

export const uploadToCloudinary = async (fileBuffer, folder = 'flipiri') => {
  try {
    const base64Image = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;
    
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: folder,
      resource_type: 'auto',
      transformation: [
        { width: 1000, height: 1000, crop: 'limit' },
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });

    return {
      success: true,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};


export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: true,
      result: result
    };
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};


export const getPublicIdFromUrl = (url) => {
  try {
    if (!url || !url.includes('cloudinary.com')) return null;
    
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return null;
    
    const pathAfterUpload = parts.slice(uploadIndex + 2).join('/');
    return pathAfterUpload.replace(/\.[^/.]+$/, '');
  } catch (error) {
    console.error('Error extracting public_id:', error);
    return null;
  }
};

export default cloudinary;