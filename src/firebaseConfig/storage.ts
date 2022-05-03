import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const firebaseUploadPhoto = (image: any): Promise<string> | string => {
  if (image.length === 0) return '';
  if (
    image[0].type !== 'image/png' &&
    image[0].type !== 'image/jpeg' &&
    image[0].type !== 'image/jpg'
  )
    return '';
  const photo = image[0];
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${photo.name}`);
    uploadBytes(storageRef, photo).then(() => {
      getDownloadURL(ref(storage, `images/${photo.name}`)).then((url) => {
        resolve(url);
      });
    });
  });
};
