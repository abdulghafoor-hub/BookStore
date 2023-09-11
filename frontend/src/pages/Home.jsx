import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineAddBox } from "react-icons/md";
import Booktable from "../components/Booktable";
import BookCard from "../components/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5555/books')
      .then((response) => {
        // console.log(response.data.Data);
        setBooks(response.data.Data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      })
  }, [])

  return (
    <div className="p-4">
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table view
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card view
        </button>
      </div>
      <div className="flex justify-between  item-center">
        <h1 className="text-3xl my-8">Book List</h1>
        <Link to="/books/create">
        <span className="flex"> 
        <h1 className="font-bold m-1">Add Book</h1>
        <MdOutlineAddBox className="text-sky-800 text-4xl" /></span> 
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <Booktable book={books} />
      ) : (
        <BookCard book={books} />
      )}
    </div>
  )
}

export default Home;