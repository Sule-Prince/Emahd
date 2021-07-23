export const objectToArray = (obj) => {
  const arrayData = [];

  for (let key in obj) {
    let length = arrayData.length;
    arrayData[length] = [];
    arrayData[length][0] = key;
    arrayData[length][1] = obj[key];
  }

  return arrayData;
};

export const makeSingleArray = (array) => {
  const singleArray = [];
  for (let arr of array) {
    singleArray.push(arr[1]);
  }

  return singleArray;
};

export const replaciveMerge = (arrayList) => {
  let largest = [];
  for (const arr of arrayList) {
    if (arr.length > largest.length) largest = arr;
  }
  const mergedArray = Array.from(largest).fill("");
  for (let i = 0; i < largest.length; i++) {
    for (let y = 0; y < arrayList.length; y++) {
      if (!!arrayList[y][i]) {
        mergedArray[i] = arrayList[y][i];

        continue;
      }
    }
  }

  return mergedArray;
};

export const arrayToObj = (array) => {
  const obj = {};
  for (let index = 0; index < array.length; index++) {
    const key = array[index][0];
    const value = array[index][1];

    obj[key] = value;
  }

  return obj;
};

export const urlToBlob = async (url) => {
  let blob = await fetch(url).then((r) => r.blob());

  return blob;
};

export const rootToChildDiff = (rootEl, childEl) => {
  const { left: rootLeft, top: rootTop } = rootEl.getBoundingClientRect();
  const { left: childLeft, top: childTop } = childEl.getBoundingClientRect();
  const left = rootLeft - childLeft,
    top = rootTop - childTop;
  return { left, top };
};
