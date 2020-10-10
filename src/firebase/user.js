import { useState } from "react"
import useStorage from "../utils/customHooks/useStorage";
import { projectFirestore } from "./FBConfig";

export const useGetStatus = userHandle => {
    const [error, setError] = useState("")
    const [data, setData] = useState({})
	const getStories = async () => {
		try {
            const snapshot = await projectFirestore
			.collection("stories")
			.where("handle", "==", userHandle)
			.limit(1)
			.get();
        const data = snapshot.docs[0].data();
        setData(data)
        } catch (error) {
            setError("Something went wrong")
        }
    };
    
    return [error, data, getStories ]
};

export const useAddStatus = data => {
    
    useStorage()
}