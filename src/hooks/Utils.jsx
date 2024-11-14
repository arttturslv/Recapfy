
export function getImageColor(image) {
    const canvas =  document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    
    let r,g,b,a;

    image.onload = () => {

        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

        r = imageData.data[0]; 
        g = imageData.data[1]; 
        b = imageData.data[2]; 
        a = imageData.data[3]; 
        console.log("2")
    };

    if (image.complete) {
        image.onload();
    }

    console.log("2")
    return [r,g,b,a];

}