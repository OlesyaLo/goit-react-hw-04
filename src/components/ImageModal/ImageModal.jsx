import Modal from 'react-modal';
import css from './ImageModal.module.css';

const ImageModal = ({ image, closeModal }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={!!image}
      onRequestClose={closeModal}
      contentLabel="image modal window"
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button onClick={closeModal} className={css.closeButton}>Close</button>
      <img src={image.urls.regular} alt={image.alt_description} className={css.image} />
      <p>{image.description || 'No description'}</p>
      <p>{image.user.name}</p>
      <p>Likes: {image.likes}</p>
    </Modal>
  );
};

export default ImageModal;

