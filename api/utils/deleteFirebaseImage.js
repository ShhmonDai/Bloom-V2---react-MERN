import bucket from '../firebaseAdmin.js';

export const deleteFirebaseImage = async (imageUrl) => {
    const firebaseStorageDomain = 'https://firebasestorage.googleapis.com';
    if (!imageUrl.startsWith(firebaseStorageDomain)) return;

    try {
        const pathStart = imageUrl.indexOf('/o/') + 3;
        const pathEnd = imageUrl.indexOf('?');
        const encodedPath = imageUrl.substring(pathStart, pathEnd);
        const filePath = decodeURIComponent(encodedPath);

        const file = bucket.file(filePath);
        await file.delete();
        console.log(`✅ Deleted image: ${filePath}`);
    } catch (err) {
        console.warn(`⚠️ Failed to delete image: ${err.message}`);
    }
};