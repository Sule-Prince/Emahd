import { useState, useEffect } from "react";
import { projectFirestore } from "../../firebase/FBConfig";

const useGetScreams = (handle) => {
  const [allPosts, setAllPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let unsubscribe;
    async function fetchData(user) {
      try {
        unsubscribe = projectFirestore
          .collection("users")
          .doc(user)
          .onSnapshot(async (snapshot) => {
            let friendsList = [];
            try {
              friendsList = snapshot.data().friends;
              friendsList.push(user);
              const screams = friendsList.map(async (friend) => {
                let gottenScreams = [];
                let docs = await projectFirestore
                  .collection("screams")
                  .where("handle", "==", friend)
                  .orderBy("createdAt", "desc")
                  .get();

                docs.forEach((snapshot) => {
                  gottenScreams.push(snapshot.data());
                });

                return gottenScreams;
              });
              const resolvedPromise = await Promise.all(screams);
              setAllPosts(resolvedPromise);
            } catch (error) {
              setError("It seems you do not have an active connection");
            }
          });
      } catch (error) {
        return setError("Something went wrong, please try again");
      }
    }
    fetchData(handle);
    return () => {
      console.log(unsubscribe);
      // unsubscribe();
    };

    // eslint-disable-next-line
  }, []);
  return [allPosts, error];
};

export default useGetScreams;
