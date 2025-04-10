import { toast } from 'react-hot-toast';

export const convertImageToBase64 = (e) => {
    return new Promise((resolve, reject) => {
        const file = e.target.files[0];
        if (!file) {
            toast.error("No file selected");
            return reject("No file selected");
        }

        const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/webp"];
        if (!validImageTypes.includes(file.type)) {
            toast.error("Please upload a valid image file (JPEG, PNG, GIF, webp)");
            return reject("Invalid file type");
        }

        if (file.size > 10 * 1024 * 1024) {
            toast.error("Image is too large. Max allowed 10MB");
            return reject("Image too large");
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => {
            toast.error("Failed to read file");
            reject("File read error");
        };
    });
};
