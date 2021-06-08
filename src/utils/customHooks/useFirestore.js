import { projectFirestore } from "../../firebase/FBConfig";

const useFirestore = ({ c, d }) => {
  const setData = async (data) => {
    const exists = await projectFirestore.collection(c).doc(d).get().exists;

    if (exists)
      return await projectFirestore
        .collection(c)
        .doc(d)
        .update({
          ...data,
        });

    return await projectFirestore.collection(c).doc(d).set(data);
  };

  const getData = async () => {
    const snapshot = await projectFirestore.collection(c).doc(d).get();
    const data = snapshot.data();

    return data;
  };

  return [setData, getData];
};

export default useFirestore;
