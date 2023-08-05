import { toast } from "react-hot-toast";

export const alertSuccess = (message) => {
  toast.success(message);
};

export const alertError = (message) => {
  toast.error(message);
};

/* export const alertPromise = (message) => {
  toast.promise(promise, message);
}; */

export const getLocalStorageItem = async (itemName, filter) => {
  const itemsPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const allItems = JSON.parse(localStorage.getItem(itemName));
      const filteredItems = [];

      if (filter) {
        const filterKeys = Object.keys(filter);
        let contains = true;
        filterKeys.length > 0 &&
          allItems?.map((item) => {
            contains = true;
            filterKeys?.map((key) => {
              if (item && item[key] !== filter[key]) contains = false;
            });
            if (contains) filteredItems.push(item);
          });
      }
      resolve(filter ? filteredItems : allItems);
    }, 500);
  });
  return itemsPromise;
};

export const setLocalStorageItems = (itemName, items) => {
  localStorage.setItem(itemName, JSON.stringify(items));
};

export const deleteLocalStorageItem = (itemName, filter) => {
  const itemsPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const allItems = JSON.parse(localStorage.getItem(itemName));

      if (filter) {
        const filterKeys = Object.keys(filter);
        let contains = true;
        let popIndex;
        filterKeys.length > 0 &&
          allItems?.map((item, idx) => {
            contains = true;
            filterKeys?.map((key) => {
              if (item && item[key] !== filter[key]) contains = false;
            });
            if (contains) popIndex = idx;
          });
        allItems.splice(popIndex, 1);
        setLocalStorageItems(itemName, allItems);
      }
      resolve("ok");
    }, 500);
  });
  return itemsPromise;
};

export const editLocalStorageItem = async (itemName, filter, newData) => {
  const itemsPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const allItems = JSON.parse(localStorage.getItem(itemName));

      if (filter) {
        const filterKeys = Object.keys(filter);
        let contains = true;
        let editIndex;
        filterKeys.length > 0 &&
          allItems?.map((item, idx) => {
            contains = true;
            filterKeys?.map((key) => {
              if (item && item[key] !== filter[key]) contains = false;
            });
            if (contains) editIndex = idx;
          });
        const editedItem = allItems[editIndex];
        Object.keys(newData).map((dataKey) => {
          editedItem[dataKey] = newData[dataKey];
        });
        setLocalStorageItems(itemName, allItems);
      }
      resolve("ok");
    }, 500);
  });
  return itemsPromise;
};
