import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

export const handleFileChange = async (e, setIsSelectedImage, setIsCompressingImage, setImage, type) => {
    const file = e.target.files[0];
    
    if (file) {

        const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

        if (!validImageTypes.includes(file.type)) {
            setIsSelectedImage(false);
            toast.error("Please upload a valid image file (JPEG, PNG, GIF)");
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setIsSelectedImage(false);
            toast.error("Image is too large. Max allowed 10MB");
            return;
        }

        setIsSelectedImage(true);
        setIsCompressingImage(true);
        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: type === "profileImage" ? 500 : 1920,
                useWebWorker: true,
            };
            const compressedFile = await imageCompression(file, options);

            const reader = new FileReader();
            reader.onload = (e) => {
                if(type === "courseImage")  {
                    const img = new Image();
                    img.src = e.target.source;
                }
                
                console.log(reader.result);
                setImage(reader.result);
                setIsCompressingImage(false);
            };
            reader.readAsDataURL(compressedFile);

        } catch (error) {
            setIsCompressingImage(false);
            toast.error("Error compressing image, try another image");
        }
    }
}