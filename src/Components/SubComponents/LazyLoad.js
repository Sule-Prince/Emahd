import React, { useState, useEffect, useRef } from "react";

function LazyLoad({ children, aspectRatio, rootRef }) {
  const [load, setLoad] = useState(false);

  const loadRef = useRef(null);

  useEffect(() => {
    const dragEl = loadRef.current;
    const observeConfig = {
      root: rootRef ? rootRef.current : null,
      rootMargin: "100px 0px",
    };

    const mediaObserver = new IntersectionObserver(
      observeElement,
      observeConfig
    );

    mediaObserver.observe(dragEl);

    function observeElement(entry) {
      entry = entry[0];

      if (entry.intersectionRatio !== 1 || load) return;

      setLoad(true);
    }

    return () => {
      mediaObserver.unobserve(dragEl);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div ref={loadRef}></div>
      {load && children}
    </>
  );
}

export default LazyLoad;
