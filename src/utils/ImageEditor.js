export default class ImageEdits {
  constructor(imageSrc, width, height) {
    if (!imageSrc) return;
    this.image = new Image();
    this.image.src = imageSrc;
    this.cWidth = width;
    this.cHeight = height;
  }

  getBakedImage = (canvas) => {
    const dataURL = canvas.toDataURL();

    const image = new Image();
    image.src = dataURL;
    document.getElementsByTagName("body")[0].append(image);
    document.getElementsByTagName("a")[0].download = "Profile.png";
    document.getElementsByTagName("a")[0].href = dataURL;
  };

  computeImageConfig = () => {
    const height = this.image.naturalHeight;
    const width = this.image.naturalWidth;

    const aspectRatio = width / height;
    let imgStyle = {},
      scale = 1,
      canvasStyle = {};

    const scaleX = this.cWidth / width;
    // const scaleY = this.cHeight / height;

    scale = scaleX;
    // if (scaleX > scaleY) scale = scaleY;
    // else scale = scaleX;

    canvasStyle = { height, width, scale };
    // If greater than One
    if (aspectRatio < 1) {
      imgStyle = { height: "100%", width: "auto" };
      return { imgStyle, canvasStyle };
    }

    // If less than One
    if (aspectRatio > 1) {
      imgStyle = { height: "auto", width: "100%" };
      return { imgStyle, canvasStyle };
    }

    imgStyle = { height: "auto", width: "100%" };

    return { imgStyle, canvasStyle };
  };
  computeAspectRatio = (types, src, multiple = false) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (multiple) {
          let aspectRatios = [];
          for (let i = 0; i < src.length; i++) {
            let type = types[i];
            const aspectRatio = await new Promise((resolve, reject) => {
              if (type === "video") {
                const video = document.createElement("video");
                video.volume = 0;
                video.autoplay = true;
                video.onloadedmetadata = () => {
                  let aspRatio = video.videoWidth / video.videoHeight;
                  video.pause();
                  video.src = null;

                  resolve(aspRatio);
                };
                video.src = src[i];
              }
              const image = new Image();
              image.onload = () => {
                let aspRatio = image.naturalWidth / image.naturalHeight;
                resolve(aspRatio);
              };
              image.src = src[i];
            });

            aspectRatios.push(aspectRatio);
          }

          resolve(aspectRatios);
          return;
        }

        if (types === "video") {
          const video = document.createElement("video");
          video.volume = 0;
          video.autoplay = true;
          video.onloadedmetadata = () => {
            let aspectRatio = video.videoWidth / video.videoHeight;
            resolve(aspectRatio);
            video.pause();
            video.src = null;
          };
          video.src = src;

          return;
        }

        const image = new Image();
        image.onload = () => {
          let aspectRatio = image.naturalWidth / image.naturalHeight;
          resolve(aspectRatio);
        };
        image.src = src;
      } catch (error) {
        reject(error);
      }
    });
  };

  reduceImage = ({ src, format = "url", size = 0, quality = 0.9 }) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();

    return new Promise((resolve, reject) => {
      try {
        image.onload = () => {
          const aspectRatio = image.naturalWidth / image.naturalHeight;
          let width = image.naturalWidth,
            height = image.naturalHeight;
          if (size) {
            width = size;
            height = width / aspectRatio;
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(image, 0, 0, width, height);
          if (format === "url") {
            resolve(canvas.toDataURL());
            return;
          }

          if (format === "blob") {
            canvas.toBlob(
              (blob) => {
                resolve(blob);
              },
              "image/jpeg",
              quality
            );
          }
        };

        image.src = src;
      } catch (error) {
        reject(error);
      }
    });
  };
}
