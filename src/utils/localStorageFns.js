export const saveDataToLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const getDataFromLS = (key) => {
  return localStorage.getItem(key);
};
