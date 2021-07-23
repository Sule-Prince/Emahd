import { useState, useEffect } from "react";

export const useGetClientRect = (ref) => {
  const [clientRect, setClientRect] = useState({});

  useEffect(() => {
    setClientRect(ref.current.getBoundingClientRect());

    // eslint-disable-next-line
  }, []);

  return clientRect;
};
