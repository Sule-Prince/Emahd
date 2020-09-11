import Axios from "axios";

const token = localStorage.getItem("token")
export const axios = Axios.create({
  baseURL: "https://europe-west1-emahd-fdd9d.cloudfunctions.net/api",
  /* headers: {
    Authorization: `Bearer ${token}`
  } */
  
})

