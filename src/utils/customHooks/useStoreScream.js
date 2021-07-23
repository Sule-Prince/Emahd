import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { screamsDataThunk } from "../../redux/postsSlice";
import IDGenerator from "../IDGenerator";
import ImageEdits from "../ImageEditor";
import toFile from "../toFile";
import usePostData from "./usePostData";
import useStorage from "./useStorage";

const useStoreScream = (section, media) => {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState([]);

  const { sendData, postError } = usePostData();
  const uploadFile = useStorage();
  const dispatch = useDispatch();

  useEffect(() => {
    if (postError) setError((prev) => [...prev, postError]);

    // eslint-disable-next-line
  }, [postError]);

  const storeData = async (
    route,
    scream,
    mediaType,
    postSettings,
    multiple = false
  ) => {
    const post = scream;

    if (!media && section === "scream") {
      sendData(
        { post, url: "", mediaType: "", thumb: "", section, postSettings: {} },
        route
      ).then(() => {
        dispatch(screamsDataThunk());
      });
      return;
    }

    let fileName = IDGenerator(),
      thumbUrl,
      newFile;

    const editor = new ImageEdits();

    // Upload logic for scream related posts

    if (section === "scream") {
      // Logic for video media type

      // Initialize the progress bar to start loading
      setProgress(10);

      if (mediaType === "video") {
        uploadFile({ file: media, fileName, setProgress, setError }).then(
          (storageUrl) => {
            const data = {
              post,
              url: storageUrl,
              thumb: "",
              mediaType,
              section,
              postSettings,
            };
            sendData(data, route).then(() => {
              dispatch(screamsDataThunk());
            });
            setTimeout(() => {
              setProgress(null);
            }, 2000);
          }
        );
        return;
      }

      // Logic for image media type

      editor
        .reduceImage({ src: media, format: "blob" })
        .then((blob) => {
          newFile = toFile(blob, "image/jpeg");
          return editor.reduceImage({ src: media, size: 50, format: "blob" });
        })
        .then((blob) => {
          let thumb = toFile(blob, "image/jpeg");
          return uploadFile({
            file: thumb,
            fileName: `${fileName}-thumb`,
            setError,
          });
        })
        .then((storageUrl) => {
          thumbUrl = storageUrl;
          return uploadFile({ file: newFile, fileName, setProgress, setError });
        })
        .then((storageUrl) => {
          URL.revokeObjectURL(media);

          const data = {
            post,
            url: storageUrl,
            thumb: thumbUrl,
            mediaType,
            section,
            postSettings,
          };
          sendData(data, route).then(() => {
            dispatch(screamsDataThunk());
          });
          setTimeout(() => {
            setProgress(null);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setProgress(null);
        });
    }
  };

  return { progress, error, storeData };
};

export default useStoreScream;
