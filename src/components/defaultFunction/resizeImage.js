import Resizer from "react-image-file-resizer";

export default function resizeImage(image, file, width, height) {
    return new Promise((resolve) => {
        Resizer.imageFileResizer(image, width, height, "webp", 100, 0,
            (uri) => {
               resolve(uri)
            },
            file,
            width,
            height
        );
    });
} 
