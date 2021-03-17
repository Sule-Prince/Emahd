import { useDispatch, useSelector } from "react-redux";

import { axios } from "../../config/axiosConfig";
import { updateData } from "../../redux/userDataSlice";
import ImageEdits from "../ImageEditor";
import toFile from "../toFIle";

const useFileUpload = (
  type,
  { uploadingMedia, uploadedMedia, uploadError },
  handle
) => {
  const user = useSelector((state) => state.user.data.handle);

  const dispatch = useDispatch();
  const fileUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();

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

    formData.append("image", newFile, newFile.name);
    axios
      .post(`/user/upload/${type}`, formData)
      .then((res) => {
        dispatch(updateData({ which: type, data: res.data.url }));

        if (uploadedMedia) dispatch(uploadedMedia({ user, url: res.data.url }));
      })
      .catch((err) => {
        if (uploadError) dispatch(uploadError());
      });
  };
  return fileUpload;
};

export default useFileUpload;
