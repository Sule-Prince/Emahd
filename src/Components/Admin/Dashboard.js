import React from "react";

import { makeStyles } from "@material-ui/core";
import PostDisplay from "../SubComponents/PostDisplay";
import postMedia from "../SubComponents/post.jpg";
import postMedia2 from "../SubComponents/post2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../redux/authSlice";
import useGetScreams from "../../utils/customHooks/useGetScreams";
import { useEffect } from "react";
// import Test from "./Test";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "10vh",
    padding: "50px 20px",
    background: "#fff",
    maxWidth: "100vw",
  },
}));

const Dashboard = ({history}) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const isAuthenticated = useSelector( state => state.isAuthenticated)
  if(isAuthenticated) {history.push("/")}
  const [data] = useGetScreams("_savage.kvng")
  useEffect( () => {
    console.log(data)
  }, [data])
  return (
    <>
   
      <div className={classes.root}>This Is the Dashboard</div>
      <PostDisplay
        userData={{
          name: "Sule Prince",
          extra: "@_savage.kvng",
          postMedia: postMedia,
        }}
      />
     
      <PostDisplay
        userData={{
          name: "John Doe",
          extra: "@john_doe",
          postMedia: postMedia2,
        }}
      />

      <PostDisplay
        userData={{
          name: "Sule Prince",
          extra: "@_savage.kvng",
          postMedia: postMedia,
        }}
      />
    <button onClick={()=>{
     
        dispatch(signin())
     
    }}>Redirect</button>
     
    </>
  );
};

export default Dashboard;
