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

const uploadPost = async (postData) => {
    try {
        // Check if the content type is an image and upload it
        if (postData.content.type === "image") {
            const imgUrl = await uploadImage(postData.content.value, "post");
            postData.content.value = imgUrl;
        }
        const response = await fetch("http://localhost:5000/post/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });

        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            const errorData = await response.json(); // Read the error response
            console.error("Error response from server:", errorData);
            throw new Error("Network response was not ok: " + response.statusText);
        }

        return await response.json(); // Return the response data
    } catch (error) {
        console.error("Error uploading post: ", error);
        throw new Error("Failed to upload post: " + error.message);
    }
}

export { uploadImage, uploadPost };