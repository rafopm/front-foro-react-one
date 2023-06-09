import Image from "next/image";

export const getPhotoSource = async (userId, userName) => {
  const photoPath = `/images/photos/${userId}.jpeg`;
  const photoExists = await checkPhotoExists(photoPath);

  if (!photoExists) {
    const initials = userName.substring(0, 1).toUpperCase();
  }
};

const checkPhotoExists = async (photoPath) => {
  try {
    const response = await fetch(photoPath);
    return response.ok; // La foto existe si el código de respuesta es 200
  } catch (error) {
    return false; // La foto no existe o hay un error al acceder a la ruta
  }
};
