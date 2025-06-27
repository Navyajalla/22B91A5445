// src/utils/shortener.js
export const generateShortCode = () => Math.random().toString(36).substring(2, 7);

export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getGeoMock = () => "India"; // mock only
