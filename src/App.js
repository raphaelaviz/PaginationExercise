import { useEffect, useState } from 'react';
import {BiLeftArrow, BiRightArrow} from 'react-icons/bi';
import './Pagination.css';

// A simple pagination exercise. This app fetches an array of
// products and displays them in chunks of 10.
const App = () => {
  
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  

  // Fetches an array of products via Fetch API.

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
      if (data && data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Updates the current page according to user interactions.

  const handlePageSelection = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage !== page)
      setPage(selectedPage);
  };

  // Renders the products, pagination controls, and displays the current page of products.
  return (
    <div>
      { /*Renders the products in groups of 10 */ }
      {
        products.length > 0 &&
          <div className='products'>
            {products.slice(page * 10 - 10, page * 10).map((prod) => (
              <span
                className='single-product'
                key={prod.id}
              >
                <img
                  src={prod.thumbnail}
                  alt={prod.title}
                />
                <span>
                  {prod.title}
                </span>
              </span>
            ))}
          </div>
      }
      { /*Renders the pagination controls, hiding the Left and Right arrows
         if we're in the first or last pages respectively */ }   
      {  
        products.length > 0 && <div className='pagination'>
          <span
            className={page > 1 ? "" : "pagination-disabled"}
            onClick={() => handlePageSelection(page - 1)}
          >
            <BiLeftArrow/>
          </span>
          {
            [...Array(products.length / 10)].map((_, index) => (
              <span
                className={page === index + 1 ? 'selected-page' : ''}
                onClick={() => handlePageSelection(index + 1)}
                key={index}
              >
                {index + 1}
              </span>)
            )
          }                     
          <span
            className={page < products.length / 10 ? "" : "pagination-disabled"}
            onClick={() => handlePageSelection(page + 1)}
          >
            <BiRightArrow/>
          </span>
        </div>
      }
    </div>
  );
}

export default App;