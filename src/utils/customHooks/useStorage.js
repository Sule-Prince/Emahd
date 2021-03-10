import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import { projectStorage } from "../../firebase/FBConfig";
import { screamsDataThunk } from "../../redux/postsSlice";
import IDGenerator from "../IDGenerator";
import ImageEdits from "../ImageEditor";
import usePostData from "./usePostData";

const useStorage = (section, media) => {
  const { sendData, postError } = usePostData();
  const [progress, setProgress] = useState(null);

  const [error, setError] = useState([]);

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

    if (section === "media") {
    }
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
        uploadData({ file: media, fileName, setProgress, setError }).then(
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
          return uploadData({
            file: thumb,
            fileName: `${fileName}-thumb`,
            setProgress,
            setError,
            progress: false,
          });
        })
        .then((storageUrl) => {
          thumbUrl = storageUrl;
          return uploadData({ file: newFile, fileName, setProgress, setError });
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
        .catch((error) => console.log(error));

      setTimeout(() => {
        setProgress(null);
      }, 2000);
    }
  };

  return { progress, error, storeData };
};

export default useStorage;

// Function uploads data to firebase storage bucket
function uploadData({
  file,
  fileName,
  setProgress,
  setError,
  progress = true,
}) {
  return new Promise((resolve, reject) => {
    const splittedName = file.name.split("."),
      fileExtension = splittedName[splittedName.length - 1],
      fileRef = `${fileName}.${fileExtension}`,
      storageRef = projectStorage.ref(fileRef);

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        if (progress) {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress((prev) => {
            if (percentage < 10) return 10;
            return percentage;
          });
        }
      },
      (err) => {
        setError(err);
        reject(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        resolve(url);
      }
    );
  });
}

// Function converts blob data to a file
function toFile(blob, type) {
  return new File([blob], `${IDGenerator()}.${type.split("/")[1]}`, {
    type,
    lastModified: Date.now(),
  });
}
