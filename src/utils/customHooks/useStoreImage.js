import IDGenerator from "../IDGenerator";
import ImageEdits from "../ImageEditor";
import toFile from "../toFile";
import useStorage from "./useStorage";

const useStoreImage = () => {
  const uploadFile = useStorage();
  return async (image, metaData, setters = {}) => {
    const { size, quality = 0.8, fileName = IDGenerator() } = metaData,
      { setProgress, setError } = setters,
      file = await reduceImage(image, size, quality);

    return uploadFile({ file, fileName, setProgress, setError });
  };
};

const reduceImage = async (image, size, quality) => {
  const editor = new ImageEdits();

  const blob = await editor.reduceImage({
    src: image,
    format: "blob",
    size,
    quality,
  });

  return toFile(blob, "image/jpeg");
};

export default useStoreImage;
