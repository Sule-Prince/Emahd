import { useState, useEffect } from "react";
import { createStore, entries, get, set } from "idb-keyval";

export const useNetwork = (callback) => {
  const [response, setResponse] = useState({ type: "init" });
  useEffect(() => {
    callback().then((res) => setResponse({ type: res.type }));
    if (response.type !== "network-failure") return;

    const initCallback = () => {
      callback();
    };
    window.addEventListener("online", initCallback);
    return () => {
      window.removeEventListener("online", initCallback);
    };
  }, [response, callback]);
};

export const getData = async (ref, { storeName, dbName }) => {
  const store = createStore(dbName, storeName);
  const data = await get(ref, store);

  return data;
};

export const setData = async ({ ref, data }, { storeName, dbName }) => {
  const store = createStore(dbName, storeName);
  await set(ref, data, store);
};

export const exists = async (ref, { storeName, dbName }) => {
  let exists = false;
  const store = createStore(dbName, storeName);
  const data = await get(ref, store);
  if (typeof data !== "undefined" || data) exists = true;

  return exists;
};

export const dataEntries = async ({ storeName, dbName }) => {
  const store = createStore(dbName, storeName);
  const allData = await entries(store);

  return allData;
};

export const useDataStore = () => {
  return { getData, setData, exists };
};
