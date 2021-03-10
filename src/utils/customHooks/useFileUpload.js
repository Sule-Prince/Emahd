import { useDispatch, useSelector } from "react-redux";

import { axios } from "../../config/axiosConfig";
import { updateData } from "../../redux/userDataSlice";

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

    formData.append("image", image, image.name);
    axios
      .post(`/user/upload/${type}`, formData)
      .then((res) => {
        console.log(res.data.url);
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
