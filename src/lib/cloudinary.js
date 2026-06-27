import { CLOUDINARY_CONFIG, isCloudinaryConfigured } from '../config/cloudinary';

export async function uploadImage(file) {
  if (!isCloudinaryConfigured) {
    throw new Error('Cloudinary non configuré — ajoutez VITE_CLOUDINARY_CLOUD_NAME');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  formData.append('folder', 'smart-gym-ennasr');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
    { method: 'POST', body: formData },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'Échec upload Cloudinary');
  }

  return data.secure_url;
}
