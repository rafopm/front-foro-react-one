import React, { useState, useEffect } from "react";
import Styles from "../../styles/Forum.module.css";

const UserPhoto = ({ userId, userName }) => {
  const [userPhotos, setUserPhotos] = useState({});

  useEffect(() => {
    fetchUserPhoto();

    async function fetchUserPhoto() {
      const photoPath = `/images/photos/${userId}.jpeg`;
      const photoExists = await checkPhotoExists(photoPath);

      if (photoExists) {
        setUserPhotos((prevUserPhotos) => ({
          ...prevUserPhotos,
          [userId]: { photo: photoPath, initials: "" },
        }));
      } else {
        const initials = userName.substring(0, 1).toUpperCase();
        setUserPhotos((prevUserPhotos) => ({
          ...prevUserPhotos,
          [userId]: { photo: "", initials },
        }));
      }
    }

    async function checkPhotoExists(photoPath) {
      try {
        const response = await fetch(photoPath);
        return response.ok;
      } catch (error) {
        console.error("Error al verificar la existencia de la foto:", error);
        return false;
      }
    }
  }, [userId, userName]);

  const getGravatarImage = (initial) => {
    const gravatarURL = `https://www.gravatar.com/avatar/${initial.toLowerCase()}.png?r=PG&size=60x60&date=2023-05-22&d=https%3A%2F%2Fapp.aluracursos.com%2Fassets%2Fimages%2Fforum%2Favatar_${initial.toLowerCase()}.png`;

    return gravatarURL;
  };

  return (
    <div>
      {userPhotos[userId] && (
        <div className={Styles.imagenoletra}>
          {userPhotos[userId].photo ? (
            <img
              src={userPhotos[userId].photo}
              alt={`Foto de ${userName}`}
              className={Styles.imagen}
            />
          ) : (
            <img
              src={getGravatarImage(userPhotos[userId].initials)}
              alt={`Foto de ${userName}`}
              className={Styles.imagen}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UserPhoto;
