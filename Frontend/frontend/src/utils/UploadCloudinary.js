// Ensure proper file extension (.js) and ES module syntax
const upload_Preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloudName = import.meta.env.VITE_CLOUD_NAME;

const UploadCloudinary = async file => {
    const uploadData = new FormData();

    uploadData.append('file', file);
    uploadData.append('upload_preset','ozvvdyq6' );
    uploadData.append('cloudName', cloudName);

    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'post',
            body: uploadData
        });
        

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error; // Re-throw the error to handle it in the calling code
    }
};

export default UploadCloudinary;
