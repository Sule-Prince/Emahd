import { createStore, set } from "idb-keyval";
import { useDispatch, useSelector } from "react-redux";

import { axios } from "../../config/axiosConfig";
import { projectFirestore } from "../../firebase/FBConfig";
import { updateData } from "../../redux/userDataSlice";
import ImageEdits from "../ImageEditor";
import toFile from "../toFile";
import useStorage from "./useStorage";

const useFileUpload = (
  type,
  { uploadingMedia, uploadedMedia, uploadError },
  handle
) => {
  const { handle: user, userId } = useSelector((state) => state.user.data);
  const uploadFile = useStorage();

  const dispatch = useDispatch();
  const fileUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    if (uploadingMedia) dispatch(uploadingMedia());

    let editor = new ImageEdits();

    const url = URL.createObjectURL(image);

    let blob;

    if (type === "imageUrl")
      blob = await editor.reduceImage({ src: url, size: 500, format: "blob" });
    else
      blob = await editor.reduceImage({
        src: url,
        quality: 0.8,
        format: "blob",
      });

    let newFile = toFile(blob, "image/jpeg");
    const folder = type === "imageUrl" ? "profilePhotos" : "coverPhotos";
    console.log(folder);
    const setError = () => dispatch(uploadError());

    uploadFile({
      file: newFile,
      fileName: `${folder}/${userId}`,
      setError,
    }).then(async (url) => {
      console.log(url);
      dispatch(updateData({ which: type, data: url }));

      await projectFirestore
        .collection("users")
        .doc(userId)
        .update({
          [type]: url,
        });

      if (uploadedMedia) dispatch(uploadedMedia({ user, url }));

      const imageStore = createStore("Emahd", "image-store");
      await set(type, newFile, imageStore);
    });
  };
  return fileUpload;
};

export default useFileUpload;
