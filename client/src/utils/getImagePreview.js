const getImagePreview = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return resolve(null);
    }
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject; 
    reader.readAsDataURL(file);
  });
};
export default getImagePreview