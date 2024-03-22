// Ensure proper file extension (.js) and ES module syntax

const upload_peset = import.meta.env.VITE_UPLOAD_PESET;
const cloud_Name = import.meta.env.VITE_CLOUD_NAME;
console.log(cloud_Name);
const UploadCloudinary = async file => {
    const uploadData = new FormData();

    uploadData.append('file', file);
    uploadData.append('upload_peset',upload_peset );
    uploadData.append('cloudName', cloud_Name);

    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_Name}/image/upload`, {
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
