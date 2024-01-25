import { useRef, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import './index.css';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGE_PER_PAGE = 30;

function App() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getImages = async () => {
      await fetchImages();
    };
    getImages();
  }, );

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${IMAGE_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`
      );
      setImages(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    fetchImages();
  };

  console.log('page', page);

  return (
    <div className='container'>
      <h1 className='title'>Image Search</h1>
      <div className='searchsection'>
        <form onSubmit={handleSearch} className="centered-form">
          <Form.Control
            type='search'
            placeholder='Type something to search'
            className='search-input'
            ref={searchInput}
          />
        </form>
      </div>
      <div className='filters'>
        <div onClick={() => handleSelection('nature')}>nature</div>
        <div onClick={() => handleSelection('birds')}>Birds</div>
        <div onClick={() => handleSelection('cats')}>Cats</div>
        <div onClick={() => handleSelection('shoes')}>Shoes</div>
        <div onClick={() => handleSelection('food')}>Food</div>
      </div>
      <div className='images'>
        {images.map((image) => (
          <img 
          key={image.id} 
          src={image.urls.small} 
          alt={image.alt_description} 
          className='image'/>
        ))}
      </div>
      <div className="buttons">
        {page > 1 && (
            <button onClick={() => setPage(page - 1)}>Previous</button>
          )
        }
        {page < totalPages && (
            <button onClick={() => setPage(page + 2)}>Next</button>
          )
        }

      </div>
    </div>
  );
}

export default App;