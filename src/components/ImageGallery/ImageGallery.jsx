import ImageCard from "../ImageCard/ImageCard.jsx";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ images, openModal }) {
  return (
    <ul className={css.imgGallery}>
      {images.map((image) => {
        return (
          <li key={image.id} className={css.imgItem}>
            <ImageCard image={image} openModal={openModal} />
          </li>
        );
      })}
    </ul>
  )
}
