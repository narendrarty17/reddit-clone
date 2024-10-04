const uploadImage = async (image, type) => {
    const public_id = Date.now() + "-" + type; // Correctly evaluated timestamp
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "unsigned_upload"); // unsigned preset
    formData.append("public_id", public_id); // unique file name with timestamp

    const response = await fetch(
        "https://api.cloudinary.com/v1_1/dcfw2vxom/image/upload",
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        throw new Error("Image upload failed");
    }

    const result = await response.json();
    return result.secure_url; // Return the secure URL of the uploaded image
};

export { uploadImage };