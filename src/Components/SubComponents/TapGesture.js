import React, { useRef } from "react";

function TapGesture({ onTap, onDbTap }) {
  const tappedRef = useRef(null);

  return (
    <div
      onTouchStart={(e) => {
        e.preventDefault();

        if (!tappedRef.current) {
          //if tap is not set, set up single tap
          tappedRef.current = setTimeout(function () {
            tappedRef.current = null;
            //insert things you want to do when single tapped
            onTap();
          }, 300); //wait 300ms then run single click code
        } else {
          //tapped within 300ms of last tap. double tap
          clearTimeout(tappedRef.current); //stop single tap callback
          tappedRef.current = null;
          //insert things you want to do when double tapped
          onDbTap();
        }
      }}></div>
  );
}

export default TapGesture;
