import { useEffect, useState } from "react";

export function useSprite(src: string | null) {
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {

        console.log(`useSprite loading image: ${src}`);

        if (!src) {
            setImage(null);
            return;
        }

        console.log(`useSprite creating image for src: ${src}`);

        const img = new Image();
        img.src = src;
        img.onload = () => setImage(img);

        console.log(`useSprite image set src: ${img.src}`);

    }, [src]);

    return image;
}