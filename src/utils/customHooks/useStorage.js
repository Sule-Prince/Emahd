import { projectStorage } from "../../firebase/FBConfig";

// Function uploads data to firebase storage bucket
function useStorage() {
  const uploadFile = async ({ file, fileName, setProgress, setError }) => {
    return new Promise((resolve, reject) => {
      const splittedName = file.name.split("."),
        fileExtension = splittedName[splittedName.length - 1],
        fileRef = `${fileName}.${fileExtension}`,
        storageRef = projectStorage.ref(fileRef);

      storageRef.put(file).on(
        "state_changed",
        (snap) => {
          if (!setProgress || typeof setProgress !== "function") return;
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress((prev) => {
            if (percentage < 10) return 10;
            return percentage;
          });
        },
        (err) => {
          if (setError && typeof setError === "function") {
            setError(err);
            reject(err);
          }
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          resolve(url);
        }
      );
    });
  };

  return uploadFile;
}

export default useStorage;
