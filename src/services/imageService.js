const base64ToBlob = (base64, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(base64.split(",")[1]); // Decode the base64 string
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
};

const compressImage = (image, quality) => {
    return new Promise((resolve, reject) => {
        // Check if the input is a Blob or File
        if (image instanceof Blob || image instanceof File) {
            const reader = new FileReader();

            // Convert Blob/File to Base64 and load it into an HTMLImageElement
            reader.onload = (event) => {
                const imgElement = new Image();
                imgElement.src = event.target.result;  // Base64 string

                imgElement.onload = () => {
                    // Once the image is loaded, proceed with compression
                    resolve(compressHTMLImage(imgElement, quality));
                };

                imgElement.onerror = (err) => reject('Error loading image');
            };

            // Read the Blob/File as a Base64 string
            reader.readAsDataURL(image);
        } else if (image instanceof HTMLImageElement) {
            // If it's already an HTMLImageElement, compress directly
            resolve(compressHTMLImage(image, quality));
        } else {
            reject('Invalid input: expected Blob, File, or HTMLImageElement');
        }
    });
};

// Helper function to compress an HTMLImageElement
const compressHTMLImage = (imgElement, quality = 0.5) => {
    const canvas = document.createElement('canvas');
    const maxWidth = 800; // Set a maximum width for resizing
    const scaleFactor = maxWidth / imgElement.width;

    // Set canvas dimensions
    canvas.width = maxWidth;
    canvas.height = imgElement.height * scaleFactor;

    // Draw the image to canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

    // Compress the image to a Data URL (image/png, image/jpeg, etc.)
    return canvas.toDataURL('image/jpeg', quality);  // Set the MIME type and compression quality
};


export { base64ToBlob, compressImage };