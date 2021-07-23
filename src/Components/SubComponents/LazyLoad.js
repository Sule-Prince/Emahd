import React, { useState, useEffect, useRef } from "react";

function LazyLoad({ children, rootRef, onLoad }) {
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
      if (onLoad) onLoad();
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
