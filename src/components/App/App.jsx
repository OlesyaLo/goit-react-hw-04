import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import {fetchImagesWithData} from "../../images-api.js";


import css from './App.module.css';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadBtn, setLoadBtn] = useState(false);
  const [modalWindow, setModalWindow ]= useState(null);

  
  
  useEffect(() => {
    if (query === "") {
      return;
    }
    async function fetchImages() {
      try {
        setLoading(true);
        const { results, total_pages } = await fetchImagesWithData(query, page);

        setLoadBtn(total_pages > page);
        setImages((prevImages) => {
          return [...prevImages, ...results];
        });
        setLoading(false);
      } catch {
        setError(true);
        toast.error("There are no images matching with your search query!");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = newQuery => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setLoadBtn(false);
      setPage(1);
      setImages([]);
      setError(false);
    }
  };

  // const handleLoadMore = () => {
  //   setPage(prevPage => prevPage + 1);
  // };
 
  const openModal = image => {
    setModalWindow(image);
  };

  const closeModal = () => {
    setModalWindow(null);
  };
  

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {images.length > 0 && <ImageGallery images={images} openModal={openModal} />}
      {loadBtn && <LoadMoreBtn onClick={() => setPage(prevPage => prevPage + 1)} />}
      {modalWindow && <ImageModal image={modalWindow} closeModal={closeModal} />}
    </>
  );
}

export default App
