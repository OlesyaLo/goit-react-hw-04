import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import {fetchImagesWithData} from "../../images-api.js";


// import css from './App.module.css';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadBtn, setLoadBtn] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  
  
  useEffect(() => {
    if (query === "") {
      return;
    }
    async function fetchImages() {
      try {
        setLoading(true);
        const { results, total_pages } = await fetchImagesWithData(query, page);

        if (results.length === 0) {
          return toast.error("There are no images matching with your search query!");
        }

        setLoadBtn(total_pages > page);
        setImages((prevImages) => {
          return [...prevImages, ...results];
        });
        setLoading(false);
        } catch {
        setError(true);
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

   const openModal = (image) => {
    setSelectedImg(image);
  };

  const closeModal = () => {
    setSelectedImg(null);
  };
  

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {images.length > 0 && <ImageGallery images={images} openModal={openModal} />}
      {loadBtn && <LoadMoreBtn onClick={() => setPage(prevPage => prevPage + 1)} />}
      {selectedImg && <ImageModal image={selectedImg} isClose={closeModal} />}
      <Toaster 
      position="top-center"
       />
    </>
  );
}

export default App
